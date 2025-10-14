import Image from 'next/image';
import React from 'react';

export function MobileProfileImage() {
  return (
    <div className="w-full flex justify-center absolute top-24 z-10">
      <div className="rounded-full border-4 border-white shadow-lg overflow-hidden w-28 h-28 bg-white">
        <Image
          src="/profile-pic.png"
          alt="Profile"
          width={112}
          height={112}
          className="w-28 h-28 object-cover"
        />
      </div>
    </div>
  );
}
