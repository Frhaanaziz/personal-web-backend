import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { UtilityModule } from '../utility/utility.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UtilityModule, AuthModule],
  controllers: [KeywordsController],
  providers: [KeywordsService],
})
export class KeywordsModule {}
