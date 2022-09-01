import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './../dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
  @Post('signup')
  async signUp(
    @Body() signUpData : SignUpDto
  ) {
    return await this.authService.signUpService(signUpData);
  }

  @Post("signin")
  async signIn(
    @Body() signInData : SignInDto
  ){
     return this.authService.signInService(signInData)
  }
}
