import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FindAllKeywordsDto {
  @IsNumberString()
  @IsOptional()
  page: number | null;

  @IsString()
  @IsOptional()
  group: string | null;

  @IsString()
  @IsOptional()
  locale: string | null;
}
