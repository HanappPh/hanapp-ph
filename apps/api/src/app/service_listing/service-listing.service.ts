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
        price_to: createDto.priceTo,
        currency: createDto.currency,
        availability_schedule: createDto.availabilitySchedule,
        service_areas: createDto.serviceAreas,
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
  async findAll(providerId?: string) {
    const supabase = this.supabaseService.getClient();
    let query = supabase
      .from('service_listings')
      .select(`*`)
      .order('created_at', { ascending: false });
    if (providerId) {
      query = query.eq('provider_id', providerId);
    }
    const { data, error } = await query;
    if (error) {
      throw new HttpException(
        `Failed to fetch service listings: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
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
