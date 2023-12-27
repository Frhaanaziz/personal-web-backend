import { Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UsersService);
    validate(payload: JwtPayload): Promise<{
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
export {};
