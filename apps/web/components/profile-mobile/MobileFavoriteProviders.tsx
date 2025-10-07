import Image from 'next/image';
import React from 'react';

export type MobileProfileFavoriteProvider = {
  name: string;
  role: string;
  distance: string;
  img: string;
};

interface MobileProfileFavoriteProvidersProps {
  providers: MobileProfileFavoriteProvider[];
}

export function MobileProfileFavoriteProviders({
  providers,
}: MobileProfileFavoriteProvidersProps) {
  return (
    <div className="w-full max-w-md mt-2 px-5">
      <div className="flex justify-between items-center mb-2 ">
        <span className="font-semibold text-[#102E50]">Favorite Providers</span>
        <button className="flex items-center text-xs text-[#102E50] font-semibold gap-1 hover:underline">
          Edit
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="inline-block ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 20h9"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
            />
          </svg>
        </button>
      </div>
      <div className="flex overflow-x-auto pb-3 whitespace-nowrap gap-3">
        {providers.map(p => (
          <div
            key={p.name}
            className="bg-[#DEEFFF] flex flex-col items-center border border-[#8e8e8e] p-4 rounded-lg"
          >
            <div className="flex flex-col items-center flex-grow w-full">
              <Image
                src={p.img}
                alt={p.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border border-[#8e8e8e]"
              />
              <span className="mt-1 font-semibold text-[#0B2C4A] text-xs text-center break-words whitespace-normal block">
                {p.name}
              </span>
              <span className="text-[10px] text-gray-500">{p.role}</span>
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="8" strokeWidth="2" />
                </svg>{' '}
                {p.distance}
              </span>
            </div>
            <button className="mt-1 px-3 py-2 rounded-full bg-[#014182] text-white text-xs font-regular w-full">
              Book Again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
