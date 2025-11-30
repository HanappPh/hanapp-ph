import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  Headers,
  Query,
} from '@nestjs/common';

import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { JobApplicationService } from './job-application.service';

@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateJobApplicationDto,
    @Headers('authorization') authHeader?: string
  ) {
    const token = authHeader?.replace('Bearer ', '');
    return this.jobApplicationService.create(
      createDto,
      createDto.providerId,
      token
    );
  }

  @Get('sent')
  findByProvider(@Query('providerId') providerId: string) {
    return this.jobApplicationService.findByProvider(providerId);
  }

  @Get('received')
  findByClient(@Query('clientId') clientId: string) {
    return this.jobApplicationService.findByClient(clientId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'accepted' | 'rejected',
    @Body('userId') userId: string,
    @Headers('authorization') authHeader?: string
  ) {
    const token = authHeader?.replace('Bearer ', '');
    return this.jobApplicationService.updateStatus(id, status, userId, token);
  }
}
