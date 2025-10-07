'use client';

import React from 'react';

// import { NavigationHeader } from '../../../components/navigation/NavigationHeader';

/**
 * Layout for authenticated app routes (bookings, chat, jobs, profile, provider)
 * Includes navigation header for all pages
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header - visible on all authenticated pages */}
      {/* <NavigationHeader /> */}

      {/* Main content area */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
