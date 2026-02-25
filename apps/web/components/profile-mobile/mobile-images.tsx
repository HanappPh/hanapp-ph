'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export function MobileProfileImage({
  avatarUrl,
}: {
  avatarUrl?: string;
  isOwnProfile?: boolean;
}) {
  const [showImageModal, setShowImageModal] = useState(false);
  const imageUrl = avatarUrl || '/profile-pic.png';

  return (
    <>
      <div className="w-full flex justify-center absolute top-24 z-10">
        <div
          className={`rounded-full border-4 border-white shadow-lg overflow-hidden w-28 h-28 bg-white ${avatarUrl ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
          onClick={() => avatarUrl && setShowImageModal(true)}
        >
          <Image
            src={imageUrl}
            alt="Profile"
            width={112}
            height={112}
            className="w-28 h-28 object-cover"
          />
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && avatarUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-3xl max-h-full">
            <Image
              src={avatarUrl}
              alt="Profile"
              width={600}
              height={600}
              className="rounded-lg object-contain max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
