import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth-guard/auth.guard';
import { AuthGuardModule } from 'src/auth/auth-guard/auth-guard.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthGuardModule, PrismaModule],
  controllers: [ContentsController],
  providers: [
    ContentsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ContentsModule {}
