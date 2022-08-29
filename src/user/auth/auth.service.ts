import { Injectable } from '@nestjs/common';
import { SignUpDto } from './../dtos/auth.dto';

@Injectable()
export class AuthService {
  signUp(signUpData : SignUpDto) {
    return {
      signUpData
    };
  }
}
