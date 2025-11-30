import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Headers,
  Patch,
  Param,
  Query,
} from '@nestjs/common';

import { CreateServiceListingDto } from './dto/create-service-listing.dto';
import { UpdateServiceListingDto } from './dto/update-service-listing.dto';
import { ServiceListingService } from './service-listing.service';
@Controller('service-listings')
export class ServiceListingController {
  constructor(private readonly serviceListingService: ServiceListingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateServiceListingDto,
    @Body('providerId') providerId: string,
    @Headers('authorization') authHeader?: string
  ) {
    // Extract token from "Bearer <token>"
    const token = authHeader?.replace('Bearer ', '');
    return this.serviceListingService.create(createDto, providerId, token);
  }

  @Get()
  findAll(@Query('providerId') providerId?: string) {
    return this.serviceListingService.findAll(providerId);
  }

  @Get('category/:categoryId')
  findByCategory(@Query('categoryId') categoryId: string) {
    return this.serviceListingService.findByCategory(categoryId);
  }

  @Get(':id')
  findOne(@Query('id') id: string) {
    return this.serviceListingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceListingDto) {
    return this.serviceListingService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.serviceListingService.remove(id);
  }
}
