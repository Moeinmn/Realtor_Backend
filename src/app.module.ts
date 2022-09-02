import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HousesModule } from './houses/houses.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [HousesModule, UserModule, PrismaModule, HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
