'use client';

import Image from 'next/image';

interface DialogHeaderProps {
  className?: string;
  // Removed imageClassName as width/height are now explicit
}

export function DialogHeader({ className = '' }: DialogHeaderProps) {
  const mobileLogoWidth = 140;
  const mobileLogoHeight = 0;
  const smMobileLogoWidth = 180;
  const desktopLogoWidth = 70;
  const desktopLogoHeight = 70;

  return (
    <div
      className={`text-center ml-4 sm:ml-0 pt-2 md:pt-3 lg:pt-4 xl:pt-6 sm:pt-3 ${className}`}
    >
      <div className="mb-3 sm:mb-6 ml-4 sm:ml-0 flex justify-center">
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

      <div className="flex flex-wrap items-center justify-center gap-1 text-lg xs:text-xl sm:text-2xl leading-snug px-4 mb-4">
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
