import React from 'react';
import './global.css';

export const metadata = {
  title: 'HanApp PH - Your App Solution',
  description:
    'Professional landing page for HanApp PH - Building innovative solutions for the Philippines',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
