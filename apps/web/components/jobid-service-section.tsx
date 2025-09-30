import { Card } from '@hanapp-ph/commons';

interface Service {
  id?: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  note?: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface ServicesSectionProps {
  services: Service[];
  expectations: string[];
  reviews?: Review[];
  images?: string[];
  sidebarData?: {
    pricing: { startingPrice: string; currency: string };
    availability: { schedule: string; notes: string };
    serviceAreas: { id: string; name: string }[];
    safetyFeatures: { id: string; text: string; verified: boolean }[];
    faqs: { id: string; question: string; answer: string }[];
  };
}

function ServiceItem({ title, price, description, features }: Service) {
  return (
    <Card className="w-full p-6 sm:p-8 lg:p-10 bg-white hover:shadow-lg shadow-md transition-all duration-200">
      <div className="space-y-6 sm:space-y-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 w-full">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-[#102E50] break-words">
              {title}
            </h3>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102E50]">
              {price}
            </div>
          </div>
        </div>

        <p className="text-[#102E50] text-lg sm:text-xl lg:text-2xl leading-relaxed">
          {description}
        </p>

        <ul className="space-y-2 w-full">
          {features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="text-lg sm:text-xl lg:text-2xl text-[#102E50] flex items-start gap-3 w-full"
            >
              <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#102E50] rounded-full mt-2 sm:mt-3 flex-shrink-0"></span>
              <span className="flex-1 break-words">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export function ServicesSection({
  services,
  expectations,
  images: _images = [],
}: ServicesSectionProps) {
  return (
    <div className="w-full space-y-6 sm:space-y-8 lg:space-y-12">
      {/* Removed Photos & Media section and Sidebar for new layout in page.tsx */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102E50]">
            Services & Packages
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-[#102E50]">
            Transparent pricing. Materials not included unless stated.
          </p>
        </div>

        <div className="w-full space-y-6 sm:space-y-8">
          {services.map((service, index) => (
            <ServiceItem key={service.id || index} {...service} />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-8 sm:py-12 lg:py-16 text-[#102E50] w-full">
            <p className="text-xl sm:text-2xl lg:text-3xl">
              No services available at this time.
            </p>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center">
        <Card
          className="w-full max-w-[5000px] p-6 sm:p-8 lg:p-10 shadow-sm"
          style={{
            background:
              'linear-gradient(180deg, #102E50 4.99%, rgba(1, 65, 130, 0.99) 92.97%)',
          }}
        >
          <div className="mb-6 sm:mb-8 w-full text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              How to Make a Good Review
            </h2>
          </div>

          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 w-full max-w-7xl mx-auto px-4 sm:px-4">
            {Array.from({ length: 2 }).map((_, colIdx) => (
              <div className="flex flex-col gap-4 w-full" key={colIdx}>
                {expectations
                  .filter((_, i) => i % 2 === colIdx)
                  .map((item, idx) => (
                    <div
                      className="flex items-start gap-2 sm:gap-3 w-full"
                      key={item + idx}
                    >
                      <span className="w-2 h-2 bg-white rounded-full mt-2 sm:mt-3 flex-shrink-0"></span>
                      <span className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed flex-1">
                        {item}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
