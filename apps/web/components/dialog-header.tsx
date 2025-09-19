'use client';

interface DialogHeaderProps {
  className?: string;
  imageClassName?: string;
}

export function DialogHeader({
  className = '',
  imageClassName = 'w-20 h-20 sm:w-32 sm:h-32',
}: DialogHeaderProps) {
  return (
    <div
      className={`text-center mb-4 sm:mb-16 mt-0 sm:mt-12 ml-4 sm:ml-0 ${className}`}
    >
      <div className="mb-2 sm:mb-12 ml-4 sm:ml-0 flex justify-center">
        <img
          src="/Hanapp-Logo-Registered.png"
          alt="Hanapp Logo Mobile"
          className={`${imageClassName} object-contain block lg:hidden`}
        />

        <img
          src="/DialogLogo.png"
          alt="Dialog header image Desktop"
          className={`${imageClassName} object-contain hidden lg:block`}
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
