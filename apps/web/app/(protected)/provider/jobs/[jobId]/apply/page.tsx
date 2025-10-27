'use client';

import React from 'react';

import JobDetailsCard from '../../../../../../components/job-application/job-application-details';
import JobApplicationForm from '../../../../../../components/job-application/job-application-form';
const JOB_DETAILS = {
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

export default function JobApplicationPage() {
  const handleApplicationSubmit = (
    qualifications: string,
    experience: string
  ) => {
    console.log('Submitted qualifications:', qualifications);
    console.log('Submitted experience:', experience);
    // TODO: send to API
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Job Details */}
          <div>
            <JobDetailsCard job={JOB_DETAILS} />
          </div>

          {/* Right Column - Application Form */}
          <div>
            <JobApplicationForm onSubmit={handleApplicationSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
