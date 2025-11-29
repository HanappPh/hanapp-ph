import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { ServiceListingController } from './service-listing.controller';
import { ServiceListingService } from './service-listing.service';

@Module({
  controllers: [ServiceListingController],
  providers: [ServiceListingService, SupabaseService],
  exports: [ServiceListingService],
})
export class ServiceListingModule {}
