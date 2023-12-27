import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { AuthGuardModule } from '../auth/auth-guard/auth-guard.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthGuardModule, PrismaModule],
  controllers: [ContentsController],
  providers: [
    ContentsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class ContentsModule {}
