'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { CustomServices } from '../../../../../components/book-job/book-custom-services';
import ScheduleService from '../../../../../components/book-job/book-schedule';
import { SelectServices } from '../../../../../components/book-job/book-select-services';
import { BookingSummaryCard } from '../../../../../components/book-job/book-summary';
import { createBooking } from '../../../../../lib/api/bookings';
import {
  fetchServiceListingDetails,
  ServiceListingWithDetails,
} from '../../../../../lib/api/serviceListings';
import { useAuth } from '../../../../../lib/hooks/useAuth';

interface Service {
  id: string;
  name: string;
  description: string;
  rate: number;
}

export default function BookServicePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const jobId = params.jobId as string;

  const [listing, setListing] = useState<ServiceListingWithDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customServices, setCustomServices] = useState<Service[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Fetch service listing details on mount
  useEffect(() => {
    const loadListingDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchServiceListingDetails(jobId);
        setListing(data);
      } catch (error) {
        console.error('Failed to load listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      loadListingDetails();
    }
  }, [jobId]);

  const baseTotal = selectedServices.reduce((sum, serviceId) => {
    const service = listing?.services.find(s => s.id === serviceId);
    return sum + (service?.rate || 0);
  }, 0);

  const customTotal = customServices.reduce(
    (sum, service) => sum + (Number(service.rate) || 0),
    0
  );

  const total = baseTotal + customTotal;

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const addCustomService = () => {
    const newService: Service = {
      id: `custom-${crypto.randomUUID()}`,
      name: '',
      description: '',
      rate: 0,
    };
    setCustomServices(prev => [...prev, newService]);
  };
  const updateCustomService = (
    id: string,
    field: keyof Service,
    value: string | number
  ) => {
    setCustomServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };
  const removeCustomService = (id: string) => {
    setCustomServices(prev => prev.filter(service => service.id !== id));
  };

  const handleBookingSubmit = async () => {
    if (!listing || !user) {
      console.error('Missing listing or user data');
      return;
    }

    if (selectedServices.length === 0 && customServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    if (!selectedLocation || !selectedTime) {
      alert('Please provide location and time');
      return;
    }

    try {
      setSubmitting(true);

      // Prepare services data
      const services = [
        ...selectedServices.map(serviceId => {
          const service = listing.services.find(s => s.id === serviceId);
          return {
            serviceDetailId: serviceId,
            rate: service?.rate || 0,
            isCustom: false,
          };
        }),
        ...customServices.map(cs => ({
          customServiceName: cs.name,
          customServiceDescription: cs.description,
          rate: cs.rate,
          isCustom: true,
        })),
      ];

      const bookingData = {
        listingId: listing.id,
        providerId: listing.provider_id,
        services,
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        location: selectedLocation,
        contactInfo: user.phone || user.email || '',
        totalPrice: total,
      };

      const result = await createBooking(bookingData);

      if (result.success) {
        // Navigate to bookings page with requested tab active
        router.push('/bookings?tab=requested');
      }
    } catch (error) {
      console.error('Failed to create booking:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F3F5F9] min-h-screen flex items-center justify-center">
        <p className="text-lg text-hanapp-secondary">
          Loading booking details...
        </p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="bg-[#F3F5F9] min-h-screen flex items-center justify-center">
        <p className="text-lg text-hanapp-secondary">
          Service listing not found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F5F9]">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-[#102E50]">
          Book Service: {listing.title}
        </h1>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <SelectServices
              services={listing.services.map(s => ({
                id: s.id,
                name: s.title,
                description: s.description,
                rate: s.rate,
              }))}
              selectedServices={selectedServices}
              toggleService={toggleService}
            />

            {/* Custom Services */}
            <CustomServices
              customServices={customServices}
              addCustomService={addCustomService}
              updateCustomService={updateCustomService}
              removeCustomService={removeCustomService}
            />

            <ScheduleService
              selectedLocation={selectedLocation}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onLocationChange={setSelectedLocation}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          </div>

          {/* Cost Breakdown */}
          <div className="lg:col-span-1">
            <BookingSummaryCard
              selectedServices={listing.services
                .filter(s => selectedServices.includes(s.id))
                .map(s => ({
                  id: s.id,
                  name: s.title,
                  description: s.description,
                  rate: s.rate,
                }))}
              customServices={customServices}
              selectedDate={selectedDate}
              selectedLocation={selectedLocation}
              selectedTime={selectedTime}
              total={total}
              onSubmitBooking={handleBookingSubmit}
              isSubmitting={submitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
