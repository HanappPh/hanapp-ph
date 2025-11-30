'use client';

import { Card, CardContent, Badge, Button } from '@hanapp-ph/commons';
import { Calendar, Star, Mail, Phone, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProviderProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar_url?: string;
  created_at: string;
  user_type: string;
}

interface ServiceListing {
  id: string;
  title: string;
  description: string;
  price_from: number;
  images?: string[];
  category?: {
    name: string;
  };
  rating?: number;
  review_count?: number;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  client?: {
    full_name: string;
  };
}

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.providerId as string;

  const [provider, setProvider] = useState<ProviderProfile | null>(null);
  const [listings, setListings] = useState<ServiceListing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProviderData = async () => {
      try {
        setLoading(true);

        // Fetch provider profile
        const providerResponse = await fetch(
          `http://localhost:3001/api/user/${providerId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (providerResponse.ok) {
          const providerData = await providerResponse.json();
          setProvider(providerData);
        }

        // Fetch provider's service listings
        const listingsResponse = await fetch(
          `http://localhost:3001/api/service-listings?providerId=${providerId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (listingsResponse.ok) {
          const listingsData = await listingsResponse.json();
          setListings(listingsData);
        }

        // Fetch provider's reviews
        const reviewsResponse = await fetch(
          `http://localhost:3001/api/reviews/provider/${providerId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData.reviews || []);
        }
      } catch (error) {
        console.error('Failed to load provider data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      loadProviderData();
    }
  }, [providerId]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F5F9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hanapp-primary"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#F3F5F9] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Provider Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The provider you &apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Header Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-[#102E50] flex items-center justify-center flex-shrink-0">
                {provider.avatar_url ? (
                  <Image
                    src={provider.avatar_url}
                    alt={provider.full_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">
                    {provider.full_name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                )}
              </div>

              {/* Provider Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#102E50] mb-2">
                      {provider.full_name}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span className="text-lg font-semibold">
                          {calculateAverageRating()}
                        </span>
                        <span className="text-sm">
                          ({reviews.length} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span className="text-sm">
                          Joined{' '}
                          {new Date(provider.created_at).toLocaleDateString(
                            'en-US',
                            { month: 'short', year: 'numeric' }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  {provider.user_type === 'provider' && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified Provider
                    </Badge>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-5 h-5" />
                    <span>{provider.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-5 h-5" />
                    <span>{provider.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Listings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#102E50] mb-4">
            Service Listings ({listings.length})
          </h2>
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map(listing => (
                <Card
                  key={listing.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/jobs/${listing.id}`)}
                >
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative h-48 w-full">
                      <Image
                        src={listing.images?.[0] || '/placeholder.svg'}
                        alt={listing.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      {listing.category && (
                        <Badge className="absolute top-2 right-2 bg-white/90">
                          {listing.category.name}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#102E50] mb-2 line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#102E50]">
                          ₱{listing.price_from?.toLocaleString() ?? '0'}
                        </span>
                        {(listing.rating ?? 0) > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-semibold">
                              {listing.rating?.toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({listing.review_count})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                No service listings available
              </CardContent>
            </Card>
          )}
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-[#102E50] mb-4">
            Reviews ({reviews.length})
          </h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.slice(0, 10).map(review => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-[#102E50]">
                          {review.client?.full_name || 'Anonymous'}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                No reviews yet
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
