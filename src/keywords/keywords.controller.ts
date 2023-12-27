import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { FindAllKeywordsDto } from './dto/find-all-keywords.dto';
import { AuthGuard } from 'src/auth/auth-guard/auth.guard';
import { Admin } from 'src/auth/admin.decorator';

@UseGuards(AuthGuard)
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Admin()
  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordsService.create(createKeywordDto);
  }

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

    throw new BadRequestException('Missing query params');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.keywordsService.findOne({ id });
  }

  // @Get('section')
  // findBySection(@Query() { section }: FindAllKeywordsDto) {
  //   return this.keywordsService.findBySection({ section });
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
