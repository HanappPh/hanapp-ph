// API client for creating bookings from service listings
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface BookingService {
  serviceDetailId?: string; // For regular services
  customServiceName?: string; // For custom services
  customServiceDescription?: string;
  rate: number;
  isCustom: boolean;
}

export interface CreateBookingDto {
  listingId: string;
  providerId: string;
  services: BookingService[];
  scheduledDate: Date;
  scheduledTime: string;
  location: string;
  contactInfo: string;
  totalPrice: number;
  additionalNotes?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingGroupId: string;
  message: string;
}

// Create a new booking with multiple services
export const createBooking = async (
  data: CreateBookingDto
): Promise<BookingResponse> => {
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
        } else {
          throw new Error('Not authenticated');
        }
      } catch (error) {
        console.error('Failed to get auth token:', error);
        throw new Error('Authentication required');
      }
    }

    const response = await fetch(`${API_BASE_URL}/api/bookings/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create booking');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};
