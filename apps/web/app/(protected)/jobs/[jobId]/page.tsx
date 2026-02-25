'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

import { JobIdBg } from '../../../../components/jobid/jobid-bg';
import { Sidebar } from '../../../../components/jobid/jobid-cards';
import { PhotosMedia } from '../../../../components/jobid/jobid-media';
import { ReviewsSection } from '../../../../components/jobid/jobid-reviews';
import { ServicesSection } from '../../../../components/jobid/jobid-service';
import {
  fetchServiceListingDetails,
  ServiceListingWithDetails,
} from '../../../../lib/api/serviceListings';
import { useAuth } from '../../../../lib/hooks/useAuth';
export default function ClientJobPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const [listing, setListing] = useState<ServiceListingWithDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [dbReviews, setDbReviews] = useState<
    Array<{
      id: string;
      rating: number;
      comment: string;
      created_at: string;
      client?: { full_name: string; avatar_url?: string };
    }>
  >([]);

  const { session } = useAuth();

  // Fetch reviews for the provider
  const fetchReviews = useCallback(
    async (providerId: string) => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(
          `${apiUrl}/api/reviews/provider/${providerId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.access_token || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setDbReviews(result.reviews || []);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    },
    [session?.access_token]
  );

  // Fetch service listing details on mount
  useEffect(() => {
    const loadListingDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchServiceListingDetails(jobId);
        setListing(data);

        // Fetch reviews for this provider
        if (data?.provider_id) {
          await fetchReviews(data.provider_id);
        }
      } catch (error) {
        console.error('Failed to load listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      loadListingDetails();
    }
  }, [jobId, fetchReviews]);

  // Random FAQ details for demo
  // const faqs = [
  //   {
  //     id: '1',
  //     question: 'How long does a typical AC cleaning take?',
  //     answer: 'Usually 1-2 hours depending on unit type and condition.',
  //   },
  //   {
  //     id: '2',
  //     question: 'Do I need to provide cleaning materials?',
  //     answer: 'No, our technicians bring all necessary tools and solutions.',
  //   },
  //   {
  //     id: '3',
  //     question: 'Is there a warranty for the service?',
  //     answer: 'Yes, we offer a 7-day workmanship warranty.',
  //   },
  //   {
  //     id: '4',
  //     question: 'Can I book same-day service?',
  //     answer: 'Same-day slots are subject to availability and confirmation.',
  //   },
  //   {
  //     id: '5',
  //     question: 'Are chemical solutions safe for my AC?',
  //     answer: 'We use AC-safe chemicals and rinse thoroughly.',
  //   },
  // ];

  // Transform services from database to match the expected format
  const services =
    listing?.services?.map(service => ({
      id: service.id,
      title: service.title,
      price: `₱${service.rate.toLocaleString()}`,
      description: service.description,
      features: [], // Database doesn't have features array currently
      note: service.charge,
      isActive: true,
      isAddon: service.is_addon,
    })) || [];

  // Calculate the minimum price from all services
  const getMinimumPrice = (): string => {
    if (!listing?.services || listing.services.length === 0) {
      return listing?.price_from?.toString() || '0';
    }
    const minRate = Math.min(...listing.services.map(s => s.rate));
    return minRate.toString();
  };

  // Format availability schedule from JSONB
  const formatAvailabilitySchedule = (): string => {
    if (!listing?.availability_schedule) {
      return 'Mon-Sun, 9:00 AM - 7:00 PM';
    }

    try {
      const rawSchedule = listing.availability_schedule;

      // If it's a string, try to parse it as JSON first
      if (typeof rawSchedule === 'string') {
        try {
          const parsed = JSON.parse(rawSchedule);
          const schedule = parsed as Record<string, unknown>;

          // Continue processing with the parsed object
          return processScheduleObject(schedule);
        } catch {
          // If parsing fails, it's just a plain string schedule
          return rawSchedule;
        }
      }

      // If it's already an object, process it directly
      if (typeof rawSchedule === 'object' && rawSchedule !== null) {
        return processScheduleObject(rawSchedule as Record<string, unknown>);
      }

      return 'Mon-Sun, 9:00 AM - 7:00 PM';
    } catch (error) {
      console.error('Error parsing availability schedule:', error);
      return 'Mon-Sun, 9:00 AM - 7:00 PM';
    }
  };

  const processScheduleObject = (
    scheduleObj: Record<string, unknown>
  ): string => {
    try {
      // Check if it has a 'schedule' or 'display' property
      if (
        'schedule' in scheduleObj &&
        typeof scheduleObj.schedule === 'string'
      ) {
        return scheduleObj.schedule;
      }
      if ('display' in scheduleObj && typeof scheduleObj.display === 'string') {
        return scheduleObj.display;
      }

      // Handle the detailed day-by-day format
      const dayOrder = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];
      const dayShortNames: Record<string, string> = {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
      };

      // Check if this is the detailed format with day objects
      const hasDetailedDays = dayOrder.some(day => day in scheduleObj);

      if (hasDetailedDays) {
        // Group consecutive available days with same time
        const availableDays: Array<{
          day: string;
          start: string;
          end: string;
        }> = [];

        dayOrder.forEach(day => {
          const dayData = scheduleObj[day];
          if (
            dayData &&
            typeof dayData === 'object' &&
            dayData !== null &&
            'available' in dayData &&
            (dayData as { available: boolean }).available === true
          ) {
            const dayInfo = dayData as {
              available: boolean;
              start?: string;
              end?: string;
            };
            availableDays.push({
              day,
              start: dayInfo.start || '08:00',
              end: dayInfo.end || '17:00',
            });
          }
        });

        if (availableDays.length === 0) {
          return 'No availability set';
        }

        // Convert 24h to 12h format
        const formatTime = (time: string): string => {
          const [hours, minutes] = time.split(':');
          const hour = parseInt(hours, 10);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
          return `${hour12}:${minutes} ${ampm}`;
        };

        // Group consecutive days with same times
        const groups: Array<{
          days: string[];
          start: string;
          end: string;
        }> = [];
        let currentGroup: {
          days: string[];
          start: string;
          end: string;
        } | null = null;

        availableDays.forEach((dayInfo, index) => {
          if (!currentGroup) {
            currentGroup = {
              days: [dayInfo.day],
              start: dayInfo.start,
              end: dayInfo.end,
            };
          } else if (
            currentGroup.start === dayInfo.start &&
            currentGroup.end === dayInfo.end
          ) {
            // Same time slot, add to current group
            currentGroup.days.push(dayInfo.day);
          } else {
            // Different time slot, start new group
            groups.push(currentGroup);
            currentGroup = {
              days: [dayInfo.day],
              start: dayInfo.start,
              end: dayInfo.end,
            };
          }

          // Push last group
          if (index === availableDays.length - 1 && currentGroup) {
            groups.push(currentGroup);
          }
        });

        // Format groups into readable strings
        const formattedGroups = groups.map(group => {
          const dayNames = group.days.map(d => dayShortNames[d]);

          // Create range if consecutive
          let dayDisplay: string;
          if (dayNames.length === 1) {
            dayDisplay = dayNames[0];
          } else if (dayNames.length === dayOrder.length) {
            dayDisplay = 'Every day';
          } else {
            // Check if consecutive
            const firstIndex = dayOrder.indexOf(group.days[0]);
            const lastIndex = dayOrder.indexOf(
              group.days[group.days.length - 1]
            );
            const isConsecutive =
              lastIndex - firstIndex + 1 === group.days.length &&
              group.days.every(
                (d, i) => dayOrder.indexOf(d) === firstIndex + i
              );

            if (isConsecutive && dayNames.length > 2) {
              dayDisplay = `${dayNames[0]}-${dayNames[dayNames.length - 1]}`;
            } else {
              dayDisplay = dayNames.join(', ');
            }
          }

          const timeDisplay = `${formatTime(group.start)} - ${formatTime(group.end)}`;
          return `${dayDisplay}, ${timeDisplay}`;
        });

        return formattedGroups.join(' | ');
      }

      // If it has days array like ['Mon', 'Tue', ...] and time ranges
      if ('days' in scheduleObj && 'hours' in scheduleObj) {
        const days = Array.isArray(scheduleObj.days)
          ? scheduleObj.days.join(', ')
          : 'Mon-Sun';
        const hours =
          typeof scheduleObj.hours === 'string'
            ? scheduleObj.hours
            : '9:00 AM - 7:00 PM';
        return `${days}, ${hours}`;
      }

      return 'Mon-Sun, 9:00 AM - 7:00 PM';
    } catch (error) {
      console.error('Error parsing availability schedule:', error);
      return 'Mon-Sun, 9:00 AM - 7:00 PM';
    }
  };

  const expectations = [
    'Technicians bring basic tools & cleaning solutions',
    'Protective covers used to keep your space clean',
    'Before/After photo sent upon request',
    "Parking fees, condo permits are customer's responsibility",
    'Additional materials quoted on-site for installs',
    'Service warranty: 7 days for workmanship issues',
  ];

  // Transform database reviews to UI format
  const reviews = dbReviews.map((review, index) => ({
    id: review.id || `${index + 1}`,
    name: review.client?.full_name || 'Anonymous',
    rating: review.rating || 5,
    comment: review.comment || '',
    date: review.created_at
      ? new Date(review.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : 'Recently',
    isEditable: false,
  }));

  // Calculate average rating from reviews
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const totalReviews = reviews.length;

  const handleReviewSubmitted = () => {
    // Refresh reviews after submission
    if (listing?.provider_id) {
      fetchReviews(listing.provider_id);
    }
  };

  const sellerProfile = {
    name: listing?.provider?.full_name || 'Provider',
    phone: listing?.provider?.phone || 'Not available',
    email: listing?.provider?.email || 'Not available',
    positiveRating: '100% positive feedback', // TODO: Add ratings to DB
    joinedDate: listing?.provider?.created_at
      ? `Joined ${new Date(listing.provider.created_at).toLocaleDateString(
          'en-US',
          { month: 'short', year: 'numeric' }
        )}`
      : 'Member',
    jobPreferences: listing?.description || '',
    profileImage:
      listing?.provider?.avatar_url || '/house-cleaning-service.png',
  };

  const sidebarData = {
    pricing: {
      startingPrice: getMinimumPrice(),
      currency: '₱',
    },
    availability: {
      schedule: formatAvailabilitySchedule(),
      notes: 'Same-day slots subject to confirmation.',
    },
    serviceAreas:
      listing?.service_areas?.map((area, index) => ({
        id: (index + 1).toString(),
        name: area,
      })) || [],
    safetyFeatures: [
      { id: '1', text: 'Verified provider (ID + Face)', verified: true },
      { id: '2', text: 'Jobs are GPS-tagged', verified: true },
      { id: '3', text: 'Report issues anytime', verified: true },
    ],
    faqs: [
      {
        id: '1',
        question: 'Do I need to provide water and power?',
        answer: "Yes, please ensure there's a nearby faucet and outlet.",
      },
      {
        id: '2',
        question: 'Is chemical cleaning safe?',
        answer: 'We use AC-safe solutions and rinse thoroughly.',
      },
    ],
  };

  const serviceHeaderData = {
    title: listing?.title || 'Service Listing',
    rating: averageRating,
    totalReviews,
    responseTime: '24 hours',
    location: listing?.service_areas?.[0] || 'Location not specified',
  };

  const sidebarProps = {
    ...serviceHeaderData,
    pricing: sidebarData.pricing,
    availability: sidebarData.availability,
    serviceAreas: sidebarData.serviceAreas,
    safetyFeatures: sidebarData.safetyFeatures,
    schedule: sidebarData.availability.schedule,
    jobId,
  };

  if (loading) {
    return (
      <JobIdBg>
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hanapp-primary"></div>
        </div>
      </JobIdBg>
    );
  }

  if (!listing) {
    return (
      <JobIdBg>
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Listing Not Found
            </h2>
            <p className="text-gray-600">
              The service listing you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </div>
      </JobIdBg>
    );
  }

  return (
    <JobIdBg>
      <div className="min-h-screen w-full overflow-x-hidden">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-3 lg:py-7">
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 h-full">
                <PhotosMedia images={listing?.images} />
              </div>
              <div className="lg:col-span-1 h-full">
                <Sidebar {...sidebarProps} />
              </div>
            </div>
          </div>
          <div>
            <ServicesSection services={services} expectations={expectations} />
            <div className="w-full mt-2 sm:mt-4 lg:mt-6">
              <ReviewsSection
                reviews={reviews}
                sellerProfile={sellerProfile}
                serviceListingId={listing.id}
                onReviewSubmitted={handleReviewSubmitted}
                providerId={listing.provider_id}
              />
            </div>
            {/* <div className="w-full mt-2 sm:mt-4 lg:mt-6">
              <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-[#102E50] text-center mb-4">
                Frequently Asked Questions About Provider
              </h2>
              <JobIdFaq faqs={faqs} />
            </div> */}
          </div>
        </div>
      </div>
    </JobIdBg>
  );
}
