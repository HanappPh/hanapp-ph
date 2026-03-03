import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

@Injectable()
export class ProfileMetricsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async trackProfileView(providerId: string, viewerId: string) {
    if (!providerId || !viewerId || providerId === viewerId) {
      return { success: true };
    }

    const supabase = this.supabaseService.getClient();
    const today = new Date().toISOString().slice(0, 10);

    const { error } = await supabase.from('profile_views').upsert(
      {
        provider_id: providerId,
        viewer_id: viewerId,
        view_date: today,
      },
      {
        onConflict: 'provider_id,viewer_id,view_date',
      }
    );

    if (error) {
      throw new HttpException(
        `Failed to track profile view: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return { success: true };
  }

  async getProviderMetrics(providerId: string) {
    const supabase = this.supabaseService.getClient();

    const { count: profileViews, error: viewsError } = await supabase
      .from('profile_views')
      .select('*', { count: 'exact', head: true })
      .eq('provider_id', providerId);

    if (viewsError) {
      throw new HttpException(
        `Failed to fetch profile views: ${viewsError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('booking_id, sender_id, receiver_id')
      .or(`sender_id.eq.${providerId},receiver_id.eq.${providerId}`)
      .not('booking_id', 'is', null);

    if (messagesError) {
      throw new HttpException(
        `Failed to fetch messages: ${messagesError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const conversationMap = new Map<
      string,
      { hasProviderMessage: boolean; hasOtherMessage: boolean }
    >();

    for (const message of messages || []) {
      const bookingId = String(message.booking_id);
      const existing = conversationMap.get(bookingId) || {
        hasProviderMessage: false,
        hasOtherMessage: false,
      };

      if (message.sender_id === providerId) {
        existing.hasProviderMessage = true;
      } else {
        existing.hasOtherMessage = true;
      }

      conversationMap.set(bookingId, existing);
    }

    const total = Array.from(conversationMap.values()).filter(
      convo => convo.hasOtherMessage
    ).length;

    const responded = Array.from(conversationMap.values()).filter(
      convo => convo.hasOtherMessage && convo.hasProviderMessage
    ).length;

    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

    return {
      profileViews: profileViews || 0,
      responseRate,
      totalConversations: total,
      respondedConversations: responded,
    };
  }
}
