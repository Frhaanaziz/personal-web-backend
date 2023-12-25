import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/signup')
  // signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
  //   return this.authService.signUp(authCredentialsDto);
  // }

  // @Post('/signin')
  // signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
  //   return this.authService.signIn(authCredentialsDto);
  // }
}
