'use client';

import { Button, Badge } from '@hanapp-ph/commons';
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
    <section className="max-w-7xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-[#102e50]">
          Service Listings
        </h2>
        <button
          onClick={onViewAll}
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
      <div className="space-y-5">
        {paginatedListings.map(listing => (
          <div
            key={listing.id}
            className="flex gap-4 rounded-lg bg-white shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
            onClick={() => {
              onViewListing?.(listing.id);
              router.push(`/jobs/${listing.id}`);
            }}
          >
            {/* Image */}
            <div className="hidden md:block relative h-[155px] w-[155px] rounded-l-lg overflow-hidden">
              <Image
                src={listing.image || '/placeholder.svg'}
                alt={listing.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <div className="mb-1 flex items-start justify-between">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#102e50]">
                    {listing.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="ml-2 border-gray-300 bg-white text-sm md:text-md text-[#102e50] hover:bg-gray-100 text-center"
                  >
                    {listing.category}
                  </Badge>
                </div>
                <p className="mb-4 text-md text-[#014182FC]">
                  {listing.provider}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-[#102e50]">
                    <MapPin className="h-3.5 w-3.5 text-[#102e50]" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="ml-1 text-xs sm:text-sm text-[#102e50]">
                      {listing.rating}
                    </span>
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#102e50]">
                  {listing.price}
                </div>
              </div>
            </div>
          </div>
        ))}

        {paginatedListings.length === 0 && (
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
