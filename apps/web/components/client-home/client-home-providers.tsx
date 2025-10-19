'use client';

import { Button } from '@hanapp-ph/commons';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef(1);
  const isPausedAtEndRef = useRef(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseDuration = 1500; // ms to pause at ends
  const scrollSpeed = 3; // adjust for speed

  useEffect(() => {
    let animationFrameId: number;

    const step = () => {
      const el = scrollRef.current;
      if (el && !isPaused && !isPausedAtEndRef.current) {
        el.scrollLeft += directionRef.current * scrollSpeed;

        const threshold = 2;
        if (
          directionRef.current === 1 &&
          el.scrollLeft >= el.scrollWidth - el.clientWidth - threshold
        ) {
          isPausedAtEndRef.current = true;
          timeoutIdRef.current = setTimeout(() => {
            directionRef.current = -1;
            isPausedAtEndRef.current = false;
          }, pauseDuration);
        } else if (directionRef.current === -1 && el.scrollLeft <= threshold) {
          isPausedAtEndRef.current = true;
          timeoutIdRef.current = setTimeout(() => {
            directionRef.current = 1;
            isPausedAtEndRef.current = false;
          }, pauseDuration);
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [isPaused]);

  return (
    <section className="bg-hanapp-gradient text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 px-4 md:px-10">
          <h3 className="text-3xl font-semibold">Providers Near You</h3>
        </div>

        <div className="relative">
          {/* Left fade gradient overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#014182] to-transparent z-10 pointer-events-none" />

          {/* Right fade gradient overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#102e50] to-transparent z-10 pointer-events-none" />

          {/* Left arrow button */}
          <button
            type="button"
            className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-4 bg-white/20 hover:bg-white/30 rounded-full p-3 z-20 transition-all duration-200"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -240, behavior: 'smooth' });
                directionRef.current = -1;
                isPausedAtEndRef.current = false;
                if (timeoutIdRef.current) {
                  clearTimeout(timeoutIdRef.current);
                  timeoutIdRef.current = null;
                }
              }
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right arrow button */}
          <button
            type="button"
            className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-4 bg-white/20 hover:bg-white/30 rounded-full p-3 z-20 transition-all duration-200"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
                directionRef.current = 1;
                isPausedAtEndRef.current = false;
                if (timeoutIdRef.current) {
                  clearTimeout(timeoutIdRef.current);
                  timeoutIdRef.current = null;
                }
              }
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pl-8 md:pl-14 pb-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {providers.map(provider => (
              <div
                key={provider.id}
                className="flex-shrink-0 w-48 bg-white rounded-lg p-4 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
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
                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-2xl font-bold">
                      {provider.name.charAt(0)}
                    </div>
                  )}
                </div>

                <h4 className="font-bold text-gray-800 mb-1">
                  {provider.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{provider.service}</p>

                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{provider.distance}</span>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-hanapp-accent hover:bg-yellow-500 text-hanapp-primary font-semibold"
                  onClick={() => onViewProvider?.(provider.id)}
                >
                  See Details
                </Button>
              </div>
            ))}
          </div>

          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
