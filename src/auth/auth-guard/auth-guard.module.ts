import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from '../jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ResendModule } from 'nestjs-resend';
import { UsersService } from '../../users/users.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    AuthModule,
  ],
  providers: [AuthGuard, JwtStrategy, UsersService, JwtService],
  exports: [UsersService],
})
export class AuthGuardModule {}
