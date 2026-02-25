'use client';
import { Button } from '@hanapp-ph/commons';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  fetchServiceRequestsForJobListings,
  JobListing,
} from '../lib/api/serviceRequests';
import { getCategoryFillerImage } from '../lib/utils/categoryImages';

const filterButtons = ['Show all', 'Near Me', 'Top Picks', 'Book Again'];
const JOBS_PER_PAGE = 5;

export function JobListings() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('Show all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const fetchedJobs = await fetchServiceRequestsForJobListings();
        // Add category-based filler images if no image is provided
        const jobsWithImages = fetchedJobs.map(job => ({
          ...job,
          image: job.image || getCategoryFillerImage(job.category),
        }));
        setJobs(jobsWithImages);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = (() => {
    switch (activeFilter) {
      case 'Near Me':
        return jobs.filter(job => job.location.includes('Baliuag, Bulacan'));
      case 'Top Picks':
        return jobs.filter(job => job.rating >= 4.9);
      case 'Book Again':
        // For now, just return the first 2 jobs as "booked before"
        return jobs.slice(0, 2);
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
        <button
          onClick={() => router.push('/jobs/categories')}
          className="text-xs text-[#102e50] font-semibold hover:underline"
        >
          View All
        </button>
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

      <div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hanapp-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {paginatedJobs.map(job => (
              <div
                key={job.id}
                onClick={() => router.push(`provider/jobs/${job.id}`)}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-hanapp-primary transition-all cursor-pointer overflow-hidden h-40"
              >
                <div className="flex gap-0 relative h-full">
                  {/* Image on the left */}
                  <div className="relative w-44 h-full flex-shrink-0 rounded-l-xl overflow-hidden">
                    <Image
                      src={job.image || '/placeholder.svg'}
                      alt={job.title}
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
                      {job.title}
                    </h3>

                    {/* Job Description */}
                    {job.description && (
                      <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                        {job.description}
                      </p>
                    )}

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-1 mt-auto">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>

                    {/* Price and Rating on same line */}
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-[#014182FC]">
                        {job.price}
                      </p>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(job.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
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

        {!loading && paginatedJobs.length === 0 && (
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
