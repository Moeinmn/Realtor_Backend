import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PrismaService } from "./../../prisma/prisma.service";
import { UserType } from '@prisma/client';

import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext) {

    const roles : UserType = this.reflector.getAllAndOverride("roles", [
      context.getClass(),
      context.getHandler(),
    ]);

    if ( !roles.length ) 
        return true;

    let req = context.switchToHttp().getRequest();

    const token = req?.headers.authorization?.splite('Beader ')[1]

    const tokenData = jwt.verify( token , process.env.JWT_KEY) as jwt.JwtPayload

    if (roles.includes(tokenData.userType))
        return true
    
        return false

  }
}
