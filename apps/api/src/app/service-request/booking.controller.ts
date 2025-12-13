import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateBookingDto } from './dto/create-booking.dto';
import { ServiceRequestService } from './service-request.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Headers('authorization') authHeader?: string
  ) {
    // Extract token from "Bearer <token>"
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    return this.serviceRequestService.createBooking(createBookingDto, token);
  }
}
