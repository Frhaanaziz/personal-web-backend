import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { UpdateContentDto } from './dto/update-content.dto';
import { AuthGuard } from 'src/auth/auth-guard/auth.guard';
import { Admin } from 'src/auth/admin.decorator';
import { CreateContentDto } from './dto/create-content.dto';

@UseGuards(AuthGuard)
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Admin()
  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto);
  }

  @Admin()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update({
      where: { id },
      data: updateContentDto,
    });
  }
}
