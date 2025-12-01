'use client';

import {
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@hanapp-ph/commons';
import { Clock, Calendar } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import BookingCard from '../../../components/booking/booking-cards';
import {
  fetchSentApplications,
  fetchReceivedApplications,
} from '../../../lib/api/jobApplications';
import { useAuth } from '../../../lib/hooks/useAuth';
import { supabase } from '../../../lib/supabase/client';

interface BookingDetails {
  id: number | string;
  serviceId: number;
  serviceName: string;
  providerName: string;
  rating: number;
  reviewCount: number;
  price: number;
  date: string;
  time: string;
  location: string;
  status:
    | 'Pending'
    | 'Accepted'
    | 'Paid'
    | 'Completed'
    | 'Rejected'
    | 'Cancelled';
  serviceImage?: string;
  providerImage?: string;
  userRole?: 'provider' | 'client';
  providerId?: string;
  clientId?: string;
  serviceRequestId?: number | string;
  isProviderFinished?: boolean;
}

// Hardcoded data as fallback
const hardcodedBookings = {
  requested: [
    {
      id: 8,
      serviceId: 1,
      serviceName: 'Garden Maintenance',
      providerName: 'Green Thumb Services',
      providerImage: '/landscaper-cutting-grass.jpg',
      rating: 4.5,
      reviewCount: 67,
      price: 500,
      date: '2024-01-18',
      time: '8:00 AM',
      location: 'Paranaque City',
      status: 'Pending' as const,
      serviceImage: '/landscaper-cutting-grass.jpg',
    },
    {
      id: 9,
      serviceId: 2,
      serviceName: 'Computer Repair',
      providerName: 'Tech Solutions',
      providerImage: '/phone-and-tablet-repair.png',
      rating: 4.7,
      reviewCount: 134,
      price: 750,
      date: '2024-01-20',
      time: '3:00 PM',
      location: 'Makati City',
      status: 'Pending' as const,
      serviceImage: '/phone-and-tablet-repair.png',
    },
  ],
  received: [
    {
      id: 10,
      serviceId: 3,
      serviceName: 'Photography Session',
      providerName: 'Capture Moments',
      providerImage: '/woman-using-phone.jpg',
      rating: 4.9,
      reviewCount: 178,
      price: 1200,
      date: '2024-01-22',
      time: '10:00 AM',
      location: 'BGC, Taguig',
      status: 'Pending' as const,
      serviceImage: '/woman-using-phone.jpg',
    },
    {
      id: 11,
      serviceId: 4,
      serviceName: 'Massage Therapy',
      providerName: 'Relax & Heal Spa',
      providerImage: '/nanny-with-child.jpg',
      rating: 4.8,
      reviewCount: 92,
      price: 800,
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Ortigas, Pasig',
      status: 'Pending' as const,
      serviceImage: '/woman-smiling.jpg',
    },
  ],
  ongoing: [
    {
      id: 1,
      serviceId: 5,
      serviceName: 'House Cleaning',
      providerName: 'Joven Salon',
      providerImage: '/cleaning-service-provider.jpg',
      rating: 4.9,
      reviewCount: 127,
      price: 450,
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Makati, Manila',
      status: 'Accepted' as const,
      serviceImage: '/house-cleaning-service.png',
    },
    {
      id: 2,
      serviceId: 6,
      serviceName: 'Tutoring Session',
      providerName: 'Maria Santos',
      providerImage: '/tutor-teacher.jpg',
      rating: 4.8,
      reviewCount: 89,
      price: 350,
      date: '2024-01-16',
      time: '2:00 PM',
      location: 'Quezon City',
      status: 'Pending' as const,
      serviceImage: '/tutoring-education.jpg',
    },
    {
      id: 3,
      serviceId: 6,
      serviceName: 'Tutoring Session',
      providerName: 'Maria Santos',
      providerImage: '/tutor-teacher.jpg',
      rating: 4.8,
      reviewCount: 89,
      price: 350,
      date: '2024-01-16',
      time: '2:00 PM',
      location: 'Quezon City',
      status: 'Paid' as const,
      serviceImage: '/tutoring-education.jpg',
    },
  ],
  past: [
    {
      id: 4,
      serviceId: 7,
      serviceName: 'Laundry Service',
      providerName: 'Clean Express',
      providerImage: '/laundry-service.png',
      rating: 4.7,
      reviewCount: 203,
      price: 280,
      date: '2024-01-10',
      time: '9:00 AM',
      location: 'Pasig City',
      status: 'Completed' as const,
      serviceImage: '/laundry-washing.jpg',
    },
    {
      id: 5,
      serviceId: 8,
      serviceName: 'Home Repair',
      providerName: 'Fix It Pro',
      providerImage: '/handyman-repair.jpg',
      rating: 4.9,
      reviewCount: 156,
      price: 650,
      date: '2024-01-08',
      time: '1:00 PM',
      location: 'Taguig City',
      status: 'Completed' as const,
      serviceImage: '/home-repair-tools.jpg',
    },
  ],
  cancelled: [
    {
      id: 6,
      serviceId: 9,
      serviceName: 'Pet Grooming',
      providerName: 'Paws & Claws',
      providerImage: '/pet-grooming.png',
      rating: 4.6,
      reviewCount: 94,
      price: 400,
      date: '2024-01-12',
      time: '11:00 AM',
      location: 'Mandaluyong',
      status: 'Cancelled' as const,
      serviceImage: '/pet-grooming-dog.jpg',
    },
    {
      id: 7,
      serviceId: 9,
      serviceName: 'Pet Grooming',
      providerName: 'Paws & Claws',
      providerImage: '/pet-grooming.png',
      rating: 4.6,
      reviewCount: 94,
      price: 400,
      date: '2024-01-12',
      time: '11:00 AM',
      location: 'Mandaluyong',
      status: 'Rejected' as const,
      serviceImage: '/pet-grooming-dog.jpg',
    },
  ],
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('requested'); // Default to requested tab
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [bookingsData, setBookingsData] = useState<{
    requested: BookingDetails[];
    received: BookingDetails[];
    ongoing: BookingDetails[];
    past: BookingDetails[];
    cancelled: BookingDetails[];
  }>(hardcodedBookings);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [finishedBookings, setFinishedBookings] = useState<
    Set<number | string>
  >(new Set());

  // Check if we need to refresh data and set active tab
  useEffect(() => {
    const shouldRefresh = searchParams.get('refresh');
    const tabParam = searchParams.get('tab');

    if (tabParam) {
      setActiveTab(tabParam);
    }

    if (shouldRefresh === 'true') {
      setRefreshTrigger(prev => prev + 1);
    }
  }, [searchParams]);

  // Function to handle cancelling from requested tab (moves to cancelled)
  const handleCancelFromRequested = (bookingId: number | string) => {
    setBookingsData(prev => {
      // Find the booking in requested
      const bookingToCancel = prev.requested.find(b => b.id === bookingId);
      if (!bookingToCancel) {
        return prev;
      }

      // Update status to Cancelled
      const cancelledBooking = {
        ...bookingToCancel,
        status: 'Cancelled' as const,
      };

      return {
        ...prev,
        requested: prev.requested.filter(b => b.id !== bookingId),
        cancelled: [cancelledBooking, ...prev.cancelled],
      };
    });

    // Trigger a refresh to sync with server state
    setRefreshTrigger(prev => prev + 1);
  };

  // Function to handle confirming a booking (moves from received to ongoing)
  const handleConfirm = (bookingId: number | string) => {
    setBookingsData(prev => {
      // Find the booking in received
      const bookingToConfirm = prev.received.find(b => b.id === bookingId);
      if (!bookingToConfirm) {
        return prev;
      }

      // Update status to Accepted
      const confirmedBooking = {
        ...bookingToConfirm,
        status: 'Accepted' as const,
      };

      // Extract service request ID from the application ID if it exists
      // Application IDs are in format "app-{id}", we need to find the matching service request
      const serviceRequestId = bookingToConfirm.serviceId;

      return {
        ...prev,
        // Remove from received tab
        received: prev.received.filter(b => b.id !== bookingId),
        // Remove from requested tab if there's a matching service request
        requested: prev.requested.filter(
          b => b.serviceId !== serviceRequestId && b.id !== serviceRequestId
        ),
        // Add to ongoing
        ongoing: [confirmedBooking, ...prev.ongoing],
      };
    });

    // Trigger a refresh to sync with server state
    setRefreshTrigger(prev => prev + 1);
  };

  // Function to handle deleting a booking (moves from received to cancelled)
  const handleDeleteFromReceived = (bookingId: number | string) => {
    setBookingsData(prev => {
      // Find the booking in received
      const bookingToDelete = prev.received.find(b => b.id === bookingId);
      if (!bookingToDelete) {
        return prev;
      }

      // Update status to Rejected (for applications) or Cancelled
      const newStatus: BookingDetails['status'] = String(bookingId).startsWith(
        'app-'
      )
        ? 'Rejected'
        : 'Cancelled';

      const cancelledBooking = {
        ...bookingToDelete,
        status: newStatus,
      };

      return {
        ...prev,
        received: prev.received.filter(b => b.id !== bookingId),
        cancelled: [cancelledBooking, ...prev.cancelled],
      };
    });

    // Trigger a refresh to sync with server state
    setRefreshTrigger(prev => prev + 1);
  };

  // Function to handle finishing a booking (provider marks as finished)
  const handleFinishBooking = async (bookingId: number | string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        alert('Authentication required');
        return;
      }

      // Find the booking to get the service request ID
      const booking = bookingsData.ongoing.find(b => b.id === bookingId);
      if (!booking || !booking.serviceRequestId) {
        console.error('Booking or service request ID not found');
        return;
      }

      // Update service request in database to mark as provider finished
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/service-requests/${booking.serviceRequestId}/finish`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            providerId: user?.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      // Update local state
      setFinishedBookings(prev => new Set(prev).add(bookingId));

      // Update the booking data to reflect the change
      setBookingsData(prev => ({
        ...prev,
        ongoing: prev.ongoing.map(b =>
          b.id === bookingId ? { ...b, isProviderFinished: true } : b
        ),
      }));
    } catch (error) {
      console.error('Error finishing booking:', error);
      alert('Failed to finish booking. Please try again.');
    }
  };

  // Function to handle releasing payment (moves from ongoing to completed)
  const handleReleasePayment = async (bookingId: number | string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        alert('Authentication required');
        return;
      }

      // Find the booking to get the service request ID
      const booking = bookingsData.ongoing.find(b => b.id === bookingId);
      if (!booking || !booking.serviceRequestId) {
        console.error('Booking or service request ID not found');
        return;
      }

      // Update service request status to completed in database
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/service-requests/${booking.serviceRequestId}/complete`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            clientId: user?.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      // Update local state
      setBookingsData(prev => {
        // Find the booking in ongoing
        const bookingToComplete = prev.ongoing.find(b => b.id === bookingId);
        if (!bookingToComplete) {
          return prev;
        }

        // Update status to Completed
        const completedBooking = {
          ...bookingToComplete,
          status: 'Completed' as const,
        };

        return {
          ...prev,
          ongoing: prev.ongoing.filter(b => b.id !== bookingId),
          past: [completedBooking, ...prev.past],
        };
      });

      // Remove from finished bookings set
      setFinishedBookings(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookingId);
        return newSet;
      });

      // Trigger a refresh to sync with server state
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error releasing payment:', error);
      alert('Failed to release payment. Please try again.');
    }
  };

  // Fetch service requests from the API and merge with hardcoded data
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          setIsLoading(false);
          return;
        }

        // Fetch service requests created by the user (where client_id matches user.id)
        const port = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `${port}/api/service-requests?clientId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const serviceRequests = await response.json();

        // Fetch job applications sent by the user (as provider)
        const sentApplications = await fetchSentApplications(user.id);

        // Fetch job applications received by the user (as client)
        const receivedApplications = await fetchReceivedApplications(user.id);

        // Transform service requests to BookingDetails format
        const transformedServiceRequests: BookingDetails[] =
          serviceRequests.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (request: any) => {
              // Map lowercase database status to capitalized UI status
              const statusMap: Record<string, BookingDetails['status']> = {
                pending: 'Pending',
                approved: 'Accepted',
                accepted: 'Accepted',
                paid: 'Paid',
                completed: 'Completed',
                rejected: 'Rejected',
                cancelled: 'Cancelled',
              };

              return {
                id: request.id,
                serviceId: request.id,
                serviceName: request.title,
                providerName: request.users?.full_name || 'Unknown',
                rating: 0, // Default for now
                reviewCount: 0, // Default for now
                price: request.rate,
                date: request.date,
                time: `${request.time} - ${request.time_2}`,
                location: request.job_location,
                status: statusMap[request.status?.toLowerCase()] || 'Pending',
                serviceImage:
                  request.images?.[0] || '/cleaning-service-provider.jpg',
                providerImage:
                  request.users?.avatar_url || '/cleaning-service-provider.jpg',
                userRole: 'client' as const,
                serviceRequestId: request.id,
                clientId: request.client_id,
                providerId: request.provider_id,
                isProviderFinished: request.is_provider_finished || false,
              };
            }
          );

        // Transform sent job applications to BookingDetails format
        const transformedSentApplications: BookingDetails[] =
          sentApplications.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (application: any) => {
              const statusMap: Record<string, BookingDetails['status']> = {
                pending: 'Pending',
                accepted: 'Accepted',
                rejected: 'Rejected',
                withdrawn: 'Cancelled',
              };

              const serviceRequest = application.service_requests;

              return {
                id: `app-${application.id}`,
                serviceId: serviceRequest?.id || 0,
                serviceName: serviceRequest?.title || 'Unknown Service',
                providerName: 'Client', // Will show client name, we don't have it in the query
                rating: 0,
                reviewCount: 0,
                price: serviceRequest?.rate || 0,
                date: serviceRequest?.date || 'N/A',
                time:
                  serviceRequest?.time && serviceRequest?.time_2
                    ? `${serviceRequest.time} - ${serviceRequest.time_2}`
                    : serviceRequest?.time || 'N/A',
                location: serviceRequest?.job_location || 'Unknown',
                status: statusMap[application.status] || 'Pending',
                serviceImage:
                  serviceRequest?.images?.[0] ||
                  '/cleaning-service-provider.jpg',
                providerImage: '/cleaning-service-provider.jpg',
                userRole: 'provider' as const,
                serviceRequestId: serviceRequest?.id,
                clientId: serviceRequest?.client_id,
                providerId: application.provider_id,
                isProviderFinished:
                  serviceRequest?.is_provider_finished || false,
              };
            }
          );

        // Transform received job applications to BookingDetails format
        const transformedReceivedApplications: BookingDetails[] =
          receivedApplications.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (application: any) => {
              const statusMap: Record<string, BookingDetails['status']> = {
                pending: 'Pending',
                accepted: 'Accepted',
                rejected: 'Rejected',
                withdrawn: 'Cancelled',
              };

              const serviceRequest = application.service_requests;

              return {
                id: `app-${application.id}`,
                serviceId: serviceRequest?.id || 0,
                serviceName: serviceRequest?.title || 'Unknown Service',
                providerName: 'Provider', // We don't have provider info in simplified query
                rating: 0,
                reviewCount: 0,
                price: serviceRequest?.rate || 0,
                date: serviceRequest?.date || 'N/A',
                time:
                  serviceRequest?.time && serviceRequest?.time_2
                    ? `${serviceRequest.time} - ${serviceRequest.time_2}`
                    : serviceRequest?.time || 'N/A',
                location: serviceRequest?.job_location || 'Unknown',
                status: statusMap[application.status] || 'Pending',
                serviceImage:
                  serviceRequest?.images?.[0] ||
                  '/cleaning-service-provider.jpg',
                providerImage: '/cleaning-service-provider.jpg',
                userRole: 'client' as const,
                serviceRequestId: serviceRequest?.id,
                clientId: serviceRequest?.client_id,
                providerId: application.provider_id,
                isProviderFinished:
                  serviceRequest?.is_provider_finished || false,
              };
            }
          );

        // Categorize service requests by status
        const categorizedServiceRequests = {
          pending: transformedServiceRequests.filter(
            b => b.status === 'Pending'
          ),
          ongoing: transformedServiceRequests.filter(
            b => b.status === 'Accepted' || b.status === 'Paid'
          ),
          past: transformedServiceRequests.filter(
            b => b.status === 'Completed'
          ),
          cancelled: transformedServiceRequests.filter(
            b => b.status === 'Cancelled' || b.status === 'Rejected'
          ),
        };

        // Categorize sent applications by status
        const categorizedSentApplications = {
          pending: transformedSentApplications.filter(
            b => b.status === 'Pending'
          ),
          ongoing: transformedSentApplications.filter(
            b => b.status === 'Accepted'
          ),
          cancelled: transformedSentApplications.filter(
            b => b.status === 'Rejected' || b.status === 'Cancelled'
          ),
        };

        // Categorize received applications by status
        const categorizedReceivedApplications = {
          pending: transformedReceivedApplications.filter(
            b => b.status === 'Pending'
          ),
          ongoing: transformedReceivedApplications.filter(
            b => b.status === 'Accepted'
          ),
          cancelled: transformedReceivedApplications.filter(
            b => b.status === 'Rejected' || b.status === 'Cancelled'
          ),
        };

        setBookingsData({
          requested: [
            ...categorizedSentApplications.pending,
            ...categorizedServiceRequests.pending,
            ...hardcodedBookings.requested,
          ],
          received: [
            ...categorizedReceivedApplications.pending,
            ...hardcodedBookings.received,
          ],
          ongoing: [
            ...categorizedSentApplications.ongoing,
            ...categorizedReceivedApplications.ongoing,
            ...categorizedServiceRequests.ongoing,
            ...hardcodedBookings.ongoing,
          ],
          past: [...categorizedServiceRequests.past, ...hardcodedBookings.past],
          cancelled: [
            ...categorizedSentApplications.cancelled,
            ...categorizedReceivedApplications.cancelled,
            ...categorizedServiceRequests.cancelled,
            ...hardcodedBookings.cancelled,
          ],
        });

        // Initialize finished bookings set from database
        const finishedIds = new Set<number | string>();
        [
          ...categorizedSentApplications.ongoing,
          ...categorizedReceivedApplications.ongoing,
          ...categorizedServiceRequests.ongoing,
        ].forEach(booking => {
          if (booking.isProviderFinished) {
            finishedIds.add(booking.id);
          }
        });
        setFinishedBookings(finishedIds);
      } catch (error) {
        // Keep hardcoded data on error
        console.error('Error fetching bookings:', error);
        setBookingsData(hardcodedBookings);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id, refreshTrigger]); // Re-fetch when refreshTrigger changes

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-hanapp-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="pt-10 pb-4">
        <div className="max-w-6xl mx-auto px-6">
          <h1
            className="text-4xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #102E50 0%, #014182 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            My Bookings
          </h1>
        </div>
      </div>

      <div>
        <div className="max-w-6xl mx-auto p-6 pb-10">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full h-full grid-cols-5 mb-8 bg-gray-100 rounded-lg p-2 text-base">
              <TabsTrigger
                value="requested"
                className="data-[state=active]:text-white relative rounded-md transition-all py-3 px-4 text-base font-medium"
                style={{
                  background:
                    activeTab === 'requested'
                      ? 'linear-gradient(135deg, #102E50 0%, #014182 100%)'
                      : 'transparent',
                }}
              >
                Requested
                {bookingsData.requested.length > 0 && (
                  <Badge className="ml-2 bg-hanapp-accent text-hanapp-secondary text-sm rounded-full tabular-nums pointer-events-none">
                    {bookingsData.requested.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="received"
                className="data-[state=active]:text-white relative rounded-md transition-all py-3 px-4 text-base font-medium"
                style={{
                  background:
                    activeTab === 'received'
                      ? 'linear-gradient(135deg, #102E50 0%, #014182 100%)'
                      : 'transparent',
                }}
              >
                Received
                {bookingsData.received.length > 0 && (
                  <Badge className="ml-2 bg-hanapp-accent text-hanapp-secondary text-sm rounded-full tabular-nums pointer-events-none">
                    {bookingsData.received.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="ongoing"
                className="data-[state=active]:text-white relative rounded-md transition-all py-3 px-4 text-base font-medium"
                style={{
                  background:
                    activeTab === 'ongoing'
                      ? 'linear-gradient(135deg, #102E50 0%, #014182 100%)'
                      : 'transparent',
                }}
              >
                Ongoing
                {bookingsData.ongoing.length > 0 && (
                  <Badge className="ml-2 bg-hanapp-accent text-hanapp-secondary text-sm rounded-full tabular-nums pointer-events-none">
                    {bookingsData.ongoing.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:text-white rounded-md transition-all py-3 px-4 text-base font-medium"
                style={{
                  background:
                    activeTab === 'past'
                      ? 'linear-gradient(135deg, #102E50 0%, #014182 100%)'
                      : 'transparent',
                }}
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="data-[state=active]:text-white rounded-md transition-all py-3 px-4 text-base font-medium"
                style={{
                  background:
                    activeTab === 'cancelled'
                      ? 'linear-gradient(135deg, #102E50 0%, #014182 100%)'
                      : 'transparent',
                }}
              >
                Cancelled
                {bookingsData.cancelled.length > 0 && (
                  <Badge className="ml-2 bg-red-100 text-red-800 text-sm rounded-full tabular-nums pointer-events-none">
                    {bookingsData.cancelled.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requested" className="space-y-4">
              {bookingsData.requested.length > 0 ? (
                bookingsData.requested.map(booking => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    tabContext="requested"
                    onDelete={() => handleCancelFromRequested(booking.id)}
                  ></BookingCard>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-14 h-14 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">
                    No bookings requested
                  </h3>
                  <p className="text-lg text-gray-500 mb-6">
                    Book a service to see your pending requests here
                  </p>
                  <Button className="bg-hanapp-primary hover:bg-hanapp-secondary text-white px-6 py-3 text-base">
                    Browse Services
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="received" className="space-y-4">
              {bookingsData.received.length > 0 ? (
                bookingsData.received.map(booking => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    tabContext="received"
                    onConfirm={() => handleConfirm(booking.id)}
                    onDelete={() => handleDeleteFromReceived(booking.id)}
                  ></BookingCard>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-14 h-14 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">
                    No bookings received
                  </h3>
                  <p className="text-lg text-gray-500 mb-6">
                    Book a service to see your pending applications here
                  </p>
                  <Button className="bg-hanapp-primary hover:bg-hanapp-secondary text-white px-6 py-3 text-base">
                    Browse Services
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ongoing" className="space-y-4">
              {bookingsData.ongoing.length > 0 ? (
                bookingsData.ongoing.map(booking => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    tabContext="ongoing"
                    onFinishBooking={() => handleFinishBooking(booking.id)}
                    onReleasePayment={() => handleReleasePayment(booking.id)}
                    isFinished={finishedBookings.has(booking.id)}
                  ></BookingCard>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-14 h-14 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">
                    No ongoing bookings
                  </h3>
                  <p className="text-lg text-gray-500 mb-6">
                    Book a service to see your ongoing appointments here
                  </p>
                  <Button className="bg-hanapp-primary hover:bg-hanapp-secondary text-white px-6 py-3 text-base">
                    Browse Services
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {bookingsData.past.length > 0 ? (
                bookingsData.past.map(booking => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    tabContext="past"
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="w-14 h-14 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">
                    No completed bookings
                  </h3>
                  <p className="text-lg text-gray-500">
                    Your completed bookings will appear here
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {bookingsData.cancelled.length > 0 ? (
                bookingsData.cancelled.map(booking => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    tabContext="cancelled"
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-14 h-14 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">
                    No cancelled bookings
                  </h3>
                  <p className="text-lg text-gray-500">
                    Cancelled bookings will appear here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
