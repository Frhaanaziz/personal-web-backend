import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    verifyEmailToken(token: string): Promise<any>;
    loginGoogle(loginGooleDto: LoginGoogleDto): Promise<{
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
}
