'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface PrivacyHeaderProps {
  showTermsLink?: boolean;
}

export const PrivacyHeader = ({ showTermsLink = true }: PrivacyHeaderProps) => {
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
  const opacity = Math.max(0.3, 1 - scrollY / 300);
  const blurAmount = Math.min(scrollY / 100, 10);

  return (
    <header
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
            <Link href="/">
              <div className="w-40 h-12 relative bg-white/10 rounded-md">
                <Image
                  src="/Hanapp-Logo-Registered.png"
                  alt="Hanapp Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="flex items-center space-x-8 h-full">
            <Link
              href="/"
              className="text-gray-700 hover:text-hanapp-primary transition-colors font-medium"
            >
              Home
            </Link>
            {showTermsLink && (
              <Link
                href="/terms"
                className="text-gray-700 hover:text-hanapp-primary transition-colors font-medium"
              >
                Terms & Conditions
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
