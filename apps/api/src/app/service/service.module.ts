import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, SupabaseService],
  exports: [ServiceService],
})
export class ServiceModule {}
