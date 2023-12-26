import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  userId: string;
}
