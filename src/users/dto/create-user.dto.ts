import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  emailVerified?: boolean;
  image?: string;
  hashedPassword?: string;
  role?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
}
