import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

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
}
