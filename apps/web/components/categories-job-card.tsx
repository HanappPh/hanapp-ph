'use client';

import { Badge } from '@hanapp-ph/commons';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

interface JobCardProps {
  job: Job;
}

export default function CategoriesJobCard({ job }: JobCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer w-full"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <Image
          src={job.image || '/placeholder.svg'}
          alt={job.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
          quality={85}
        />
      </div>

      {/* Card content */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div>
          <div className="flex items-start sm:items-center justify-between gap-2 mb-2">
            <h3
              className="font-semibold text-sm sm:text-base flex-1 line-clamp-2"
              style={{ color: '#014182FC' }}
            >
              {job.title}
            </h3>
            <span
              className="text-white font-semibold whitespace-nowrap text-sm sm:text-base px-2 py-1 rounded-md"
              style={{ backgroundColor: 'black' }}
            >
              {job.price}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm" style={{ color: '#014182FC' }}>
              by{' '}
              {
                [
                  'Maria Santos',
                  'Juan Dela Cruz',
                  'Ana Rodriguez',
                  'Carlos Mendoza',
                  'Sofia Reyes',
                ][Math.floor(Math.random() * 5)]
              }
            </p>
            <Badge
              variant="outline"
              className="text-xs border-gray-300"
              style={{ color: '#014182FC' }}
            >
              {job.category}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <MapPin
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0"
              style={{ color: '#014182FC' }}
            />
            <span
              className="text-xs truncate max-w-[120px] sm:max-w-[160px]"
              style={{ color: '#014182FC' }}
            >
              {job.location}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: job.rating }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
