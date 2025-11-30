import { Module } from '@nestjs/common';

import { MsgModule } from '../msg/msg.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceRequestModule } from './service-request/service-request.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, MsgModule, ServiceRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
