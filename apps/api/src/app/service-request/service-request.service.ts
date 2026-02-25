import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { CreateBookingDto } from './dto/create-booking.dto';
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

  async findAll(clientId?: string, providerId?: string) {
    const supabase = this.supabaseService.getClient();

    let query = supabase
      .from('service_requests')
      .select(`*`)
      .order('created_at', { ascending: false });

    if (clientId) {
      query = query.eq('client_id', clientId);
    }

    if (providerId) {
      query = query.eq('provider_id', providerId);
    }

    const { data, error } = await query;

    if (error) {
      throw new HttpException(
        `Failed to fetch service requests: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    // Fetch user data and listing data for each service request
    if (data && data.length > 0) {
      const clientIds = [...new Set(data.map(sr => sr.client_id))];
      const providerIds = [
        ...new Set(data.map(sr => sr.provider_id).filter(id => id)),
      ];

      const { data: clients } = await supabase
        .from('users')
        .select('id, full_name, email, avatar_url')
        .in('id', clientIds);

      const { data: providers } = await supabase
        .from('users')
        .select('id, full_name, email, avatar_url')
        .in('id', providerIds);

      // Fetch listing data for service requests that reference a listing
      const listingIds = [
        ...new Set(data.map(sr => sr.listing_id).filter(id => id)),
      ];
      const { data: listings } = await supabase
        .from('service_listings')
        .select('id, title')
        .in('id', listingIds);

      // Fetch service detail data for service requests that reference a service detail
      const serviceDetailIds = [
        ...new Set(data.map(sr => sr.service_detail_id).filter(id => id)),
      ];
      const { data: serviceDetails } = await supabase
        .from('service_listing_details')
        .select('id, title, description, rate')
        .in('id', serviceDetailIds);

      // Create maps for quick lookup
      const clientMap = new Map(clients?.map(u => [u.id, u]) || []);
      const providerMap = new Map(providers?.map(u => [u.id, u]) || []);
      const listingMap = new Map(listings?.map(l => [l.id, l]) || []);
      const serviceDetailMap = new Map(
        serviceDetails?.map(sd => [sd.id, sd]) || []
      );

      // Attach user data, listing data, and service detail data to each service request
      return data.map(request => ({
        ...request,
        users: clientMap.get(request.client_id) || null,
        provider: providerMap.get(request.provider_id) || null,
        listing: listingMap.get(request.listing_id) || null,
        service_detail: serviceDetailMap.get(request.service_detail_id) || null,
      }));
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

    const { data, error } = await supabase
      .from('service_requests')
      .delete()
      .eq('id', id);

    if (error || !data) {
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

  // Confirm a booking (provider or client accepts, moves to ongoing)
  async confirmBooking(id: string, userId: string, token?: string) {
    // Use service role client to bypass RLS for updates, but verify permissions first
    const userClient = token
      ? this.supabaseService.createUserClient(token)
      : this.supabaseService.getClient();
    const supabase = this.supabaseService.getClient();

    // First, try to find the service request by ID
    const { data: serviceRequest, error: fetchError } = await userClient
      .from('service_requests')
      .select('id, client_id, provider_id, booking_group_id')
      .eq('id', id)
      .single();

    // If not found by ID, try to find by booking_group_id (for grouped bookings)
    if (fetchError || !serviceRequest) {
      const { data: groupedRequests, error: groupError } = await userClient
        .from('service_requests')
        .select('id, client_id, provider_id, booking_group_id')
        .eq('booking_group_id', id)
        .limit(1);

      if (groupError || !groupedRequests || groupedRequests.length === 0) {
        throw new HttpException(
          'Service request not found',
          HttpStatus.NOT_FOUND
        );
      }

      // Use the first request to verify authorization and get booking_group_id
      const firstRequest = groupedRequests[0];

      // Allow both client and provider to confirm
      if (
        firstRequest.client_id !== userId &&
        firstRequest.provider_id !== userId
      ) {
        throw new HttpException(
          'You do not have permission to confirm this booking',
          HttpStatus.FORBIDDEN
        );
      }

      // Update all service requests in this booking group using service role
      const { data, error } = await supabase
        .from('service_requests')
        .update({
          status: 'approved',
          updated_at: new Date().toISOString(),
        })
        .eq('booking_group_id', id)
        .select();

      if (error) {
        console.error('Error updating booking group:', error);
        throw new HttpException(
          'Failed to confirm booking',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return data;
    }

    // Allow both client and provider to confirm
    if (
      serviceRequest.client_id !== userId &&
      serviceRequest.provider_id !== userId
    ) {
      throw new HttpException(
        'You do not have permission to confirm this booking',
        HttpStatus.FORBIDDEN
      );
    }

    // If this request has a booking_group_id, update all requests in the group
    if (serviceRequest.booking_group_id) {
      const { data, error } = await supabase
        .from('service_requests')
        .update({
          status: 'approved',
          updated_at: new Date().toISOString(),
        })
        .eq('booking_group_id', serviceRequest.booking_group_id)
        .select();

      if (error) {
        console.error('Error updating booking group:', error);
        throw new HttpException(
          'Failed to confirm booking',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return data;
    }

    // Update single service request (no booking group) using service role
    const { data, error } = await supabase
      .from('service_requests')
      .update({
        status: 'approved',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating single service request:', error);
      throw new HttpException(
        'Failed to confirm booking',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  // Finish a booking (provider marks service as complete, awaiting payment)
  async finishBooking(id: string, _providerId: string, _token?: string) {
    // Use service role client to bypass RLS
    const supabase = this.supabaseService.getClient();

    // Get the service request
    const { data: serviceRequest, error: fetchError } = await supabase
      .from('service_requests')
      .select('id, booking_group_id')
      .eq('id', id)
      .single();

    if (fetchError || !serviceRequest) {
      throw new HttpException(
        'Service request not found',
        HttpStatus.NOT_FOUND
      );
    }

    // If this request has a booking_group_id, update all requests in the group
    if (serviceRequest.booking_group_id) {
      const { data, error } = await supabase
        .from('service_requests')
        .update({
          is_provider_finished: true,
          updated_at: new Date().toISOString(),
        })
        .eq('booking_group_id', serviceRequest.booking_group_id)
        .select();

      if (error) {
        throw new HttpException(
          `Failed to finish booking: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return data;
    }

    // Mark single service request as finished by provider
    const { data, error } = await supabase
      .from('service_requests')
      .update({
        is_provider_finished: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new HttpException(
        `Failed to finish booking: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  // Complete a booking (client releases payment, moves to completed)
  async completeBooking(id: string, clientId: string, _token?: string) {
    // Use service role client to bypass RLS
    const supabase = this.supabaseService.getClient();

    // Verify the user is the client who owns this service request
    const { data: serviceRequest, error: fetchError } = await supabase
      .from('service_requests')
      .select('client_id, booking_group_id, is_provider_finished')
      .eq('id', id)
      .single();

    if (fetchError || !serviceRequest) {
      throw new HttpException(
        'Service request not found',
        HttpStatus.NOT_FOUND
      );
    }

    if (serviceRequest.client_id !== clientId) {
      throw new HttpException(
        'You do not have permission to complete this booking',
        HttpStatus.FORBIDDEN
      );
    }

    // Check if provider has marked as finished
    if (!serviceRequest.is_provider_finished) {
      throw new HttpException(
        'Provider must finish the job before payment can be released',
        HttpStatus.BAD_REQUEST
      );
    }

    // If this request has a booking_group_id, update all requests in the group
    if (serviceRequest.booking_group_id) {
      const { data, error } = await supabase
        .from('service_requests')
        .update({
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('booking_group_id', serviceRequest.booking_group_id)
        .select();

      if (error) {
        throw new HttpException(
          `Failed to complete booking: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return data;
    }

    // Update single service request status to 'completed'
    const { data, error } = await supabase
      .from('service_requests')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new HttpException(
        `Failed to complete booking: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  async createBooking(createBookingDto: CreateBookingDto, token: string) {
    const supabase = this.supabaseService.createUserClient(token);

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // Generate a booking_group_id to link all services in this booking
    const bookingGroupId = crypto.randomUUID();

    // Fetch service listing details to get title and category
    const { data: listing, error: listingError } = await supabase
      .from('service_listings')
      .select(
        `
        title,
        category_id,
        categories:category_id (
          id,
          name
        )
      `
      )
      .eq('id', createBookingDto.listingId)
      .single();

    if (listingError || !listing) {
      throw new HttpException(
        'Service listing not found',
        HttpStatus.NOT_FOUND
      );
    }

    // Map category UUID to integer ID for service_requests table
    // This is a temporary solution - ideally service_requests should use UUID
    // For now, we'll use a default category ID of 14 (Home Services)
    const categoryIdInteger = 14; // Default to Home Services category

    // Prepare service request rows for insertion
    const serviceRequestRows = createBookingDto.services.map(service => {
      const baseRow = {
        booking_group_id: bookingGroupId,
        client_id: user.id,
        provider_id: createBookingDto.providerId,
        listing_id: createBookingDto.listingId,
        category_id: categoryIdInteger,
        title: service.isCustom ? service.customServiceName : listing.title, // Use listing title for regular services
        description: service.isCustom
          ? service.customServiceDescription || ''
          : `Service from ${listing.title}`,
        rate: service.rate,
        contact: createBookingDto.contactInfo,
        job_location: createBookingDto.location,
        date: new Date(createBookingDto.scheduledDate)
          .toISOString()
          .split('T')[0], // Format as YYYY-MM-DD
        time: createBookingDto.scheduledTime,
        additional_requirements: createBookingDto.additionalNotes || '',
        status: 'pending',
        is_custom_service: service.isCustom,
      };

      // Add service_detail_id for regular services
      if (!service.isCustom && service.serviceDetailId) {
        return {
          ...baseRow,
          service_detail_id: service.serviceDetailId,
        };
      }

      // Add custom service fields
      if (service.isCustom) {
        return {
          ...baseRow,
          custom_service_name: service.customServiceName,
          custom_service_description: service.customServiceDescription,
        };
      }

      return baseRow;
    });

    // Insert all service requests
    const { data, error } = await supabase
      .from('service_requests')
      .insert(serviceRequestRows)
      .select();

    if (error) {
      throw new HttpException(
        `Failed to create booking: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return {
      success: true,
      bookingGroupId,
      message: 'Booking created successfully',
      services: data,
    };
  }
}
