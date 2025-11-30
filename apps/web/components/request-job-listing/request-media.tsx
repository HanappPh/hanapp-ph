'use client';

import { Upload, X, ImageIcon } from 'lucide-react';
import React, { useState, useRef } from 'react';

import { supabase } from '../../lib/supabase/client';

interface ImageUploadSectionProps {
  formData: {
    images: string[];
  };
  updateFormData: (field: string, value: string[]) => void;
}

export function ImageUploadSection({
  formData,
  updateFormData,
}: ImageUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(formData.images);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file =>
        file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files).filter(file =>
        file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...newFiles]);

      // Upload files immediately
      await uploadFiles(newFiles);
    }
  };

  const uploadFiles = async (filesToUpload: File[]) => {
    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of filesToUpload) {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('service-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error('Error uploading file:', error);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('service-images')
          .getPublicUrl(data.path);

        newUrls.push(urlData.publicUrl);
      }

      // Update state and parent form data
      const allUrls = [...uploadedUrls, ...newUrls];
      setUploadedUrls(allUrls);
      updateFormData('images', allUrls);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = async (index: number) => {
    const urlToRemove = uploadedUrls[index];

    // Remove from local state
    setFiles(prev => prev.filter((_, i) => i !== index));

    // Remove from uploaded URLs
    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUrls);
    updateFormData('images', newUrls);

    // Try to delete from storage if URL exists
    if (urlToRemove) {
      try {
        const path = urlToRemove.split('/service-images/')[1];
        if (path) {
          await supabase.storage.from('service-images').remove([path]);
        }
      } catch (error) {
        console.error('Error deleting file from storage:', error);
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h2
          className="text-3xl font-medium"
          style={{
            background: 'linear-gradient(to right, #1b4779ff, #2469B6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Images
        </h2>
        <p className="text-sm text-gray-400">
          Upload images related to your service request (Optional)
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Drop images here or{' '}
              <button
                type="button"
                onClick={onButtonClick}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                browse files
              </button>
            </p>
            <p className="text-xs text-slate-400">
              PNG, JPG, GIF up to 5MB each
            </p>
          </div>
        </div>
      </div>

      {/* Upload Status */}
      {uploading && (
        <div className="mt-4 text-center">
          <p className="text-sm text-blue-600">Uploading images...</p>
        </div>
      )}

      {/* File Preview */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-slate-600">Uploaded Images:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  {uploadedUrls[index] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={uploadedUrls[index]}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <p
                  className="mt-1 text-xs text-slate-500 truncate"
                  title={file.name}
                >
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
