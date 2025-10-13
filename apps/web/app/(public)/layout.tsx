'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { ClientHomeFooter } from '../../components/client-home/client-home-footer';
import { ClientHomeNavbar } from '../../components/client-home/client-home-navbar';

/**
 * Layout for public routes (landing page, auth pages)
 * Includes shared navbar and footer
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleNotificationClick = () => {
    router.push('/notifications');
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
    <div className="min-h-screen flex flex-col">
      <ClientHomeNavbar
        onNotificationClick={handleNotificationClick}
        notificationCount={3}
      />
      <main className="flex-1">{children}</main>
      <ClientHomeFooter
        onNavigate={handleNavigate}
        onSubmitContact={handleSubmitContact}
      />
    </div>
  );
}
