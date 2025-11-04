'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ContactInformationSection } from '../../../../components/request-job-listing/request-contact';
import { JobDetailsSection } from '../../../../components/request-job-listing/request-job-details';
import { LocationAvailabilitySection } from '../../../../components/request-job-listing/request-locations';
import { ImageUploadSection } from '../../../../components/request-job-listing/request-media';
import { PricingInformationSection } from '../../../../components/request-job-listing/request-pricing';
import { TermsSubmitSection } from '../../../../components/request-job-listing/request-terms';
import { useAuth } from '../../../../lib/hooks/useAuth';

interface FormData {
  title: string;
  categoryId: string;
  description: string;
  additionalRequirements: string;
  rate: number;
  contact: string;
  jobLocation: string;
  jobDate: string;
  jobTimeStart: string;
  jobTimeEnd: string;
  images: string[];
}

export default function RequestServicePage() {
  const router = useRouter();
  const { user } = useAuth(); // Get logged in user
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    categoryId: '',
    description: '',
    additionalRequirements: '',
    rate: 0,
    contact: '',
    jobLocation: '',
    jobDate: '',
    jobTimeStart: '',
    jobTimeEnd: '',
    images: [],
  });

  const updateFormData = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.categoryId || !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      // Check if user is logged in
      if (!user?.id) {
        throw new Error('You must be logged in to create a service request');
      }

      // Get user's auth token
      const {
        data: { session },
      } = await (
        await import('../../../../lib/supabase/client')
      ).supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error('No valid session found');
      }

      const response = await fetch(
        'http://localhost:3001/api/service-requests',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`, // Send user's auth token
          },
          body: JSON.stringify({
            clientId: user.id, // Use logged-in user's ID
            categoryId: Number(formData.categoryId), // Convert string to number
            title: formData.title,
            description: formData.description,
            additional_requirements: formData.additionalRequirements, // Additional requirements
            rate: Number(formData.rate),
            contact: formData.contact,
            jobLocation: formData.jobLocation,
            jobDate: formData.jobDate,
            jobTime: formData.jobTimeStart, // Start time
            jobTime2: formData.jobTimeEnd, // End time
            images: formData.images,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        console.error('Status:', response.status);

        // Show validation errors if available
        const errorMessage = errorData.message
          ? Array.isArray(errorData.message)
            ? errorData.message.join(', ')
            : errorData.message
          : `Failed to create service request: ${response.status}`;

        throw new Error(errorMessage);
      }

      await response.json();

      // Redirect to bookings or success page
      router.push('/bookings');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error creating service request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-5xl font-bold mb-1"
            style={{
              background: 'linear-gradient(to right, #102E50, #2469B6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Request A Service
          </h1>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <JobDetailsSection
              formData={formData}
              updateFormData={updateFormData}
            />
            <LocationAvailabilitySection
              formData={formData}
              updateFormData={updateFormData}
            />
            <ImageUploadSection
              formData={formData}
              updateFormData={updateFormData}
            />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <PricingInformationSection
              formData={formData}
              updateFormData={updateFormData}
            />
            <ContactInformationSection
              formData={formData}
              updateFormData={updateFormData}
            />
            <TermsSubmitSection
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
