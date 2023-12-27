import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { ResendService } from 'nestjs-resend';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private db: PrismaService,
    private resendService: ResendService,
    private jwtService: JwtService,
  ) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.db.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.db.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.db.user.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.db.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.db.user.delete({
      where,
    });
  }

  async resetPassword({ newPassword, userId }: ResetPasswordDto) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await this.db.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedPassword,
          emailVerified: true,
        },
      });

      return updatedUser;
    } catch (error) {
      throw new NotFoundException('Account not found');
    }
  }

  async validateEmail(email: string) {
    try {
      const user = await this.db.user.findUnique({
        where: {
          email,
        },
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
        html: `
              <div>
                  <h1>Confirm Email</h1>
                   <a 
                   href="${process.env.CONSOLE_URL}/auth/reset-password/${emailToken}"
                     >Click here to reset your password</a>
              </div>
               `,
      });

      return user;
    } catch (error) {
      throw new NotFoundException('Account not found');
    }
  }
}
