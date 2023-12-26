import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateContentDto {
  id?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  locale: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;

  keyword: Prisma.KeywordCreateNestedOneWithoutContentInput;
}
