import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsObject,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  providerAccountId: string;

  @IsString()
  @IsOptional()
  refresh_token: string | null;

  @IsString()
  @IsOptional()
  access_token: string | null;

  @IsInt()
  @IsOptional()
  expires_at: number | null;

  @IsString()
  @IsOptional()
  token_type: string | null;

  @IsString()
  @IsOptional()
  scope: string | null;

  @IsString()
  @IsOptional()
  id_token: string | null;

  @IsString()
  @IsOptional()
  session_state: string | null;
}

export class LoginGoogleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  emailVerified: boolean;

  @IsString()
  @IsOptional()
  image: string | null;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAccountDto)
  accounts: CreateAccountDto;
}
