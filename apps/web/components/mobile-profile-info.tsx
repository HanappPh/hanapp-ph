import React from 'react';

export function MobileProfileInfo() {
  return (
    <div className="mt-20 flex flex-col items-center">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#102E50] to-[#F5C45E] bg-clip-text text-transparent">
        Mario Garcia
      </h2>
      <div className="flex items-center gap-2 mt-1 mb-1">
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
        <span className="text-base font-semibold">Active</span>
      </div>
      <div className="text-gray-400 flex flex-col items-center gap-0 mb-2">
        <span>
          Account Verified <span className="text-lg align-middle">✓</span>
        </span>
        <span>
          Payment Method Verified{' '}
          <span className="text-lg align-middle">✓</span>
        </span>
      </div>
    </div>
  );
}
