import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { UtilityModule } from 'src/utility/utility.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UtilityModule, PrismaModule],
  controllers: [KeywordsController],
  providers: [KeywordsService],
})
export class KeywordsModule {}
