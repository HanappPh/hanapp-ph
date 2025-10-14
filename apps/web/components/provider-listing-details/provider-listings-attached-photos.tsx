import { Card } from '@hanapp-ph/commons';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface AttachedPhotosProps {
  photos: string[];
}

export const ProviderListingsAttachedPhotos: React.FC<AttachedPhotosProps> = ({
  photos,
}) => {
  if (!photos || photos.length === 0) {
    return null;
  }

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
    </Card>
  );
};
