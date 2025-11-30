import { Module } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';

@Module({
  controllers: [JobApplicationController],
  providers: [JobApplicationService, SupabaseService],
  exports: [JobApplicationService],
})
export class JobApplicationModule {}
