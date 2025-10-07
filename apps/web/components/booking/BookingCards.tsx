import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
} from '@hanapp-ph/commons';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';

import BookingActionButton from './BookingButtons';
import BookingStatusBadge from './BookingStatus';

interface BookingCardProps {
  id: number;
  serviceName: string;
  providerName: string;
  rating: number;
  reviewCount: number;
  price: number;
  date: string;
  time: string;
  location: string;
  status:
    | 'Pending'
    | 'Accepted'
    | 'Paid'
    | 'Completed'
    | 'Rejected'
    | 'Cancelled';
  serviceImage?: string;
  providerImage?: string;
}

export default function BookingCard(booking: BookingCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="hidden sm:block relative w-32 h-32 rounded-lg object-cover">
            <Image
              src={booking.serviceImage || '/placeholder.svg'}
              alt={booking.serviceName}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-hanapp-secondary text-lg">
                  {booking.serviceName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={booking.providerImage || '/placeholder.svg'}
                    />
                    <AvatarFallback>{booking.providerName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">
                    {booking.providerName}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-hanapp-accent text-hanapp-accent" />
                    <span className="text-sm font-medium">
                      {booking.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({booking.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-hanapp-primary">
                  ₱{booking.price}
                </div>
                <BookingStatusBadge
                  status={booking.status}
                ></BookingStatusBadge>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{booking.location}</span>
              </div>
            </div>
            <BookingActionButton
              status={booking.status}
              bookingId={booking.id}
            ></BookingActionButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
