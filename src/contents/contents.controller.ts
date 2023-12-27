import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { UpdateContentDto } from './dto/update-content.dto';
import { AuthGuard } from 'src/auth/auth-guard/auth.guard';
// import { CreateContentDto } from './dto/create-content.dto';
// import { UpdateContentDto } from './dto/update-content.dto';

@UseGuards(AuthGuard)
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  // @Post()
  // create(@Body() createContentDto: CreateContentDto) {
  //   return this.contentsService.create(createContentDto);
  // }

  // @Get()
  // findAll() {
  //   return this.contentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contentsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update({
      where: { id },
      data: updateContentDto,
    });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contentsService.remove(+id);
  // }
}
