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
}

interface ClientHomeServiceListingsProps {
  listings: ServiceListing[];
  filters?: string[];
  onFilterChange?: (filter: string) => void;
  onViewListing?: (listingId: string) => void;
  onViewAll?: () => void;
}

const defaultFilters = ['Trending', 'Near Me', 'Top Picks', 'Book Again'];
const LISTINGS_PER_PAGE = 5;

export function ClientHomeServiceListings({
  listings,
  filters = defaultFilters,
  onFilterChange,
  onViewListing,
  onViewAll,
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
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Service Listings</h2>
        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-700 font-semibold"
          onClick={onViewAll}
        >
          View All
        </Button>
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
      <div className="space-y-4">
        {paginatedListings.map(listing => (
          <div
            key={listing.id}
            className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              onViewListing?.(listing.id);
              // router.push(`/job/${listing.id}`);
              router.push(`jobs/[jobId]`);
            }}
          >
            {/* Image */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
              {listing.image ? (
                <Image
                  src={listing.image}
                  alt={listing.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  📷
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 mb-1">{listing.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{listing.provider}</p>

              <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{listing.location}</span>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(listing.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  {listing.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Price & Category */}
            <div className="flex flex-col items-end justify-between">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {listing.category}
              </span>
              <span className="text-xl font-bold text-blue-900">
                {listing.price}
              </span>
            </div>
          </div>
        ))}

        {paginatedListings.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No listings found.</p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
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
                className={`h-8 w-8 text-sm font-semibold ${
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
