import { Button, Badge } from '@hanapp-ph/commons';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
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
    image: '/images/laundry.jpg',
    title: 'Labada per kilo',
    provider: 'jinkee',
    location: 'Baliuag, Bulacan',
    rating: 4.9,
    category: 'Laundry',
    price: '₱28',
  },
  {
    id: 2,
    image: '/images/truck.jpg',
    title: 'Lipat bahay Luzon area only',
    provider: 'Daboy Movers',
    location: 'Baliuag, Bulacan',
    rating: 4.9,
    category: 'Transport',
    price: '₱2.5K',
  },
  {
    id: 3,
    image: '/images/yaya.jpg',
    title: 'Stay out yaya daily rate',
    provider: 'abby',
    location: 'Baliuag, Bulacan',
    rating: 4.9,
    category: 'Babysitting',
    price: '₱650',
  },
  {
    id: 4,
    image: '/images/rider.jpg',
    title: 'Delivery rider baliuag area',
    provider: 'Virgilio Muit',
    location: 'Baliuag, Bulacan',
    rating: 4.9,
    category: 'Errands',
    price: '₱300',
  },
  {
    id: 5,
    image: '/images/dog-grooming.jpg',
    title: 'Home service dog grooming',
    provider: 'Chonky Boi Pet Services',
    location: 'Baliuag, Bulacan',
    rating: 4.9,
    category: 'Pet care',
    price: '₱2.5K',
  },
  {
    id: 6,
    image: '/images/catering.jpg',
    title: 'Catering services for events',
    provider: 'Oca Catering',
    location: 'Baliuag, Bulacan',
    rating: 4.9,
    category: 'Catering',
    price: '₱50K',
  },
];

const filterButtons = ['Show all', 'Near Me', 'Top Picks', 'Book Again'];

const JobListings: React.FC = () => {
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
            variant={filter === 'Show all' ? 'default' : 'outline'}
            size="sm"
            className={
              (filter === 'Show all'
                ? 'bg-[#102e50] text-white hover:bg-[#0a1c30]'
                : 'border-gray-300 bg-white text-[#102e50] hover:bg-gray-200') +
              ' rounded-xl px-4 text-md'
            }
          >
            {filter}
          </Button>
        ))}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-5">
        {jobs.map(job => (
          <div
            key={job.id}
            className="flex gap-4 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md m-2"
          >
            {/* Image placeholder */}
            <div className="flex-shrink-0">
              <div
                // src={job.image || '/placeholder.svg'}
                // alt={job.title}
                className="sm:h-[100px] sm:w-[120px] rounded-lg object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">
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
      </div>
    </section>
  );
};

export default JobListings;
