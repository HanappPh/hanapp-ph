'use client';

import React, { useEffect, useState } from 'react';

import JobDetailsCard from '../../../../../../components/job-application/job-application-details';
import JobApplicationForm from '../../../../../../components/job-application/job-application-form';
import { fetchServiceRequestById } from '../../../../../../lib/api/serviceRequests';

// Category ID to name mapping
const CATEGORY_NAMES: Record<number, string> = {
  1: 'Cleaning',
  2: 'Tutoring',
  3: 'Repair',
  4: 'Delivery',
};

// Fallback hardcoded data
const FALLBACK_JOB_DETAILS = {
  id: 'REQ-2024-001',
  service: 'AC Cleaning Service',
  category: 'Air Conditioning',
  date: 'March 15, 2024',
  time: '2:00 PM - 4:00 PM',
  location: 'Tanza, Cavite',
  fullAddress: '123 Main Street, Barangay Bagtas, Tanza, Cavite',
  estimatedDuration: '2 hours',
  pricing: '₱499',
  description:
    'Need professional AC cleaning service for 2 split-type units. Units have not been cleaned for 6 months. Looking for thorough cleaning including filters, coils, and drainage.',
  qualifications: [
    'Please bring ladder (units are wall-mounted)',
    'Prefer eco-friendly cleaning solutions',
    'Need service completed before 5 PM',
  ],
  attachedPhotos: [],
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

interface JobApplicationPageProps {
  params: {
    jobId: string;
  };
}

export default function JobApplicationPage({
  params,
}: JobApplicationPageProps) {
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchServiceRequestById(params.jobId);

        if (!data) {
          throw new Error('Failed to fetch job details');
        }

        // Transform API data to match the component format (same as job details page)
        const transformedData = {
          id: data.id,
          service: data.title,
          category: CATEGORY_NAMES[data.category_id] || 'Other',
          date: data.date || FALLBACK_JOB_DETAILS.date,
          time:
            data.time && data.time_2
              ? `${data.time} - ${data.time_2}`
              : data.time || FALLBACK_JOB_DETAILS.time,
          location: data.job_location || FALLBACK_JOB_DETAILS.location,
          fullAddress: data.job_location || FALLBACK_JOB_DETAILS.fullAddress,
          estimatedDuration: FALLBACK_JOB_DETAILS.estimatedDuration,
          pricing: `₱${data.rate?.toLocaleString() || '0'}`,
          description: data.description,
          qualifications: data.additional_requirements
            ? data.additional_requirements
                .split('\n')
                .filter((line: string) => line.trim() !== '')
            : FALLBACK_JOB_DETAILS.qualifications,
          attachedPhotos: [], // Don't display images as requested
          client: {
            name: data.users?.full_name || FALLBACK_JOB_DETAILS.client.name,
            initials: data.users?.full_name
              ? data.users.full_name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .toUpperCase()
              : FALLBACK_JOB_DETAILS.client.initials,
            rating: FALLBACK_JOB_DETAILS.client.rating,
            reviewCount: FALLBACK_JOB_DETAILS.client.reviewCount,
            verified: FALLBACK_JOB_DETAILS.client.verified,
            // Prioritize: 1. Profile phone, 2. Service request contact, 3. Fallback
            phone:
              data.users?.phone ||
              data.contact ||
              FALLBACK_JOB_DETAILS.client.phone,
            email: data.users?.email || FALLBACK_JOB_DETAILS.client.email,
            memberSince: data.users?.created_at
              ? new Date(data.users.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })
              : FALLBACK_JOB_DETAILS.client.memberSince,
            completedBookings: FALLBACK_JOB_DETAILS.client.completedBookings,
            avatar:
              data.users?.avatar_url || FALLBACK_JOB_DETAILS.client.avatar,
          },
        };

        setJobDetails(transformedData);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details');
        // Use fallback data on error
        setJobDetails(FALLBACK_JOB_DETAILS);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [params.jobId]);

  const handleApplicationSubmit = (
    qualifications: string,
    experience: string
  ) => {
    console.log('Submitted qualifications:', qualifications);
    console.log('Submitted experience:', experience);
    // TODO: send to API
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
            {error} - Showing sample data
          </div>
        )}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Job Details */}
          <div>
            <JobDetailsCard job={jobDetails} />
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
