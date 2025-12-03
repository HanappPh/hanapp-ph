// API client for job applications
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface JobApplication {
  id: string;
  service_request_id: string;
  provider_id: string;
  client_id: string;
  qualifications: string;
  experience: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}

export interface CreateJobApplicationDto {
  serviceRequestId: string;
  qualifications: string;
  experience: string;
}

// Create a job application
export const createJobApplication = async (
  data: CreateJobApplicationDto,
  providerId: string
): Promise<JobApplication> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Get auth token
    if (typeof window !== 'undefined') {
      try {
        const { supabase } = await import('../supabase/client');
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }
      } catch (error) {
        console.error('Failed to get auth token:', error);
      }
    }

    const response = await fetch(`${API_BASE_URL}/api/job-applications`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        serviceRequestId: data.serviceRequestId,
        qualifications: data.qualifications,
        experience: data.experience,
        providerId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create job application');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating job application:', error);
    throw error;
  }
};

// Fetch applications sent by provider
export const fetchSentApplications = async (
  providerId: string
): Promise<JobApplication[]> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (typeof window !== 'undefined') {
      try {
        const { supabase } = await import('../supabase/client');
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }
      } catch (error) {
        console.error('Failed to get auth token:', error);
      }
    }

    const response = await fetch(
      `${API_BASE_URL}/api/job-applications/sent?providerId=${providerId}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sent applications');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sent applications:', error);
    return [];
  }
};

// Fetch applications received by client
export const fetchReceivedApplications = async (
  clientId: string
): Promise<JobApplication[]> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (typeof window !== 'undefined') {
      try {
        const { supabase } = await import('../supabase/client');
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }
      } catch (error) {
        console.error('Failed to get auth token:', error);
      }
    }

    const response = await fetch(
      `${API_BASE_URL}/api/job-applications/received?clientId=${clientId}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch received applications');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching received applications:', error);
    return [];
  }
};
