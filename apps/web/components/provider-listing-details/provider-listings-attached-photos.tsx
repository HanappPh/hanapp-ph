import { Card } from '@hanapp-ph/commons';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface AttachedPhotosProps {
  photos: string[];
}

export const ProviderListingsAttachedPhotos: React.FC<AttachedPhotosProps> = ({
  photos,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  if (!photos || photos.length === 0) {
    return null;
  }

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + photos.length) % photos.length
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeImage();
    }
    if (e.key === 'ArrowRight') {
      nextImage();
    }
    if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="h-5 w-5" style={{ color: '#FFDD8E' }} />
        <h3 className="text-lg font-semibold">Attached Photos</h3>
        <span className="text-sm text-gray-500">({photos.length})</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-[#F5C45E] transition-colors cursor-pointer group"
            onClick={() => openImage(index)}
          >
            <Image
              src={photo || '/placeholder.svg'}
              alt={`Attached photo ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        ))}
      </div>

      {/* Image Modal/Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeImage}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Close image modal"
        >
          {/* Close button */}
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          {photos.length > 1 && (
            <button
              onClick={e => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
          )}

          {/* Image container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={photos[selectedImageIndex] || '/placeholder.svg'}
                alt={`Photo ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Next button */}
          {photos.length > 1 && (
            <button
              onClick={e => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {selectedImageIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </Card>
  );
};
