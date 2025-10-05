'use client';

import React from 'react';
interface BackgroundImageProps {
  children?: React.ReactNode;
  imageSrc?: string;
}

export function BackgroundImage({
  children,
  imageSrc = '/placeholder.jpg',
}: BackgroundImageProps) {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div className="absolute inset-0 bg-black/1" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
