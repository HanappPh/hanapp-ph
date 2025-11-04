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
    // If token provided, create authenticated client; otherwise use regular client
    const supabase = token
      ? this.supabaseService.createUserClient(token)
      : this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('service_requests')
      .insert({
        client_id: clientId, // User ID from auth
        category_id: createDto.categoryId, // 1=Cleaning, 2=Tutoring, 3=Repair, 4=Delivery
        title: createDto.title,
        description: createDto.description,
        additional_requirements: createDto.additional_requirements,
        rate: createDto.rate,
        contact: createDto.contact,
        contact_link: createDto.contactLink,
        job_location: createDto.jobLocation,
        date: createDto.jobDate,
        time: createDto.jobTime,
        time_2: createDto.jobTime2,
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

    // Fetch user profile data
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('full_name, email, phone, avatar_url, created_at')
      .eq('id', data.client_id)
      .single();

    // Also fetch from users table as fallback
    const { data: userData } = await supabase
      .from('users')
      .select('full_name, email, created_at')
      .eq('id', data.client_id)
      .single();

    // Combine data, prioritizing profiles over users table
    const combinedUserData = {
      full_name: userProfile?.full_name || userData?.full_name || null,
      email: userProfile?.email || userData?.email || null,
      phone: userProfile?.phone || null,
      avatar_url: userProfile?.avatar_url || null,
      created_at: userProfile?.created_at || userData?.created_at || null,
    };

    return {
      ...data,
      users: combinedUserData,
    };
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

  async findForJobListings() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new HttpException(
        `Failed to fetch service requests: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  async findPublicJobListings() {
    // Use regular client for public job listings
    const supabase = this.supabaseService.getClient();

    // Fetch service requests
    const { data: serviceRequests, error: serviceRequestsError } =
      await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

    if (serviceRequestsError) {
      throw new HttpException(
        `Failed to fetch service requests: ${serviceRequestsError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    // Get unique client IDs
    const clientIds = [...new Set(serviceRequests.map(sr => sr.client_id))];

    // Fetch user profile data for all clients
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, avatar_url, created_at')
      .in('id', clientIds);

    // Fetch user data from users table as fallback
    const { data: users } = await supabase
      .from('users')
      .select('id, full_name, email, created_at')
      .in('id', clientIds);

    // Create maps for both data sources
    const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
    const userMap = new Map(users?.map(u => [u.id, u]) || []);

    // Combine the data
    const result = serviceRequests.map(sr => {
      const profile = profileMap.get(sr.client_id);
      const user = userMap.get(sr.client_id);

      return {
        ...sr,
        users: {
          full_name: profile?.full_name || user?.full_name || null,
          email: profile?.email || user?.email || null,
          phone: profile?.phone || null,
          avatar_url: profile?.avatar_url || null,
          created_at: profile?.created_at || user?.created_at || null,
        },
      };
    });

    return result;
  }
}
