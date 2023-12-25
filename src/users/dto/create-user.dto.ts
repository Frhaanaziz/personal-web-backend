import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// model User {
//     id             String    @id @default(cuid())
//     name           String
//     email          String    @unique
//     emailVerified  Boolean   @default(false)
//     image          String?
//     hashedPassword String?
//     role           String    @default("user")
//     createdAt      DateTime  @default(now())
//     updatedAt      DateTime  @updatedAt
//     accounts       Account[]
//   }

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
