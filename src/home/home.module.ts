import { APP_INTERCEPTOR } from "@nestjs/core";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { PrismaModule } from './../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
controllers: [HomeController],
  providers: [
    HomeService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class HomeModule {}
