'use client';

import { X, MapPin } from 'lucide-react';
import React, { useState, useRef, useCallback } from 'react';

import { AvailabilityForm } from './post-availability';
import { ContactInfoForm } from './post-contact-information';

const CATEGORIES = [
  'Cleaning',
  'Installation',
  'Repair',
  'Maintenance',
  'Construction',
  'Landscaping',
  'Plumbing',
  'Electrical',
  'Other',
];

export function CreateListingForm(props: { onListingChange?: Function }) {
  const { onListingChange } = props;
  const [serviceTitle, setServiceTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Transport');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.size > 10 * 1024 * 1024) {
          alert('File size must be less than 10MB');
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          const newImages = [...images, result];
          setImages(newImages);
          updateParent({ images: newImages });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    updateParent({ images: newImages });
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
        images,
        locations,
        ...updates,
      });
    },
    [serviceTitle, category, description, images, locations, onListingChange]
  );

  const handleFieldChange = (field: string, value: string) => {
    switch (field) {
      case 'service_title':
        setServiceTitle(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'description':
        setDescription(value);
        break;
    }
    updateParent({ [field]: value });
  };

  const handleContactInfoChange = useCallback(
    (provider: { contact_number: string; other_contact_link: string }) => {
      updateParent({
        contact_number: provider.contact_number,
        other_contact_link: provider.other_contact_link,
      });
    },
    [updateParent]
  );

  const handleAvailabilityChange = useCallback(
    (avail: Record<string, boolean>) => {
      updateParent({ availability: avail });
    },
    [updateParent]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Service Details
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Job information and service type needed
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Title
              </label>
              <input
                type="text"
                value={serviceTitle}
                onChange={e =>
                  handleFieldChange('service_title', e.target.value)
                }
                placeholder="e.g. Calculus Tutor"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Category
              </label>
              <select
                value={category}
                onChange={e => handleFieldChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Description
            </label>
            <textarea
              value={description}
              onChange={e => handleFieldChange('description', e.target.value)}
              placeholder="I can provide basic to advance tutoring lessons in mathematics in the different fields of Calculus."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accepted Areas
            </label>
            <div className="flex space-x-2 mb-2">
              <div className="relative flex-1">
                <MapPin
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={currentLocation}
                  onChange={e => setCurrentLocation(e.target.value)}
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), handleAddLocation())
                  }
                  placeholder="Enter location"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Upload Service Images
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Up to 5 images to showcase your service
        </p>

        <div className="space-y-3">
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
                >
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    {image ? (
                      <img
                        src={image}
                        alt={`Service ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Loading...</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length < 5 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 px-4 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors"
            >
              <span className="text-sm font-medium text-amber-600">
                + Add Image
              </span>
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <AvailabilityForm onAvailabilityChange={handleAvailabilityChange} />

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <ContactInfoForm onChange={handleContactInfoChange} />
      </div>
    </div>
  );
}
