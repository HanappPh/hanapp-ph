'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const AnimatedImagesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Array of all service images - memoized to prevent re-creation on each render
  const serviceImages = React.useMemo(
    () => [
      { src: '/landing-clean.png', alt: 'Cleaning Services' },
      { src: '/landing-delivery.jpg', alt: 'Delivery Services' },
      { src: '/landing-dog.jpg', alt: 'Pet Services' },
      { src: '/landing-errand.jpg', alt: 'Errand Services' },
      { src: '/landing-grass.jpg', alt: 'Lawn Care Services' },
      { src: '/landing-grocery.jpg', alt: 'Grocery Services' },
      { src: '/landing-laundry.jpg', alt: 'Laundry Services' },
      { src: '/landing-repair.jpg', alt: 'Repair Services' },
      { src: '/landing-cater.jpg', alt: 'Catering Services' },
      { src: '/cat-tutor.jpg', alt: 'Tutoring Services' },
      { src: '/cat-babysit.jpg', alt: 'Babysitting Services' },
      { src: '/cat-event.jpg', alt: 'Event Services' },
    ],
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;

    if (!container || !scrollContainer) {
      return;
    }

    // Calculate heights for seamless loop
    const itemHeight = 200; // Height of each item including margin
    const totalHeight = (serviceImages.length * itemHeight) / 2; // Divide by 2 since we have 2 columns

    // Create infinite vertical scroll animation with blur effects
    const tl = gsap.timeline({ repeat: -1 });

    // Set initial position
    gsap.set(scrollContainer, { y: 0 });

    tl.to(scrollContainer, {
      y: -totalHeight, // Scroll up by the total height
      duration: 30, // Slow vertical scroll - 30 seconds for full cycle
      ease: 'none',
      onUpdate() {
        const containerHeight = container.offsetHeight;

        // Blur control parameters - adjust these to fine-tune the effect
        const BOTTOM_TRIGGER_ZONE = 25; // Increased from 80px - larger transition area
        const TOP_TRIGGER_ZONE = 50; // Increased from 80px
        const MAX_BLUR = 5; // Maximum blur amount
        const MIN_OPACITY = 0.2; // Minimum opacity

        // Apply blur effects to all images based on their position
        const images = scrollContainer.querySelectorAll('.scroll-image');
        images.forEach((img: Element) => {
          const htmlImg = img as HTMLElement;
          const rect = htmlImg.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          // Calculate relative position within the visible container
          const relativeTop = rect.top - containerRect.top;
          const relativeBottom = rect.bottom - containerRect.top;

          // Calculate blur based on distance from container edges
          let blurAmount = 0;
          let opacity = 1;

          // Blur images entering from bottom (more aggressive blur removal)
          if (relativeBottom > containerHeight - BOTTOM_TRIGGER_ZONE) {
            const distanceFromBottom = Math.max(
              0,
              relativeBottom - (containerHeight - BOTTOM_TRIGGER_ZONE)
            );
            // More aggressive blur calculation - blur removes faster
            const normalizedDistance = distanceFromBottom / BOTTOM_TRIGGER_ZONE;
            blurAmount = Math.min(
              MAX_BLUR,
              Math.pow(normalizedDistance, 2) * MAX_BLUR
            );
            opacity = Math.max(
              MIN_OPACITY,
              1 - Math.pow(normalizedDistance, 1.5) * (1 - MIN_OPACITY)
            );
          }

          // Blur images exiting at top
          if (relativeTop < TOP_TRIGGER_ZONE) {
            const distanceFromTop = Math.max(0, TOP_TRIGGER_ZONE - relativeTop);
            const normalizedDistance = distanceFromTop / TOP_TRIGGER_ZONE;
            blurAmount = Math.min(
              MAX_BLUR,
              Math.pow(normalizedDistance, 2) * MAX_BLUR
            );
            opacity = Math.max(
              MIN_OPACITY,
              1 - Math.pow(normalizedDistance, 1.5) * (1 - MIN_OPACITY)
            );
          }

          // Apply the blur and opacity with smooth transitions
          htmlImg.style.filter = `blur(${blurAmount}px)`;
          htmlImg.style.opacity = opacity.toString();
        });
      },
    });

    return () => {
      tl.kill();
    };
  }, [serviceImages]);

  // Create dynamic patterns for more visual interest
  const getImageStyle = (index: number) => {
    const patterns = [
      { height: 'h-56', marginTop: 'mt-0', borderRadius: 'rounded-2xl' },
      { height: 'h-40', marginTop: 'mt-6', borderRadius: 'rounded-lg' },
      { height: 'h-48', marginTop: 'mt-3', borderRadius: 'rounded-xl' },
      { height: 'h-52', marginTop: 'mt-8', borderRadius: 'rounded-2xl' },
      { height: 'h-44', marginTop: 'mt-2', borderRadius: 'rounded-lg' },
      { height: 'h-60', marginTop: 'mt-5', borderRadius: 'rounded-3xl' },
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <div ref={scrollRef} className="flex">
        {/* Left Column */}
        <div className="flex-1 flex flex-col space-y-4 px-2">
          {serviceImages
            .filter((_, index) => index % 2 === 0)
            .map((image, index) => {
              const actualIndex = index * 2;
              const style = getImageStyle(actualIndex);
              return (
                <div
                  key={actualIndex}
                  className={`scroll-image relative w-full ${style.height} ${style.marginTop} ${style.borderRadius} shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={actualIndex < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          {/* Duplicate left column for seamless loop */}
          {serviceImages
            .filter((_, index) => index % 2 === 0)
            .map((image, index) => {
              const actualIndex = index * 2;
              const style = getImageStyle(actualIndex);
              return (
                <div
                  key={`duplicate-left-${actualIndex}`}
                  className={`scroll-image relative w-full ${style.height} ${style.marginTop} ${style.borderRadius} shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col space-y-4 px-2">
          {serviceImages
            .filter((_, index) => index % 2 === 1)
            .map((image, index) => {
              const actualIndex = index * 2 + 1;
              const style = getImageStyle(actualIndex);
              return (
                <div
                  key={actualIndex}
                  className={`scroll-image relative w-full ${style.height} ${style.marginTop} ${style.borderRadius} shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={actualIndex < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          {/* Duplicate right column for seamless loop */}
          {serviceImages
            .filter((_, index) => index % 2 === 1)
            .map((image, index) => {
              const actualIndex = index * 2 + 1;
              const style = getImageStyle(actualIndex);
              return (
                <div
                  key={`duplicate-right-${actualIndex}`}
                  className={`scroll-image relative w-full ${style.height} ${style.marginTop} ${style.borderRadius} shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AnimatedImagesSection;
