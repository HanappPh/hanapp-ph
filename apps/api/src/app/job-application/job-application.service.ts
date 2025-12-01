import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@Injectable()
export class JobApplicationService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(
    createDto: CreateJobApplicationDto,
    providerId: string,
    token?: string
  ) {
    // Use service client for service request lookup to bypass RLS
    const serviceClient = this.supabaseService.getClient();

    // First, get the service request to find the client_id
    const { data: serviceRequest, error: fetchError } = await serviceClient
      .from('service_requests')
      .select('client_id')
      .eq('id', createDto.serviceRequestId)
      .maybeSingle();

    if (fetchError || !serviceRequest) {
      throw new HttpException(
        `Service request not found: ${fetchError?.message || 'No data'}`,
        HttpStatus.NOT_FOUND
      );
    }

    // Use user client for job application operations
    const supabase = token
      ? this.supabaseService.createUserClient(token)
      : serviceClient;

    // Check if provider already applied to this service request
    const { data: existingApplication } = await supabase
      .from('job_applications')
      .select('id')
      .eq('service_request_id', createDto.serviceRequestId)
      .eq('provider_id', providerId)
      .maybeSingle();

    if (existingApplication) {
      throw new HttpException(
        'You have already applied to this job',
        HttpStatus.CONFLICT
      );
    }

    // Create the job application
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        service_request_id: createDto.serviceRequestId,
        provider_id: providerId,
        client_id: serviceRequest.client_id,
        qualifications: createDto.qualifications,
        experience: createDto.experience,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      throw new HttpException(
        `Failed to create job application: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  // Get applications sent by a provider (for "sent" tab)
  async findByProvider(providerId: string) {
    // Use service client to bypass RLS restrictions on service_requests
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('job_applications')
      .select(
        `
        *,
        service_requests(
          id,
          title,
          description,
          rate,
          job_location,
          date,
          time,
          time_2,
          images,
          category_id,
          client_id,
          is_provider_finished
        )
      `
      )
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new HttpException(
        `Failed to fetch applications: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  // Get applications received by a client (for "received" tab)
  async findByClient(clientId: string) {
    // Use service client to bypass RLS restrictions on service_requests
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('job_applications')
      .select(
        `
        *,
        service_requests(
          id,
          title,
          description,
          rate,
          job_location,
          date,
          time,
          time_2,
          images,
          category_id,
          is_provider_finished
        )
      `
      )
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new HttpException(
        `Failed to fetch received applications: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  // Update application status (accept/reject)
  async updateStatus(
    applicationId: string,
    status: 'accepted' | 'rejected',
    userId: string,
    _token?: string
  ) {
    const supabase = this.supabaseService.getClient();

    // Verify the user is the client who owns the service request
    const { data: application, error: fetchError } = await supabase
      .from('job_applications')
      .select('client_id')
      .eq('id', applicationId)
      .single();

    if (fetchError || !application) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }

    if (application.client_id !== userId) {
      throw new HttpException(
        'You do not have permission to update this application',
        HttpStatus.FORBIDDEN
      );
    }

    const { data, error } = await supabase
      .from('job_applications')
      .update({ status })
      .eq('id', applicationId)
      .select()
      .single();

    if (error) {
      throw new HttpException(
        `Failed to update application: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }
}
