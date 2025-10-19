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
    {
      id: '6',
      title: 'Catering services for events',
      provider: 'Oca Catering',
      location: 'San Fernando, Pampanga',
      rating: 4.6,
      price: '₱50K',
      category: 'Catering',
      image: '/catering-buffet-food-service.jpg',
    },
    {
      id: '7',
      title: 'House cleaning service',
      provider: 'Sparkle Home Services',
      location: 'Balingog, Bulacan',
      rating: 4.8,
      price: '₱650',
      category: 'Cleaning',
      image: '/cleaning-service-provider.jpg',
    },
    {
      id: '8',
      title: 'Auto repair home service',
      provider: "Mike's Auto Shop",
      location: 'Malolos, Bulacan',
      rating: 4.7,
      price: '₱850',
      category: 'Auto Repair',
      image: '/mechanic-repairing-car.jpg',
    },
    {
      id: '9',
      title: 'Plumbing and drain service',
      provider: 'Quick Fix Plumbing',
      location: 'Balingog, Bulacan',
      rating: 4.5,
      price: '₱450',
      category: 'Plumbing',
      image: '/plumber-fixing-drain.png',
    },
    {
      id: '10',
      title: 'Landscaping and gardening',
      provider: 'Green Thumb Services',
      location: 'Angat, Bulacan',
      rating: 4.9,
      price: '₱800',
      category: 'Landscaping',
      image: '/landscaper-cutting-grass.jpg',
    },
    {
      id: '11',
      title: 'Construction handyman',
      provider: 'Build Right Construction',
      location: 'Balingog, Bulacan',
      rating: 4.8,
      price: '₱700',
      category: 'Construction',
      image: '/construction-worker-tools.jpg',
    },
    {
      id: '12',
      title: 'Tutor for elementary students',
      provider: 'Smart Learning Center',
      location: 'Malolos, Bulacan',
      rating: 4.9,
      price: '₱350',
      category: 'Education',
      image: '/tutor-teacher.jpg',
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
