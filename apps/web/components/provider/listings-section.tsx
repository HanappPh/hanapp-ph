'use client';
import { Card, CardContent, Badge } from '@hanapp-ph/commons';
import { Star, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
export function ListingsSection() {
  const listings = [
    {
      id: 1,
      title: 'Panday with own tools',
      category: 'Construction',
      provider: 'Andrew Cruz',
      price: '₱700',
      location: 'Batanay, Bulacan',
      rating: 5,
      status: 'Active',
      image: '/img-carousel-placeholder_1.png',
    },
    {
      id: 2,
      title: 'Declogging drain home service',
      category: 'Plumbing',
      provider: 'Jose Plumbing',
      price: '₱350',
      location: 'Batanay, Bulacan',
      rating: 4,
      status: 'Active',
      image: '/img-carousel-placeholder_2.png',
    },
    {
      id: 3,
      title: 'Auto repair home service',
      category: 'Auto Repair',
      provider: "Mike's Auto Shop",
      price: '₱850',
      location: 'Batanay, Bulacan',
      rating: 5,
      status: 'Inactive',
      image: '/home-repair-tools.jpg',
    },
    {
      id: 4,
      title: 'Auto repair home service',
      category: 'Auto Repair',
      provider: "Mike's Auto Shop",
      price: '₱850',
      location: 'Batanay, Bulacan',
      rating: 5,
      status: 'Inactive',
      image: '/img-carousel-placeholder_1.png',
    },
    {
      id: 5,
      title: 'Auto repair home service',
      category: 'Auto Repair',
      provider: "Mike's Auto Shop",
      price: '₱850',
      location: 'Batanay, Bulacan',
      rating: 5,
      status: 'Inactive',
      image: '/img-carousel-placeholder_1.png',
    },
    {
      id: 6,
      title: 'Auto repair home service',
      category: 'Auto Repair',
      provider: "Mike's Auto Shop",
      price: '₱850',
      location: 'Batanay, Bulacan',
      rating: 5,
      status: 'Inactive',
      image: '/img-carousel-placeholder_1.png',
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef(1);
  const isPausedAtEndRef = useRef(false);

  const pauseDuration = 1500; // ms to pause at ends
  const scrollSpeed = 0.5; // adjust for speed
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const step = () => {
      const el = scrollRef.current;
      if (el && !isPaused && !isPausedAtEndRef.current) {
        el.scrollLeft += directionRef.current * scrollSpeed;

        // Use a threshold to account for floating point precision
        const threshold = 2;
        // Only trigger pause and reverse if not already paused at end
        if (
          directionRef.current === 1 &&
          el.scrollLeft >= el.scrollWidth - el.clientWidth - threshold
        ) {
          isPausedAtEndRef.current = true;
          timeoutIdRef.current = setTimeout(() => {
            directionRef.current = -1; // reverse direction
            isPausedAtEndRef.current = false;
          }, pauseDuration);
        }
        // If reached the left end, pause and reverse
        else if (directionRef.current === -1 && el.scrollLeft <= threshold) {
          isPausedAtEndRef.current = true;
          timeoutIdRef.current = setTimeout(() => {
            directionRef.current = 1; // reverse direction
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
    <section className="bg-[#FFE8B9] py-10">
      <div className="max-w-7xl mx-auto px-8 md:px-14">
        <h2 className="text-2xl font-semibold text-[#102E50] mb-8">
          Your listings
        </h2>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
            id="listings-scroll"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {listings.map(listing => (
              <Card
                key={listing.id}
                className="w-[300px] flex-shrink-0 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={listing.image || '/placeholder.svg'}
                    alt={listing.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  {/* <div className="w-full h-48 bg-gray-400 flex items-center justify-center">
                    <span className="text-gray">Image</span>
                  </div> */}

                  <Badge className="absolute top-3 left-3 border-0 px-3 py-2 bg-white flex items-center gap-2 shadow hover:bg-white focus:bg-white">
                    {/* circle */}
                    <span
                      className={`w-2 h-2 rounded-full ${
                        listing.status === 'Active'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium leading-none ${listing.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {listing.status === 'Active' ? 'Active' : 'Inactive'}
                    </span>
                  </Badge>
                </div>
                <CardContent className="p-4 bg-white">
                  {/* title */}
                  <h3 className="font-semibold text-lg mb-1">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {listing.category}
                  </p>
                  {/* location */}
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {listing.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(listing.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    {/* Price */}
                    <div className=" bg-black text-white px-2 py-1 rounded text-sm font-semibold">
                      {listing.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Left arrow button */}
          <div className="hidden sm:block">
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 -left-11 lg:-left-14 rounded-full p-2 z-10"
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({
                    left: -320,
                    behavior: 'smooth',
                  });
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
              <ChevronLeft className="w-8 h-8 text-[#102E50]" />
            </button>
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 -right-11 lg:-right-14 rounded-full p-2 z-10"
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
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
              <ChevronRight className="w-8 h-8 text-[#102E50]" />
            </button>
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
