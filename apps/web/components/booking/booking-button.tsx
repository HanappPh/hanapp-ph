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
  serviceId: number | string;
  serviceName: string;
  tabContext?: 'requested' | 'received' | 'ongoing' | 'past' | 'cancelled';
  onDelete?: () => void;
  onConfirm?: () => void;
  onFinishBooking?: () => void;
  onReleasePayment?: () => void;
  isFinished?: boolean;
  userRole?: 'provider' | 'client';
  isProviderFinished?: boolean;
  providerId?: string;
}

export default function BookingActionButton({
  status,
  bookingId,
  serviceId,
  serviceName,
  tabContext,
  onDelete,
  onConfirm,
  onFinishBooking,
  onReleasePayment,
  isFinished: _isFinished = false,
  userRole,
  isProviderFinished = false,
  providerId,
}: BookingActionButtonProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useAuth();

  const handleSubmitReview = async (review: {
    rating: number;
    comment: string;
  }) => {
    if (!session?.access_token) {
      console.error('No access token available');
      return;
    }

    if (!providerId) {
      console.error('Provider ID is missing');
      alert('Unable to submit review: Provider information is missing');
      return;
    }

    try {
      setIsSubmitting(true);

      // Determine the service_request_id
      let serviceRequestId: string | number;

      if (typeof bookingId === 'string' && bookingId.startsWith('app-')) {
        // For job applications, use the service request ID
        serviceRequestId = serviceId;
      } else {
        // For direct bookings, use the booking ID
        serviceRequestId = bookingId;
      }

      console.log('Submitting review with:', {
        service_request_id: serviceRequestId,
        provider_id: providerId,
        rating: review.rating,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            service_request_id: serviceRequestId,
            provider_id: providerId,
            rating: review.rating,
            comment: review.comment || undefined,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Review submission error:', errorData);
        alert(
          `Failed to submit review: ${errorData.message || 'Unknown error'}`
        );
        return;
      }

      const result = await response.json();
      console.log('Review submitted successfully:', result);

      alert('Thank you for your review!');
      setIsReviewOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!session?.access_token) {
      return;
    }

    setIsDeleting(true);
    try {
      // Check if it's a service request (numeric ID) or job application (string ID starting with 'app-')
      const isServiceRequest =
        typeof bookingId === 'number' || !String(bookingId).startsWith('app-');

      if (isServiceRequest) {
        // Update service request status to cancelled
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/service-requests/${bookingId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ status: 'cancelled' }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to cancel booking');
        }
      }
      // For job applications, we'll just update the UI via callback

      setShowDeleteDialog(false);
      // Call the onDelete callback to update UI
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
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
        {userRole === 'provider' && (
          <Button
            size="sm"
            className={
              isProviderFinished
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-hanapp-accent hover:bg-yellow-500 text-hanapp-secondary'
            }
            disabled={isProviderFinished}
            onClick={onFinishBooking}
          >
            <Check className="w-4 h-4 mr-1" />
            {isProviderFinished ? 'Job Finished' : 'Finish Job'}
          </Button>
        )}
        {userRole === 'client' && (
          <Button
            size="sm"
            variant="outline"
            className={
              isProviderFinished
                ? 'border-hanapp-primary text-hanapp-primary hover:bg-hanapp-primary hover:text-white'
                : 'border-gray-400 text-gray-400 cursor-not-allowed opacity-60'
            }
            disabled={!isProviderFinished}
            onClick={onReleasePayment}
          >
            <CreditCard className="w-4 h-4 mr-1" />
            Release Payment
          </Button>
        )}
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
            className="bg-hanapp-primary hover:bg-hanapp-secondary text-white"
            onClick={() => setIsReviewOpen(true)}
          >
            Rate Service
          </Button>
          <ReviewModal
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
            isSubmitting={isSubmitting}
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
