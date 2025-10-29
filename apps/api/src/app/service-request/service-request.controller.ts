import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';

import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { ServiceRequestService } from './service-request.service';

@Controller('service-requests')
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateServiceRequestDto,
    @Body('clientId') clientId: string,
    @Headers('authorization') authHeader?: string
  ) {
    // Extract token from "Bearer <token>"
    const token = authHeader?.replace('Bearer ', '');
    return this.serviceRequestService.create(createDto, clientId, token);
  }

  @Get()
  findAll(@Query('clientId') clientId?: string) {
    return this.serviceRequestService.findAll(clientId);
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.serviceRequestService.findByCategory(categoryId);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.serviceRequestService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceRequestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceRequestDto) {
    return this.serviceRequestService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.serviceRequestService.remove(id);
  }
}
