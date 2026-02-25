import React from 'react';

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6">
      {/* Spinner */}
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#102E50] animate-spin" />

      {/* Text */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-base font-semibold text-[#102E50]">
          Hanapp PH
        </span>
        <span className="text-sm text-gray-400">{message}</span>
      </div>
    </div>
  );
}
