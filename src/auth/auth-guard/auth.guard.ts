import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { IS_ADMIN_KEY } from '../admin.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const {
        // user: { id, role },
        user,
      } = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      // const user = await this.usersService.findOne({
      //   id,
      //   role,
      // });

      // Attach the user to the request object
      request['user'] = user;
    } catch {
      throw new UnauthorizedException(
        'Invalid token, please request a new one.',
      );
    }

    if (isAdmin) {
      this.logger.warn('Only admins can access.');
      if (request.user.role !== 'admin') {
        this.logger.fatal('Non-admin access denied.');
        throw new UnauthorizedException('Only admins can access.');
      }
      this.logger.verbose('Admin access granted.');
    }

    return true;
  }
}
