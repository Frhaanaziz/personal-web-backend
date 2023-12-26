import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResendModule } from 'nestjs-resend';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    ResendModule.forRoot({
      apiKey: process.env.RESEND_API_KEY,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [PrismaModule],
})
export class UsersModule {}
