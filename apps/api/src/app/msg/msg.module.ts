import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { MsgController } from './msg.controller';
import { MsgService } from './msg.service';

@Module({
  controllers: [MsgController],
  providers: [MsgService, SupabaseService],
  exports: [MsgService],
})
export class MsgModule {}
