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
import { useAuth } from '../../../lib/hooks/useAuth';
import { supabase } from '../../../lib/supabase/client';

interface BookingDetails {
  id: number;
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
}

// Hardcoded data as fallback
const hardcodedBookings = {
  sent: [
    {
      id: 8,
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
  const [activeTab, setActiveTab] = useState('sent'); // Start with 'sent' tab for new posts
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [bookingsData, setBookingsData] = useState<{
    sent: BookingDetails[];
    received: BookingDetails[];
    ongoing: BookingDetails[];
    past: BookingDetails[];
    cancelled: BookingDetails[];
  }>(hardcodedBookings);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Check if we need to refresh data
  useEffect(() => {
    const shouldRefresh = searchParams.get('refresh');
    if (shouldRefresh === 'true') {
      setRefreshTrigger(prev => prev + 1);
    }
  }, [searchParams]);

  // Function to trigger data refresh
  const handleDelete = () => {
    setRefreshTrigger(prev => prev + 1);
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
          console.error('No session token available');
          setIsLoading(false);
          return;
        }

        // Fetch service requests created by the user (where client_id matches user.id)
        const response = await fetch(
          `http://localhost:3001/api/service-requests?clientId=${user.id}`,
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

        // Transform API data to BookingDetails format
        const transformedBookings: BookingDetails[] = serviceRequests.map(
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
            };
          }
        );

        // Categorize fetched bookings by status
        const fetchedCategorized = {
          sent: transformedBookings.filter(b => b.status === 'Pending'),
          ongoing: transformedBookings.filter(
            b => b.status === 'Accepted' || b.status === 'Paid'
          ),
          past: transformedBookings.filter(b => b.status === 'Completed'),
          cancelled: transformedBookings.filter(
            b => b.status === 'Cancelled' || b.status === 'Rejected'
          ),
        };

        // Merge with hardcoded data
        setBookingsData({
          sent: [...fetchedCategorized.sent, ...hardcodedBookings.sent],
          received: hardcodedBookings.received, // Keep hardcoded for received
          ongoing: [
            ...fetchedCategorized.ongoing,
            ...hardcodedBookings.ongoing,
          ],
          past: [...fetchedCategorized.past, ...hardcodedBookings.past],
          cancelled: [
            ...fetchedCategorized.cancelled,
            ...hardcodedBookings.cancelled,
          ],
        });
      } catch (error) {
        console.error('Error fetching bookings:', error);
        // Keep hardcoded data on error
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
                value="sent"
                className="data-[state=active]:text-white relative rounded-md transition-all py-3 px-4 text-base font-medium"
                style={{
                  background:
                    activeTab === 'sent'
                      ? 'linear-gradient(135deg, #102E50 0%, #014182 100%)'
                      : 'transparent',
                }}
              >
                Sent
                {bookingsData.sent.length > 0 && (
                  <Badge className="ml-2 bg-hanapp-accent text-hanapp-secondary text-sm rounded-full tabular-nums pointer-events-none">
                    {bookingsData.sent.length}
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
                Past
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

            <TabsContent value="sent" className="space-y-4">
              {bookingsData.sent.length > 0 ? (
                bookingsData.sent.map(booking => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    tabContext="sent"
                    onDelete={handleDelete}
                  ></BookingCard>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-14 h-14 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">
                    No bookings sent
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
                    No past bookings
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
