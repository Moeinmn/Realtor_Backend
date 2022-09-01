import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { UserType } from '@prisma/client';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/)
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?:string
}

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  password:string
}

export class GenerateProductKeyDto {
 
  @IsEmail()
  email:string
 
  @IsEnum(UserType)
  userType : UserType
}
