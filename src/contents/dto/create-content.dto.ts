import { IsString, IsNotEmpty } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  locale: string;

  @IsString()
  @IsNotEmpty()
  keywordId: string;
}

// export class CreateContentDto {
//   id?: string;

//   @IsString()
//   @IsNotEmpty()
//   content: string;

//   @IsString()
//   @IsNotEmpty()
//   locale: string;

//   createdAt?: string | Date;
//   updatedAt?: string | Date;

//   keyword: Prisma.KeywordCreateNestedOneWithoutContentInput;

//   @IsString()
//   @IsNotEmpty()
//   keywordId?: string
// }
