import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto, GenerateProductKeyDto } from './../dtos/auth.dto';
import { UserType } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
  @Post('/signup/:userType')
  async signUp(
    @Body() signUpData : SignUpDto ,
    @Param() userType : UserType
  ) {

    if (userType !== UserType.BUYER){
      if (!signUpData.productKey){
        throw new HttpException('product key must not be empty' , 401)
      }
    }

    return await this.authService.signUpService(signUpData , userType);
  }

  @Post("/signin")
  async signIn(
    @Body() signInData : SignInDto
  ){
     return this.authService.signInService(signInData)
  }

  @Post('/key')
  async generateProductKey(
    @Body() createKeyData : GenerateProductKeyDto
  ){
    return this.authService.generateProductKey(createKeyData)
  }
}
