import { Controller, Get, Query } from '@nestjs/common';

import { ActivityEventsService } from './activity-events.service';

@Controller('activity-events')
export class ActivityEventsController {
  constructor(private readonly activityEventsService: ActivityEventsService) {}

  @Get()
  findForUser(
    @Query('userId') userId: string,
    @Query('role') role?: 'client' | 'provider',
    @Query('limit') limit?: string
  ) {
    const parsedLimit = Number(limit);
    return this.activityEventsService.findForUser(
      userId,
      role,
      Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 20
    );
  }
}
