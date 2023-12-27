import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ResendService } from 'nestjs-resend';
import { LoginGoogleDto } from './dto/login-google.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private usersService;
    private resendService;
    private jwtService;
    private prismaService;
    private logger;
    constructor(usersService: UsersService, resendService: ResendService, jwtService: JwtService, prismaService: PrismaService);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            image: string;
            hashedPassword: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    loginGoogle(loginGoogleDto: LoginGoogleDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            image: string;
            hashedPassword: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    verifyEmailToken(token: string): Promise<any>;
}
