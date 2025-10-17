'use client';

import { useRouter } from 'next/navigation';

import { ClientBanner } from '../../components/client-home/client-home-banner';
import { ClientHomeCategories } from '../../components/client-home/client-home-categories';
import { ClientHomeHero } from '../../components/client-home/client-home-hero';
import { LowerHeroSection } from '../../components/client-home/client-home-lower-hero-section';
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

  // const handlePostJob = () => {
  //   router.push('/post-job');
  // };

  // const handleFindJob = () => {
  //   router.push('/find-jobs');
  // };

  return (
    <>
      <ClientHomeHero userName="Andrew" voucherDiscount={50} />

      <ClientHomeCategories
        onCategoryClick={handleCategoryClick}
        onPostAll={handlePostAll}
      />

      <ClientBanner />

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

      <LowerHeroSection />
    </>
  );
}
