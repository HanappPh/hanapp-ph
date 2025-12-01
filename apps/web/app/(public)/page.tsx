'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
import {
  fetchServiceListings,
  type ServiceListingResponse,
} from '../../lib/api/serviceListings';
import { useAuth } from '../../lib/hooks/useAuth';

// Mock data for fallback - kept outside component to avoid re-creation on every render
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

export default function HomePage() {
  const router = useRouter();

  // Make useAuth optional for tests - wrap in try/catch
  let user = null;
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch {
    // useAuth not available (e.g., in tests) - user will remain null
  }

  const [listings, setListings] = useState<ServiceListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch service listings on component mount
  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true);
        // Exclude current user's listings from the feed
        const dbListings = await fetchServiceListings(user?.id);

        // Transform database listings to match UI format
        const transformedListings: ServiceListing[] = dbListings.map(
          (listing: ServiceListingResponse) => {
            return {
              id: listing.id,
              title: listing.title,
              provider: listing.provider?.full_name || 'Unknown Provider',
              location: listing.service_areas?.[0] || 'Location not specified',
              rating: listing.rating || 0,
              price: listing.price_from
                ? `₱${listing.price_from.toLocaleString()}`
                : 'Contact for pricing',
              category: listing.category?.name || 'General',
              image: listing.images?.[0] || '/placeholder.svg',
            };
          }
        );

        // Combine database listings with mock listings
        const combinedListings = [...transformedListings, ...mockListings];
        setListings(combinedListings);
      } catch (error) {
        console.error('❌ Failed to load service listings:', error);
        // Fallback to mock listings on error
        setListings(mockListings);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [user?.id]);

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
      <ClientHomeHero />

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
        listings={listings}
        loading={loading}
        // onFilterChange={handleFilterChange}
        onViewListing={handleViewListing}
        onViewAll={handleViewAllListings}
      />

      <LowerHeroSection />
    </>
  );
}
