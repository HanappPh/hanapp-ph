import { Card } from '@hanapp-ph/commons';
import { Star } from 'lucide-react';
import React from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProfileRatingProps {
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  initialSelected?: 'Provider' | 'Client';
  embedded?: boolean;
}

export function ProfileRating({
  rating = 4.8,
  reviewCount = 8,
  initialSelected,
  embedded = false,
  reviews = [
    {
      id: '1',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '2',
      name: 'Jonas R.',
      rating: 5,
      comment: 'On time, mabilis, at maingat sa gamit. Hinga na ulit ang AC!',
      date: '1 week ago',
    },
    {
      id: '3',
      name: 'Maria S.',
      rating: 4,
      comment:
        'Very professional and thorough. AC is working like new again. Will book again next time!',
      date: '3 days ago',
    },
    {
      id: '4',
      name: 'John L.',
      rating: 5,
      comment: 'Life is often described as a journey',
      date: '5 days ago',
    },
    {
      id: '5',
      name: 'Lisa T.',
      rating: 4,
      comment: 'Good work and fair pricing. AC is much cooler now. Thank you!',
      date: '1 week ago',
    },
    {
      id: '6',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '7',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '8',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '9',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '10',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '11',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '12',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '13',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '14',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '15',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '16',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '17',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '18',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '19',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '20',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
    {
      id: '21',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
    },
  ],
}: ProfileRatingProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const isProviderView = initialSelected === 'Provider';
  const activePaginationClass = isProviderView
    ? 'bg-hanapp-accent text-hanapp-secondary'
    : 'bg-hanapp-primary text-white';
  const inactivePaginationClass =
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100';
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const content = (
    <>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-4 flex-1 min-w-[150px]">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-3xl font-bold text-gray-900">{rating}</span>
          </div>
          <div className="flex flex-col justify-center h-full">
            <h4 className="text-sm font-semibold text-gray-900 leading-tight">
              Rating
            </h4>
            <p className="text-xs text-gray-500 leading-tight">
              {reviewCount} reviews
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        {currentReviews.map((review, index) => (
          <div key={review.id}>
            <div
              className={index === currentReviews.length - 1 ? 'pt-3' : 'py-3'}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-yellow-500 font-semibold text-base">
                  {review.rating}.0
                </span>
              </div>
              <p className="text-gray-700 text-sm line-clamp-2 mb-1">
                {review.comment}
              </p>
              <p className="text-gray-500 text-sm">- {review.name}</p>
            </div>
            {index < currentReviews.length - 1 && (
              <div className="border-t border-gray-200" />
            )}
          </div>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                  : inactivePaginationClass
              }`}
            >
              {'<'}
            </button>

            <div className="flex items-center gap-2">
              {(() => {
                const maxPagesToShow = 3;
                let startPage = Math.max(
                  1,
                  currentPage - Math.floor(maxPagesToShow / 2)
                );
                const endPage = Math.min(
                  totalPages,
                  startPage + maxPagesToShow - 1
                );

                // Adjust startPage if we're at the end
                if (endPage - startPage + 1 < maxPagesToShow) {
                  startPage = Math.max(1, endPage - maxPagesToShow + 1);
                }

                return Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      currentPage === page
                        ? activePaginationClass
                        : inactivePaginationClass
                    }`}
                  >
                    {page}
                  </button>
                ));
              })()}
            </div>

            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                  : inactivePaginationClass
              }`}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </>
  );

  return embedded ? (
    <div className="p-4">{content}</div>
  ) : (
    <Card className="p-4 bg-white border-none drop-shadow-md">{content}</Card>
  );
}
