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
import { useState } from 'react';

import BookingCard from '../../../components/booking/booking-cards';
import { RecommendedServices } from '../../../components/recommendations';
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
// Mock data for bookings
const bookingsData: {
  upcoming: BookingDetails[];
  past: BookingDetails[];
  cancelled: BookingDetails[];
} = {
  upcoming: [
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
      status: 'Accepted',
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
      status: 'Pending',
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
      status: 'Paid',
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
      status: 'Completed',
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
      status: 'Completed',
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
      status: 'Cancelled',
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
      status: 'Rejected',
      serviceImage: '/pet-grooming-dog.jpg',
    },
  ],
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <div className="bg-hanapp-gradient text-white p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
          <p className="text-blue-100">
            Track and manage your service bookings
          </p>
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="max-w-lg min-w-sm mx-auto p-4 pb-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full h-full grid-cols-3 mb-6 bg-white border border-gray-200">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-hanapp-primary data-[state=active]:text-white relative"
              >
                Upcoming
                {bookingsData.upcoming.length > 0 && (
                  <Badge className="ml-2 bg-hanapp-accent text-hanapp-secondary text-xs rounded-full tabular-nums">
                    {bookingsData.upcoming.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-hanapp-primary data-[state=active]:text-white"
              >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="data-[state=active]:bg-hanapp-primary data-[state=active]:text-white"
              >
                Cancelled
                {bookingsData.cancelled.length > 0 && (
                  <Badge className="ml-2 bg-red-100 text-red-800 text-xs rounded-full tabular-nums">
                    {bookingsData.cancelled.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {bookingsData.upcoming.length > 0 ? (
                bookingsData.upcoming.map(booking => (
                  <BookingCard key={booking.id} {...booking}></BookingCard>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No upcoming bookings
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Book a service to see your upcoming appointments here
                  </p>
                  <Button className="bg-hanapp-primary hover:bg-hanapp-secondary text-white">
                    Browse Services
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {bookingsData.past.length > 0 ? (
                bookingsData.past.map(booking => (
                  <BookingCard key={booking.id} {...booking} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No past bookings
                  </h3>
                  <p className="text-gray-500">
                    Your completed bookings will appear here
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {bookingsData.cancelled.length > 0 ? (
                bookingsData.cancelled.map(booking => (
                  <BookingCard key={booking.id} {...booking} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No cancelled bookings
                  </h3>
                  <p className="text-gray-500">
                    Cancelled bookings will appear here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Services Section - Above Footer */}
        <div className="w-full bg-hanapp-light py-8">
          <div className="max-w-7xl mx-auto px-4">
            <RecommendedServices />
          </div>
        </div>
      </div>
    </div>
  );
}
