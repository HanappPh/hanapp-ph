import React from 'react';

/**
 * Layout for auth pages (signin, signup)
 * No navigation header or footer for clean auth experience
 * Overrides parent layout constraints to prevent scrollbars
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="fixed inset-0 overflow-hidden">{children}</div>;
}
