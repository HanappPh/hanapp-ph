'use client';

import { Button, Card } from '@hanapp-ph/commons';
import { Clock, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PricingInfo {
  startingPrice: string;
  currency?: string;
}

interface AvailabilityInfo {
  schedule: string;
  notes?: string;
}

interface ServiceArea {
  id?: string;
  name: string;
}

interface SafetyFeature {
  id?: string;
  text: string;
  verified?: boolean;
}

interface SidebarProps {
  pricing: PricingInfo;
  availability: AvailabilityInfo;
  serviceAreas: ServiceArea[];
  safetyFeatures: SafetyFeature[];
  onBookNow?: () => void;
  onChatFirst?: () => void;
  title: string;
  rating: number;
  totalReviews: number;
  responseTime: string;
  location: string;
  schedule: string;
  jobId?: string;
}

export function Sidebar({
  pricing,
  availability,
  serviceAreas,
  onBookNow,
  title,
  rating,
  totalReviews,
  responseTime,
  location,
  jobId,
}: SidebarProps) {
  const router = useRouter();

  const handleChatClick = () => {
    // Redirect to chat page with a default user ID since data is hardcoded
    router.push('/chat?userId=1');
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(); // still support external override
    } else {
      // route to /book or /book/[jobId]
      router.push(jobId ? `/jobs/${jobId}/book` : '/book');
    }
  };
  return (
    <div
      className="w-full"
      role="complementary"
      aria-label="Service details sidebar"
    >
      {/* Service Header Card */}
      <Card className="p-2 sm:p-4 lg:p-4 bg-gradient-to-b from-[#17406a] to-[#102E50] text-white shadow-xl mb-2 sm:mb-4 lg:mb-6 min-h-[200px] flex flex-col">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold break-words mb-1 mt-2 lg:mb-2">
          {title}
        </h2>
        <div className="flex items-center mb-1 lg:mb-2">
          <span className="font-semibold text-base sm:text-lg lg:text-xl mr-1">
            {rating}
          </span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-9 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-base sm:text-lg lg:text-xl ml-2">
            ({totalReviews} reviews)
          </span>
        </div>
        <div className="flex items-center text-base sm:text-lg lg:text-xl text-white/90 mb-1 pt-4">
          <Clock className="w-5 h-5 mr-2 text-white/70" aria-hidden="true" />
          <span>
            Responds in <span className="font-medium">{responseTime}</span>
          </span>
        </div>
        <div className="flex items-center text-base sm:text-lg lg:text-xl text-white/90 mb-1">
          <MapPin className="w-5 h-5 mr-2 text-white/70" aria-hidden="true" />
          <span>
            Service areas: <span className="font-medium">{location}</span>
          </span>
        </div>
        <div className="flex items-center text-base sm:text-lg lg:text-xl text-white/90 mb-1 pl-1">
          <span className="pl-2 w-2 h-2 bg-white rounded-full mr-2 flex-shrink-0"></span>
          <span> Verified</span>
        </div>
      </Card>

      <div className="space-y-2 sm:space-y-3 lg:space-y-4 w-full min-h-[180px]">
        {/* Pricing Card */}
        <Card className="w-full p-2 sm:p-4 lg:p-4 shadow-lg min-h-[200px]">
          <div className="flex items-center justify-between mb-5 sm:mb-7 lg:mb-9 w-full">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm lg:text-base text-[#102E50] mb-1 sm:mb-2">
                Starting from
              </p>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#102E50] break-words">
                {pricing.currency || '₱'}
                {pricing.startingPrice}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4 w-full">
            <Button
              className="flex-1 bg-[#102E50] text-white hover:bg-[#102E50]/90 text-xs sm:text-sm lg:text-base min-w-0 h-8 sm:h-10 lg:h-12"
              onClick={handleBookNow}
              aria-label="Book this service now"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent text-xs sm:text-sm lg:text-base min-w-0 h-8 sm:h-10 lg:h-12"
              onClick={handleChatClick}
              aria-label="Chat with service provider first"
            >
              <span className="truncate">Chat</span>
            </Button>
          </div>

          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base w-full">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
                <h4 className="font-medium text-xs sm:text-sm lg:text-base flex items-center gap-1 sm:gap-2 min-w-0">
                  <span className="w-2 h-2 bg-[#102E50] rounded-full mr-2 flex-shrink-0"></span>
                  <span className="break-words">Availability</span>
                </h4>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base break-words">
                {availability.schedule}
              </p>
              {availability.notes && (
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base break-words mt-1">
                  {availability.notes}
                </p>
              )}
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
                <h4 className="font-medium text-xs sm:text-sm lg:text-base break-words min-w-0 flex-1">
                  Accepted Areas
                </h4>
              </div>
              {serviceAreas.length > 0 ? (
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base break-words">
                  {serviceAreas.map(area => area.name).join(', ')}
                </p>
              ) : (
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base break-words">
                  No service areas specified
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Removed FAQs */}
      </div>
    </div>
  );
}
