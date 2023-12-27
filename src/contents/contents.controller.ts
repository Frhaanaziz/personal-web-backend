import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { UpdateContentDto } from './dto/update-content.dto';
import { AuthGuard } from 'src/auth/auth-guard/auth.guard';
import { Admin } from 'src/auth/admin.decorator';

@UseGuards(AuthGuard)
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Admin()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update({
      where: { id },
      data: updateContentDto,
    });
  }
}
