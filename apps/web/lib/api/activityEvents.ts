const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ActivityEventResponse {
  id: string;
  actor_id: string;
  target_user_id?: string | null;
  event_type: string;
  title: string;
  description?: string | null;
  visibility: 'private' | 'shared';
  service_request_id?: string | null;
  listing_id?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  display_title?: string;
  display_description?: string;
  actor?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
  target?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export async function fetchActivityEvents(
  userId: string,
  limit = 20,
  role?: 'client' | 'provider'
): Promise<ActivityEventResponse[]> {
  if (!userId) {
    return [];
  }

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
          headers.Authorization = `Bearer ${session.access_token}`;
        }
      } catch (error) {
        console.error('Failed to get auth token for activity events:', error);
      }
    }

    const url = new URL(`${API_BASE_URL}/api/activity-events`);
    url.searchParams.append('userId', userId);
    url.searchParams.append('limit', String(limit));
    if (role) {
      url.searchParams.append('role', role);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      let message = 'Failed to fetch activity events';
      try {
        const payload = await response.json();
        message = payload?.message || message;
      } catch {
        // Ignore parse errors and keep default message
      }
      throw new Error(message);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching activity events:', error);
    return [];
  }
}
