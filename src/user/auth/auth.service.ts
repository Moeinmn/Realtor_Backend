import { ConflictException, Injectable } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./../dtos/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { UserType } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp({ name, email, password, phone }: SignUpDto) {
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

    let userJwt = jwt.sign(
      {
        id: creatredUser.id,
        name,
        email,
      },
      process.env.JWT_KEY || "moeinmoein"
    );

    return userJwt;
  }

  async signInService({ email, password }: SignInDto) {

    let hashedPass = await bcrypt.hash(password , 5)

    let userData = await this.prismaService.user.findUnique({
      where:{
        email
      }
    })
  }
}
