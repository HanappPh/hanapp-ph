const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ProviderReviewRecord {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  client?: {
    full_name?: string;
    avatar_url?: string;
  } | null;
}

export async function fetchProviderReviews(
  providerId: string
): Promise<ProviderReviewRecord[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/reviews/provider/${providerId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch provider reviews');
    }

    const payload = await response.json();
    return payload.reviews || [];
  } catch (error) {
    console.error('Error fetching provider reviews:', error);
    return [];
  }
}
