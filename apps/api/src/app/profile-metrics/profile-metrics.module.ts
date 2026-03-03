import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { ProfileMetricsController } from './profile-metrics.controller';
import { ProfileMetricsService } from './profile-metrics.service';

@Module({
  controllers: [ProfileMetricsController],
  providers: [ProfileMetricsService, SupabaseService],
  exports: [ProfileMetricsService],
})
export class ProfileMetricsModule {}
