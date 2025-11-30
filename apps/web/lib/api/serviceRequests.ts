// API client for service requests
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client side - use the current host but point to port 3001
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:3001/api`;
  }
  // Server side or fallback
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
};

const API_BASE_URL = getApiBaseUrl();

export interface ServiceRequest {
  id: string;
  client_id: string;
  category_id: number; // 1-17: See getCategoryName() for mapping
  title: string;
  description: string;
  additional_requirements?: string;
  rate: number;
  contact: string;
  contact_link?: string;
  job_location: string;
  date: string;
  time: string;
  time_2?: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  created_at: string;
  updated_at: string;
  users?: {
    full_name: string;
    email?: string;
    phone?: string;
    avatar_url?: string;
    created_at?: string;
  };
}

export interface JobListing {
  id: string;
  image: string;
  title: string;
  provider: string;
  location: string;
  rating: number;
  category: string;
  price: string;
}

// Category mapping
const getCategoryName = (categoryId: number): string => {
  const categoryNames = {
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
  return categoryNames[categoryId as keyof typeof categoryNames] || 'Other';
};

// Map service request to job listing format
export const mapServiceRequestToJobListing = (
  serviceRequest: ServiceRequest
): JobListing => {
  // Get first image if available, otherwise use default
  const firstImage =
    serviceRequest.images && serviceRequest.images.length > 0
      ? serviceRequest.images[0]
      : '/cleaning-service-provider.jpg';

  return {
    id: serviceRequest.id,
    image: firstImage,
    title: serviceRequest.title,
    provider: serviceRequest.users?.full_name || 'Unknown User',
    location: serviceRequest.job_location,
    rating: 4.5, // Default rating since we don't have ratings yet
    category: getCategoryName(serviceRequest.category_id),
    price: `₱${serviceRequest.rate.toLocaleString()}`,
  };
};

export const fetchServiceRequestsForJobListings = async (): Promise<
  JobListing[]
> => {
  try {
    const fullUrl = `${API_BASE_URL}/service-requests/public/job-listings`;

    // Get auth token from Supabase if user is logged in
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Only add auth token if we're in the browser
    if (typeof window !== 'undefined') {
      try {
        // Import supabase dynamically to avoid SSR issues
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

    const response = await fetch(fullUrl, { headers });
    if (!response.ok) {
      throw new Error('Failed to fetch service requests');
    }

    const serviceRequests: ServiceRequest[] = await response.json();
    return serviceRequests.map(mapServiceRequestToJobListing);
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return [];
  }
};

// Fetch a single service request by ID
export const fetchServiceRequestById = async (
  id: string
): Promise<ServiceRequest | null> => {
  try {
    const fullUrl = `${API_BASE_URL}/service-requests/${id}`;

    // Get auth token from Supabase if user is logged in
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Only add auth token if we're in the browser
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

    const response = await fetch(fullUrl, { headers });
    if (!response.ok) {
      throw new Error('Failed to fetch service request');
    }

    const serviceRequest: ServiceRequest = await response.json();
    return serviceRequest;
  } catch (error) {
    console.error('Error fetching service request:', error);
    return null;
  }
};
