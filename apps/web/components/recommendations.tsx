'use client';

import { Badge, Card, CardContent } from '@hanapp-ph/commons';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Service {
  id: string;
  title: string;
  category: string;
  price: string;
  rating: number;
  location: string;
  image: string;
}

interface RecommendedServicesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  services?: Service[];
  children?: React.ReactNode;
}

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Labada per kilo',
    category: 'Laundry',
    price: 'P28',
    rating: 5,
    location: 'Baliuag, Bulacan',
    image: '/laundry-service.png',
  },
  {
    id: '2',
    title: 'Lipat bahay Luzon Area to Visayas only',
    category: 'Transport',
    price: 'P2.5K',
    rating: 5,
    location: 'Baliuag, Bulacan',
    image: '/house-cleaning-service.png',
  },
  {
    id: '3',
    title: 'Stay out yaya daily rate',
    category: 'Babysitting',
    price: 'P650',
    rating: 5,
    location: 'Baliuag, Bulacan',
    image: '/tutoring-education.jpg',
  },
];

export function RecommendedServices({
  title = 'Other services you might be interested in',
  services = defaultServices,
  className,
  ...props
}: RecommendedServicesProps) {
  return (
    <div
      className={
        className ? `${className} max-w-[90vw] py-6` : 'max-w-[90vw] py-6'
      }
      {...props}
    >
      <h2 className="text-xl font-semibold text-hanapp-secondary mb-4 px-4">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {services.map(service => (
          <Card
            key={service.id}
            className="flex-shrink-0 w-64 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={service.image || '/placeholder.svg'}
                  alt={service.title}
                  width={256}
                  height={160}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-hanapp-secondary text-sm leading-tight flex-1">
                    {service.title}
                  </h3>
                  <Badge className="bg-hanapp-accent text-hanapp-secondary font-semibold px-2 py-1 text-sm">
                    {service.price}
                  </Badge>
                </div>

                <div className="mb-3">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-100"
                  >
                    {service.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < service.rating
                            ? 'fill-hanapp-accent text-hanapp-accent'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-24">
                      {service.location}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
