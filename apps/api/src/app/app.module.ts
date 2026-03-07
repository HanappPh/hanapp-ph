import { Module } from '@nestjs/common';

import { ActivityEventsModule } from './activity-events/activity-events.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobApplicationModule } from './job-application/job-application.module';
import { MsgModule } from './msg/msg.module';
import { ProfileMetricsModule } from './profile-metrics/profile-metrics.module';
import { ReviewsModule } from './review/review.module';
import { ServiceModule } from './service/service.module';
import { ServiceRequestModule } from './service-request/service-request.module';
import { ServiceListingModule } from './service_listing/service-listing.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    MsgModule,
    ServiceRequestModule,
    ServiceListingModule,
    ServiceModule,
    ReviewsModule,
    JobApplicationModule, // Job application management
    ProfileMetricsModule,
    ActivityEventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
