'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Auto-scrolling gallery component
const AutoScrollGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;

    if (!container || !scrollContainer) {
      return;
    }

    // Clone the content for seamless loop
    const items = scrollContainer.children;
    const itemWidth = 520; // Width of each item including margin
    const totalWidth = items.length * itemWidth;

    // Create infinite scroll animation
    const tl = gsap.timeline({ repeat: -1 });

    // Set initial position
    gsap.set(scrollContainer, { x: 0 });

    tl.to(scrollContainer, {
      x: -totalWidth / 2, // Only scroll half the distance due to duplication
      duration: 90, // Much slower - takes 60 seconds for full cycle
      ease: 'none',
    });

    return () => {
      tl.kill();
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
        <div ref={scrollRef} className="flex space-x-3">
          {/* First set of photos */}
          {photos.map(photo => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-60 h-80 rounded-lg shadow-md overflow-hidden relative"
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
              className="flex-shrink-0 w-60 h-80 rounded-lg shadow-md overflow-hidden relative"
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

// Animated Find Help/Income Component
const AnimatedFindSection = () => {
  const [showIncome, setShowIncome] = useState(false);
  const [showPeace, setShowPeace] = useState(false);
  const helpRef = useRef<HTMLSpanElement>(null);
  const incomeRef = useRef<HTMLDivElement>(null);
  const peaceRef = useRef<HTMLDivElement>(null);
  const helpContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show "Find Help" first (centered)
    if (helpRef.current) {
      gsap.fromTo(
        helpRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

    // After 2 seconds, start the sequence: Help -> Income -> Peace of Mind
    const timer1 = setTimeout(() => {
      // Move "Find Help" to the left
      if (helpContainerRef.current) {
        gsap.to(helpContainerRef.current, {
          left: '-2%',
          transform: 'translateX(0%)',
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Show "Find Income" after a short delay
      setTimeout(() => {
        setShowIncome(true);
      }, 200);
    }, 2000);

    // After 4 seconds, show "Find Peace of Mind"
    const timer2 = setTimeout(() => {
      setShowPeace(true);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Animate "Find Income" when it becomes visible
  useEffect(() => {
    if (showIncome && incomeRef.current) {
      // Use fromTo for more reliable animation with a small delay
      setTimeout(() => {
        if (incomeRef.current) {
          gsap.fromTo(
            incomeRef.current,
            // From state (initial) - start from far right
            { opacity: 0, x: 150 },
            // To state (final) - slide into center position
            {
              opacity: 1,
              left: '25%',
              duration: 1,
              ease: 'power2.out',
            }
          );
        }
      }, 50); // Small delay to ensure DOM is ready
    }
  }, [showIncome]);

  // Animate "Find Peace of Mind" when it becomes visible
  useEffect(() => {
    if (showPeace && peaceRef.current) {
      // Use fromTo for more reliable animation with a small delay
      setTimeout(() => {
        if (peaceRef.current) {
          gsap.fromTo(
            peaceRef.current,
            // From state (initial) - start from far right
            { opacity: 0, x: 300 },
            // To state (final) - slide into right position
            {
              opacity: 1,
              x: '70%',
              duration: 1,
              ease: 'power2.out',
            }
          );
        }
      }, 50); // Small delay to ensure DOM is ready
    }
  }, [showPeace]);

  return (
    <div className="relative h-20 flex items-center justify-center">
      {/* Find Help - starts centered, moves to left */}
      <div
        ref={helpContainerRef}
        className="absolute left-1/2 transform -translate-x-1/2"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Find{' '}
          <span className="text-hanapp-accent" ref={helpRef}>
            Help.
          </span>
        </h2>
      </div>

      {/* Find Income - positioned in the center */}
      {showIncome && (
        <div
          ref={incomeRef}
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Find <span className="text-hanapp-accent">Income.</span>
          </h2>
        </div>
      )}

      {/* Find Peace of Mind - positioned to the right */}
      {showPeace && (
        <div ref={peaceRef} className="absolute right-1/4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Find <span className="text-hanapp-accent">Peace of Mind.</span>
          </h2>
        </div>
      )}
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F5F9]">
      {/* Navigation */}

      {/* Hero Section with Background Auto-Scroll */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Auto-Scrolling Gallery */}
        <div className="absolute top-6 opacity-100">
          <AutoScrollGallery />
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute top-0 left-0 right-0 bottom-2 bg-black/50 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              MahaHanapp mo sa{' '}
              <span className="shine-animation relative overflow-hidden">
                Hanapp.
              </span>
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
              find local services Philippines.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button className="w-[250px] border-2 border-white bg-blue-900/30 text-white px-5 py-4 rounded-lg text-lg font-semibold hover:bg-[#014182]/70 transition-colors shadow-lg backdrop-blur-sm">
                Find Services
              </button>
              <button className="w-[250px] border-2 border-white bg-[#f5c45e]/30 text-white px-5 py-4 rounded-lg text-lg font-semibold hover:bg-[#F5C45E]/70 hover:text-white transition-colors backdrop-blur-sm">
                Become a Provider
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Find Help Section */}
      <section className="mt-[6rem] px-4 sm:px-6 lg:px-8 bg-[#F3F5F9]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Find Help/Income Title */}
          <div className="mb-2">
            <AnimatedFindSection />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            on-demand services app Philippines
          </p>
          <button className="mt-12 mb-10 w-[200px] border-2 border-black bg-[#FFDD8E] text-black px-5 py-5 rounded-lg text-lg font-semibold hover:bg-[#FFDD8E]/70 hover:text-black transition-colors backdrop-blur-sm relative overflow-hidden group cursor-pointer">
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out w-1/2"></div>
            </div>
            <span className="relative z-10">Try our Demo</span>
          </button>
        </div>
      </section>

      {/* New Section with Image Placeholder */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}

            <div>
              <div className="w-36 h-24 relative">
                <Image
                  src="/Hanapp-Logo-Registered.png"
                  alt="Hanapp Provider App"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Kasi ang tulong, hindi dapat mahirap i-Hanapp.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Hanapp empowers neighborhoods by helping everyday Filipinos find
                and offer trusted services and gigs close to home.
              </p>
              <button className="bg-hanapp-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-hanapp-secondary transition-colors">
                Sign up Now
              </button>
            </div>

            {/* Right Image - Hanapp Mobile with Hover Effect */}
            <div className="flex justify-center">
              <div className="relative group cursor-pointer">
                {/* Container for all three phones */}
                <div className="flex items-center justify-center transition-all duration-500 group-hover:scale-95">
                  {/* Left Phone - Client (hidden by default, fades in on hover) */}
                  <div className="w-64 h-[32rem] relative opacity-0 transform -translate-x-8 group-hover:opacity-100 group-hover:translate-x-12 transition-all duration-500 ease-out">
                    <Image
                      src="/hanapp-client.png"
                      alt="Hanapp Client App"
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Center Phone - Main (always visible) */}
                  <div className="w-72 h-[36rem] relative mx-4 z-10">
                    <Image
                      src="/hanapp-mob.png"
                      alt="Hanapp Mobile App"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Right Phone - Provider (hidden by default, fades in on hover) */}
                  <div className="w-64 h-[32rem] relative opacity-0 transform translate-x-8 group-hover:opacity-100 group-hover:-translate-x-12 transition-all duration-500 ease-out">
                    <Image
                      src="/hanapp-provider.png"
                      alt="Hanapp Provider App"
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f3f5f9]">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Categories
            </h2>
          </div>

          {/* Categories Grid - 8 columns on desktop, responsive on smaller screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-y-6 gap-x-8">
            {/* Category Box 1 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-42 h-42 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] hover:scale-110 transition-all duration-300 ease-out cursor-pointer group overflow-hidden">
                <div className="absolute inset-0 w-32 h-32 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                {/* Shine effect - more visible */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out w-1/2"></div>
                </div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 2 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 3 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 4 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            {/* Category Box 5 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 6 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 7 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 8 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 9 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 10 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 11 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 12 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 13 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 14 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 15 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Category Box 16 */}
            <div className="flex flex-col relative items-center justify-center">
              <div className="rounded-xl w-36 h-28 bg-[#F2F7FB] flex items-center justify-center relative shadow-[0_3px_2px_0px_#E2E7F0] hover:shadow-[0_10px_15px_4px_#E2E7F0CC] transition-shadow">
                <div className="absolute inset-0 w-32 h-24 mx-auto my-auto overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#F2F7FB_100%)] shadow-[inset_0_0_20px_20px_#E9F2FB] opacity-100"></div>
                <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/category-cleaning.png"
                    alt="Cleaning Services"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book fast,{' '}
              <span className="text-hanapp-primary">get helped faster.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Plumbing Services
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Emergency repairs • Installation
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Available
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Professional plumbers for all your water and pipe needs.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-hanapp-primary font-semibold">
                  Starting ₱500/hour
                </span>
                <button className="text-hanapp-primary hover:bg-hanapp-primary hover:text-white px-4 py-2 rounded transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Electrical Work
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Wiring • Fixtures • Repairs
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Available
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Licensed electricians for safe and reliable electrical services.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-hanapp-primary font-semibold">
                  Starting ₱600/hour
                </span>
                <button className="text-hanapp-primary hover:bg-hanapp-primary hover:text-white px-4 py-2 rounded transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    House Cleaning
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Deep clean • Regular maintenance
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Available
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Professional cleaning services for your home or office.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-hanapp-primary font-semibold">
                  Starting ₱300/hour
                </span>
                <button className="text-hanapp-primary hover:bg-hanapp-primary hover:text-white px-4 py-2 rounded transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Aircon Services
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Cleaning • Repair • Installation
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Available
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Keep your AC running efficiently with our expert technicians.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-hanapp-primary font-semibold">
                  Starting ₱800/service
                </span>
                <button className="text-hanapp-primary hover:bg-hanapp-primary hover:text-white px-4 py-2 rounded transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Carpentry
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Furniture • Repairs • Custom work
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Available
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Skilled carpenters for all your woodwork and furniture needs.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-hanapp-primary font-semibold">
                  Starting ₱700/hour
                </span>
                <button className="text-hanapp-primary hover:bg-hanapp-primary hover:text-white px-4 py-2 rounded transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Painting Services
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Interior • Exterior • Touch-ups
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Available
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Professional painters to refresh and protect your property.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-hanapp-primary font-semibold">
                  Starting ₱400/hour
                </span>
                <button className="text-hanapp-primary hover:bg-hanapp-primary hover:text-white px-4 py-2 rounded transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Book fast,{' '}
                <span className="text-hanapp-primary">get helped faster.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-hanapp-primary text-white p-2 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Verified professionals
                    </h3>
                    <p className="text-gray-600">
                      All service providers are background-checked and verified
                      for your safety.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-hanapp-primary text-white p-2 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Instant booking
                    </h3>
                    <p className="text-gray-600">
                      Book services with just a few taps and get help when you
                      need it.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-hanapp-primary text-white p-2 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Secure payments
                    </h3>
                    <p className="text-gray-600">
                      Pay securely through the app with payment protection and
                      receipts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-hanapp-primary rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <span className="text-gray-900 font-medium">
                    One profile, many bookings
                  </span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      Plumbing Repair
                    </span>
                    <span className="text-green-600 font-semibold">₱800</span>
                  </div>
                  <p className="text-gray-600 text-sm">Fix kitchen sink leak</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      House Cleaning
                    </span>
                    <span className="text-green-600 font-semibold">₱1,200</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Deep clean 3BR apartment
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      Aircon Service
                    </span>
                    <span className="text-green-600 font-semibold">₱1,000</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Clean 2 split-type units
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by homeowners across the{' '}
              <span className="text-hanapp-primary">Philippines</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-2xl font-bold text-hanapp-primary">
              <div>
                10,000+{' '}
                <span className="text-gray-600 text-base font-normal">
                  Bookings completed
                </span>
              </div>
              <div>
                500+{' '}
                <span className="text-gray-600 text-base font-normal">
                  Verified professionals
                </span>
              </div>
              <div>
                5x{' '}
                <span className="text-gray-600 text-base font-normal">
                  Faster than traditional
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 mb-4">
                &ldquo;Quick booking and the plumber arrived on time. Fixed my
                leak in 30 minutes!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-hanapp-primary rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Maria Santos</p>
                  <p className="text-gray-600 text-sm">Homeowner • Makati</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 mb-4">
                &ldquo;Best cleaning service I&apos;ve used. Professional and
                thorough work.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-hanapp-primary rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Juan Dela Cruz</p>
                  <p className="text-gray-600 text-sm">
                    Property Manager • BGC
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 mb-4">
                &ldquo;Electrician was knowledgeable and fixed my wiring issues
                safely.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-hanapp-primary rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Ana Reyes</p>
                  <p className="text-gray-600 text-sm">Condo Owner • Ortigas</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 mb-4">
                &ldquo;Easy app, fair pricing, and reliable service providers.
                Highly recommend!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-hanapp-primary rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Roberto Cruz</p>
                  <p className="text-gray-600 text-sm">
                    Business Owner • Quezon City
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-hanapp-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            One profile. One tap.
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Find home services. 10x faster.
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-hanapp-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Find Services
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-hanapp-primary transition-colors">
              For Providers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
