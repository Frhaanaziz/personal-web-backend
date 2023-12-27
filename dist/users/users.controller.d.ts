import { UsersService } from './users.service';
import { UpdateUserEmailVerifiedDto } from './dto/update-user-email-verified.dto';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    resetPassword(id: string, newPassword: string): Promise<{
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
    update(id: string, { emailVerified }: UpdateUserEmailVerifiedDto): Promise<User>;
}
