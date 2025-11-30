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

interface BookingActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'confirm' | 'delete';
  bookingId: number | string;
  serviceName: string;
  onSuccess?: () => void;
}

export default function BookingActionModal({
  isOpen,
  onClose,
  action,
  serviceName,
  onSuccess,
}: BookingActionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async () => {
    setIsProcessing(true);
    try {
      if (action === 'confirm') {
        // For now, we'll simulate the API call
        // In the future, this should call an API to update the booking status
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // For now, we'll simulate the API call
        // In the future, this should call an API to delete/cancel the booking
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(`Error ${action}ing booking:`, error);
      alert(`Failed to ${action} booking. Please try again.`);
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
