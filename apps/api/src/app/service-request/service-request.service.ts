import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';

@Injectable()
export class ServiceRequestService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(
    createDto: CreateServiceRequestDto,
    clientId: string,
    token?: string
  ) {
    // If token provided, create authenticated client; otherwise use admin client
    let supabase;
    if (token) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const { createClient } = await import('@supabase/supabase-js');
      supabase = createClient(supabaseUrl!, supabaseKey!, {
        global: { headers: { Authorization: `Bearer ${token}` } },
      });
    } else {
      supabase = this.supabaseService.getAdminClient();
    }

    const { data, error } = await supabase
      .from('service_requests')
      .insert({
        client_id: clientId, // User ID from auth
        category_id: createDto.categoryId, // Now a number: 1, 2, 3, or 4
        title: createDto.title,
        description: createDto.description,
        rate: createDto.rate,
        contact: createDto.contact,
        contact_link: createDto.contactLink,
        job_location: createDto.jobLocation,
        date: createDto.jobDate,
        time: createDto.jobTime,
        images: createDto.images || [],
      })
      .select()
      .single();

    if (error) {
      throw new HttpException(
        `Failed to create service request: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  async findAll(clientId?: string) {
    const supabase = this.supabaseService.getClient();

    let query = supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (clientId) {
      query = query.eq('client_id', clientId);
    }

    const { data, error } = await query;

    if (error) {
      throw new HttpException(
        `Failed to fetch service requests: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  async findOne(id: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new HttpException(
        'Service request not found',
        HttpStatus.NOT_FOUND
      );
    }

    return data;
  }

  async update(id: string, updateDto: UpdateServiceRequestDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('service_requests')
      .update(updateDto)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new HttpException(
        'Service request not found',
        HttpStatus.NOT_FOUND
      );
    }

    return data;
  }

  async remove(id: string) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase
      .from('service_requests')
      .delete()
      .eq('id', id);

    if (error) {
      throw new HttpException(
        'Service request not found',
        HttpStatus.NOT_FOUND
      );
    }

    return { message: 'Service request deleted successfully' };
  }

  async findByCategory(categoryId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new HttpException(
        `Failed to fetch service requests: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  async findByStatus(status: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      throw new HttpException(
        `Failed to fetch service requests: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }
}
