'use client';

import { Button, Card, CardContent } from '@hanapp-ph/commons';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting?: boolean;
  onSubmit?: (review: { rating: number; comment: string }) => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  isSubmitting,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit?.({ rating, comment });
    // Reset form
    setRating(0);
    setComment('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card
        className="p-6 sm:p-8 w-full max-w-md mx-auto"
        onClick={e => e.stopPropagation()}
      >
        <CardContent className="p-0 space-y-6">
          <h3 className="text-2xl font-bold text-[#102E50] text-center">
            Rate This Service
          </h3>

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'fill-[#102E50] text-[#102E50]'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Rating Text */}
          {rating > 0 && (
            <p className="text-center text-lg font-semibold text-[#102E50]">
              {rating === 5 && 'Excellent!'}
              {rating === 4 && 'Very Good!'}
              {rating === 3 && 'Good'}
              {rating === 2 && 'Fair'}
              {rating === 1 && 'Poor'}
            </p>
          )}

          {/* Comment Textarea */}
          <div>
            <label
              htmlFor="review-comment"
              className="block text-sm font-semibold text-[#102E50] mb-2"
            >
              Your Review
            </label>
            <textarea
              id="review-comment"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#102E50] focus:border-transparent resize-none"
              rows={4}
              placeholder="Share your experience with this service..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {comment.length}/500
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 px-4 py-2.5 bg-white text-[#102E50] border-2 border-[#102E50] rounded-md hover:bg-gray-50 font-semibold transition-colors"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 px-4 py-2.5 bg-[#102E50] text-white rounded-md hover:bg-[#0a1f35] font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
