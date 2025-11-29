import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly supabaseService: SupabaseService) {}
  async create(createDto: CreateServiceDto, listingId: string, token?: string) {
    const supabase = token
      ? this.supabaseService.createUserClient(token)
      : this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('services')
      .insert({
        title: createDto.title,
        description: createDto.description,
        rate: createDto.rate,
        currency: createDto.currency,
        listing_id: listingId,
      })
      .select()
      .single();
    if (error) {
      throw new HttpException(
        `Failed to create service: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return data;
  }

  async findAll(listingId?: string) {
    const supabase = this.supabaseService.getClient();

    let query = supabase
      .from('services')
      .select(`*`)
      .order('created_at', { ascending: false });
    if (listingId) {
      query = query.eq('listing_id', listingId);
    }
    const { data, error } = await query;
    if (error) {
      throw new HttpException(
        `Failed to fetch services: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return data;
  }

  async findOne(id: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('services')
      .select(`*`)
      .eq('id', id)
      .single();
    if (error) {
      throw new HttpException(
        `Failed to fetch service: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return data;
  }
  async update(id: string, updateDto: UpdateServiceDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('services')
      .update(updateDto)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      throw new HttpException(
        `Failed to update service: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } else if (!data) {
      throw new HttpException(`Service not found`, HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async remove(id: string) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      throw new HttpException(
        `Failed to delete service: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return { message: 'Service deleted successfully' };
  }
}
