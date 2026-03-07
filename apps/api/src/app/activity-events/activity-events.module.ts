import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { ActivityEventsController } from './activity-events.controller';
import { ActivityEventsService } from './activity-events.service';

@Module({
  controllers: [ActivityEventsController],
  providers: [ActivityEventsService, SupabaseService],
  exports: [ActivityEventsService],
})
export class ActivityEventsModule {}
