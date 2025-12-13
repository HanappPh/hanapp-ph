import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly supabaseService: SupabaseService) {}
  // ======================================================
  // CHECK IF USER IS THE CLIENT OF THAT BOOKING
  // ======================================================
  private async validateBookingOwner(bookingId: string, userId: string) {
    const { data, error } = await this.supabaseService
      .from('bookings')
      .select('client_id')
      .eq('id', bookingId)
      .single();

    if (error || !data) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }

    if (data.client_id !== userId) {
      throw new HttpException(
        'Only the client who made the booking can create or modify the review',
        HttpStatus.FORBIDDEN
      );
    }
  }

  // ======================================================
  // CHECK IF USER IS AUTHOR OF REVIEW
  // ======================================================
  private async validateReviewOwner(reviewId: string, userId: string) {
    const { data, error } = await this.supabaseService
      .from('reviews')
      .select('client_id')
      .eq('id', reviewId)
      .single();

    if (error || !data) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }

    if (data.client_id !== userId) {
      throw new HttpException(
        'You are not the owner of this review',
        HttpStatus.FORBIDDEN
      );
    }
  }
  // ======================================
  // CREATE REVIEW
  // ======================================
  async createReview(dto: CreateReviewDto, userId: string) {
    // Validate that at least one identifier is provided
    if (!dto.booking_id && !dto.service_listing_id && !dto.service_request_id) {
      throw new HttpException(
        'Either booking_id, service_listing_id, or service_request_id must be provided',
        HttpStatus.BAD_REQUEST
      );
    }

    let providerId: string;
    let serviceId: string | null = null;
    let serviceListingId: string | null = null;
    let serviceRequestId: string | null = null;

    // Handle service request-based review (from bookings page)
    if (dto.service_request_id) {
      // Get provider_id and category from service_request
      const { data: serviceRequest, error: requestError } =
        await this.supabaseService
          .from('service_requests')
          .select('provider_id, category_id, client_id, status')
          .eq('id', dto.service_request_id)
          .maybeSingle();

      if (requestError) {
        console.error('Service request query error:', requestError);
        throw new HttpException(
          `Error querying service request: ${requestError.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      // If service request doesn't exist, allow review directly with provider_id
      if (!serviceRequest) {
        console.log('Service request not found, using provider_id from DTO');

        if (!dto.provider_id) {
          throw new HttpException(
            'Service request not found and no provider_id provided',
            HttpStatus.BAD_REQUEST
          );
        }

        // Use provider_id directly from DTO
        providerId = dto.provider_id;
        // Don't set serviceRequestId to avoid foreign key constraint violation
        serviceRequestId = null;
      } else {
        // Verify the user is the client who made the request
        if (serviceRequest.client_id !== userId) {
          throw new HttpException(
            'You can only review services you have booked',
            HttpStatus.FORBIDDEN
          );
        }

        // Use provider_id from DTO if provided, otherwise from service request
        providerId = dto.provider_id || serviceRequest.provider_id;

        if (!providerId) {
          throw new HttpException(
            'Provider not found for this service request',
            HttpStatus.NOT_FOUND
          );
        }

        serviceRequestId = dto.service_request_id;

        // Try to find a matching service listing from the provider for this category
        const { data: listing } = await this.supabaseService
          .from('service_listings')
          .select('id')
          .eq('provider_id', providerId)
          .eq('category_id', serviceRequest.category_id)
          .maybeSingle();

        // If we find a matching listing, attach the review to it
        if (listing) {
          serviceListingId = listing.id;
        }
      }
    }
    // Handle booking-based review
    else if (dto.booking_id) {
      // Validate booking ownership
      await this.validateBookingOwner(dto.booking_id, userId);

      // Get service_id and provider_id from booking
      const { data: booking, error: bookingError } = await this.supabaseService
        .from('bookings')
        .select('service_id, provider_id')
        .eq('id', dto.booking_id)
        .single();

      if (bookingError || !booking) {
        throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
      }

      providerId = booking.provider_id;
      serviceId = booking.service_id;
    }
    // Handle service listing-based review
    else if (dto.service_listing_id) {
      // Get provider_id from service_listing
      const { data: listing, error: listingError } = await this.supabaseService
        .from('service_listings')
        .select('provider_id')
        .eq('id', dto.service_listing_id)
        .single();

      if (listingError || !listing) {
        throw new HttpException(
          'Service listing not found',
          HttpStatus.NOT_FOUND
        );
      }

      providerId = listing.provider_id;
      serviceListingId = dto.service_listing_id;
    } else {
      throw new HttpException('Invalid review data', HttpStatus.BAD_REQUEST);
    }

    const { data, error } = await this.supabaseService
      .from('reviews')
      .insert({
        booking_id: dto.booking_id ?? null,
        service_listing_id: serviceListingId,
        service_id: serviceId,
        service_request_id: serviceRequestId,
        provider_id: providerId,
        client_id: userId,
        rating: dto.rating,
        comment: dto.comment ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new HttpException(
        `Failed to create review: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      success: true,
      message: 'Review created successfully',
      review: data,
    };
  }

  // ======================================
  // UPDATE REVIEW
  // ======================================
  async updateReview(reviewId: string, dto: UpdateReviewDto, userId: string) {
    // Validate review ownership
    await this.validateReviewOwner(reviewId, userId);
    const { data, error } = await this.supabaseService
      .from('reviews')
      .update({
        ...dto,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reviewId)
      .select()
      .single();

    if (error) {
      throw new HttpException(
        `Failed to update review`,
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      success: true,
      message: 'Review updated successfully',
      review: data,
    };
  }

  // ======================================
  // UPDATE REVIEW
  // ======================================
  async deleteReview(reviewId: string, userId: string) {
    // Validate review ownership
    await this.validateReviewOwner(reviewId, userId);
    const { error } = await this.supabaseService
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      throw new HttpException(
        `Failed to delete review`,
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      success: true,
      message: 'Review deleted successfully',
    };
  }

  // ======================================
  // GET REVIEWS BY SERVICE ID
  // ======================================
  async getReviewsByServiceId(serviceId: string) {
    const { data, error } = await this.supabaseService
      .from('reviews')
      .select('*')
      .eq('service_id', serviceId)
      .order('created_at', { ascending: false }); // newest first

    if (error) {
      throw new HttpException(
        `Failed to fetch reviews: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      success: true,
      reviews: data,
    };
  }

  // ======================================
  // GET REVIEWS BY PROVIDER ID
  // ======================================
  async getReviewsByProviderId(providerId: string) {
    const { data, error } = await this.supabaseService
      .from('reviews')
      .select(
        `
        *,
        client:client_id (
          full_name,
          avatar_url
        )
      `
      )
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false }); // newest first

    if (error) {
      throw new HttpException(
        `Failed to fetch reviews: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      success: true,
      reviews: data,
    };
  }

  // ======================================
  // GET REVIEWS BY SERVICE LISTING ID
  // ======================================
  async getReviewsByServiceListingId(serviceListingId: string) {
    const { data, error } = await this.supabaseService
      .from('reviews')
      .select(
        `
        *,
        client:client_id (
          full_name,
          avatar_url
        )
      `
      )
      .eq('service_listing_id', serviceListingId)
      .order('created_at', { ascending: false }); // newest first

    if (error) {
      throw new HttpException(
        `Failed to fetch reviews: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      success: true,
      reviews: data,
    };
  }
}
