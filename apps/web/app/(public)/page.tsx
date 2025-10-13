'use client';

import { useRouter } from 'next/navigation';

import {
  ClientHomeBookings,
  type Booking,
} from '../../components/client-home/client-home-bookings';
import { ClientHomeCategories } from '../../components/client-home/client-home-categories';
import { ClientHomeCta } from '../../components/client-home/client-home-cta';
import { ClientHomeHero } from '../../components/client-home/client-home-hero';
import {
  ClientHomeProviders,
  type Provider,
} from '../../components/client-home/client-home-providers';
import {
  ClientHomeServiceListings,
  type ServiceListing,
} from '../../components/client-home/client-home-service-listings';

export default function HomePage() {
  const router = useRouter();

  // Mock data - replace with actual API calls
  const mockBookings: Booking[] = [
    {
      id: '1',
      type: 'pending',
      title: 'Laundry - Booking Request',
      provider: 'Martin Santos',
      timeAgo: '5 mins ago',
    },
    {
      id: '2',
      type: 'completed',
      title: 'Babysitting Completed',
      provider: 'Jenna Lee',
      timeAgo: '5 hours ago',
    },
  ];

  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Gary',
      service: 'Haircut',
      distance: '0.3m',
    },
    {
      id: '2',
      name: 'Mario',
      service: 'Massage',
      distance: '0.5m',
    },
    {
      id: '3',
      name: 'Linda',
      service: 'Spa',
      distance: '0.3m',
    },
    {
      id: '4',
      name: 'Amy',
      service: 'Nails',
      distance: '0.3m',
    },
    {
      id: '5',
      name: 'Cecilio',
      service: 'Car wash',
      distance: '0.5m',
    },
  ];

  const mockListings: ServiceListing[] = [
    {
      id: '1',
      title: 'Labada per kilo',
      provider: 'Martin Santos',
      location: 'Balingog, Bulacan',
      rating: 4.9,
      price: '₱28',
      category: 'Laundry',
    },
    {
      id: '2',
      title: 'Lipat bahay Luzon area only',
      provider: 'Transport Co',
      location: 'Balingog, Bulacan',
      rating: 4.9,
      price: '₱2.5K',
      category: 'Transport',
    },
    {
      id: '3',
      title: 'Stay out yaya daily rate',
      provider: 'Nanny Services',
      location: 'Balingog, Bulacan',
      rating: 4.9,
      price: '₱650',
      category: 'Babysitting',
    },
    {
      id: '4',
      title: 'Delivery rider baliuag area',
      provider: 'Virguelio Mart',
      location: 'Balingog, Bulacan',
      rating: 4.9,
      price: '₱300',
      category: 'Errands',
    },
    {
      id: '5',
      title: 'Home service dog grooming',
      provider: 'Chonky Boi Pet Services',
      location: 'Angat, Bulacan',
      rating: 4.9,
      price: '₱2.5K',
      category: 'Pet care',
    },
  ];

  // Event handlers
  const handleViewBooking = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/services?category=${categoryId}`);
  };

  const handlePostAll = () => {
    router.push('/post-job');
  };

  const handleViewProvider = (providerId: string) => {
    router.push(`/providers/${providerId}`);
  };

  const handleViewListing = (listingId: string) => {
    router.push(`/services/${listingId}`);
  };

  // const handleFilterChange = (filter: string) => {
  //   // Implement filter logic here
  // };

  const handleViewAllListings = () => {
    router.push('/services');
  };

  const handlePostJob = () => {
    router.push('/post-job');
  };

  const handleFindJob = () => {
    router.push('/find-jobs');
  };

  return (
    <>
      <ClientHomeHero userName="Andrew" voucherDiscount={50} />

      <ClientHomeBookings
        bookings={mockBookings}
        onViewBooking={handleViewBooking}
      />

      <ClientHomeCategories
        onCategoryClick={handleCategoryClick}
        onPostAll={handlePostAll}
      />

      <ClientHomeProviders
        providers={mockProviders}
        onViewProvider={handleViewProvider}
      />

      <ClientHomeServiceListings
        listings={mockListings}
        // onFilterChange={handleFilterChange}
        onViewListing={handleViewListing}
        onViewAll={handleViewAllListings}
      />

      <ClientHomeCta onPostJob={handlePostJob} onFindJob={handleFindJob} />
    </>
  );
}
