'use client';

import Image from 'next/image';

interface MainHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  showUserAvatar?: boolean;
  userInitials?: string;
  className?: string;
}

export function MainHeader({
  logoSrc = '/Hanapp-Logo-Registered-2.png',
  logoAlt = 'Hanapp Logo',
  showUserAvatar = true,
  userInitials = 'L',
  className = '',
}: MainHeaderProps) {
  return (
    <header className={`relative ${className}`}>
      <div
        className="hidden lg:block fixed top-12 left-16 z-10"
        style={{
          width: '287px',
          height: '100px',
          flexShrink: 0,
          filter: 'drop-shadow(0 3px 4px rgba(0, 0, 0, 0.25))',
        }}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={287}
          height={100}
          style={{
            width: '100%',
            height: '100%',
          }}
          priority
        />
      </div>

      <div
        className="hidden lg:block fixed bottom-20 left-16 z-10"
        style={{
          width: '261px',
          height: '67px',
          flexShrink: 0,
          color: '#F3F5F9',
          fontFamily: 'League Spartan',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '32px',
        }}
      >
        Find <span style={{ color: '#102E50' }}>Help</span>. Find{' '}
        <span style={{ color: '#102E50' }}>Income</span>. Find{' '}
        <span style={{ color: '#102E50' }}>Peace of Mind</span>.
      </div>

      {showUserAvatar && (
        <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <span className="text-white text-sm font-medium">
              {userInitials}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
