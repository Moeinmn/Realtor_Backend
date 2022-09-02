import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService , {
    provide : APP_INTERCEPTOR,
    useClass : ClassSerializerInterceptor
  }]
})
export class HomeModule {}
