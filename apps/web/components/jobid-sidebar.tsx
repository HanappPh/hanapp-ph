import { Button, Card } from '@hanapp-ph/commons';
import { Clock, MapPin } from 'lucide-react';

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
}

export function Sidebar({
  pricing,
  availability,
  serviceAreas,
  onBookNow,
  onChatFirst,
  title,
  rating,
  totalReviews,
  responseTime,
  location,
}: SidebarProps) {
  return (
    <div
      className="w-full"
      role="complementary"
      aria-label="Service details sidebar"
    >
      {/* Service Header Card */}
      <Card className="p-6 sm:p-8 lg:p-8 bg-gradient-to-b from-[#17406a] to-[#102E50] text-white shadow-xl mb-6 sm:mb-8 lg:mb-12 min-h-[340px] flex flex-col">
        <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold break-words mb-3 mt-6 lg:mb-5">
          {title}
        </h2>
        <div className="flex items-center mb-3 lg:mb-5">
          <span className="font-semibold text-3xl sm:text-3xl lg:text-4xl mr-1">
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
          <span className="text-3xl sm:text-3xl lg:text-3xl ml-2">
            ({totalReviews} reviews)
          </span>
        </div>
        <div className="flex items-center text-3xl sm:text-2xl lg:text-3xl text-white/90 mb-1 pt-16">
          <Clock className="w-5 h-5 mr-2 text-white/70" aria-hidden="true" />
          <span>
            Responds in <span className="font-medium">{responseTime}</span>
          </span>
        </div>
        <div className="flex items-center text-3xl sm:text-3xl lg:text-3xl text-white/90 mb-1">
          <MapPin className="w-5 h-5 mr-2 text-white/70" aria-hidden="true" />
          <span>
            Service areas: <span className="font-medium">{location}</span>
          </span>
        </div>
        <div className="flex items-center text-3xl sm:text-3xl lg:text-3xl text-white/90 mb-1 pl-3">
          <span className="pl-2 w-2 h-2 bg-white rounded-full mr-2 flex-shrink-0"></span>
          <span> Verified</span>
        </div>
      </Card>

      <div className="space-y-4 sm:space-y-6 lg:space-y-8 w-full min-h-[360px]">
        {/* Pricing Card */}
        <Card className="w-full p-5 sm:p-7 lg:p-10 shadow-lg min-h-[420px]">
          <div className="flex items-center justify-between mb-5 sm:mb-7 lg:mb-9 w-full">
            <div className="flex-1 min-w-0">
              <p className="text-lg sm:text-xl lg:text-2xl text-[#102E50] mb-1 sm:mb-2">
                Starting from
              </p>
              <div className="text-4xl sm:text-4xl lg:text-5xl font-bold text-[#102E50] break-words">
                {pricing.currency || '₱'}
                {pricing.startingPrice}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 lg:gap-7 mb-5 sm:mb-7 lg:mb-9 w-full">
            <Button
              className="flex-1 bg-[#102E50] text-white hover:bg-[#102E50]/90 text-2xl sm:text-3xl lg:text-3xl min-w-0 h-12 sm:h-14 lg:h-16"
              onClick={onBookNow}
              aria-label="Book this service now"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent text-2xl sm:text-2xl lg:text-3xl min-w-0 h-12 sm:h-14 lg:h-16"
              onClick={onChatFirst}
              aria-label="Chat with service provider first"
            >
              <span className="truncate">Chat</span>
            </Button>
          </div>

          <div className="space-y-5 sm:space-y-7 text-lg sm:text-xl lg:text-2xl w-full">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
                <h4 className="font-medium text-2xl sm:text-2xl lg:text-3xl flex items-center gap-1 sm:gap-2 min-w-0">
                  <span className="w-2 h-2 bg-[#102E50] rounded-full mr-2 flex-shrink-0"></span>
                  <span className="break-words">Availability</span>
                </h4>
              </div>
              <p className="text-muted-foreground text-xl sm:text-xl lg:text-2xl break-words">
                {availability.schedule}
              </p>
              {availability.notes && (
                <p className="text-muted-foreground text-xl sm:text-xl lg:text-2xl break-words mt-1">
                  {availability.notes}
                </p>
              )}
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
                <h4 className="font-medium text-2xl sm:text-2xl lg:text-3xl break-words min-w-0 flex-1">
                  Accepted Areas
                </h4>
              </div>
              {serviceAreas.length > 0 ? (
                <p className="text-muted-foreground text-xl sm:text-xl lg:text-2xl break-words">
                  {serviceAreas.map(area => area.name).join(', ')}
                </p>
              ) : (
                <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl break-words">
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
