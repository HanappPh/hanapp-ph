'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { PageLoader } from '../../components/loading/page-loader';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      // Set redirecting state to show loading during redirect
      setIsRedirecting(true);
      // Redirect to signin if not authenticated
      router.push('/auth/signin?mode=login');
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication or redirecting
  if (loading || isRedirecting || !user) {
    return (
      <PageLoader
        message={
          isRedirecting
            ? 'Redirecting to sign in...'
            : 'Verifying authentication...'
        }
      />
    );
  }

  // Render protected content only when authenticated
  return <>{children}</>;
}
