import { Card } from '@hanapp-ph/commons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Sidebar } from './jobid-sidebar';

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
            <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-[#102E50] break-words">
              {title}
            </h3>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102E50]">
              {price}
            </div>
          </div>
        </div>

        <p className="text-[#102E50] text-base sm:text-lg lg:text-xl leading-relaxed">
          {description}
        </p>

        <ul className="space-y-2 w-full">
          {features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="text-base sm:text-lg lg:text-xl text-[#102E50] flex items-start gap-3 w-full"
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
  sidebarData,
}: ServicesSectionProps) {
  const imageFiles = [
    '/img-carousel-placeholder_1.png',
    '/img-carousel-placeholder_2.png',
    '/img-carousel-placeholder_3.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? imageFiles.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(prev =>
      prev === imageFiles.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <div className="w-full space-y-6 sm:space-y-8 lg:space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <Card className="w-full p-4 sm:p-6 lg:p-8 bg-white text-gray-900 shadow-lg">
            <div className="mb-4 sm:mb-6 w-full">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#102E50] mb-1 sm:mb-2">
                Photos & Media
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-[#102E50]">
                Professional work showcase
              </p>
            </div>

            <div className="relative w-full overflow-hidden">
              <div className="relative bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden h-[250px] sm:h-[350px] md:h-[450px] lg:h-[678px] w-full">
                <Image
                  src={imageFiles[currentImageIndex]}
                  alt={`Service showcase ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  className="object-contain w-full h-full"
                  priority
                />

                <div className="absolute inset-0 flex items-center justify-between p-3 sm:p-4 lg:p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={goToPrevious}
                    className="bg-white/90 backdrop-blur-sm text-gray-800 p-2 sm:p-3 lg:p-4 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-200 flex-shrink-0"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="bg-white/90 backdrop-blur-sm text-gray-800 p-2 sm:p-3 lg:p-4 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-200 flex-shrink-0"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </button>
                </div>

                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 lg:space-x-4">
                  {imageFiles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`transition-all duration-300 rounded-full flex-shrink-0 ${
                        index === currentImageIndex
                          ? 'w-6 sm:w-8 lg:w-10 h-3 sm:h-3 lg:h-4 bg-white shadow-lg'
                          : 'w-3 sm:w-3 lg:w-4 h-3 sm:h-3 lg:h-4 bg-white/60 hover:bg-white/80 hover:scale-110'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Sidebar
            pricing={
              sidebarData?.pricing ?? { startingPrice: '', currency: '₱' }
            }
            availability={
              sidebarData?.availability ?? { schedule: '', notes: '' }
            }
            serviceAreas={sidebarData?.serviceAreas ?? []}
            safetyFeatures={sidebarData?.safetyFeatures ?? []}
            faqs={sidebarData?.faqs ?? []}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="w-full text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#102E50]">
            Services & Packages
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#102E50]">
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
            <p className="text-lg sm:text-xl lg:text-2xl">
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              What to Expect
            </h2>
          </div>

          <div className="grid gap-2 sm:gap-3 md:grid-cols-2 w-full max-w-5xl mx-auto px-4 sm:px-4">
            {expectations.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 sm:gap-3 w-full"
              >
                <span className="w-2 h-2 bg-white rounded-full mt-2 sm:mt-3 flex-shrink-0"></span>
                <span className="text-base sm:text-lg lg:text-xl text-white leading-relaxed flex-1">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {expectations.length === 0 && (
            <p className="text-center py-8 sm:py-10 lg:py-12 text-[#102E50] text-lg sm:text-xl lg:text-2xl w-full">
              Service expectations will be listed here.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
