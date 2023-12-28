import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { UtilityModule } from '../utility/utility.module';
import { AuthGuardModule } from '../auth/auth-guard/auth-guard.module';

@Module({
  imports: [UtilityModule, AuthGuardModule],
  controllers: [KeywordsController],
  providers: [KeywordsService],
})
export class KeywordsModule {}
