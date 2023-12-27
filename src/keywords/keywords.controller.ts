import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { FindAllKeywordsDto } from './dto/find-all-keywords.dto';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  // @Post()
  // create(@Body() createKeywordDto: CreateKeywordDto) {
  //   return this.keywordsService.create(createKeywordDto);
  // }

  @Get()
  findAll(@Query() { page }: FindAllKeywordsDto) {
    return this.keywordsService.findAll({ page: Number(page) });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.keywordsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
  //   return this.keywordsService.update(+id, updateKeywordDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.keywordsService.remove(+id);
  // }
}
