import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Headers,
  Delete,
} from '@nestjs/common';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateServiceDto,
    @Body('providerId') providerId: string,
    @Headers('authorization') authHeader?: string
  ) {
    // Extract token from "Bearer <token>"
    const token = authHeader?.replace('Bearer ', '');
    return this.serviceService.create(createDto, providerId, token);
  }
  @Get()
  findAll(@Query('listingId') listingId?: string) {
    return this.serviceService.findAll(listingId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
