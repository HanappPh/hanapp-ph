const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ProviderMetrics {
  profileViews: number;
  responseRate: number;
  totalApplications: number;
  respondedApplications: number;
}

export async function fetchProviderMetrics(
  providerId: string
): Promise<ProviderMetrics | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/profile-metrics/provider/${providerId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch provider metrics');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching provider metrics:', error);
    return null;
  }
}

export async function trackProviderProfileView(
  providerId: string,
  viewerId: string
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profile-metrics/views`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId, viewerId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error tracking profile view:', error);
    return false;
  }
}
