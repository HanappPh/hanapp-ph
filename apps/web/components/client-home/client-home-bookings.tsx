import { Button } from '@hanapp-ph/commons';
import { Clock, CheckCircle } from 'lucide-react';

export interface Booking {
  id: string;
  type: 'pending' | 'completed';
  title: string;
  provider: string;
  timeAgo: string;
}

interface ClientHomeBookingsProps {
  bookings: Booking[];
  onViewBooking?: (bookingId: string) => void;
}

export function ClientHomeBookings({
  bookings,
  onViewBooking,
}: ClientHomeBookingsProps) {
  return (
    <section className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your bookings</h2>

      <div className="space-y-3">
        {bookings.map(booking => (
          <div
            key={booking.id}
            className={`rounded-lg p-4 flex items-center justify-between ${
              booking.type === 'pending' ? 'bg-orange-50' : 'bg-green-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {booking.type === 'pending' ? (
                <Clock className="w-6 h-6 text-orange-500" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}

              <div>
                <h3 className="font-semibold text-gray-800">{booking.title}</h3>
                <p className="text-sm text-gray-600">
                  {booking.provider} • {booking.timeAgo}
                </p>
              </div>
            </div>

            <Button
              variant={booking.type === 'pending' ? 'default' : 'outline'}
              size="sm"
              className={
                booking.type === 'pending'
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'border-green-500 text-green-600 hover:bg-green-50'
              }
              onClick={() => onViewBooking?.(booking.id)}
            >
              {booking.type === 'pending' ? 'Pending' : '₱500.00'}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
