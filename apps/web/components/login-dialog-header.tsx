'use client';

import Image from 'next/image';

interface DialogHeaderProps {
  className?: string;
  // Removed imageClassName as width/height are now explicit
}

export function DialogHeader({ className = '' }: DialogHeaderProps) {
  const mobileLogoWidth = 170;
  const mobileLogoHeight = 0;
  const smMobileLogoWidth = 250;
  const desktopLogoWidth = 90;
  const desktopLogoHeight = 90;

  return (
    <div
      className={`text-center mt-4 sm:mt-24 ml-4 sm:ml-0 pt-4 sm:pt-6 ${className}`}
    >
      <div className="mb-2 sm:mb-12 ml-4 sm:ml-0 flex justify-center">
        <Image
          src="/Hanapp-Logo-Registered.png"
          alt="Hanapp Logo Mobile"
          width={mobileLogoWidth}
          height={mobileLogoHeight}
          sizes={`(min-width: 640px) ${smMobileLogoWidth}px, ${mobileLogoWidth}px`}
          className="object-contain block lg:hidden"
          priority
        />
        <Image
          src="/DialogLogo.png"
          alt="Dialog header image Desktop"
          width={desktopLogoWidth}
          height={desktopLogoHeight}
          className="object-contain hidden lg:block"
          priority
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1 text-xl xs:text-2xl sm:text-3xl leading-snug px-4">
        <span className="text-[#F5C45E] font-semibold">Big</span>
        <span className="text-[#102E50]">or</span>
        <span>
          <span className="text-[#F5C45E] font-semibold">small</span>
          <span className="text-[#102E50]">,</span>
        </span>
        <span className="text-[#102E50]">angat ka sa</span>
        <span className="font-bold text-[#102E50]">Hanapp</span>
      </div>
    </div>
  );
}
