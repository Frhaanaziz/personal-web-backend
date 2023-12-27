import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindAllKeywordsDto {
  @IsNumberString()
  @IsNotEmpty()
  page: number;
}
