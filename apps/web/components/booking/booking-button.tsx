import { Button } from '@hanapp-ph/commons';
import { MessageCircle, CreditCard, X, Check, Trash2 } from 'lucide-react';

interface BookingActionButtonProps {
  status: string;
  bookingId: number;
  tabContext?: 'sent' | 'received' | 'ongoing' | 'past' | 'cancelled';
}

export default function BookingActionButton({
  status,
  tabContext,
}: BookingActionButtonProps) {
  // Handle different tab contexts
  if (tabContext === 'sent') {
    return (
      <div className="flex gap-2 mt-3">
        <Button
          size="sm"
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
      </div>
    );
  }

  if (tabContext === 'received') {
    return (
      <div className="flex gap-2 mt-3">
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="w-4 h-4 mr-1" />
          Confirm
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </div>
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
          >
            Rate Service
          </Button>
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
