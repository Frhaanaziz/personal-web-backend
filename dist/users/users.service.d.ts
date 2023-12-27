import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { ResendService } from 'nestjs-resend';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private db;
    private resendService;
    private jwtService;
    constructor(db: PrismaService, resendService: ResendService, jwtService: JwtService);
    findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]>;
    create(data: CreateUserDto): Promise<User>;
    update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    delete(where: Prisma.UserWhereUniqueInput): Promise<User>;
    resetPassword({ newPassword, userId }: ResetPasswordDto): Promise<{
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string;
        hashedPassword: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    validateEmail(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string;
        hashedPassword: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
