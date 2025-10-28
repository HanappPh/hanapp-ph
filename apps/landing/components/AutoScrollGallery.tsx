'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const AutoScrollGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;

    if (!container || !scrollContainer) {
      return;
    }

    // Set initial position to static (no animation)
    gsap.set(scrollContainer, { x: 0 });

    // Disabled auto-scroll animation - keeping gallery static
    // const items = scrollContainer.children;
    // const itemWidth = 520; // Width of each item including margin
    // const totalWidth = items.length * itemWidth;
    // const tl = gsap.timeline({ repeat: -1 });
    // tl.to(scrollContainer, {
    //   x: -totalWidth / 2,
    //   duration: 90,
    //   ease: 'none',
    // });

    return () => {
      // No timeline to kill since animation is disabled
    };
  }, []);

  // Photo data using your actual image
  const photos = [
    { id: 1, src: '/landing-delivery.jpg', alt: 'Hanapp Delivery Service' },
    { id: 2, src: '/landing-clean.png', alt: 'Hanapp Delivery Service' },
    { id: 3, src: '/landing-errand.jpg', alt: 'Hanapp Delivery Service' },
    { id: 4, src: '/landing-laundry.jpg', alt: 'Hanapp Delivery Service' },
    { id: 5, src: '/landing-repair.jpg', alt: 'Hanapp Delivery Service' },
    { id: 6, src: '/landing-delivery.jpg', alt: 'Hanapp Delivery Service' },
    { id: 7, src: '/landing-dog.jpg', alt: 'Hanapp Delivery Service' },
    { id: 8, src: '/landing-grocery.jpg', alt: 'Hanapp Delivery Service' },
    { id: 9, src: '/landing-cater.jpg', alt: 'Hanapp Delivery Service' },
    { id: 10, src: '/landing-grass.jpg', alt: 'Hanapp Delivery Service' },
  ];

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex overflow-hidden">
        <div
          ref={scrollRef}
          className="flex space-x-2 sm:space-x-3 md:space-x-4"
        >
          {/* First set of photos */}
          {photos.map(photo => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-48 sm:w-56 md:w-60 lg:w-64 xl:w-72 h-screen rounded-lg shadow-md overflow-hidden relative"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {photos.map(photo => (
            <div
              key={`duplicate-${photo.id}`}
              className="flex-shrink-0 w-48 sm:w-56 md:w-60 lg:w-64 xl:w-72 h-screen rounded-lg shadow-md overflow-hidden relative"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollGallery;
