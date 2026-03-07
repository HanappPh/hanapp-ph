import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

@Injectable()
export class ActivityEventsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private normalizeMetadata(metadata: unknown): Record<string, unknown> {
    if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
      return {};
    }

    return metadata as Record<string, unknown>;
  }

  private inferRolesByEventType(eventType: string): {
    actorRole?: 'client' | 'provider';
    targetRole?: 'client' | 'provider';
  } {
    if (eventType === 'booking_requested') {
      return { actorRole: 'client', targetRole: 'provider' };
    }

    if (eventType === 'booking_confirmed' || eventType === 'booking_deleted') {
      return { actorRole: 'provider', targetRole: 'client' };
    }

    if (eventType === 'booking_finished') {
      return { actorRole: 'provider', targetRole: 'client' };
    }

    if (eventType === 'payment_released') {
      return { actorRole: 'client', targetRole: 'provider' };
    }

    return {};
  }

  async findForUser(
    userId: string,
    activeRole?: 'client' | 'provider',
    limit = 20
  ) {
    if (!userId) {
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }

    const supabase = this.supabaseService.getClient();
    const { data: actorEvents, error: actorError } = await supabase
      .from('activity_events')
      .select(
        `
        id,
        actor_id,
        target_user_id,
        event_type,
        title,
        description,
        visibility,
        service_request_id,
        listing_id,
        metadata,
        created_at
      `
      )
      .eq('actor_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (actorError) {
      throw new HttpException(
        `Failed to fetch activity events: ${actorError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const { data: sharedTargetEvents, error: targetError } = await supabase
      .from('activity_events')
      .select(
        `
        id,
        actor_id,
        target_user_id,
        event_type,
        title,
        description,
        visibility,
        service_request_id,
        listing_id,
        metadata,
        created_at
      `
      )
      .eq('target_user_id', userId)
      .eq('visibility', 'shared')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (targetError) {
      throw new HttpException(
        `Failed to fetch activity events: ${targetError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const allEvents = [...(actorEvents || []), ...(sharedTargetEvents || [])];
    const deduped = Array.from(
      new Map(allEvents.map(event => [event.id, event])).values()
    )
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, limit);

    const userIds = Array.from(
      new Set(
        deduped
          .flatMap(event => [event.actor_id, event.target_user_id])
          .filter(Boolean)
      )
    ) as string[];

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, full_name, avatar_url')
      .in('id', userIds);

    if (usersError) {
      throw new HttpException(
        `Failed to fetch event users: ${usersError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const userMap = new Map((users || []).map(user => [user.id, user]));

    const bookingGroupIds = Array.from(
      new Set(
        deduped
          .map(event => this.normalizeMetadata(event.metadata).booking_group_id)
          .filter(
            (value): value is string =>
              typeof value === 'string' && value.length > 0
          )
      )
    );

    const bookingServicesMap = new Map<
      string,
      { listingTitle: string; serviceNames: string[] }
    >();

    if (bookingGroupIds.length > 0) {
      const { data: groupedRequests, error: groupedRequestsError } =
        await supabase
          .from('service_requests')
          .select(
            `
          booking_group_id,
          custom_service_name,
          is_custom_service,
          listing:service_listings(title),
          service_detail:service_listing_details(title)
        `
          )
          .in('booking_group_id', bookingGroupIds);

      if (groupedRequestsError) {
        throw new HttpException(
          `Failed to fetch grouped service requests: ${groupedRequestsError.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      (groupedRequests || []).forEach(request => {
        const groupId = request.booking_group_id as string;
        const current = bookingServicesMap.get(groupId) || {
          listingTitle: '',
          serviceNames: [],
        };

        const listingTitle = (request.listing as { title?: string } | null)
          ?.title;
        if (listingTitle && !current.listingTitle) {
          current.listingTitle = listingTitle;
        }

        const serviceTitle = request.is_custom_service
          ? request.custom_service_name
          : (request.service_detail as { title?: string } | null)?.title;

        if (serviceTitle && !current.serviceNames.includes(serviceTitle)) {
          current.serviceNames.push(serviceTitle);
        }

        bookingServicesMap.set(groupId, current);
      });
    }

    const transformed = deduped.map(event => {
      const metadata = this.normalizeMetadata(event.metadata);
      const isActor = event.actor_id === userId;
      const actor = event.actor_id ? userMap.get(event.actor_id) : null;
      const target = event.target_user_id
        ? userMap.get(event.target_user_id)
        : null;
      const inferredRoles = this.inferRolesByEventType(event.event_type);

      const actorRole =
        metadata.actor_role === 'client' || metadata.actor_role === 'provider'
          ? (metadata.actor_role as 'client' | 'provider')
          : inferredRoles.actorRole;

      const targetRole =
        metadata.target_role === 'client' || metadata.target_role === 'provider'
          ? (metadata.target_role as 'client' | 'provider')
          : inferredRoles.targetRole;

      const viewerRole = isActor ? actorRole : targetRole;

      let displayTitle = event.title;
      let displayDescription = event.description || '';

      const bookingGroupId =
        typeof metadata.booking_group_id === 'string'
          ? metadata.booking_group_id
          : null;
      const bookingDetails = bookingGroupId
        ? bookingServicesMap.get(bookingGroupId)
        : undefined;

      const providerName =
        typeof metadata.provider_name === 'string'
          ? metadata.provider_name
          : target?.full_name || 'Provider';
      const clientName =
        typeof metadata.client_name === 'string'
          ? metadata.client_name
          : actor?.full_name || 'Client';

      if (event.event_type === 'booking_requested') {
        displayTitle = isActor
          ? 'Booking request sent'
          : 'Booking request received';
        displayDescription = isActor
          ? `Requested service from ${providerName}`
          : `Service requested by ${clientName}`;
      } else if (event.event_type === 'booking_confirmed') {
        displayTitle = isActor
          ? 'Booking request confirmed'
          : 'Booking request accepted';
        displayDescription = isActor
          ? `Confirmed booking request from ${clientName}`
          : `${providerName} confirmed your booking request`;
      } else if (event.event_type === 'booking_deleted') {
        displayTitle = isActor
          ? 'Booking request deleted'
          : 'Booking request declined';
        displayDescription = isActor
          ? `Deleted booking request from ${clientName}`
          : `${providerName} deleted your booking request`;
      } else if (event.event_type === 'booking_finished') {
        displayTitle = isActor
          ? 'Job marked as finished'
          : 'Provider marked job as finished';
        displayDescription = isActor
          ? `Marked job as finished for ${clientName}`
          : `${providerName} marked your job as finished`;
      } else if (event.event_type === 'payment_released') {
        displayTitle = isActor ? 'Payment released' : 'Payment received';
        displayDescription = isActor
          ? `Released payment to ${providerName}`
          : `${clientName} released your payment`;
      }

      return {
        ...event,
        actor,
        target,
        viewer_role: viewerRole || null,
        display_title: displayTitle,
        display_description: displayDescription,
        metadata: {
          ...metadata,
          listing_title:
            (metadata.listing_title as string | undefined) ||
            bookingDetails?.listingTitle ||
            null,
          service_names: (Array.isArray(metadata.service_names)
            ? metadata.service_names
            : bookingDetails?.serviceNames || []) as string[],
        },
      };
    });

    if (!activeRole) {
      return transformed;
    }

    return transformed.filter(event => event.viewer_role === activeRole);
  }
}
