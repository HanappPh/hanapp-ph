'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hanapp-ph/commons';
import { MessageCircle, CreditCard, X, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '../../lib/hooks/useAuth';

import BookingActionModal from './booking-action-modal';
import ReviewModal from './review-modal';

interface BookingActionButtonProps {
  status: string;
  bookingId: number | string; // Allow both for job applications
  serviceName: string;
  tabContext?: 'requested' | 'received' | 'ongoing' | 'past' | 'cancelled';
  onDelete?: () => void;
  onConfirm?: () => void;
}

export default function BookingActionButton({
  status,
  bookingId,
  serviceName,
  tabContext,
  onDelete,
  onConfirm,
}: BookingActionButtonProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { session } = useAuth();

  const handleSubmitReview = async (review: {
    rating: number;
    comment: string;
  }) => {
    if (!session?.access_token) {
      console.error('No access token available');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            booking_id: bookingId,
            rating: review.rating,
            comment: review.comment,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
        alert('Failed to submit review');
        return;
      }

      alert('Thank you for your review!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!session?.access_token) {
      console.error('No access token available');
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/service-requests/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      setShowDeleteDialog(false);
      // Call the onDelete callback to refresh the bookings list
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  // Handle different tab contexts
  if (tabContext === 'requested') {
    return (
      <>
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={() => setShowDeleteDialog(true)}
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Job Request</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this job request? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
              >
                Keep Request
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Cancelling...' : 'Yes, Cancel Request'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  if (tabContext === 'received') {
    return (
      <>
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowConfirmModal(true)}
          >
            <Check className="w-4 h-4 mr-1" />
            Confirm
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>

        <BookingActionModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          action="confirm"
          bookingId={bookingId}
          serviceName={serviceName}
          onSuccess={onConfirm}
        />

        <BookingActionModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          action="delete"
          bookingId={bookingId}
          serviceName={serviceName}
          onSuccess={onDelete}
        />
      </>
    );
  }

  if (tabContext === 'ongoing') {
    return (
      <div className="flex gap-2 mt-3">
        <Button
          size="sm"
          className="bg-hanapp-primary hover:bg-hanapp-secondary text-white"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          Message
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-gray-400 text-gray-400 cursor-not-allowed opacity-60"
          disabled
        >
          <CreditCard className="w-4 h-4 mr-1" />
          Payment
        </Button>
      </div>
    );
  }

  // Default behavior for past and cancelled tabs
  switch (status) {
    case 'Completed':
      return (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            className="bg-hanapp-accent hover:bg-yellow-500 text-hanapp-secondary"
            onClick={() => setIsReviewOpen(true)}
          >
            Rate Service
          </Button>
          <ReviewModal
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
            onSubmit={handleSubmitReview}
          />
          <Button
            size="sm"
            variant="outline"
            className="border-hanapp-primary text-hanapp-primary bg-transparent"
          >
            Book Again
          </Button>
        </div>
      );
    case 'Cancelled':
    case 'Rejected':
      return (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            className="bg-hanapp-primary hover:bg-hanapp-secondary text-white"
          >
            Book Again
          </Button>
        </div>
      );
    default:
      return null;
  }
}
