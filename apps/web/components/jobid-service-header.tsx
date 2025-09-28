import { Star, MapPin, Clock } from 'lucide-react';

interface ServiceHeaderProps {
  title?: string;
  rating?: number;
  totalReviews?: number;
  responseTime?: string;
  location?: string;
  onBookClick?: () => void;
  onMessageClick?: () => void;
}

export function ServiceHeader({
  title = 'AC Specialist',
  rating = 4.9,
  totalReviews = 127,
  responseTime = '~2 hrs',
  location = 'Metro Manila',
}: ServiceHeaderProps) {
  return (
    <header
      className="text-white w-full"
      role="banner"
      style={{
        background:
          'linear-gradient(180deg, #102E50 4.99%, rgba(1, 65, 130, 0.99) 92.97%)',
      }}
    >
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-10 py-4 sm:py-6 lg:py-8 overflow-hidden">
        <div className="flex flex-col gap-2 sm:gap-2 lg:gap-3 w-full">
          <div className="w-full min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-3xl xl:text-5xl font-bold mb-1 sm:mb-2 lg:mb-2 text-white break-words w-full">
              {title}
            </h1>

            <div className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-lg w-full">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-[#F5C45E] flex-shrink-0 self-center" />
                <span className="font-semibold text-sm sm:text-xl flex-shrink-0">
                  {rating}
                </span>
                <span className="text-white/80 text-xs sm:text-xl flex-shrink-0">
                  ({totalReviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-lg flex-wrap">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 self-center" />
                <span className="break-words">Responds in {responseTime}</span>
              </div>

              <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-lg flex-wrap">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 self-center" />
                <span className="break-words">Service areas: {location}</span>
              </div>
            </div>

            <div className="mt-1 sm:mt-2 lg:mt-3 w-full">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-medium break-words">
                  Available Today • Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
