import { Badge, Card } from '@hanapp-ph/commons';
import { Calendar, Clock, MapPin, Wrench } from 'lucide-react';
import React from 'react';

// Simple separator component
const Separator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`border-t border-gray-200 ${className}`} />
);

interface ServiceInfoCardProps {
  service: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  pricing: string;
  paymentMethods: string[];
}

export const ProviderListingsServiceInfoCard: React.FC<
  ServiceInfoCardProps
> = ({
  service,
  category,
  description,
  date,
  time,
  location,
  pricing,
  paymentMethods,
}) => (
  <Card className="p-6">
    {/* Service Header */}
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Wrench className="h-5 w-5" style={{ color: '#FFDD8E' }} />
        <h2 className="text-2xl font-semibold text-balance text-black">
          {service}
        </h2>
      </div>
      <Badge variant="secondary" className="text-sm">
        {category}
      </Badge>
    </div>

    <p className="text-black leading-relaxed mb-6">{description}</p>
    <Separator className="my-4" />

    {/* Schedule & Location */}
    <div className="grid sm:grid-cols-2 gap-4 mb-6">
      <div className="flex items-start gap-3">
        <Calendar className="h-5 w-5 mt-0.5" style={{ color: '#FFDD8E' }} />
        <div>
          <p className="text-sm font-medium text-muted-foreground">Date</p>
          <p className="text-base font-semibold">{date}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Clock className="h-5 w-5 mt-0.5" style={{ color: '#FFDD8E' }} />
        <div>
          <p className="text-sm font-medium text-muted-foreground">Time</p>
          <p className="text-base font-semibold">{time}</p>
        </div>
      </div>
      <div className="flex items-start gap-3 sm:col-span-2">
        <MapPin className="h-5 w-5 mt-0.5" style={{ color: '#FFDD8E' }} />
        <div>
          <p className="text-sm font-medium text-muted-foreground">Location</p>
          <p className="text-base font-semibold">{location}</p>
        </div>
      </div>
    </div>

    {/* Pricing & Payment Methods */}
    <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Pricing</p>
        <p className="text-2xl font-bold text-black">{pricing}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">Payment Methods</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {paymentMethods.map(method => (
            <Badge key={method} variant="outline" className="text-xs">
              {method}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </Card>
);
