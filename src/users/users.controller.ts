import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserEmailVerifiedDto } from './dto/update-user-email-verified.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/validate-email')
  validateEmail(@Body('email') email: string) {
    return this.usersService.validateEmail(email);
  }

  @Post(':id/reset-password')
  resetPassword(
    @Param('id') id: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.usersService.resetPassword({ userId: id, newPassword });
  }

  @Patch(':id/emailVerified')
  update(
    @Param('id') id: string,
    @Body() { emailVerified }: UpdateUserEmailVerifiedDto,
  ): Promise<User> {
    return this.usersService.update({
      data: {
        emailVerified,
      },
      where: {
        id,
      },
    });
  }
}
