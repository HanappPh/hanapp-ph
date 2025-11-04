'use client';

import { Card } from '@hanapp-ph/commons';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { ProviderListingsActionButtons } from '../../../../../components/provider-listing-details/provider-listings-action-buttons';
import { ProviderListingsAttachedPhotos } from '../../../../../components/provider-listing-details/provider-listings-attached-photos';
import { ProviderListingsClientProfile } from '../../../../../components/provider-listing-details/provider-listings-client-profile';
import { ProviderListingsQualificationsCard } from '../../../../../components/provider-listing-details/provider-listings-qualifications-card';
import { ProviderListingsServiceInfoCard } from '../../../../../components/provider-listing-details/provider-listings-service-info-card';
import {
  fetchServiceRequestById,
  ServiceRequest,
} from '../../../../../lib/api/serviceRequests';

// Category mapping
const getCategoryName = (categoryId: number): string => {
  const categoryNames = {
    1: 'Cleaning',
    2: 'Tutoring',
    3: 'Repair',
    4: 'Delivery',
  };
  return categoryNames[categoryId as keyof typeof categoryNames] || 'Other';
};

// Format date to "Month Year" format
const formatMemberSince = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'Unknown';
  }
};

export default function ProviderListingsRequestDetailsView() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>(
    'pending'
  );
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Fetch service request data
  useEffect(() => {
    const loadServiceRequest = async () => {
      try {
        setLoading(true);
        const data = await fetchServiceRequestById(jobId);
        setServiceRequest(data);
      } catch (error) {
        console.error('Error loading service request:', error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      loadServiceRequest();
    }
  }, [jobId]);

  // Hardcoded fallback data
  const fallbackRequest = {
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

  // Map fetched data or use fallback
  const request = serviceRequest
    ? {
        id: serviceRequest.id,
        service: serviceRequest.title,
        category: getCategoryName(serviceRequest.category_id),
        date: serviceRequest.date || fallbackRequest.date,
        time: serviceRequest.time || fallbackRequest.time,
        location: serviceRequest.job_location || fallbackRequest.location,
        fullAddress: serviceRequest.job_location || fallbackRequest.fullAddress,
        estimatedDuration: fallbackRequest.estimatedDuration,
        pricing: `₱${serviceRequest.rate.toLocaleString()}`,
        paymentMethods: fallbackRequest.paymentMethods,
        description: serviceRequest.description,
        qualifications: serviceRequest.additional_requirements
          ? serviceRequest.additional_requirements
              .split('\n')
              .filter(line => line.trim() !== '')
          : fallbackRequest.qualifications,
        attachedPhotos:
          serviceRequest.images && serviceRequest.images.length > 0
            ? serviceRequest.images
            : fallbackRequest.attachedPhotos,
        client: serviceRequest.users
          ? {
              name:
                serviceRequest.users.full_name || fallbackRequest.client.name,
              initials:
                serviceRequest.users.full_name
                  ?.split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase() || fallbackRequest.client.initials,
              rating: fallbackRequest.client.rating,
              reviewCount: fallbackRequest.client.reviewCount,
              verified: fallbackRequest.client.verified,
              // Prioritize: 1. Profile phone, 2. Service request contact, 3. Fallback
              phone:
                serviceRequest.users.phone ||
                serviceRequest.contact ||
                fallbackRequest.client.phone,
              email: serviceRequest.users.email || fallbackRequest.client.email,
              memberSince: serviceRequest.users.created_at
                ? formatMemberSince(serviceRequest.users.created_at)
                : fallbackRequest.client.memberSince,
              completedBookings: fallbackRequest.client.completedBookings,
              avatar:
                serviceRequest.users.avatar_url ||
                fallbackRequest.client.avatar,
            }
          : fallbackRequest.client,
      }
    : fallbackRequest;

  const handleAccept = () => {
    setStatus('pending');
    // TODO: Implement accept request logic
    router.push(`/provider/jobs/${jobId}/apply`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hanapp-primary"></div>
      </div>
    );
  }

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
