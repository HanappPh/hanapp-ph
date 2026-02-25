import { Button, Card } from '@hanapp-ph/commons';
import Image from 'next/image';
import React from 'react';

import type { ServiceListingResponse } from '../../lib/api/serviceListings';

type Role = 'Client' | 'Provider';

interface ProfileWorkContentProps {
  role: Role;
  serviceListings?: ServiceListingResponse[];
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

const formatAvailability = (
  availability: ServiceListingResponse['availability_schedule']
) => {
  if (!availability) {
    return 'Not specified';
  }

  if (typeof availability === 'string') {
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

  return 'Not specified';
};

export function ProfileWorkContent({
  role,
  serviceListings = [],
}: ProfileWorkContentProps) {
  if (role === 'Client') {
    return (
      <main className="flex-1 p-6">
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
    details: [
      {
        id: `${listing.id}-base`,
        title: listing.title,
        description: listing.description || 'No service detail description',
        rate:
          typeof listing.price_from === 'number'
            ? `₱${listing.price_from.toLocaleString()}`
            : 'Rate not specified',
      },
    ],
  }));

  return (
    <main className="flex-1 p-6">
      <div className="space-y-6">
        <Card className="p-6 bg-white border-none drop-shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            My Services
          </h2>
          {providerListings.length === 0 ? (
            <p className="text-sm text-gray-600">No service listings yet.</p>
          ) : (
            <div className="space-y-4">
              {providerListings.map(listing => (
                <div
                  key={listing.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-xs text-gray-500">{listing.id}</p>
                        <h3 className="font-semibold text-gray-900">
                          {listing.title}
                        </h3>
                        <span className="mt-1 inline-flex items-center rounded-md bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#1E40AF] cursor-default select-none">
                          {listing.category}
                        </span>
                        <p className="text-sm text-gray-600 mt-2">
                          {listing.description}
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          <span className="font-semibold text-gray-700">
                            Accepted areas:
                          </span>{' '}
                          {listing.acceptedAreas.join(', ')}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          <span className="font-semibold text-gray-700">
                            Availability:
                          </span>{' '}
                          {listing.availability}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="text-xs px-3 py-1 h-auto border-[#102E50] text-[#102E50]"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
                    <div className="space-y-2">
                      {listing.details.map(detail => (
                        <div
                          key={detail.id}
                          className="flex items-center justify-between rounded-md bg-white px-3 py-2"
                        >
                          <div>
                            <span className="text-sm text-gray-900">
                              {detail.title}
                            </span>
                            <p className="text-xs text-gray-600">
                              {detail.description}
                            </p>
                          </div>
                          <span className="inline-flex items-center rounded-md bg-[#F5C45E] px-3 py-1 text-xs font-medium text-[#102E50] cursor-default select-none">
                            {detail.rate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
