import React from 'react';

/**
 * Layout for public routes (landing page, auth pages)
 * No navigation header or authentication required
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
