'use client';

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@hanapp-ph/commons';
import { X, MapPin, Upload, ImageIcon } from 'lucide-react';
import React, { useState, useRef, useCallback } from 'react';

import { Availability } from '../../app/(protected)/provider/jobs/create/page';
import { supabase } from '../../lib/supabase/client';

import { AvailabilityForm } from './post-availability';
// import { ContactInfoForm } from './post-contact';

export function CreateListingForm(props: {
  onListingChange?: Function;
  resetTrigger?: number;
}) {
  const { onListingChange, resetTrigger = 0 } = props;
  const [serviceTitle, setServiceTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Transport');
  const [description, setDescription] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    // Reset all form states when resetTrigger changes
    setServiceTitle('');
    setCategory('');
    setDescription('');
    setFiles([]);
    setUploadedUrls([]);
    setLocations([]);
    setCurrentLocation('');
  }, [resetTrigger]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file =>
        file.type.startsWith('image/')
      );
      // const updatedImages = [...images, ...newFiles];
      // setImages(updatedImages);
      // updateParent({ images: updatedImages });
      setFiles(prev => [...prev, ...newFiles]);
      const newUrls = await uploadFiles(newFiles);
      const updatedUrls = [...uploadedUrls, ...newUrls];
      setUploadedUrls(updatedUrls);
      updateParent({ images: updatedUrls });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files).filter(file =>
        file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...newFiles]);
      const newUrls = await uploadFiles(newFiles);
      const updatedUrls = [...uploadedUrls, ...newUrls];
      setUploadedUrls(updatedUrls);
      updateParent({ images: updatedUrls });
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
      updateParent({ images: allUrls });
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }

    return newUrls;
  };

  const handleRemoveImage = async (index: number) => {
    const urlToRemove = uploadedUrls[index];

    setFiles(prev => prev.filter((_, i) => i !== index));

    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUrls);
    updateParent({ images: newUrls });

    // remove from supabase storage
    if (urlToRemove) {
      try {
        const path = urlToRemove.split('/service-images/')[1];
        if (path) {
          await supabase.storage.from('service-images').remove([path]);
        }
      } catch (error) {
        console.error('Error removing file from storage:', error);
      }
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddLocation = () => {
    if (currentLocation.trim()) {
      const newLocations = [...locations, currentLocation.trim()];
      setLocations(newLocations);
      setCurrentLocation('');
      updateParent({ locations: newLocations });
    }
  };

  const handleRemoveLocation = (index: number) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
    updateParent({ locations: newLocations });
  };

  const updateParent = useCallback(
    (updates: object) => {
      onListingChange?.({
        service_title: serviceTitle,
        category,
        description,
        images: uploadedUrls,
        locations,
        ...updates,
      });
    },
    [
      serviceTitle,
      category,
      description,
      uploadedUrls,
      locations,
      onListingChange,
    ]
  );

  // const handleContactInfoChange = useCallback(
  //   (provider: { contact_number: string; other_contact_link: string }) => {
  //     updateParent({
  //       contact_number: provider.contact_number,
  //       other_contact_link: provider.other_contact_link,
  //     });
  //   },
  //   [updateParent]
  // );

  const handleAvailabilityChange = useCallback(
    (avail: Availability) => {
      updateParent({ availability: avail });
    },
    [updateParent]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-3xl font-medium">Service Details</h3>
        <p className="text-sm text-gray-400 mb-6">
          Job information and service type you provide
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-gray-700">
                Service Title
              </label>
              <Input
                value={serviceTitle}
                onChange={e => {
                  setServiceTitle(e.target.value);
                  updateParent({ service_title: e.target.value });
                }}
                placeholder="e.g. Tutor for Integral Calculus"
                className="w-full font-light text-base"
                style={
                  {
                    backgroundColor: '#F3F5F9',
                    '--tw-ring-color': 'rgb(245 158 11)',
                  } as React.CSSProperties
                }
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700">
                Service Category
              </label>
              <Select
                value={category}
                onValueChange={value => {
                  setCategory(value);
                  updateParent({ category: value });
                }}
              >
                <SelectTrigger
                  className="font-light text-sm"
                  style={
                    {
                      backgroundColor: '#F3F5F9',
                      '--tw-ring-color': 'rgb(245 158 11)',
                    } as React.CSSProperties
                  }
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="tutoring">Tutoring</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">
              Service Description
            </label>
            <Textarea
              value={description}
              onChange={e => {
                setDescription(e.target.value);
                updateParent({ description: e.target.value });
              }}
              placeholder="Describe the service you are offering in detail"
              className="w-full font-light resize-none text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              style={
                {
                  backgroundColor: '#F3F5F9',
                  '--tw-ring-color': 'rgb(245 158 11)',
                } as React.CSSProperties
              }
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">
              Accepted Areas
            </label>
            <div className="flex space-x-2 mb-2">
              <div className="relative flex-1">
                <MapPin
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  value={currentLocation}
                  onChange={e => setCurrentLocation(e.target.value)}
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), handleAddLocation())
                  }
                  placeholder="Enter location"
                  className="w-full font-light resize-none text-base pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  style={
                    {
                      backgroundColor: '#F3F5F9',
                      '--tw-ring-color': 'rgb(245 158 11)',
                    } as React.CSSProperties
                  }
                />
              </div>
              <button
                type="button"
                onClick={handleAddLocation}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium rounded-md transition-colors"
              >
                Add Area
              </button>
            </div>

            {locations.length > 0 && (
              <div className="space-y-2">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                  >
                    <span className="text-sm text-gray-700">{location}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="mb-4">
          <h2 className="text-3xl font-medium">Images</h2>
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
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
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
                  className="text-yellow-600 hover:text-yellow-700 underline"
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

        {uploading && (
          <div className="mt-4 text-center">
            <p className="text-sm text-blue-600">Uploading images...</p>
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-slate-600">
              Uploaded Images:
            </p>
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
                    onClick={() => handleRemoveImage(index)}
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

      <AvailabilityForm onAvailabilityChange={handleAvailabilityChange} />

      {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <ContactInfoForm onChange={handleContactInfoChange} />
      </div> */}
    </div>
  );
}
