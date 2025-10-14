import React from 'react';

export function MobileProfileStats() {
  return (
    <div className="bg-white max-w-md p-2 w-full flex justify-between items-center px-4">
      <div className="flex flex-col items-center">
        <span className="font-bold text-xl text-[#0B2C4A]">255</span>
        <span className="text-xs text-[#0B2C4A] mt-1">Total Hires</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-xl text-[#0B2C4A]">98%</span>
        <span className="text-xs text-[#0B2C4A] mt-1">Success Rate</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-xl text-[#0B2C4A]">4.9</span>
        <span className="text-xs text-[#0B2C4A] mt-1">Avg. Review</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-xl text-[#0B2C4A]">2h</span>
        <span className="text-xs text-[#0B2C4A] mt-1">Response Time</span>
      </div>
    </div>
  );
}
