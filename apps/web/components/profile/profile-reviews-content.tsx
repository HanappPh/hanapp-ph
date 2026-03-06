import { Card } from '@hanapp-ph/commons';
import React from 'react';

import { fetchProviderReviews } from '../../lib/api/reviews';

import { ProfileRating } from './profile-rating';

export function ReviewsContent({
  initialSelected,
  providerId,
  embedded = false,
}: {
  initialSelected?: 'Provider' | 'Client';
  providerId?: string;
  embedded?: boolean;
}) {
  const [reviews, setReviews] = React.useState<
    {
      id: string;
      name: string;
      rating: number;
      comment: string;
      date: string;
    }[]
  >([]);

  const [reviewStats, setReviewStats] = React.useState({
    averageRating: 0,
    reviewCount: 0,
  });

  React.useEffect(() => {
    if (!providerId) {
      return;
    }

    const loadReviews = async () => {
      const data = await fetchProviderReviews(providerId);

      const mapped = data.map(item => ({
        id: item.id,
        name: item.client?.full_name || 'Anonymous',
        rating: item.rating || 0,
        comment: item.comment || 'No comment provided.',
        date: item.created_at,
      }));

      const validRatings = mapped
        .map(item => item.rating)
        .filter(rating => rating > 0);

      const averageRating =
        validRatings.length > 0
          ? Number(
              (
                validRatings.reduce((sum, value) => sum + value, 0) /
                validRatings.length
              ).toFixed(1)
            )
          : 0;

      setReviews(mapped);
      setReviewStats({
        averageRating,
        reviewCount: mapped.length,
      });
    };

    loadReviews();
  }, [providerId]);

  return (
    <main className={embedded ? 'p-6' : 'flex-1 p-6'}>
      <div className="space-y-6">
        {embedded ? (
          <div className="pb-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Reviews & Ratings
            </h2>
            <p className="text-gray-600">
              View all reviews and ratings from your clients here.
            </p>
          </div>
        ) : (
          <Card className="p-6 bg-white border-none drop-shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Reviews & Ratings
            </h2>
            <p className="text-gray-600">
              View all reviews and ratings from your clients here.
            </p>
          </Card>
        )}

        <ProfileRating
          rating={reviewStats.averageRating}
          reviewCount={reviewStats.reviewCount}
          reviews={reviews}
          initialSelected={initialSelected}
          embedded={embedded}
        />
      </div>
    </main>
  );
}
