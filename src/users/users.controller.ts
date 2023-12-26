import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserEmailVerifiedDto } from './dto/update-user-email-verified.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
