import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKeywordDto {
  id?: string;

  @IsString()
  @IsNotEmpty()
  keyword: string;

  @IsString()
  @IsNotEmpty()
  group: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;
  Content?: Prisma.ContentCreateNestedManyWithoutKeywordInput;
}
