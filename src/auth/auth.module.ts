import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ResendModule } from 'nestjs-resend';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ResendModule.forRoot({
      apiKey: process.env.RESEND_API_KEY,
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [ResendModule, UsersService],
})
export class AuthModule {}
