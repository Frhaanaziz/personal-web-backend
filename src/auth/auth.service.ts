import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResendService } from 'nestjs-resend';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginGoogleDto } from './dto/login-google.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private usersService: UsersService,
    private resendService: ResendService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user && !user.hashedPassword)
      throw new NotFoundException(
        'Please create a password from forgot password',
      );

    if (!user || !user?.hashedPassword)
      throw new UnauthorizedException('Incorrect email or password');

    if (!user.emailVerified)
      throw new UnauthorizedException('Please confirm your email to login');

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch)
      throw new UnauthorizedException('Incorrect email or password');

    const accessTokenPayload = { user: { id: user.id, role: user.role } };
    const accessToken = this.jwtService.sign(accessTokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { accessToken, user };
  }

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
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      this.resendService.send({
        from: 'Portfolio <portfolio-console@aththariq.com>',
        to: [email],
        subject: 'Email Verification',
        html: `<div><h1>Confirm Email</h1><a href="${
          process.env.CONSOLE_URL +
          '/api/auth/verify-email?token=' +
          emailToken +
          '&id=' +
          user.id
        }">Click here to verify your email address</a></div>`,
      });
    } else if (!exist.emailVerified) {
      const emailTokenPayload = { user: { id: exist.id } };
      const emailToken = this.jwtService.sign(emailTokenPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      this.resendService.send({
        from: 'Portfolio <portfolio-console@aththariq.com>',
        to: [email],
        subject: 'Email Verification',
        html: `<div><h1>Confirm Email</h1><a href="${
          process.env.CONSOLE_URL + '/api/auth/verify-email?token=' + emailToken
        }">Click here to verify your email address</a></div>`,
      });
    }
  }

  async loginGoogle(loginGoogleDto: LoginGoogleDto) {
    const { accounts, ...data } = loginGoogleDto;

    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        const user = await this.prismaService.user.create({
          data: {
            ...data,
            accounts: {
              create: accounts,
            },
          },
        });

        const accessTokenPayload = { user: { id: user.id, role: user.role } };
        const accessToken = this.jwtService.sign(accessTokenPayload, {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return { accessToken, user };
      } else {
        const accessTokenPayload = { user: { id: user.id, role: user.role } };
        const accessToken = this.jwtService.sign(accessTokenPayload, {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return { accessToken, user };
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to login');
    }
  }

  async verifyEmailToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
