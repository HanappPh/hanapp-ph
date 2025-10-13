import Image from 'next/image';
import React from 'react';

export function MobileServicePreferences() {
  return (
    <div className="w-full max-w-md mt-2 mb-2 px-5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-semibold text-[#102E50]">
          Service Preferences
        </span>
        <button className="flex items-center text-xs text-[#102E50] gap-1 font-semibold hover:underline">
          Edit
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#102E50"
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
      <div className="flex overflow-x-auto gap-2 pb-3 whitespace-nowrap">
        {['Cleaning', 'Tutor', 'Transport', 'Plumbing', 'Laundry'].map(pref => (
          <span
            key={pref}
            className="flex items-center gap-1 bg-[#f3f5f9] border text-[#102E50] px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
          >
            <Image
              src="/placeholder-category-icon.png"
              alt={pref + ' icon'}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full bg-white p-0.5 object-contain border"
            />
            {pref}
          </span>
        ))}
      </div>
    </div>
  );
}
