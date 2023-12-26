import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginGoogleDto } from './dto/login-google.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/verify-email-token')
  verifyEmailToken(@Body('token') token: string) {
    return this.authService.verifyEmailToken(token);
  }

  @Post('/login-google')
  loginGoogle(@Body() loginGooleDto: LoginGoogleDto) {
    return this.authService.loginGoogle(loginGooleDto);
  }

  // @Post('/signin')
  // signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
  //   return this.authService.signIn(authCredentialsDto);
  // }
}
