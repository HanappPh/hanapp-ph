'use client';

import { Button, Card, CardContent, Badge } from '@hanapp-ph/commons';
import { Star, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import { supabase } from '../../lib/supabase/client';

const PLACEHOLDER_IMAGE_URL = '/img-carousel-placeholder_2.png'; // You might want to replace this with a real placeholder image path

interface Review {
  id?: string;
  name: string;
  rating: number;
  comment: string;
  date?: string;
  className?: string;
  imageUrl?: string;
}

interface SellerProfile {
  name: string;
  phone: string;
  email: string;
  positiveRating: string;
  joinedDate: string;
  jobPreferences: string;
  profileImage?: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  sellerProfile?: SellerProfile;
  serviceListingId?: string;
  onReviewSubmitted?: () => void;
  providerId?: string;
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

  return (
    <Card
      className={`p-6 sm:p-8 lg:p-10 w-full min-h-[120px] sm:min-h-[140px] ${className}`}
    >
      <CardContent className="flex flex-col gap-5 sm:gap-6 w-full h-full p-0">
        <div className="flex items-start justify-between gap-3 w-full">
          <h4 className="font-semibold text-[#102E50] text-base sm:text-2xl flex-1 break-words">
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
        <p className="text-[#102E50] text-xs sm:text-base leading-relaxed break-words w-full flex-1">
          {comment}
        </p>
        {date && (
          <div className="text-xs text-gray-500 break-words mt-auto">
            {date}
          </div>
        )}
        {(imageUrl || PLACEHOLDER_IMAGE_URL) && (
          <div className="flex flex-wrap gap-2 mt-4">
            <Image
              src={imageUrl || PLACEHOLDER_IMAGE_URL}
              alt="Review image"
              width={60}
              height={60}
              className="rounded-md object-cover cursor-pointer border border-gray-200"
              onClick={() => setShowImageModal(true)}
            />
          </div>
        )}
      </CardContent>

      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-3xl max-h-full p-2 bg-white rounded-lg"></div>
        </div>
      )}
    </Card>
  );
}

function SellerProfileCard({
  profile,
  providerId,
}: {
  profile: SellerProfile;
  providerId?: string;
}) {
  const router = useRouter();

  const handleViewProfile = () => {
    if (providerId) {
      router.push(`/provider/profile?id=${providerId}`);
    } else {
      router.push('/profile');
    }
  };

  return (
    <Card className="p-5 sticky top-4">
      <CardContent className="p-0 space-y-4">
        <h3 className="text-xl font-bold text-[#102E50]">
          About this provider
        </h3>

        {/* Profile Image and Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-red-600 flex items-center justify-center flex-shrink-0">
            {profile.profileImage ? (
              <Image
                src={profile.profileImage}
                alt={profile.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-white text-center font-bold">
                <div className="text-lg">MAKE</div>
                <div className="text-lg">AN</div>
                <div className="text-lg">OFFER</div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#102E50] text-lg mb-1">
              {profile.name}
            </h4>
            <p className="text-base text-gray-600">{profile.phone}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-base">
            <span className="text-[#102E50] font-semibold">
              {profile.positiveRating}
            </span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 mb-4 text-base">
          <div className="flex items-start gap-2">
            <Calendar className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">{profile.joinedDate}</span>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <h5 className="font-semibold text-[#102E50] text-base mb-1">Email</h5>
          <p className="text-base text-gray-700">{profile.email}</p>
        </div>

        {/* Job Preferences */}
        <div className="mb-4">
          <h5 className="font-semibold text-[#102E50] text-base mb-2">
            Job Preferences
          </h5>
          <div className="flex flex-wrap gap-2">
            {profile.jobPreferences.split(',').map((preference, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-[#102E50] text-[#102E50] hover:bg-[#102E50] hover:text-white transition-colors text-sm"
              >
                {preference.trim()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Visit Profile Button */}
        <Button
          className="w-full bg-[#102E50] hover:bg-[#0a1f35] text-white font-semibold py-2.5"
          onClick={handleViewProfile}
        >
          Visit profile
        </Button>
      </CardContent>
    </Card>
  );
}

export function ReviewsSection({
  reviews,
  sellerProfile,
  // serviceListingId,
  // onReviewSubmitted,
  providerId,
}: ReviewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  // const [showRatingModal, setShowRatingModal] = useState(false);
  // const [userRating, setUserRating] = useState(0);
  // const [hoverRating, setHoverRating] = useState(0);
  // const [reviewComment, setReviewComment] = useState('');
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const reviewsPerPage = 5;
  const columns = 1;

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

  // const handleSubmitRating = async () => {
  //   if (userRating === 0) {
  //     return;
  //   }

  //   if (!serviceListingId) {
  //     alert('Service listing ID is required to submit a review');
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // Get authentication token from Supabase session
  //     const {
  //       data: { session },
  //       error: sessionError,
  //     } = await supabase.auth.getSession();

  //     if (sessionError || !session?.access_token) {
  //       alert('Please login to submit a review');
  //       setIsSubmitting(false);
  //       return;
  //     }

  //     const token = session.access_token;

  //     const response = await fetch('http://localhost:3001/api/reviews', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         service_listing_id: serviceListingId,
  //         rating: userRating,
  //         comment: reviewComment || undefined,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to submit review');
  //     }

  //     // Reset and close
  //     setUserRating(0);
  //     setHoverRating(0);
  //     setReviewComment('');
  //     setShowRatingModal(false);

  //     // Notify parent to refresh reviews
  //     if (onReviewSubmitted) {
  //       onReviewSubmitted();
  //     }

  //     alert('Review submitted successfully!');
  //   } catch (error) {
  //     console.error('Error submitting review:', error);
  //     alert(
  //       error instanceof Error
  //         ? error.message
  //         : 'Failed to submit review. Please try again.'
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleCancelRating = () => {
  //   setUserRating(0);
  //   setHoverRating(0);
  //   setReviewComment('');
  //   setShowRatingModal(false);
  // };

  return (
    <div className="w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto pr-4 sm:pr-6 lg:pr-8 pb-5 sm:pb-6 lg:pb-8 overflow-hidden">
      {/* Two Column Layout - Profile + Review Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 mb-6 px-4 sm:px-0">
        {/* Left Column - Seller Profile */}
        {sellerProfile && (
          <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0">
            <SellerProfileCard
              profile={sellerProfile}
              providerId={providerId}
            />
          </div>
        )}

        {/* Right Column - Review Header and Filters */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-4">
          <div className="mb-5 sm:mb-6 w-full text-left">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102E50] break-words">
                Reviews
              </h2>
              {/* <Button
                className="bg-[#102E50] hover:bg-[#0a1f35] text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-md transition-colors duration-200 whitespace-nowrap"
                onClick={() => setShowRatingModal(true)}
              >
                Rate Service
              </Button> */}
            </div>
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
                  className={`flex items-center w-full sm:w-full md:w-full lg:w-full py-1.5 px-2 rounded-md transition-colors
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
                ? 'bg-[#102E50] text-white hover:bg-[#0a1f35]'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
            >
              Clear Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Full Width Comments Section */}
      <div className="w-full space-y-5 sm:space-y-6 px-4 sm:px-0">
        <div className="mb-5 sm:mb-6 w-full text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102E50] break-words">
            All Reviews
          </h2>
        </div>

        {filteredReviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 w-full">
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
          <Card className="p-6 sm:p-8 text-left max-w-6xl w-full">
            <p className="text-lg sm:text-xl text-gray-500 break-words">
              No reviews yet. Be the first to leave a review!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
