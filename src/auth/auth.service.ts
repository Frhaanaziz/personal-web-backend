import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResendService } from 'nestjs-resend';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private usersService: UsersService,
    private resendService: ResendService,
    private jwtService: JwtService,
  ) {}

  // async getUserByUsername(username: string): Promise<User> {
  //   return this.prismaService.user.findUnique({ where: { username } });
  // }

  // async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
  //   const { password, username } = authCredentialsDto;

  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);

  //   try {
  //     return await this.prismaService.user.create({
  //       data: {
  //         username,
  //         password: hashedPassword,
  //       },
  //     });
  //   } catch (error) {
  //     if (error.code === 'P2002')
  //       throw new ConflictException('Username already exists');
  //     throw new InternalServerErrorException();
  //   }
  // }

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { name, email, password } = authCredentialsDto;

    const exist = await this.usersService.findOne({
      email,
    });

    if (exist) {
      const passwordMatch = await bcrypt.compare(
        password,
        exist.hashedPassword,
      );

      if (!passwordMatch)
        throw new UnauthorizedException('Incorrect email or password');

      if (exist.emailVerified)
        throw new UnauthorizedException('Email already verified, please login');
    }

    if (!exist) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.usersService.create({
        name,
        email,
        hashedPassword,
      });

      const emailTokenPayload = { user: { id: user.id } };
      const emailToken = this.jwtService.sign(emailTokenPayload, {
        secret: process.env.EMAIL_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      this.resendService.send({
        from: 'Portfolio <portfolio-console@aththariq.com>',
        to: [email],
        subject: 'Email Verification',
        html: `<div><h1>Confirm Email</h1><a href="${
          process.env.FRONTEND_URL +
          '/api/auth/verify-email?token=' +
          emailToken
        }">Click here to verify your email address</a></div>`,
      });
    } else if (!exist.emailVerified) {
      const emailTokenPayload = { user: { id: exist.id } };
      const emailToken = this.jwtService.sign(emailTokenPayload, {
        secret: process.env.EMAIL_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      this.resendService.send({
        from: 'Portfolio <portfolio-console@aththariq.com>',
        to: [email],
        subject: 'Email Verification',
        html: `<div><h1>Confirm Email</h1><a href="${
          process.env.FRONTEND_URL +
          '/api/auth/verify-email?token=' +
          emailToken
        }">Click here to verify your email address</a></div>`,
      });
    }
  }

  // async signIn(authCredentialsDto: AuthCredentialsDto) {
  //   const { username, password } = authCredentialsDto;

  //   const user = await this.prismaService.user.findUnique({
  //     where: { username },
  //   });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const payload: JwtPayload = { username };
  //     const accessToken = this.jwtService.sign(payload);

  //     return { accessToken };
  //   } else {
  //     throw new UnauthorizedException('Please check your login credentials');
  //   }
  // }
}
