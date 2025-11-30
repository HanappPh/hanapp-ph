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

import { Public } from '../guards/auth.guard';

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
  @Public()
  findAll(
    @Query('providerId') providerId?: string,
    @Query('excludeProviderId') excludeProviderId?: string
  ) {
    return this.serviceListingService.findAll(providerId, excludeProviderId);
  }

  @Get('category/:categoryId')
  findByCategory(@Query('categoryId') categoryId: string) {
    return this.serviceListingService.findByCategory(categoryId);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.serviceListingService.findOne(id);
  }

  @Get(':id/details')
  @Public()
  findOneWithDetails(@Param('id') id: string) {
    return this.serviceListingService.findOneWithDetails(id);
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
