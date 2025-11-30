import React from 'react';

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo or spinner */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-8 border-blue-100"></div>
          {/* Spinning gradient ring */}
          <div className="animate-spin rounded-full h-24 w-24 border-8 border-transparent border-t-blue-600 border-r-blue-400"></div>
          {/* Inner pulsing dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-pulse h-12 w-12 bg-blue-600 rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">HanApp PH</h2>
          <p className="text-gray-600 font-medium animate-pulse">{message}</p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
