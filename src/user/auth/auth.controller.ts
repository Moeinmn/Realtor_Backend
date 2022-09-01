import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './../dtos/auth.dto';
import { UserType } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
  @Post('/signup')
  async signUp(
    @Body() signUpData : SignUpDto
  ) {

    if (signUpData.productKey !== UserType.BUYER){
      if (!signUpData.productKey){
        throw new HttpException('product key must not be empty' , 401)
      }
    }

    return await this.authService.signUpService(signUpData);
  }

  @Post("/signin")
  async signIn(
    @Body() signInData : SignInDto
  ){
     return this.authService.signInService(signInData)
  }

  @Post('/key')
  generateProductKey(){
    this.authService.generateProductKey
  }
}
