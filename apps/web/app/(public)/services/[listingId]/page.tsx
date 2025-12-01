'use client';

import { Card } from '@hanapp-ph/commons';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import {
  fetchServiceListingDetails,
  ServiceListingWithDetails,
} from '../../../../lib/api/serviceListings';
import { useAuth } from '../../../../lib/hooks/useAuth';

// Format date to "Month Year" format
const formatMemberSince = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'Unknown';
  }
};

export default function ServiceListingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const listingId = params.listingId as string;
  const { user, profile } = useAuth();
  const [listing, setListing] = useState<ServiceListingWithDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Fetch service listing data
  useEffect(() => {
    const loadListing = async () => {
      try {
        setLoading(true);
        const data = await fetchServiceListingDetails(listingId);
        setListing(data);
      } catch (error) {
        console.error('Error loading service listing:', error);
      } finally {
        setLoading(false);
      }
    };

    if (listingId) {
      loadListing();
    }
  }, [listingId]);

  const handleContactProvider = () => {
    if (!listing?.provider_id) {
      console.error('No provider ID available');
      return;
    }

    router.push(
      `/chat/${listing.provider_id}?name=${encodeURIComponent(
        listing.provider.full_name
      )}`
    );
  };

  // Check if the current user is the owner of this listing
  const isOwnListing =
    user?.id === listing?.provider_id ||
    profile?.full_name === listing?.provider?.full_name;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hanapp-primary"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Listing Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The service listing does not exist
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-hanapp-primary text-white rounded-lg hover:bg-hanapp-secondary"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Service Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Info Card */}
          <Card className="p-6 bg-white">
            <h2 className="text-2xl font-bold text-hanapp-primary mb-2">
              {listing.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {listing.category.name}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">{listing.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {listing.price_from && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Starting Price
                    </h3>
                    <p className="text-2xl font-bold text-hanapp-primary">
                      ₱{listing.price_from.toLocaleString()}
                    </p>
                  </div>
                )}

                {listing.service_areas && listing.service_areas.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Service Areas
                    </h3>
                    <p className="text-gray-700">
                      {listing.service_areas.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Services/Pricing Details */}
          {listing.services && listing.services.length > 0 && (
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Services Offered
              </h3>
              <div className="space-y-4">
                {listing.services.map(service => (
                  <div
                    key={service.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {service.title}
                          {service.is_addon && (
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                              Add-on
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-hanapp-primary">
                          ₱{service.rate.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.charge}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Photos */}
          {listing.images && listing.images.length > 0 && (
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Photos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative"
                  >
                    <Image
                      src={image}
                      alt={`Service photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Provider Info & Actions */}
        <div className="space-y-6">
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Service Provider
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-hanapp-primary text-white flex items-center justify-center text-xl font-semibold relative overflow-hidden">
                {listing.provider.avatar_url ? (
                  <Image
                    src={listing.provider.avatar_url}
                    alt={listing.provider.full_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  listing.provider.full_name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {listing.provider.full_name}
                </h4>
                <p className="text-sm text-gray-600">
                  Member since{' '}
                  {listing.provider.created_at
                    ? formatMemberSince(listing.provider.created_at)
                    : 'Unknown'}
                </p>
              </div>
            </div>

            {listing.provider.phone && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">
                  {listing.provider.phone}
                </p>
              </div>
            )}

            {listing.provider.email && (
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">
                  {listing.provider.email}
                </p>
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white">
            {isOwnListing ? (
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-600">Your Own Listing</p>
              </div>
            ) : (
              <button
                onClick={handleContactProvider}
                className="w-full bg-hanapp-primary text-white py-3 rounded-lg font-semibold hover:bg-hanapp-secondary transition-colors"
              >
                Contact Provider
              </button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
