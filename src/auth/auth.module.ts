import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ResendModule } from 'nestjs-resend';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

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
  exports: [ResendModule],
})
export class AuthModule {}
