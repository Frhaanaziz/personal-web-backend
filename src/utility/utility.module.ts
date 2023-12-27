import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UtilityService],
})
export class UtilityModule {}
