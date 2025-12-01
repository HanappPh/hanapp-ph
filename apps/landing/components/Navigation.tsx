'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Navigation = () => {
  const [scrollY, setScrollY] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity and blur based on scroll position
  const opacity = Math.max(0.3, 1 - scrollY / 300); // Minimum 30% opacity
  const blurAmount = Math.min(scrollY / 100, 10); // Maximum 10px blur

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 h-[70px] z-50 transition-all duration-300"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
      }}
    >
      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo - Far Left */}
          <div className="flex items-center h-full">
            <div className="w-40 h-12 relative bg-white/10 rounded-md">
              <Image
                src="/Hanapp-Logo-Registered.png"
                alt="Hanapp Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Side - Navigation Links and Buttons */}
          <div className="flex items-center space-x-8 h-full">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#categories"
                className="text-gray-700 hover:text-hanapp-primary transition-colors font-medium"
              >
                Categories
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-hanapp-primary transition-colors font-medium"
              >
                About
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-hanapp-primary text-white px-6 py-3 rounded-lg hover:bg-hanapp-secondary transition-colors font-medium">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-700 hover:text-hanapp-primary transition-colors">
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
