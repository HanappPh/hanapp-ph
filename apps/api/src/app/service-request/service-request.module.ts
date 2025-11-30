import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { ServiceRequestController } from './service-request.controller';
import { ServiceRequestService } from './service-request.service';

@Module({
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService, SupabaseService],
  exports: [ServiceRequestService],
})
export class ServiceRequestModule {}
