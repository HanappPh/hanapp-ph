import { Badge, Button, Card } from '@hanapp-ph/commons';
import { Edit, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
  fetchActivityEvents,
  type ActivityEventResponse,
} from '../../lib/api/activityEvents';
import { getCategoryName } from '../../lib/constants/categories';

// Example providers array (replace with real data as needed)
// Commented out for now - used when Recent Providers section is active
// const providers = [
//   {
//     name: 'John Benedict',
//     role: 'Cleaner',
//     distance: '0.3m',
//     img: '/profile-pic.png',
//   },
//   {
//     name: 'Mark Cruz',
//     role: 'Cleaner',
//     distance: '0.3m',
//     img: '/profile-pic.png',
//   },
//   {
//     name: 'Andi',
//     role: 'Cleaner',
//     distance: '0.3m',
//     img: '/profile-pic.png',
//   },
//   {
//     name: 'Glesinda De Ocampo Estanillo',
//     role: 'Cleaner',
//     distance: '0.3m',
//     img: '/profile-pic.png',
//   },
// ];

export function MainContent({
  initialSelected,
  profile,
  hideEditButtons = false,
  embedded = false,
  providerListings,
  servicePreferenceListings,
}: {
  initialSelected?: 'Provider' | 'Client';
  profile: {
    id?: string;
    full_name?: string;
    email?: string;
    phone_number?: string;
  } | null;
  hideEditButtons?: boolean;
  embedded?: boolean;
  providerListings?: {
    id: string;
    title?: string;
    description?: string;
    images?: string[];
  }[];
  servicePreferenceListings?: {
    id: string;
    category_id?: string | number;
  }[];
}) {
  const router = useRouter();
  const [showAllListings, setShowAllListings] = React.useState(false);
  const [currentActivityPage, setCurrentActivityPage] = React.useState(1);
  const [recentActivities, setRecentActivities] = React.useState<
    Array<{
      id: string;
      title: string;
      detail: string;
      listingTitle?: string;
      servicesText?: string;
      time: string;
      status: string;
      statusColor: 'green' | 'red' | 'orange' | 'gray';
      amount: string | null;
    }>
  >([]);
  const displayName = profile?.full_name || 'User';
  const displayEmail = profile?.email || 'Not provided';
  const displayPhone = profile?.phone_number || 'Not provided';

  const compiledServicePreferences = React.useMemo(() => {
    if (!servicePreferenceListings || servicePreferenceListings.length === 0) {
      return [] as string[];
    }

    return Array.from(
      new Set(
        servicePreferenceListings
          .map(listing => Number(listing.category_id))
          .filter(categoryId => Number.isFinite(categoryId))
          .map(categoryId => getCategoryName(categoryId))
      )
    );
  }, [servicePreferenceListings]);

  const getRelativeTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = Date.now();
    const diffMinutes = Math.floor((now - date.getTime()) / (1000 * 60));

    if (diffMinutes < 1) {
      return 'just now';
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes === 1 ? '' : 's'} ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }

    return date.toLocaleDateString();
  };

  const getStatusColor = (
    eventType: string
  ): 'green' | 'red' | 'orange' | 'gray' => {
    if (
      eventType.includes('completed') ||
      eventType.includes('approved') ||
      eventType.includes('accepted') ||
      eventType.includes('confirmed') ||
      eventType.includes('finished') ||
      eventType.includes('released') ||
      eventType.includes('received')
    ) {
      return 'green';
    }

    if (
      eventType.includes('cancel') ||
      eventType.includes('reject') ||
      eventType.includes('deleted')
    ) {
      return 'red';
    }

    if (eventType.includes('pending') || eventType.includes('requested')) {
      return 'orange';
    }

    return 'gray';
  };

  const formatStatusLabel = (eventType: string) =>
    eventType
      .split('_')
      .filter(Boolean)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');

  React.useEffect(() => {
    const loadActivityEvents = async () => {
      if (!profile?.id || providerListings) {
        return;
      }

      const activeRole =
        initialSelected === 'Provider'
          ? 'provider'
          : initialSelected === 'Client'
            ? 'client'
            : undefined;

      const events = await fetchActivityEvents(profile.id, 50, activeRole);
      const mapped = events.map((event: ActivityEventResponse) => ({
        id: event.id,
        title: event.display_title || event.title || 'Activity event',
        detail:
          event.display_description || event.description || event.event_type,
        listingTitle:
          typeof event.metadata?.listing_title === 'string'
            ? event.metadata.listing_title
            : undefined,
        servicesText: Array.isArray(event.metadata?.service_names)
          ? event.metadata.service_names
              .filter(
                (service): service is string => typeof service === 'string'
              )
              .join(', ')
          : undefined,
        time: getRelativeTime(event.created_at),
        status: formatStatusLabel(event.event_type),
        statusColor: getStatusColor(event.event_type),
        amount: null,
      }));

      setRecentActivities(mapped);
      setCurrentActivityPage(1);
    };

    loadActivityEvents();
  }, [profile?.id, providerListings, initialSelected]);

  const activitiesPerPage = 5;
  const totalActivityPages = Math.ceil(
    recentActivities.length / activitiesPerPage
  );
  const isProviderView = initialSelected === 'Provider';
  const activePaginationClass = isProviderView
    ? 'bg-hanapp-accent text-hanapp-secondary'
    : 'bg-hanapp-primary text-white';
  const inactivePaginationClass =
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100';
  const startActivityIndex = (currentActivityPage - 1) * activitiesPerPage;
  const endActivityIndex = startActivityIndex + activitiesPerPage;
  const currentActivities = recentActivities.slice(
    startActivityIndex,
    endActivityIndex
  );

  const profileSection = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Information
        </h2>
        {!hideEditButtons && (
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">
              Full Name
            </label>
            <p className="text-gray-900 font-medium">{displayName}</p>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <p className="text-gray-900">{displayEmail}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </label>
            <p className="text-gray-900">{displayPhone}</p>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Member Since
            </label>
            <p className="text-gray-900">May 2023</p>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">
              Account Status
            </label>
            <p className="text-green-600 font-medium">Verified Provider</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </label>
            <p className="text-gray-900">Bacoor, Cavite</p>
          </div>
        </div>
      </div>

      {initialSelected !== 'Client' && (
        <div className="mt-6">
          <label className="text-sm text-gray-600 mb-3 block">
            Service Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {compiledServicePreferences.length > 0 ? (
              compiledServicePreferences.map(preference => (
                <Badge
                  key={preference}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 p-2"
                >
                  {preference}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No service preferences yet.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );

  return (
    <main className={embedded ? 'p-6' : 'flex-1 p-6'}>
      <div className="space-y-6">
        {embedded ? (
          <div className="pb-6 border-b border-gray-200">{profileSection}</div>
        ) : (
          <Card className="p-6 bg-white border-none drop-shadow-md">
            {profileSection}
          </Card>
        )}

        {/* Recent Activity or Provider Listings */}
        {providerListings ? (
          embedded ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Service Listings ({providerListings.length})
                </h2>
                {providerListings.length > 3 && (
                  <Button
                    variant="ghost"
                    className="text-[#102E50] hover:text-[#0a1f35] font-semibold"
                    onClick={() => setShowAllListings(!showAllListings)}
                  >
                    {showAllListings ? 'Show Less' : 'See All'}
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {providerListings.length > 0 ? (
                  (showAllListings
                    ? providerListings
                    : providerListings.slice(0, 3)
                  ).map(listing => (
                    <div
                      key={listing.id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => router.push(`/jobs/${listing.id}`)}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        {listing.images?.[0] && (
                          <Image
                            src={listing.images[0]}
                            alt={listing.title || 'Service listing image'}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {listing.title}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {listing.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No postings available
                  </p>
                )}
              </div>
            </div>
          ) : (
            <Card className="p-6 bg-white border-none drop-shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Service Listings ({providerListings.length})
                </h2>
                {providerListings.length > 3 && (
                  <Button
                    variant="ghost"
                    className="text-[#102E50] hover:text-[#0a1f35] font-semibold"
                    onClick={() => setShowAllListings(!showAllListings)}
                  >
                    {showAllListings ? 'Show Less' : 'See All'}
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {providerListings.length > 0 ? (
                  (showAllListings
                    ? providerListings
                    : providerListings.slice(0, 3)
                  ).map(listing => (
                    <div
                      key={listing.id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => router.push(`/jobs/${listing.id}`)}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        {listing.images?.[0] && (
                          <Image
                            src={listing.images[0]}
                            alt={listing.title || 'Service listing image'}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {listing.title}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {listing.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No postings available
                  </p>
                )}
              </div>
            </Card>
          )
        ) : embedded ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {currentActivities.map(activity => (
                <div
                  key={activity.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                    activity.statusColor === 'green'
                      ? 'bg-[#F0FDF4] border-[#22C55E]'
                      : activity.statusColor === 'red'
                        ? 'bg-[#FEF2F2] border-[#EF4444]'
                        : activity.statusColor === 'orange'
                          ? 'bg-[#FFF7ED] border-[#F59E0B]'
                          : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {activity.detail} • {activity.time}
                      </p>
                      {(activity.listingTitle || activity.servicesText) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.listingTitle
                            ? `Listing: ${activity.listingTitle}`
                            : ''}
                          {activity.listingTitle && activity.servicesText
                            ? ' • '
                            : ''}
                          {activity.servicesText
                            ? `Services: ${activity.servicesText}`
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium bg-transparent cursor-default select-none ${
                      activity.statusColor === 'green'
                        ? 'border-[#22C55E] text-[#16A34A]'
                        : activity.statusColor === 'red'
                          ? 'border-[#EF4444] text-[#EF4444]'
                          : activity.statusColor === 'orange'
                            ? 'border-[#F59E0B] text-[#B45309]'
                            : 'border-gray-500 text-gray-700'
                    }`}
                  >
                    {activity.amount || activity.status}
                  </span>
                </div>
              ))}
              {currentActivities.length === 0 && (
                <p className="text-sm text-gray-600">No recent activity yet.</p>
              )}
            </div>

            {totalActivityPages > 1 && (
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() =>
                    setCurrentActivityPage(prev => Math.max(1, prev - 1))
                  }
                  disabled={currentActivityPage === 1}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    currentActivityPage === 1
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : inactivePaginationClass
                  }`}
                >
                  {'<'}
                </button>

                <div className="flex items-center gap-2">
                  {(() => {
                    const maxPagesToShow = 3;
                    let startPage = Math.max(
                      1,
                      currentActivityPage - Math.floor(maxPagesToShow / 2)
                    );
                    const endPage = Math.min(
                      totalActivityPages,
                      startPage + maxPagesToShow - 1
                    );

                    if (endPage - startPage + 1 < maxPagesToShow) {
                      startPage = Math.max(1, endPage - maxPagesToShow + 1);
                    }

                    return Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i
                    ).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentActivityPage(page)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                          currentActivityPage === page
                            ? activePaginationClass
                            : inactivePaginationClass
                        }`}
                      >
                        {page}
                      </button>
                    ));
                  })()}
                </div>

                <button
                  onClick={() =>
                    setCurrentActivityPage(prev =>
                      Math.min(totalActivityPages, prev + 1)
                    )
                  }
                  disabled={currentActivityPage === totalActivityPages}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    currentActivityPage === totalActivityPages
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : inactivePaginationClass
                  }`}
                >
                  {'>'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Card className="p-6 bg-white border-none drop-shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {currentActivities.map(activity => (
                <div
                  key={activity.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                    activity.statusColor === 'green'
                      ? 'bg-[#F0FDF4] border-[#22C55E]'
                      : activity.statusColor === 'red'
                        ? 'bg-[#FEF2F2] border-[#EF4444]'
                        : activity.statusColor === 'orange'
                          ? 'bg-[#FFF7ED] border-[#F59E0B]'
                          : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {activity.detail} • {activity.time}
                      </p>
                      {(activity.listingTitle || activity.servicesText) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.listingTitle
                            ? `Listing: ${activity.listingTitle}`
                            : ''}
                          {activity.listingTitle && activity.servicesText
                            ? ' • '
                            : ''}
                          {activity.servicesText
                            ? `Services: ${activity.servicesText}`
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium bg-transparent cursor-default select-none ${
                      activity.statusColor === 'green'
                        ? 'border-[#22C55E] text-[#16A34A]'
                        : activity.statusColor === 'red'
                          ? 'border-[#EF4444] text-[#EF4444]'
                          : activity.statusColor === 'orange'
                            ? 'border-[#F59E0B] text-[#B45309]'
                            : 'border-gray-500 text-gray-700'
                    }`}
                  >
                    {activity.amount || activity.status}
                  </span>
                </div>
              ))}
              {currentActivities.length === 0 && (
                <p className="text-sm text-gray-600">No recent activity yet.</p>
              )}
            </div>

            {totalActivityPages > 1 && (
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() =>
                    setCurrentActivityPage(prev => Math.max(1, prev - 1))
                  }
                  disabled={currentActivityPage === 1}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    currentActivityPage === 1
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : inactivePaginationClass
                  }`}
                >
                  {'<'}
                </button>

                <div className="flex items-center gap-2">
                  {(() => {
                    const maxPagesToShow = 3;
                    let startPage = Math.max(
                      1,
                      currentActivityPage - Math.floor(maxPagesToShow / 2)
                    );
                    const endPage = Math.min(
                      totalActivityPages,
                      startPage + maxPagesToShow - 1
                    );

                    if (endPage - startPage + 1 < maxPagesToShow) {
                      startPage = Math.max(1, endPage - maxPagesToShow + 1);
                    }

                    return Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i
                    ).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentActivityPage(page)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                          currentActivityPage === page
                            ? activePaginationClass
                            : inactivePaginationClass
                        }`}
                      >
                        {page}
                      </button>
                    ));
                  })()}
                </div>

                <button
                  onClick={() =>
                    setCurrentActivityPage(prev =>
                      Math.min(totalActivityPages, prev + 1)
                    )
                  }
                  disabled={currentActivityPage === totalActivityPages}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    currentActivityPage === totalActivityPages
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : inactivePaginationClass
                  }`}
                >
                  {'>'}
                </button>
              </div>
            )}
          </Card>
        )}
        {/* Favorite Providers Section (Web version) - Commented out for now */}
      </div>
    </main>
  );
}
