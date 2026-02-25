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
      const listingIds = data.map(listing => listing.id);

      const { data: providers } = await supabase
        .from('users')
        .select('id, full_name, avatar_url')
        .in('id', providerIds);

      // Category mapping for integer IDs (1-17)
      const categoryNames: Record<number, string> = {
        1: 'Laundry',
        2: 'Transportation',
        3: 'Babysitting',
        4: 'Errands',
        5: 'Pet Care',
        6: 'Catering',
        7: 'Construction',
        8: 'Plumbing',
        9: 'Auto Repair',
        10: 'Tech Support',
        11: 'Gardening',
        12: 'Legal',
        13: 'Painting',
        14: 'Home Services',
        15: 'Electrical',
        16: 'Moving',
        17: 'Professional Services',
      };

      // Fetch ratings for all listings
      const { data: ratings } = await supabase
        .from('service_listing_ratings')
        .select('*')
        .in('service_listing_id', listingIds);

      // Fetch service details to calculate minimum price for each listing
      const { data: serviceDetails } = await supabase
        .from('service_listing_details')
        .select('listing_id, title, rate')
        .in('listing_id', listingIds);

      // Create a map of listing_id to minimum service rate and service names
      const minPriceMap = new Map<string, number>();
      const serviceNamesMap = new Map<string, string[]>();
      if (serviceDetails) {
        serviceDetails.forEach(service => {
          // Track minimum price
          const currentMin = minPriceMap.get(service.listing_id);
          if (!currentMin || service.rate < currentMin) {
            minPriceMap.set(service.listing_id, service.rate);
          }
          // Track service names
          const existingNames = serviceNamesMap.get(service.listing_id) || [];
          serviceNamesMap.set(service.listing_id, [
            ...existingNames,
            service.title,
          ]);
        });
      }

      // Create maps for quick lookup
      const providerMap = new Map(providers?.map(p => [p.id, p]) || []);
      const ratingsMap = new Map(
        ratings?.map(r => [r.service_listing_id, r]) || []
      );

      // Attach provider, category, rating data, calculated minimum price, and service names to each listing
      return data.map(listing => ({
        ...listing,
        provider: providerMap.get(listing.provider_id) || null,
        category: {
          id: listing.category_id,
          name: categoryNames[listing.category_id] || 'Other',
        },
        rating: ratingsMap.get(listing.id)?.average_rating || 0,
        review_count: ratingsMap.get(listing.id)?.review_count || 0,
        price_from: listing.price_from || minPriceMap.get(listing.id) || null,
        service_names: serviceNamesMap.get(listing.id) || [],
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

    // Map category ID to name (integer IDs 1-17)
    const categoryNames: Record<number, string> = {
      1: 'Laundry',
      2: 'Transportation',
      3: 'Babysitting',
      4: 'Errands',
      5: 'Pet Care',
      6: 'Catering',
      7: 'Construction',
      8: 'Plumbing',
      9: 'Auto Repair',
      10: 'Tech Support',
      11: 'Gardening',
      12: 'Legal',
      13: 'Painting',
      14: 'Home Services',
      15: 'Electrical',
      16: 'Moving',
      17: 'Professional Services',
    };
    const category = {
      id: listing.category_id,
      name: categoryNames[listing.category_id] || 'Other',
    };

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
