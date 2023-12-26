import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserEmailVerifiedDto {
  @IsNotEmpty()
  @IsBoolean()
  emailVerified: boolean;
}
