import Image from 'next/image';
import React from 'react';

type MobileProfileHeaderProps = {
  fromColor?: string;
  toColor?: string;
};

export function MobileProfileHeader({
  fromColor,
  toColor,
}: MobileProfileHeaderProps) {
  return (
    <div className="w-full relative" style={{ height: '144px' }}>
      <div className="absolute inset-0 z-100">
        <div
          className="w-full h-full flex flex-col items-center justify-start border-b-4 border-white"
          style={{
            background: `linear-gradient(to left, ${fromColor}, ${toColor})`,
          }}
        >
          <div className="absolute left-4 top-4 z-10">
            <button className="text-white p-1">
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 30 30"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <div className="bg-[#ffffff] p-1 rounded-lg mt-4 z-10">
            <Image
              src="/hanapp-logo-registered.png"
              alt="Hanapp Logo"
              width={120}
              height={32}
              className="md:hidden"
              priority
            />
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          height="60"
          viewBox="0 0 375 40"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 0C60 40 315 40 375 0V40H0V0Z" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
}
