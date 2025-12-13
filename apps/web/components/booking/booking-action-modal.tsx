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
import { Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '../../lib/hooks/useAuth';

interface BookingActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'confirm' | 'delete' | 'finish' | 'complete';
  bookingId: number | string;
  serviceName: string;
  onSuccess?: () => void;
}

export default function BookingActionModal({
  isOpen,
  onClose,
  action,
  serviceName,
  bookingId,
  onSuccess,
}: BookingActionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, session } = useAuth();

  const handleAction = async () => {
    if (!session?.access_token || !user?.id) {
      alert('Authentication required');
      return;
    }

    setIsProcessing(true);
    try {
      if (action === 'confirm') {
        // Check if it's a job application (starts with 'app-') or a service request
        const isJobApplication = String(bookingId).startsWith('app-');

        if (isJobApplication) {
          // Extract the actual application ID (remove 'app-' prefix)
          const actualBookingId = String(bookingId).replace('app-', '');

          // Update job application status to accepted
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${actualBookingId}/status`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                status: 'accepted',
                userId: user.id,
              }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to confirm booking');
          }

          // Get the updated application to find the service_request_id
          const updatedApplication = await response.json();
          const serviceRequestId = updatedApplication.service_request_id;

          // Update the service request status to accepted
          if (serviceRequestId) {
            const srResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/service-requests/${serviceRequestId}`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                  status: 'accepted',
                }),
              }
            );

            if (!srResponse.ok) {
              console.warn('Failed to update service request status');
              // Don't throw here, the application was already accepted
            }
          }
        } else {
          // Direct service request confirmation (provider confirming a booking)
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/service-requests/${bookingId}/confirm`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                userId: user.id,
              }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to confirm booking');
          }
        }
      } else if (action === 'delete') {
        // Extract the actual application ID (remove 'app-' prefix)
        const actualBookingId = String(bookingId).replace('app-', '');

        // Update job application status to rejected
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${actualBookingId}/status`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              status: 'rejected',
              userId: user.id,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to delete booking');
        }
      } else if (action === 'finish') {
        // Provider marks booking as finished
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/service-requests/${bookingId}/finish`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              providerId: user.id,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to finish booking');
        }
      } else if (action === 'complete') {
        // Client releases payment and completes booking
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/service-requests/${bookingId}/complete`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              clientId: user.id,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to complete booking');
        }
      }

      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(`Error ${action}ing booking:`, error);
      alert(
        `Failed to ${action} booking. ${error instanceof Error ? error.message : 'Please try again.'}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const modalConfig = {
    confirm: {
      title: 'Confirm Booking',
      description: `Are you sure you want to confirm "${serviceName}"? This will move the booking to your ongoing jobs.`,
      confirmText: 'Yes, Confirm',
      cancelText: 'Cancel',
      confirmVariant: 'default' as const,
      icon: <Check className="w-5 h-5" />,
    },
    delete: {
      title: 'Delete Booking',
      description: `Are you sure you want to delete "${serviceName}"? This action cannot be undone and will move the booking to cancelled.`,
      confirmText: 'Yes, Delete',
      cancelText: 'Keep Booking',
      confirmVariant: 'destructive' as const,
      icon: <Trash2 className="w-5 h-5" />,
    },
    finish: {
      title: 'Finish Booking',
      description: `Mark "${serviceName}" as finished? The client will be able to release payment after you confirm.`,
      confirmText: 'Yes, Mark as Finished',
      cancelText: 'Cancel',
      confirmVariant: 'default' as const,
      icon: <Check className="w-5 h-5" />,
    },
    complete: {
      title: 'Release Payment',
      description: `Release payment for "${serviceName}"? This will complete the booking and move it to your past jobs.`,
      confirmText: 'Yes, Release Payment',
      cancelText: 'Cancel',
      confirmVariant: 'default' as const,
      icon: <Check className="w-5 h-5" />,
    },
  };

  const config = modalConfig[action];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            {config.cancelText}
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={handleAction}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : config.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
