import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { BookingController } from './booking.controller';
import { ServiceRequestController } from './service-request.controller';
import { ServiceRequestService } from './service-request.service';

@Module({
  controllers: [ServiceRequestController, BookingController],
  providers: [ServiceRequestService, SupabaseService],
  exports: [ServiceRequestService],
})
export class ServiceRequestModule {}
