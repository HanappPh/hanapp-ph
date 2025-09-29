import { Button, Card } from '@hanapp-ph/commons';
import { Calendar } from 'lucide-react';

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

interface FAQ {
  id?: string;
  question: string;
  answer: string;
}

interface SidebarProps {
  pricing: PricingInfo;
  availability: AvailabilityInfo;
  serviceAreas: ServiceArea[];
  safetyFeatures: SafetyFeature[];
  faqs: FAQ[];
  onBookNow?: () => void;
  onChatFirst?: () => void;
}

export function Sidebar({
  pricing,
  availability,
  serviceAreas,
  safetyFeatures,
  faqs,
  onBookNow,
  onChatFirst,
}: SidebarProps) {
  // No editing or owner functions needed

  return (
    <div
      className="w-full"
      role="complementary"
      aria-label="Service details sidebar"
    >
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 w-full">
        {/* Pricing Card */}
        <Card className="w-full p-4 sm:p-6 lg:p-8 shadow-lg">
          <div className="flex items-center justify-between mb-4 sm:mb-6 w-full">
            <div className="flex-1 min-w-0">
              <p className="text-base sm:text-lg lg:text-xl text-[#102E50] mb-1 sm:mb-2">
                Starting from
              </p>
              <div className="text-2xl sm:text-2xl lg:text-4xl font-bold text-[#102E50] break-words">
                {pricing.currency || '₱'}
                {pricing.startingPrice}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8 w-full">
            <Button
              className="flex-1 bg-[#102E50] text-white hover:bg-[#102E50]/90 text-lg sm:text-sm lg:text-xl min-w-0 h-10 sm:h-14 lg:h-16"
              onClick={onBookNow}
              aria-label="Book this service now"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent text-lg sm:text-sm lg:text-xl min-w-0 h-10 sm:h-14 lg:h-16"
              onClick={onChatFirst}
              aria-label="Chat with service provider first"
            >
              <span className="truncate">Chat</span>
            </Button>
          </div>

          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl w-full">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
                <h4 className="font-medium text-lg sm:text-xl lg:text-2xl flex items-center gap-1 sm:gap-2 min-w-0">
                  <Calendar
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="break-words">Availability</span>
                </h4>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base break-words">
                {availability.schedule}
              </p>
              {availability.notes && (
                <p className="text-muted-foreground text-sm sm:text-base break-words mt-1">
                  {availability.notes}
                </p>
              )}
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
                <h4 className="font-medium text-lg sm:text-xl lg:text-2xl break-words min-w-0 flex-1">
                  Accepted Areas
                </h4>
              </div>
              {serviceAreas.length > 0 ? (
                <p className="text-muted-foreground text-base sm:text-lg lg:text-xl break-words">
                  {serviceAreas.map(area => area.name).join(', ')}
                </p>
              ) : (
                <p className="text-muted-foreground text-base sm:text-lg lg:text-xl break-words">
                  No service areas specified
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Safety & Trust */}
        <Card className="p-8 bg-[#102E50] text-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-xl lg:text-3xl text-white">
              Safety & Trust
            </h3>
          </div>

          <div
            className="space-y-4 text-base"
            role="list"
            aria-label="Safety features"
          >
            {safetyFeatures.map((feature, index) => (
              <div
                key={feature.id || index}
                className="flex items-start gap-3"
                role="listitem"
              >
                <span className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-lg lg:text-2xl text-white">
                  {feature.text}
                </span>
              </div>
            ))}
            {safetyFeatures.length === 0 && (
              <p className="text-white/70 text-lg lg:text-2xl">
                No safety features listed
              </p>
            )}
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-8 bg-white shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-xl lg:text-3xl text-[#102E50]">
              FAQs
            </h3>
          </div>

          <div
            className="space-y-6 text-base"
            role="list"
            aria-label="Frequently asked questions"
          >
            {faqs.map((faq, index) => (
              <div key={faq.id || index} role="listitem">
                <h4 className="font-medium text-lg lg:text-2xl mb-2 text-[#102E50]">
                  {faq.question}
                </h4>
                <p className="text-[#102E50]/80 text-base lg:text-xl">
                  {faq.answer}
                </p>
              </div>
            ))}
            {faqs.length === 0 && (
              <p className="text-[#102E50]/70 text-base lg:text-xl">
                No FAQs available
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
