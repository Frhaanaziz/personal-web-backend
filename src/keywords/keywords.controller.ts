import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  BadRequestException,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { FindAllKeywordsDto } from './dto/find-all-keywords.dto';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { Admin } from '../auth/admin.decorator';
import { Public } from '../auth/public.decorator';

@UseGuards(AuthGuard)
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Public()
  @Get()
  findAll(@Query() findAllKeywordsDto: FindAllKeywordsDto) {
    const { page, group, locale } = findAllKeywordsDto;
    if (page) return this.keywordsService.findAll({ page: Number(page) });

    if (group && locale)
      return this.keywordsService.findMany({
        where: { group },
        include: {
          Content: {
            where: {
              locale,
            },
          },
        },
      });

    if (!group && locale)
      return this.keywordsService.findIntlMessage({ locale });

    throw new BadRequestException('Missing query params');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.keywordsService.findOne({ id });
  }

  @Admin()
  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordsService.create(createKeywordDto);
  }

  @Admin()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsService.update({
      where: { id },
      data: updateKeywordDto,
    });
  }

  @Admin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keywordsService.delete({
      id,
    });
  }
}
