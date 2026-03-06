import { Button, Card } from '@hanapp-ph/commons';
import Image from 'next/image';
import React from 'react';

import type { ServiceListingResponse } from '../../lib/api/serviceListings';

type Role = 'Client' | 'Provider';

interface ProfileWorkContentProps {
  role: Role;
  serviceListings?: ServiceListingResponse[];
  embedded?: boolean;
}

const clientRequests = [
  {
    id: 'REQ-001',
    title: 'House Cleaning Request',
    status: 'Pending',
    action: 'Cancel request',
    statusClass: 'bg-[#FFF6E5] border-[#F59E0B] text-[#92400E]',
  },
  {
    id: 'REQ-002',
    title: 'Math Tutor Request',
    status: 'With Application',
    action: 'Confirm provider application',
    statusClass: 'bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF]',
  },
  {
    id: 'REQ-003',
    title: 'Plumbing Service',
    status: 'Application Received',
    action: 'Delete provider application',
    statusClass: 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]',
  },
  {
    id: 'REQ-004',
    title: 'AC Repair Job',
    status: 'Provider Finished',
    action: 'Release payment',
    statusClass: 'bg-[#ECFDF5] border-[#10B981] text-[#065F46]',
  },
];

const CATEGORY_MAP: Record<number, string> = {
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

const DAY_ORDER = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

const DAY_LABEL: Record<(typeof DAY_ORDER)[number], string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

const formatTime = (time: string) => {
  const [hoursRaw, minutesRaw] = time.split(':');
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const suffix = hours >= 12 ? 'PM' : 'AM';
  const twelveHour = hours % 12 || 12;
  return `${twelveHour}:${String(minutes).padStart(2, '0')} ${suffix}`;
};

const formatAvailabilityDays = (
  availability: Exclude<
    NonNullable<ServiceListingResponse['availability_schedule']>,
    string
  >
) => {
  const availableSlots = DAY_ORDER.flatMap(day => {
    const slot = availability[day] as
      | { available?: boolean; start?: string; end?: string }
      | undefined;

    if (!slot?.available || !slot.start || !slot.end) {
      return [];
    }

    return [
      {
        day,
        hours: `${formatTime(slot.start)} - ${formatTime(slot.end)}`,
      },
    ];
  });

  if (availableSlots.length === 0) {
    return null;
  }

  return availableSlots
    .map(slot => `${DAY_LABEL[slot.day]} (${slot.hours})`)
    .join('\n');
};

const formatAvailability = (
  availability: ServiceListingResponse['availability_schedule']
) => {
  if (!availability) {
    return 'Not specified';
  }

  if (typeof availability === 'string') {
    try {
      const parsedAvailability = JSON.parse(availability) as Exclude<
        NonNullable<ServiceListingResponse['availability_schedule']>,
        string
      >;
      const formattedParsedDays = formatAvailabilityDays(parsedAvailability);
      if (formattedParsedDays) {
        return formattedParsedDays;
      }
    } catch {
      return availability;
    }

    return availability;
  }

  if (availability.display) {
    return availability.display;
  }

  if (availability.schedule) {
    return availability.schedule;
  }

  if (availability.days?.length && availability.hours) {
    return `${availability.days.join(', ')} • ${availability.hours}`;
  }

  const formattedDays = formatAvailabilityDays(availability);
  if (formattedDays) {
    return formattedDays;
  }

  return 'Not specified';
};

export function ProfileWorkContent({
  role,
  serviceListings = [],
  embedded = false,
}: ProfileWorkContentProps) {
  if (role === 'Client') {
    return (
      <main className={embedded ? 'p-6' : 'flex-1 p-6'}>
        {embedded ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Requests
            </h2>
            <div className="space-y-4">
              {clientRequests.map(request => (
                <div
                  key={request.id}
                  className={`rounded-lg border-l-4 p-4 ${request.statusClass}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500">{request.id}</p>
                      <h3 className="font-semibold text-gray-900">
                        {request.title}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {request.action}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-[#102E50] px-3 py-1 text-xs font-medium text-white cursor-default select-none">
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      className="text-xs px-3 py-1 h-auto"
                    >
                      View details
                    </Button>
                    <Button className="text-xs px-3 py-1 h-auto bg-[#014182] hover:bg-[#102E50] text-white">
                      {request.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Card className="p-6 bg-white border-none drop-shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Requests
            </h2>
            <div className="space-y-4">
              {clientRequests.map(request => (
                <div
                  key={request.id}
                  className={`rounded-lg border-l-4 p-4 ${request.statusClass}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500">{request.id}</p>
                      <h3 className="font-semibold text-gray-900">
                        {request.title}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {request.action}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-[#102E50] px-3 py-1 text-xs font-medium text-white cursor-default select-none">
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      className="text-xs px-3 py-1 h-auto"
                    >
                      View details
                    </Button>
                    <Button className="text-xs px-3 py-1 h-auto bg-[#014182] hover:bg-[#102E50] text-white">
                      {request.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    );
  }

  const providerListings = serviceListings.map(listing => ({
    id: listing.id,
    title: listing.title,
    category: CATEGORY_MAP[Number(listing.category_id)] || 'Other',
    description: listing.description || 'No description provided',
    acceptedAreas: listing.service_areas || [],
    availability: formatAvailability(listing.availability_schedule),
    image: listing.images?.[0] || '/cleaning-service-provider.jpg',
    details:
      listing.services && listing.services.length > 0
        ? listing.services.map(service => ({
            id: service.id,
            title: service.title,
            description: service.description || 'No service detail description',
            rate:
              typeof service.rate === 'number'
                ? `₱${service.rate.toLocaleString()}${service.charge ? ` / ${service.charge}` : ''}`
                : 'Rate not specified',
          }))
        : (listing.service_names || []).map((serviceName, index) => ({
            id: `${listing.id}-service-${index}`,
            title: serviceName,
            description: 'No service detail description',
            rate:
              typeof listing.price_from === 'number'
                ? `₱${listing.price_from.toLocaleString()}`
                : 'Rate not specified',
          })),
  }));

  return (
    <main className={embedded ? 'p-6' : 'flex-1 p-6'}>
      <div className="space-y-6">
        {embedded ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Services
            </h2>
            {providerListings.length === 0 ? (
              <p className="text-base text-gray-600">
                No service listings yet.
              </p>
            ) : (
              <div className="space-y-4">
                {providerListings.map(listing => (
                  <div
                    key={listing.id}
                    className="rounded-lg border border-gray-200 p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
                      <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          width={96}
                          height={96}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                            {listing.title}
                          </h3>
                          <span className="mt-2 inline-flex items-center rounded-md bg-[#EFF6FF] px-3 py-1.5 text-sm font-medium text-[#1E40AF] cursor-default select-none">
                            {listing.category}
                          </span>
                          <p className="text-sm sm:text-base text-gray-600 mt-2 break-words">
                            {listing.description}
                          </p>
                          <p className="text-sm text-gray-600 mt-2 break-words">
                            <span className="font-semibold text-gray-700">
                              Accepted areas:
                            </span>{' '}
                            {listing.acceptedAreas.length > 0
                              ? listing.acceptedAreas.join(', ')
                              : 'Not specified'}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 break-words">
                            <span className="font-semibold text-gray-700 block">
                              Availability:
                            </span>
                            <span className="whitespace-pre-line block">
                              {listing.availability}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
                      <div className="space-y-3">
                        {listing.details.map(detail => (
                          <div
                            key={detail.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-md bg-white px-4 py-3"
                          >
                            <div className="min-w-0">
                              <span className="text-base text-gray-900 break-words block">
                                {detail.title}
                              </span>
                              <p className="text-sm text-gray-600 break-words">
                                {detail.description}
                              </p>
                            </div>
                            <span className="inline-flex items-center rounded-md bg-[#F5C45E] px-3 py-1.5 text-sm font-medium text-[#102E50] cursor-default select-none self-start sm:self-auto">
                              {detail.rate}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="outline"
                        className="text-sm px-4 py-1.5 h-auto border-[#102E50] text-[#102E50]"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Card className="p-6 bg-white border-none drop-shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Services
            </h2>
            {providerListings.length === 0 ? (
              <p className="text-base text-gray-600">
                No service listings yet.
              </p>
            ) : (
              <div className="space-y-4">
                {providerListings.map(listing => (
                  <div
                    key={listing.id}
                    className="rounded-lg border border-gray-200 p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
                      <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          width={96}
                          height={96}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                            {listing.title}
                          </h3>
                          <span className="mt-2 inline-flex items-center rounded-md bg-[#EFF6FF] px-3 py-1.5 text-sm font-medium text-[#1E40AF] cursor-default select-none">
                            {listing.category}
                          </span>
                          <p className="text-sm sm:text-base text-gray-600 mt-2 break-words">
                            {listing.description}
                          </p>
                          <p className="text-sm text-gray-600 mt-2 break-words">
                            <span className="font-semibold text-gray-700">
                              Accepted areas:
                            </span>{' '}
                            {listing.acceptedAreas.length > 0
                              ? listing.acceptedAreas.join(', ')
                              : 'Not specified'}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 break-words">
                            <span className="font-semibold text-gray-700 block">
                              Availability:
                            </span>
                            <span className="whitespace-pre-line block">
                              {listing.availability}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
                      <div className="space-y-3">
                        {listing.details.map(detail => (
                          <div
                            key={detail.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-md bg-white px-4 py-3"
                          >
                            <div className="min-w-0">
                              <span className="text-base text-gray-900 break-words block">
                                {detail.title}
                              </span>
                              <p className="text-sm text-gray-600 break-words">
                                {detail.description}
                              </p>
                            </div>
                            <span className="inline-flex items-center rounded-md bg-[#F5C45E] px-3 py-1.5 text-sm font-medium text-[#102E50] cursor-default select-none self-start sm:self-auto">
                              {detail.rate}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="outline"
                        className="text-sm px-4 py-1.5 h-auto border-[#102E50] text-[#102E50]"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </main>
  );
}
