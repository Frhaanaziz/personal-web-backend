import { Prisma } from '@prisma/client';
export declare class CreateUserDto {
    id?: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    image?: string;
    hashedPassword?: string;
    role?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
}
