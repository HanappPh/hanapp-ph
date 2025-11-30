'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';

import { ClientHomeFooter } from '../../components/client-home/client-home-footer';
import { ClientHomeNavbar } from '../../components/client-home/client-home-navbar';
import { ProtectedRoute } from '../../lib/components/ProtectedRoute';

/**
 * Layout for authenticated app routes (bookings, chat, jobs, profile, provider)
 * Includes shared navbar and footer for all pages
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleSubmitContact = async (email: string, message: string) => {
    try {
      // Replace with actual API call
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ email, message }),
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col page-transition">
        <ClientHomeNavbar
          onProfileClick={handleProfileClick}
          notificationCount={3}
        />
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hanapp-primary"></div>
            </div>
          }
        >
          <main className="flex-1 content-transition">{children}</main>
        </Suspense>
        <ClientHomeFooter
          onNavigate={handleNavigate}
          onSubmitContact={handleSubmitContact}
        />
      </div>
    </ProtectedRoute>
  );
}
