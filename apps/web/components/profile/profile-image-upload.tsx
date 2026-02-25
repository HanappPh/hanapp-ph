'use client';

import { Button } from '@hanapp-ph/commons';
import { Camera, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useState, useRef } from 'react';

import { supabase } from '../../lib/supabase/client';

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  userId: string;
  onUploadSuccess?: (newImageUrl: string) => void;
  onUploadError?: (error: string) => void;
}

export function ProfileImageUpload({
  currentImageUrl,
  userId,
  onUploadSuccess,
  onUploadError,
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      onUploadError?.('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      onUploadError?.('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setIsUploading(true);
    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // Update profile via API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const session = await supabase.auth.getSession();

      const response = await fetch(`${apiUrl}/api/user/profile/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify({
          avatar_url: publicUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Delete old image if exists
      if (currentImageUrl && currentImageUrl.includes('avatars/')) {
        const oldPath = currentImageUrl.split('avatars/')[1];
        if (oldPath) {
          await supabase.storage.from('avatars').remove([`avatars/${oldPath}`]);
        }
      }

      onUploadSuccess?.(publicUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError?.(
        error instanceof Error ? error.message : 'Failed to upload image'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayImageUrl = previewUrl || currentImageUrl || '/profile-pic.png';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Profile Image Display */}
      <div className="relative w-48 h-48 rounded-full overflow-hidden group">
        <Image
          src={displayImageUrl}
          alt="Profile"
          fill
          className="object-cover cursor-pointer"
          onClick={() => currentImageUrl && setShowImageModal(true)}
          priority
        />
        {!selectedFile && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-12 h-12 text-white" />
          </div>
        )}
      </div>

      {/* Upload Controls */}
      {selectedFile && (
        <div className="flex gap-2">
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="bg-[#102E50] hover:bg-[#0a1f35] text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isUploading}
            variant="outline"
            className="border-gray-300"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Modal */}
      {showImageModal && currentImageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-3xl max-h-full">
            <Image
              src={currentImageUrl}
              alt="Profile"
              width={600}
              height={600}
              className="rounded-lg object-contain max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
