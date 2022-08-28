import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HousesModule } from './houses/houses.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [HousesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
