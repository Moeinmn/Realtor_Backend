import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './../dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
  @Post('signup')
  signUp(
    @Body() signUpData : SignUpDto
  ) {
    return this.authService.signUp(signUpData);
  }
}
