'use client';
import { Button, Badge } from '@hanapp-ph/commons';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
type Job = {
  id: number;
  image: string;
  title: string;
  provider: string;
  location: string;
  rating: number;
  category: string;
  price: string;
};

const jobs: Job[] = [
  {
    id: 1,
    image: '/laundry-service.png',
    title: 'Labada per kilo',
    provider: 'jinkee',
    location: 'Baliuag, Bulacan',
    rating: 4.9,
    category: 'Laundry',
    price: '₱28',
  },
  {
    id: 2,
    image: '/img-carousel-placeholder_2.png',
    title: 'Lipat bahay Luzon area only',
    provider: 'Daboy Movers',
    location: 'Malolos, Bulacan',
    rating: 4.9,
    category: 'Transport',
    price: '₱2.5K',
  },
  {
    id: 3,
    image: '/house-cleaning-service.png',
    title: 'Stay out yaya daily rate',
    provider: 'abby',
    location: 'Baliuag, Bulacan',
    rating: 4.8,
    category: 'Babysitting',
    price: '₱650',
  },
  {
    id: 4,
    image: '/delivery-person-parcel.jpg',
    title: 'Delivery rider baliuag area',
    provider: 'Virgilio Muit',
    location: 'Baliuag, Bulacan',
    rating: 4.2,
    category: 'Errands',
    price: '₱300',
  },
  {
    id: 5,
    image: '/pet-grooming-dog.jpg',
    title: 'Home service dog grooming',
    provider: 'Chonky Boi Pet Services',
    location: 'Quezon City, Metro Manila',
    rating: 4.5,
    category: 'Pet care',
    price: '₱2.5K',
  },
  {
    id: 6,
    image: '/img-carousel-placeholder_1.png',
    title: 'Catering services for events',
    provider: 'Oca Catering',
    location: 'San Fernando, Pampanga',
    rating: 4.6,
    category: 'Catering',
    price: '₱50K',
  },
];

const filterButtons = ['Show all', 'Near Me', 'Top Picks', 'Book Again'];
const JOBS_PER_PAGE = 5;

export function JobListings() {
  const [activeFilter, setActiveFilter] = useState<string>('Show all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredJobs = (() => {
    switch (activeFilter) {
      case 'Near Me':
        return jobs.filter(job => job.location === 'Baliuag, Bulacan');
      case 'Top Picks':
        return jobs.filter(job => job.rating >= 4.9);
      case 'Book Again':
        // For now, just return 2 fixed jobs as "booked before"
        return jobs.filter(job => [1, 4].includes(job.id));
      default:
        return jobs;
    }
  })();

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1); // reset when filter changes
  };

  return (
    <section className="max-w-7xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-[#102e50]">Job listings</h2>
        <a
          href="#"
          className="text-xs text-[#102e50] font-semibold hover:underline"
        >
          View All
        </a>
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {filterButtons.map(filter => (
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
        {/* <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-gray-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-gray-200"
        >
          <ChevronRight className="h-4 w-4" />
        </Button> */}
      </div>

      <div className="space-y-5">
        {paginatedJobs.map(job => (
          <div
            key={job.id}
            className="flex gap-4 rounded-lg bg-white shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]"
          >
            <div className="hidden md:block relative h-[155px] w-[155px] rounded-l-lg overflow-hidden">
              <Image
                src={job.image || '/placeholder.svg'}
                alt={job.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <div className="mb-1 flex items-start justify-between">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#102e50]">
                    {job.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="ml-2 border-gray-300 bg-white text-sm md:text-md text-[#102e50] hover:bg-gray-100 text-center"
                  >
                    {job.category}
                  </Badge>
                </div>
                <p className="mb-4 text-md text-[#014182FC]">{job.provider}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-[#102e50]">
                    <MapPin className="h-3.5 w-3.5 text-[#102e50]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="ml-1 text-xs sm:text-sm text-[#102e50]">
                      {job.rating}
                    </span>
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#102e50]">
                  {job.price}
                </div>
              </div>
            </div>
          </div>
        ))}

        {paginatedJobs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No jobs found.</p>
        )}

        {/* Pagination Controls at the bottom */}
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
