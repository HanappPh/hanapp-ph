import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ProfileMetricsService } from './profile-metrics.service';

@Controller('profile-metrics')
export class ProfileMetricsController {
  constructor(private readonly profileMetricsService: ProfileMetricsService) {}

  @Post('views')
  trackProfileView(
    @Body('providerId') providerId: string,
    @Body('viewerId') viewerId: string
  ) {
    return this.profileMetricsService.trackProfileView(providerId, viewerId);
  }

  @Get('provider/:providerId')
  getProviderMetrics(@Param('providerId') providerId: string) {
    return this.profileMetricsService.getProviderMetrics(providerId);
  }
}
