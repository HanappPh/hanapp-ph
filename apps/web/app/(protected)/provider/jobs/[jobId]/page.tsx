'use client';

import { Card } from '@hanapp-ph/commons';
import { useRouter, useParams } from 'next/navigation';
import React, { useState } from 'react';

import { ProviderListingsActionButtons } from '../../../../../components/provider-listing-details/provider-listings-action-buttons';
import { ProviderListingsAttachedPhotos } from '../../../../../components/provider-listing-details/provider-listings-attached-photos';
import { ProviderListingsClientProfile } from '../../../../../components/provider-listing-details/provider-listings-client-profile';
import { ProviderListingsQualificationsCard } from '../../../../../components/provider-listing-details/provider-listings-qualifications-card';
import { ProviderListingsServiceInfoCard } from '../../../../../components/provider-listing-details/provider-listings-service-info-card';
export default function ProviderListingsRequestDetailsView() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId;
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>(
    'pending'
  );

  const request = {
    id: 'REQ-2024-001',
    service: 'AC Cleaning Service',
    category: 'Air Conditioning',
    date: 'March 15, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Tanza, Cavite',
    fullAddress: '123 Main Street, Barangay Bagtas, Tanza, Cavite',
    estimatedDuration: '2 hours',
    pricing: '₱499',
    paymentMethods: ['Cash', 'GCash', 'PayMaya'],
    description:
      'Need professional AC cleaning service for 2 split-type units. Units have not been cleaned for 6 months. Looking for thorough cleaning including filters, coils, and drainage.',
    qualifications: [
      'Please bring ladder (units are wall-mounted)',
      'Prefer eco-friendly cleaning solutions',
      'Need service completed before 5 PM',
    ],
    attachedPhotos: [
      '/img-carousel-placeholder_1.png',
      '/img-carousel-placeholder_2.png',
      '/img-carousel-placeholder_3.png',
    ],
    client: {
      name: 'Maria Santos',
      initials: 'MS',
      rating: 4.9,
      reviewCount: 23,
      verified: true,
      phone: '+63 917 123 4567',
      email: 'maria.santos@email.com',
      memberSince: 'January 2023',
      completedBookings: 15,
      avatar: '/placeholder.svg?height=80&width=80',
    },
  };

  const handleAccept = () => {
    setStatus('pending');
    // TODO: Implement accept request logic
    router.push(`/provider/jobs/${jobId}/apply`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Request Details */}
        <div className="lg:col-span-2 space-y-6">
          <ProviderListingsServiceInfoCard
            service={request.service}
            category={request.category}
            description={request.description}
            date={request.date}
            time={request.time}
            location={request.fullAddress}
            pricing={request.pricing}
            paymentMethods={request.paymentMethods}
          />
          <ProviderListingsQualificationsCard
            qualifications={request.qualifications}
          />
          <ProviderListingsAttachedPhotos photos={request.attachedPhotos} />
        </div>

        {/* Right Column - Client Info & Actions */}
        <div className="space-y-6">
          <Card className="p-6 bg-white">
            <ProviderListingsClientProfile client={request.client} />
          </Card>
          <ProviderListingsActionButtons
            status={status}
            onAccept={handleAccept}
          />
        </div>
      </div>
    </div>
  );
}
