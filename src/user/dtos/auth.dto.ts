import { IsNotEmpty, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsString()
  name: string;

  phone: string;
  email: string;
  password: string;
}
