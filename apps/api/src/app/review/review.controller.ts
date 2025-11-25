import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import type { User } from '@supabase/supabase-js';

import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { ReviewsService } from './review.service';

@ApiTags('Reviews')
@Controller('reviews')
@UseGuards(AuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // ===============================
  // CREATE REVIEW
  // ===============================
  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiOperation({ summary: 'Create a new review (requires authentication)' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
  })
  async createReview(@Body() dto: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewsService.createReview(dto, user.id);
  }

  // ===============================
  // UPDATE REVIEW
  // ===============================
  @ApiBearerAuth('JWT-auth')
  @Patch(':reviewId')
  @ApiOperation({
    summary: 'Update an existing review (requires authentication)',
  })
  @ApiParam({ name: 'reviewId', description: 'Review ID' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({
    status: 200,
    description: 'Review updated successfully',
  })
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() dto: UpdateReviewDto,
    @CurrentUser() user: User
  ) {
    return this.reviewsService.updateReview(reviewId, dto, user.id);
  }

  // ===============================
  // DELETE REVIEW
  // ===============================
  @ApiBearerAuth('JWT-auth')
  @Post(':reviewId/delete')
  @ApiOperation({
    summary: 'Delete an existing review (requires authentication)',
  })
  @ApiParam({ name: 'reviewId', description: 'Review ID' })
  @ApiResponse({
    status: 200,
    description: 'Review deleted successfully',
  })
  async deleteReview(
    @Param('reviewId') reviewId: string,
    @CurrentUser() user: User
  ) {
    return this.reviewsService.deleteReview(reviewId, user.id);
  }

  // ===============================
  // GET REVIEWS BY SERVICE ID
  // ===============================
  @Get('service/:serviceId')
  @ApiOperation({ summary: 'Get reviews by service ID (public)' })
  @ApiResponse({
    status: 200,
    description: 'Reviews retrieved successfully',
  })
  async getReviewsByServiceId(@Param('serviceId') serviceId: string) {
    return this.reviewsService.getReviewsByServiceId(serviceId);
  }

  // ===============================
  // GET REVIEWS BY PROVIDER ID
  // ===============================
  @Get('provider/:providerId') // temp route
  @ApiOperation({ summary: 'Get reviews by provider ID (public)' })
  @ApiResponse({
    status: 200,
    description: 'Reviews retrieved successfully',
  })
  async getReviewsByProviderId(@Param('providerId') providerId: string) {
    return this.reviewsService.getReviewsByServiceId(providerId);
  }
}
