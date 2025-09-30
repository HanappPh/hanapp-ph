import { Card } from '@hanapp-ph/commons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface PhotosMediaProps {
  images?: string[];
}

export function PhotosMedia({ images: _images = [] }: PhotosMediaProps) {
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
    <Card className="w-full p-4 sm:p-6 lg:p-8 bg-white text-gray-900 shadow-lg">
      <div className="mb-4 sm:mb-6 w-full">
        <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-[#102E50] mb-2 sm:mb-3">
          Photos & Media
        </h2>
        <p className="text-xl sm:text-xl lg:text-2xl text-[#102E50]">
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
  );
}
