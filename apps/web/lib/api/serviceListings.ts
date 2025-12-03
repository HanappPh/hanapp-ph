// API client for service listings
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Type for the availability schedule JSONB structure
export type AvailabilitySchedule =
  | string
  | {
      schedule?: string;
      display?: string;
      days?: string[];
      hours?: string;
      date_range_start?: string;
      date_range_end?: string;
      monday?: { available: boolean; start: string; end: string };
      tuesday?: { available: boolean; start: string; end: string };
      wednesday?: { available: boolean; start: string; end: string };
      thursday?: { available: boolean; start: string; end: string };
      friday?: { available: boolean; start: string; end: string };
      saturday?: { available: boolean; start: string; end: string };
      sunday?: { available: boolean; start: string; end: string };
      [key: string]: unknown; // Allow for other potential fields
    };

export interface ServiceListingResponse {
  id: string;
  provider_id: string;
  category_id: string;
  title: string;
  description: string;
  price_from: number;
  availability_schedule?: AvailabilitySchedule;
  service_areas?: string[];
  is_active: boolean;
  images?: string[];
  created_at: string;
  updated_at: string;
  rating?: number;
  review_count?: number;
  provider?: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
  category?: {
    id: string;
    name: string;
  };
}

export interface ServiceDetail {
  id: string;
  listing_id: string;
  title: string;
  description: string;
  rate: number;
  charge: string;
  is_addon: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceListingWithDetails extends ServiceListingResponse {
  provider: {
    id: string;
    full_name: string;
    avatar_url?: string;
    email?: string;
    phone?: string;
    created_at?: string;
  };
  category: {
    id: string;
    name: string;
  };
  services: ServiceDetail[];
  rating: number;
  review_count: number;
}

export async function fetchServiceListings(
  excludeProviderId?: string
): Promise<ServiceListingResponse[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/service-listings`);
    if (excludeProviderId) {
      url.searchParams.append('excludeProviderId', excludeProviderId);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure we always get fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch service listings');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching service listings:', error);
    return [];
  }
}

export async function fetchServiceListingDetails(
  listingId: string
): Promise<ServiceListingWithDetails | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/service-listings/${listingId}/details`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch service listing details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching service listing details:', error);
    return null;
  }
}
