import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./../dtos/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { UserType } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  private setJwt(obj) {
    return jwt.sign(obj, process.env.JWT_KEY || "moeinmoein");
  }

  async signUpService({ name, email, password, phone }: SignUpDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return new ConflictException();
    }

    let hashedPass = await bcrypt.hash(password, 5);

    let creatredUser = await this.prismaService.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPass,
        phone: phone,
        user_type: UserType.BUYER,
      },
    });

    console.log({ ...creatredUser });

    let userJwt = this.setJwt({
      id: creatredUser.id,
      name,
      email,
    });

    return userJwt;
  }

  async signInService({ email, password }: SignInDto) {
    let userData = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) throw new HttpException("user doesnt exist", 404);

    let passIsTrue = await bcrypt.compare(password, userData.password);

    if (passIsTrue) {
      return this.setJwt({
        id: userData.id,
        name: userData.name,
        email: userData.email,
      });
    } else {
      throw new HttpException("wrong pass", 401);
    }
  }
}
