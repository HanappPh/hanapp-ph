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

const bookingsData: {
  sent: BookingDetails[];
  received: BookingDetails[];
  ongoing: BookingDetails[];
  past: BookingDetails[];
  cancelled: BookingDetails[];
} = {
  sent: [
    {
      id: 8,
      serviceName: 'Garden Maintenance',
      providerName: 'Green Thumb Services',
      providerImage: '/garden-service.jpg',
      rating: 4.5,
      reviewCount: 67,
      price: 500,
      date: '2024-01-18',
      time: '8:00 AM',
      location: 'Paranaque City',
      status: 'Pending',
      serviceImage: '/garden-maintenance.jpg',
    },
    {
      id: 9,
      serviceName: 'Computer Repair',
      providerName: 'Tech Solutions',
      providerImage: '/tech-repair.jpg',
      rating: 4.7,
      reviewCount: 134,
      price: 750,
      date: '2024-01-20',
      time: '3:00 PM',
      location: 'Makati City',
      status: 'Pending',
      serviceImage: '/computer-repair.jpg',
    },
  ],
  received: [
    {
      id: 10,
      serviceName: 'Photography Session',
      providerName: 'Capture Moments',
      providerImage: '/photographer.jpg',
      rating: 4.9,
      reviewCount: 178,
      price: 1200,
      date: '2024-01-22',
      time: '10:00 AM',
      location: 'BGC, Taguig',
      status: 'Pending',
      serviceImage: '/photography-session.jpg',
    },
    {
      id: 11,
      serviceName: 'Massage Therapy',
      providerName: 'Relax & Heal Spa',
      providerImage: '/massage-therapist.jpg',
      rating: 4.8,
      reviewCount: 92,
      price: 800,
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Ortigas, Pasig',
      status: 'Pending',
      serviceImage: '/massage-therapy.jpg',
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
  const [activeTab, setActiveTab] = useState('ongoing');

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
