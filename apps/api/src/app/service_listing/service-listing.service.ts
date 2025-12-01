import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { CreateServiceListingDto } from './dto/create-service-listing.dto';
import { UpdateServiceListingDto } from './dto/update-service-listing.dto';

@Injectable()
export class ServiceListingService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // create listing
  async create(
    createDto: CreateServiceListingDto,
    providerId: string,
    token?: string
  ) {
    const supabase = token
      ? this.supabaseService.createUserClient(token)
      : this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('service_listings')
      .insert({
        provider_id: providerId,
        title: createDto.title,
        description: createDto.description,
        category_id: createDto.categoryId,
        price_from: createDto.priceFrom,
        availability_schedule: createDto.availabilitySchedule,
        service_areas: createDto.serviceAreas,
        images: createDto.images || [],
      })
      .select()
      .single();
    if (error) {
      throw new HttpException(
        `Failed to create service listing: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return data;
  }
  // find all listings
  async findAll(providerId?: string, excludeProviderId?: string) {
    const supabase = this.supabaseService.getClient();
    let query = supabase
      .from('service_listings')
      .select(`*`)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (providerId) {
      query = query.eq('provider_id', providerId);
    }
    if (excludeProviderId) {
      query = query.neq('provider_id', excludeProviderId);
    }
    const { data, error } = await query;
    if (error) {
      throw new HttpException(
        `Failed to fetch service listings: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    // Fetch provider and category information for each listing
    if (data && data.length > 0) {
      const providerIds = [
        ...new Set(data.map(listing => listing.provider_id)),
      ];
      const categoryIds = [
        ...new Set(data.map(listing => listing.category_id)),
      ];
      const listingIds = data.map(listing => listing.id);

      const { data: providers } = await supabase
        .from('users')
        .select('id, full_name, avatar_url')
        .in('id', providerIds);

      const { data: categories } = await supabase
        .from('categories')
        .select('id, name')
        .in('id', categoryIds);

      // Fetch ratings for all listings
      const { data: ratings } = await supabase
        .from('service_listing_ratings')
        .select('*')
        .in('service_listing_id', listingIds);

      // Create maps for quick lookup
      const providerMap = new Map(providers?.map(p => [p.id, p]) || []);
      const categoryMap = new Map(categories?.map(c => [c.id, c]) || []);
      const ratingsMap = new Map(
        ratings?.map(r => [r.service_listing_id, r]) || []
      );

      // Attach provider, category, and rating data to each listing
      return data.map(listing => ({
        ...listing,
        provider: providerMap.get(listing.provider_id) || null,
        category: categoryMap.get(listing.category_id) || null,
        rating: ratingsMap.get(listing.id)?.average_rating || 0,
        review_count: ratingsMap.get(listing.id)?.review_count || 0,
      }));
    }

    return data;
  }
  // find by id
  async findOne(listingId: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('service_listings')
      .select('*')
      .eq('id', listingId)
      .single();
    if (error) {
      throw new HttpException(
        `Failed to fetch service listing: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return data;
  }

  // find by id with full details (listing + services + provider + category)
  async findOneWithDetails(listingId: string) {
    const supabase = this.supabaseService.getClient();

    // Fetch the listing with provider and category data
    const { data: listing, error: listingError } = await supabase
      .from('service_listings')
      .select('*')
      .eq('id', listingId)
      .single();

    if (listingError || !listing) {
      throw new HttpException(
        `Failed to fetch service listing: ${listingError?.message}`,
        HttpStatus.NOT_FOUND
      );
    }

    // Fetch provider info
    const { data: provider } = await supabase
      .from('users')
      .select('id, full_name, avatar_url, email, phone, created_at')
      .eq('id', listing.provider_id)
      .single();

    // Fetch category info
    const { data: category } = await supabase
      .from('categories')
      .select('id, name')
      .eq('id', listing.category_id)
      .single();

    // Fetch all services for this listing
    const { data: services } = await supabase
      .from('service_listing_details')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: true });

    // Fetch rating information for this listing
    const { data: ratingData } = await supabase
      .from('service_listing_ratings')
      .select('*')
      .eq('service_listing_id', listingId)
      .single();

    // Return combined data
    return {
      ...listing,
      provider: provider || null,
      category: category || null,
      services: services || [],
      rating: ratingData?.average_rating || 0,
      review_count: ratingData?.review_count || 0,
    };
  }

  // update listing
  async update(listingId: string, updateDto: UpdateServiceListingDto) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('service_listings')
      .update(updateDto)
      .eq('id', listingId)
      .select()
      .single();
    if (error) {
      throw new HttpException(
        `Failed to update service listing: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return data;
  }

  // delete listing
  async remove(listingId: string) {
    const supabase = this.supabaseService.getClient();
    const { error } = await supabase
      .from('service_listings')
      .delete()
      .eq('id', listingId);
    if (error) {
      throw new HttpException(
        `Failed to delete service listing: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return { message: 'Service listing deleted successfully' };
  }

  // find by category
  async findByCategory(categoryId: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('service_listings')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });
    if (error) {
      throw new HttpException(
        `Failed to fetch service listings: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return data;
  }
}
