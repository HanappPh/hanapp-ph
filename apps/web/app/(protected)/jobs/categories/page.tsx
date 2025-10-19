'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo, useCallback, useEffect } from 'react';

// import { CategoriesHeader } from '../../../../components/categories/categories-header';
import { CategoriesSidebar } from '../../../../components/categories/categories-sidebar';
import CategoriesJobCard from '../../../../components/categories-job-card';

// Type definition
type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  categories: string[];
};

// Data
const categories = [
  'Laundry',
  'Transportation',
  'Babysitting',
  'Errands',
  'Pet Care',
  'Catering',
  'Construction',
  'Plumbing',
  'Auto Repair',
  'Tech Support',
  'Gardening',
  'Legal',
  'Painting',
  'Home Services',
  'Electrical',
  'Moving',
  'Professional Services',
];

const jobs: Job[] = [
  {
    id: '1',
    title: 'Labada per kilo',
    category: 'Laundry',
    location: 'Baluag, Bulacan',
    price: '₱2.6k',
    rating: 3,
    image: '/woman-doing-laundry-service.jpg',
    categories: ['Laundry', 'Home Services'],
  },
  {
    id: '2',
    title: 'Lipat bahay Luzon area only',
    category: 'Transportation',
    location: 'Baluag, Bulacan',
    price: '₱2.6k',
    rating: 4,
    image: '/moving-truck-and-movers.jpg',
    categories: ['Transportation', 'Moving'],
  },
  {
    id: '3',
    title: 'Stay out yaya daily rate',
    category: 'Babysitting',
    location: 'Baluag, Bulacan',
    price: '₱650',
    rating: 5,
    image: '/nanny-with-child.jpg',
    categories: ['Babysitting', 'Childcare'],
  },
  {
    id: '4',
    title: 'Delivery rider baliwag area',
    category: 'Errands',
    location: 'Baluag, Bulacan',
    price: '₱300',
    rating: 5,
    image: '/delivery-rider-on-motorcycle.jpg',
    categories: ['Errands', 'Delivery'],
  },
  {
    id: '5',
    title: 'Home service dog grooming',
    category: 'Pet Care',
    location: 'Baluag, Bulacan',
    price: '₱2.6k',
    rating: 3,
    image: '/dog-groomer-with-pet.jpg',
    categories: ['Pet Care', 'Grooming'],
  },
  {
    id: '6',
    title: 'Catering services for events',
    category: 'Catering',
    location: 'Baluag, Bulacan',
    price: '₱50k',
    rating: 5,
    image: '/catering-buffet-food-service.jpg',
    categories: ['Catering', 'Events'],
  },
  {
    id: '7',
    title: 'Panday with own tools',
    category: 'Construction',
    location: 'Baluag, Bulacan',
    price: '₱700',
    rating: 2,
    image: '/construction-worker-tools.jpg',
    categories: ['Construction', 'Handyman'],
  },
  {
    id: '8',
    title: 'Declogging drain home service',
    category: 'Plumbing',
    location: 'Baluag, Bulacan',
    price: '₱3k',
    rating: 4,
    image: '/plumber-fixing-drain.png',
    categories: ['Plumbing', 'Home Services'],
  },
  {
    id: '9',
    title: 'Auto repair home service',
    category: 'Auto Repair',
    location: 'Baluag, Bulacan',
    price: '₱650',
    rating: 5,
    image: '/mechanic-repairing-car.jpg',
    categories: ['Auto Repair', 'Automotive'],
  },
  {
    id: '10',
    title: 'Unlock iphone ipad',
    category: 'Tech Support',
    location: 'Baluag, Bulacan',
    price: '₱800',
    rating: 5,
    image: '/phone-and-tablet-repair.png',
    categories: ['Tech Support', 'Electronics'],
  },
  {
    id: '11',
    title: 'Grass cutting landscaping',
    category: 'Gardening',
    location: 'Baluag, Bulacan',
    price: '₱1.8k',
    rating: 5,
    image: '/landscaper-cutting-grass.jpg',
    categories: ['Gardening', 'Landscaping'],
  },
  {
    id: '12',
    title: 'Notary Public 24/7 legal services',
    category: 'Legal',
    location: 'Baluag, Bulacan',
    price: '₱800',
    rating: 5,
    image: '/notary-public-professional.jpg',
    categories: ['Legal', 'Professional Services'],
  },
  {
    id: '13',
    title: 'House painting interior and exterior',
    category: 'Painting',
    location: 'Baluag, Bulacan',
    price: '₱5k',
    rating: 4,
    image: '/house-cleaning-service.png',
    categories: ['Painting', 'Home Services'],
  },
  {
    id: '14',
    title: 'General home repairs and maintenance',
    category: 'Home Services',
    location: 'Baluag, Bulacan',
    price: '₱1.5k',
    rating: 5,
    image: '/cleaning-service-provider.jpg',
    categories: ['Home Services', 'Maintenance'],
  },
  {
    id: '15',
    title: 'Electrician for home wiring and repairs',
    category: 'Electrical',
    location: 'Baluag, Bulacan',
    price: '₱2k',
    rating: 5,
    image: '/construction-worker-tools.jpg',
    categories: ['Electrical', 'Home Services'],
  },
  {
    id: '16',
    title: 'Moving and packing services',
    category: 'Moving',
    location: 'Baluag, Bulacan',
    price: '₱3.5k',
    rating: 4,
    image: '/moving-truck-and-movers.jpg',
    categories: ['Moving', 'Transportation'],
  },
];

type SortOption = 'location' | 'rating' | 'price-high-low' | 'price-low-high';

export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('location');

  // Check for category parameter in URL and set it as selected
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Convert category ID to proper category name format
      // e.g., 'pet-care' -> 'Pet Care', 'laundry' -> 'Laundry'
      const categoryName = categoryParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Find matching category in the categories list
      const matchedCategory = categories.find(
        cat => cat.toLowerCase() === categoryName.toLowerCase()
      );

      if (matchedCategory) {
        setSelectedCategories([matchedCategory]);
      }
    }
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Convert price strings to numeric values for sorting
  const getPriceValue = (price: string) => {
    const numStr = price.replace('₱', '').trim();
    return numStr.toLowerCase().endsWith('k')
      ? parseFloat(numStr.slice(0, -1)) * 1000
      : parseFloat(numStr) || 0;
  };

  // Compare prices based on sort order
  const comparePrices = (
    priceA: number,
    priceB: number,
    isHighToLow: boolean
  ) => {
    return isHighToLow ? priceB - priceA : priceA - priceB;
  };

  // Memoized sorting function
  const sortJobs = useCallback((jobs: Job[], sortOption: SortOption) => {
    return [...jobs].sort((a, b) => {
      switch (sortOption) {
        case 'location': {
          return a.location.localeCompare(b.location);
        }
        case 'rating': {
          return b.rating - a.rating;
        }
        case 'price-high-low':
        case 'price-low-high': {
          const priceA = getPriceValue(a.price);
          const priceB = getPriceValue(b.price);
          return comparePrices(priceA, priceB, sortOption === 'price-high-low');
        }
        default: {
          return 0;
        }
      }
    });
  }, []); // Empty dependency array since helper functions are in scope

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter(job => {
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some(cat => job.categories.includes(cat));

      return matchesCategories;
    });

    return sortJobs(filtered, sortBy);
  }, [selectedCategories, sortBy, sortJobs]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category] = jobs.filter(job =>
        job.categories.includes(category)
      ).length;
    });
    return counts;
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 lg:overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
          {/* Mobile filter button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden mb-4 flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Filters
          </button>

          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Sidebar - Fixed on desktop, drawer on mobile */}
            <div
              className={`
                fixed inset-0 lg:static lg:block
                ${isSidebarOpen ? 'block' : 'hidden'}
                lg:w-72 z-40
              `}
            >
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-25 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />

              {/* Sidebar content */}
              <div className="relative lg:static">
                <div className="fixed inset-y-0 left-0 w-full max-w-xs sm:max-w-sm lg:w-72 bg-white lg:static h-full overflow-y-auto">
                  <div className="p-4 lg:p-0">
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="lg:hidden mb-4 text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <CategoriesSidebar
                      categories={categories}
                      selectedCategories={selectedCategories}
                      categoryCounts={categoryCounts}
                      onToggleCategory={toggleCategory}
                      onClearFilters={() => setSelectedCategories([])}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-900">
                  <span className="font-semibold">{filteredJobs.length}</span>{' '}
                  results found
                  {selectedCategories.length > 0 && (
                    <span className="text-gray-600 block sm:inline mt-1 sm:mt-0">
                      {' '}
                      for {`${selectedCategories.join(', ')}`}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortOption)}
                    className="flex-1 sm:flex-none text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white"
                  >
                    <option value="location">Location</option>
                    <option value="rating">Rating</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="price-low-high">Price: Low to High</option>
                  </select>
                </div>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 sm:p-12 text-center border border-gray-200">
                  <p className="text-gray-600">
                    No services found matching your criteria. Try adjusting your
                    filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-8">
                  {filteredJobs.map(job => (
                    <CategoriesJobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
