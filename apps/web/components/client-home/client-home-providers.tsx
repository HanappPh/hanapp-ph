import { Button } from '@hanapp-ph/commons';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface Provider {
  id: string;
  name: string;
  service: string;
  distance: string;
  avatar?: string;
}

interface ClientHomeProvidersProps {
  providers: Provider[];
  onViewProvider?: (providerId: string) => void;
}

export function ClientHomeProviders({
  providers,
  onViewProvider,
}: ClientHomeProvidersProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const maxIndex = Math.max(0, providers.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const visibleProviders = providers.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Find Help. Find Income.</h2>
          <h2 className="text-3xl font-bold">Find Peace of Mind.</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Providers Near You</h3>
        </div>

        <div className="relative">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-0 z-10 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 transition-colors"
              aria-label="Previous providers"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-4 overflow-hidden mx-12">
              {visibleProviders.map(provider => (
                <div
                  key={provider.id}
                  className="flex-shrink-0 w-48 bg-white rounded-lg p-4 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-300 overflow-hidden">
                    {provider.avatar ? (
                      <Image
                        src={provider.avatar}
                        alt={provider.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-2xl">
                        {provider.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <h4 className="font-bold text-gray-800 mb-1">
                    {provider.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {provider.service}
                  </p>

                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{provider.distance}</span>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold"
                    onClick={() => onViewProvider?.(provider.id)}
                  >
                    See Details
                  </Button>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="absolute right-0 z-10 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 transition-colors"
              aria-label="Next providers"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
