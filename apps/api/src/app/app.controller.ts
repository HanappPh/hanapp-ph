import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { AppDataResponseDto, HealthResponseDto } from './dto/app.dto';
import { Public } from './guards/auth.guard';

@ApiTags('hanapp')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get application data' })
  @ApiOkResponse({
    description: 'Successfully retrieved application data',
    type: AppDataResponseDto,
  })
  getData(): AppDataResponseDto {
    return this.appService.getData();
  }

  @Public()
  @Get('health')
  @ApiTags('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiOkResponse({
    description: 'Health check successful',
    type: HealthResponseDto,
  })
  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
