'use client';

import { Button } from '@hanapp-ph/commons';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface ServiceListing {
  id: string;
  title: string;
  provider: string;
  location: string;
  rating: number;
  price: string;
  category: string;
  image?: string;
  description?: string;
  services?: string[]; // Array of service names
}

interface ClientHomeServiceListingsProps {
  listings: ServiceListing[];
  filters?: string[];
  onFilterChange?: (filter: string) => void;
  onViewListing?: (listingId: string) => void;
  onViewAll?: () => void;
  loading?: boolean;
}

const defaultFilters = ['Trending', 'Near Me', 'Top Picks', 'Book Again'];
const LISTINGS_PER_PAGE = 5;

export function ClientHomeServiceListings({
  listings,
  filters = defaultFilters,
  onFilterChange,
  onViewListing,
  onViewAll,
  loading = false,
}: ClientHomeServiceListingsProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredListings = (() => {
    switch (activeFilter) {
      case 'Near Me':
        // Filter by listings that contain "Bulacan" in location
        return listings.filter(listing =>
          listing.location.toLowerCase().includes('bulacan')
        );
      case 'Top Picks':
        // Filter by high ratings (4.5+)
        return listings.filter(listing => listing.rating >= 4.5);
      case 'Book Again':
        // Return first 2 listings as "booked before" (you can customize this logic)
        return listings.slice(0, 2);
      case 'Trending':
      default:
        return listings;
    }
  })();

  const totalPages = Math.ceil(filteredListings.length / LISTINGS_PER_PAGE);

  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * LISTINGS_PER_PAGE,
    currentPage * LISTINGS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1); // reset to page 1 when filter changes
    onFilterChange?.(filter);
  };

  return (
    <section className="max-w-7xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-[#102e50]">
          Service Listings
        </h2>
        <button
          onClick={() => {
            onViewAll?.();
            router.push('/jobs/categories');
          }}
          className="text-xs text-[#102e50] font-semibold hover:underline"
        >
          View All
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map(filter => (
          <Button
            key={filter}
            variant={filter === activeFilter ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterClick(filter)}
            className={
              (filter === activeFilter
                ? 'bg-hanapp-secondary text-white hover:bg-hanapp-primary'
                : 'border-hanapp-secondary bg-white text-hanapp-secondary hover:bg-hanapp-secondary hover:border-hanapp-secondary hover:text-white') +
              ' rounded-xl px-4 text-base'
            }
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Listings Grid */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hanapp-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {paginatedListings.map(listing => (
              <div
                key={listing.id}
                onClick={() => {
                  onViewListing?.(listing.id);
                  router.push(`/jobs/${listing.id}`);
                }}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-hanapp-primary transition-all cursor-pointer overflow-hidden h-40"
              >
                <div className="flex gap-0 relative h-full">
                  {/* Image on the left */}
                  <div className="relative w-44 h-full flex-shrink-0 rounded-l-xl overflow-hidden">
                    <Image
                      src={listing.image || '/placeholder.svg'}
                      alt={listing.title}
                      fill
                      className="object-cover"
                      sizes="176px"
                      priority={false}
                      quality={85}
                    />
                  </div>

                  {/* Content on the right */}
                  <div className="flex-1 flex flex-col min-w-0 p-3 pb-3">
                    {/* Title */}
                    <h3 className="font-semibold text-base text-black mb-0.5">
                      {listing.title}
                    </h3>

                    {/* Services - gray text */}
                    {listing.services && listing.services.length > 0 && (
                      <p className="text-sm text-gray-600 mb-0.5">
                        {listing.services.join(' • ')}
                      </p>
                    )}

                    {/* Description */}
                    {listing.description && (
                      <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                        {listing.description}
                      </p>
                    )}

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-1 mt-auto">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{listing.location}</span>
                    </div>

                    {/* Price and Rating on same line */}
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-[#014182FC]">
                        {listing.price}
                      </p>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {listing.rating > 0
                          ? // Show filled stars if rating exists
                            Array.from({
                              length: Math.min(5, Math.floor(listing.rating)),
                            }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                              />
                            ))
                          : // Show empty stars if no rating
                            Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-3.5 w-3.5 text-gray-300"
                              />
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && paginatedListings.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No listings found.</p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {/* Left arrow */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 text-hanapp-primary hover:bg-gray-200 disabled:opacity-50 hover:text-hanapp-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                onClick={() => goToPage(page)}
                className={`h-8 w-8 text-sm font-semibold rounded-md ${
                  currentPage === page
                    ? 'bg-hanapp-primary hover:bg-hanapp-secondary text-white'
                    : 'bg-transparent text-hanapp-primary hover:bg-gray-200'
                }`}
              >
                {page}
              </Button>
            ))}

            {/* Right arrow */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 text-hanapp-primary hover:bg-gray-200 disabled:opacity-50 hover:text-hanapp-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
