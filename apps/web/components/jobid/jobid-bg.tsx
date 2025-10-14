import React from 'react';

export function JobIdBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="fixed inset-0 w-full min-h-screen bg-[#F3F5F9] -z-10"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
