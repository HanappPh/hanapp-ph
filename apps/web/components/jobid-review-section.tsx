import { Button } from '@hanapp-ph/commons';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Review {
  id?: string;
  name: string;
  rating: number;
  comment: string;
  date?: string;
  className?: string;
  imageUrl?: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

function ReviewItem({
  name,
  rating,
  comment,
  date,
  className,
  imageUrl,
}: Review) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyClick = () => {
    setShowReplyModal(true);
  };

  const handleSubmitReply = () => {
    setReplyText('');
    setShowReplyModal(false);
  };

  return (
    <div
      className={`bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm border border-gray-100 w-full min-h-[140px] sm:min-h-[160px] ${className}`}
    >
      <div className="flex flex-col gap-5 sm:gap-6 w-full h-full">
        <div className="flex items-start justify-between gap-3 w-full">
          <h4 className="font-semibold text-[#102E50] text-lg sm:text-xl flex-1 break-words">
            {name}
          </h4>
          <div className="flex items-center flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  i < rating ? 'fill-[#102E50] text-[#102E50]' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-[#102E50] text-base sm:text-lg leading-relaxed break-words w-full flex-1">
          {comment}
        </p>
        {imageUrl && (
          <div className="mt-4 w-full flex justify-center">
            <Image
              src={imageUrl}
              alt="Review image"
              width={150}
              height={150}
              className="rounded-lg object-cover cursor-pointer"
              onClick={() => setShowImageModal(true)}
            />
          </div>
        )}
        {date && (
          <div className="text-base text-gray-500 break-words mt-auto">
            {date}
          </div>
        )}

        <Button
          className="mt-4 text-sm bg-[#102E50] text-white rounded-md hover:bg-blue-700 self-end"
          onClick={handleReplyClick}
        >
          Reply
        </Button>
      </div>

      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-3xl max-h-full p-2 bg-white rounded-lg"></div>
        </div>
      )}

      {showReplyModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowReplyModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md mx-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Reply to Review</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows={4}
              placeholder="Write your reply here..."
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <Button
                className="px-4 py-2 bg-[#102E50] text-white rounded-md hover:bg-blue-700"
                onClick={() => setShowReplyModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="px-4 py-2 bg-[#102E50] text-white rounded-md hover:bg-blue-700"
                onClick={handleSubmitReply}
                disabled={!replyText.trim()}
              >
                Submit Reply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);

  let reviewsPerPage = 10;
  let columns = 2;
  if (typeof window !== 'undefined') {
    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    reviewsPerPage = isMobile ? 5 : 10;
    columns = isMobile ? 1 : 2;
  }

  const filteredReviews = selectedRating
    ? reviews.filter(review => review.rating === selectedRating)
    : reviews;

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRatingFilter = (rating: number) => {
    setCurrentPage(1);
    setSelectedRating(rating);
  };

  const totalReviewsCount = reviews.length;

  const getRatingCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[review.rating as keyof typeof counts]++;
      }
    });
    return counts;
  };

  const ratingCounts = getRatingCounts();

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-5 sm:space-y-6 pb-5 sm:pb-6 lg:pb-8 overflow-hidden flex flex-col items-start">
      <div className="mb-5 sm:mb-6 w-full text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102E50] break-words">
          Reviews
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl">
          {totalReviewsCount} reviews for this service
        </p>
      </div>

      <div className="w-full space-y-2 mb-6">
        {[5, 4, 3, 2, 1].map(star => {
          const count = ratingCounts[star as keyof typeof ratingCounts];
          const percentage =
            totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
          return (
            <button
              key={star}
              onClick={() => handleRatingFilter(star)}
              className={`flex items-center w-full sm:w-1/2 py-1.5 px-2 rounded-md transition-colors
                ${selectedRating === star ? 'bg-[#102E50]/5' : 'hover:bg-[#102E50]/5'}
              `}
            >
              <span className="font-medium text-[#102E50] w-16 text-left mr-2 text-sm sm:text-base">
                {star} Stars
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full bg-[#102E50] transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 ml-3 w-10 text-right">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mb-4">
        <Button
          onClick={() => handleRatingFilter(0)}
          className={`text-sm rounded-md px-2 py-1 transition-colors duration-200
            ${
              selectedRating > 0
                ? 'bg-[#102E50] text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          Clear Filter
        </Button>
      </div>

      <div className="mb-5 sm:mb-6 w-full text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102E50] break-words">
          All Reviews
        </h2>
      </div>

      {filteredReviews.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
            {currentReviews.map((review, index) => (
              <ReviewItem
                key={review.id || `${currentPage}-${index}`}
                {...review}
              />
            ))}
            {(() => {
              const needed =
                columns === 1
                  ? Math.max(0, reviewsPerPage - currentReviews.length)
                  : (columns - (currentReviews.length % columns)) % columns;

              return Array.from({ length: needed }).map((_, i) => (
                <ReviewItem
                  key={`placeholder-${i}`}
                  name=""
                  rating={0}
                  comment=""
                  date=""
                  className="bg-transparent invisible pointer-events-none"
                />
              ));
            })()}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 pt-4 sm:pt-5 max-w-screen-xl">
              {getVisiblePages().map(pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`
                    w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 
                    rounded-md border text-lg sm:text-xl font-medium 
                    transition-colors duration-200 flex items-center justify-center
                    ${
                      pageNumber === currentPage
                        ? 'bg-[#102E50] text-white border-[#102E50]'
                        : 'bg-white text-[#102E50] border-gray-300 hover:bg-gray-50'
                    }
                  `}
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 sm:p-8 text-left max-w-6xl w-full">
          <p className="text-lg sm:text-xl text-gray-500 break-words">
            No reviews yet. Be the first to leave a review!
          </p>
        </div>
      )}
    </div>
  );
}
