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
      name: 'Maria Santos',
      service: 'House Cleaning',
      distance: '0.3 km',
      avatar: '/cleaning-service-provider.jpg',
    },
    {
      id: '2',
      name: 'Juan Reyes',
      service: 'Construction',
      distance: '0.5 km',
      avatar: '/construction-worker-tools.jpg',
    },
    {
      id: '3',
      name: 'Lucia Cruz',
      service: 'Dog Grooming',
      distance: '0.4 km',
      avatar: '/dog-groomer-with-pet.jpg',
    },
    {
      id: '4',
      name: 'Pedro Mendoza',
      service: 'Handyman',
      distance: '0.6 km',
      avatar: '/handyman-repair.jpg',
    },
    {
      id: '5',
      name: 'Ana Garcia',
      service: 'Nanny Services',
      distance: '0.2 km',
      avatar: '/nanny-with-child.jpg',
    },
    {
      id: '6',
      name: 'Carlos Ramos',
      service: 'Delivery Rider',
      distance: '0.7 km',
      avatar: '/delivery-rider-on-motorcycle.jpg',
    },
    {
      id: '7',
      name: 'Rosa Fernandez',
      service: 'Laundry Service',
      distance: '0.3 km',
      avatar: '/woman-doing-laundry-service.jpg',
    },
    {
      id: '8',
      name: 'Miguel Torres',
      service: 'Auto Mechanic',
      distance: '0.8 km',
      avatar: '/mechanic-repairing-car.jpg',
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
      image: '/laundry-service.png',
    },
    {
      id: '2',
      title: 'Lipat bahay Luzon area only',
      provider: 'Transport Co',
      location: 'Balingog, Bulacan',
      rating: 4.9,
      price: '₱2.5K',
      category: 'Transport',
      image: '/img-carousel-placeholder_2.png',
    },
    {
      id: '3',
      title: 'Stay out yaya daily rate',
      provider: 'Nanny Services',
      location: 'Balingog, Bulacan',
      rating: 4.9,
      price: '₱650',
      category: 'Babysitting',
      image: '/house-cleaning-service.png',
    },
    {
      id: '4',
      title: 'Delivery rider baliuag area',
      provider: 'Virguelio Mart',
      location: 'Balingog, Bulacan',
      rating: 4.9,
      price: '₱300',
      category: 'Errands',
      image: '/delivery-person-parcel.jpg',
    },
    {
      id: '5',
      title: 'Home service dog grooming',
      provider: 'Chonky Boi Pet Services',
      location: 'Angat, Bulacan',
      rating: 4.9,
      price: '₱2.5K',
      category: 'Pet care',
      image: '/pet-grooming-dog.jpg',
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
