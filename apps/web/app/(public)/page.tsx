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
import { getCategoryFillerImage } from '../../lib/utils/categoryImages';

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
            const categoryName = listing.category?.name || 'General';
            return {
              id: listing.id,
              title: listing.title,
              provider: listing.provider?.full_name || 'Unknown Provider',
              location: listing.service_areas?.[0] || 'Location not specified',
              rating: listing.rating || 0,
              price: listing.price_from
                ? `From ₱${listing.price_from.toLocaleString()}`
                : 'Price varies',
              category: categoryName,
              image:
                listing.images?.[0] || getCategoryFillerImage(categoryName),
              description: listing.description,
              services: listing.service_names || [],
            };
          }
        );

        setListings(transformedListings);
      } catch (error) {
        console.error('❌ Failed to load service listings:', error);
        setListings([]);
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
    <div className="bg-[#F3F5F9]">
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
    </div>
  );
}
