import { Button } from '@hanapp-ph/commons';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';

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

export function ClientHomeServiceListings({
  listings,
  filters: _filters = defaultFilters,
  onFilterChange: _onFilterChange,
  onViewListing,
  onViewAll,
}: ClientHomeServiceListingsProps) {
  // Commented out until filtering logic is implemented
  // const [activeFilter, setActiveFilter] = useState(filters[0]);

  // const handleFilterClick = (filter: string) => {
  //   setActiveFilter(filter);
  //   onFilterChange?.(filter);
  // };

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

      {/* Filters - Commented out until filtering logic is implemented */}
      {/* <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-blue-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}

        <div className="flex gap-2 ml-auto">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div> */}

      {/* Listings Grid */}
      <div className="space-y-4">
        {listings.map(listing => (
          <div
            key={listing.id}
            className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onViewListing?.(listing.id)}
          >
            {/* Image */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
              {listing.image ? (
                <Image
                  src={listing.image}
                  alt={listing.title}
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
      </div>
    </section>
  );
}
