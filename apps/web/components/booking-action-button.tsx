import { Button } from '@hanapp-ph/commons';
import { MessageCircle, Phone } from 'lucide-react';

interface BookingActionButtonProps {
  status: string;
  bookingId: number;
}

export default function BookingActionButton({
  status,
}: BookingActionButtonProps) {
  switch (status) {
    case 'Pending':
    case 'Paid':
    case 'Accepted':
      return (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            className="bg-hanapp-primary hover:bg-hanapp-secondary text-white flex-1"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Message
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-hanapp-accent text-hanapp-primary flex-1 bg-transparent"
          >
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
        </div>
      );
    case 'Completed':
      return (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            className="bg-hanapp-accent hover:bg-yellow-500 text-hanapp-secondary flex-1"
          >
            Rate Service
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-hanapp-primary text-hanapp-primary flex-1 bg-transparent"
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
            className="bg-hanapp-primary hover:bg-hanapp-secondary text-white flex-1"
          >
            Book Again
          </Button>
        </div>
      );
    default:
      return null;
  }
}
