import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { ReviewsController } from './review.controller';
import { ReviewsService } from './review.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, SupabaseService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
