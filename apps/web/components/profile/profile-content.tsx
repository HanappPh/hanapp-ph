import { Badge, Button, Card } from '@hanapp-ph/commons';
import { Edit, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ProfileRating } from './profile-rating';
// Example providers array (replace with real data as needed)
const providers = [
  {
    name: 'John Benedict',
    role: 'Cleaner',
    distance: '0.3m',
    img: '/profile-pic.png',
  },
  {
    name: 'Mark Cruz',
    role: 'Cleaner',
    distance: '0.3m',
    img: '/profile-pic.png',
  },
  {
    name: 'Andi',
    role: 'Cleaner',
    distance: '0.3m',
    img: '/profile-pic.png',
  },
  {
    name: 'Glesinda De Ocampo Estanillo',
    role: 'Cleaner',
    distance: '0.3m',
    img: '/profile-pic.png',
  },
];

export function MainContent({
  initialSelected,
  profile,
  hideEditButtons = false,
  providerListings,
}: {
  initialSelected?: 'Provider' | 'Client';
  profile: {
    full_name?: string;
    email?: string;
    phone_number?: string;
  } | null;
  hideEditButtons?: boolean;
  providerListings?: any[];
}) {
  const router = useRouter();
  const [showAllListings, setShowAllListings] = React.useState(false);
  const displayName = profile?.full_name || 'User';
  const displayEmail = profile?.email || 'Not provided';
  const displayPhone = profile?.phone_number || 'Not provided';

  return (
    <main className="flex-1 p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Profile Information - Spans 2 columns */}
        <div className="col-span-2 space-y-6">
          <Card className="p-6 bg-white border-none drop-shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
              {!hideEditButtons && (
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Full Name
                  </label>
                  <p className="text-gray-900 font-medium">{displayName}</p>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  <p className="text-gray-900">{displayEmail}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </label>
                  <p className="text-gray-900">{displayPhone}</p>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member Since
                  </label>
                  <p className="text-gray-900">May 2023</p>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Account Status
                  </label>
                  <p className="text-green-600 font-medium">
                    Verified Provider
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </label>
                  <p className="text-gray-900">Bacoor, Cavite</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-600 mb-3 block">
                Service Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 p-2"
                >
                  Errand
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 p-2"
                >
                  Laundry
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 p-2"
                >
                  Babysitting
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 p-2"
                >
                  Transport
                </Badge>
              </div>
            </div>
          </Card>

          {/* Recent Activity or Provider Listings */}
          {providerListings ? (
            <Card className="p-6 bg-white border-none drop-shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Service Listings ({providerListings.length})
                </h2>
                {providerListings.length > 3 && (
                  <Button
                    variant="ghost"
                    className="text-[#102E50] hover:text-[#0a1f35] font-semibold"
                    onClick={() => setShowAllListings(!showAllListings)}
                  >
                    {showAllListings ? 'Show Less' : 'See All'}
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {providerListings.length > 0 ? (
                  (showAllListings
                    ? providerListings
                    : providerListings.slice(0, 3)
                  ).map(listing => (
                    <div
                      key={listing.id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => router.push(`/jobs/${listing.id}`)}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        {listing.images?.[0] && (
                          <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {listing.title}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {listing.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No postings available
                  </p>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-white border-none drop-shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Laundry - Booking Request
                      </h4>
                      <p className="text-sm text-gray-600">
                        Martin Santos • 5 mins ago
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-orange-500 text-white p-2">
                    Pending
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Babysitting Completed
                      </h4>
                      <p className="text-sm text-gray-600">
                        Jemma Lee • 5 hours ago
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white p-2">₱856.00</Badge>
                </div>
              </div>
            </Card>
          )}

          {/* Favorite Providers Section (Web version) */}
          {initialSelected === 'Client' && (
            <Card className="p-6 bg-white border-none drop-shadow-md mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900 mb-6">
                  Favorite Providers
                </span>
              </div>
              <div className="flex overflow-x-auto pb-3 whitespace-nowrap gap-3">
                {providers.map(p => (
                  <div
                    key={p.name}
                    className="bg-white flex flex-col items-center shadow-md p-4 rounded-lg w-36 flex-shrink-0"
                  >
                    <div className="flex flex-col items-center flex-grow w-full">
                      <Image
                        src={p.img}
                        alt={p.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <span className="mt-1 font-semibold text-[#0B2C4A] text-xs text-center break-words whitespace-normal block w-full">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {p.role}
                      </span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <circle cx="12" cy="12" r="8" strokeWidth="2" />
                        </svg>{' '}
                        {p.distance}
                      </span>
                    </div>
                    <button className="mt-1 px-3 py-2 rounded-full bg-[#014182] text-white text-xs font-regular w-full">
                      Book Again
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Total Earnings (visible only for Provider) */}
          {initialSelected !== 'Client' && !hideEditButtons && (
            <Card className="border-none p-6 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E] drop-shadow-md">
              <h3 className="text-sm text-gray-600 mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-[#102E50]">₱ 12,450.00</p>
            </Card>
          )}

          {/* Rating and Response Rate */}
          <div className="space-y-6">
            {/* <Card className="p-4 bg-white border-none drop-shadow-md">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-4 flex-1 min-w-[150px]">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-3xl font-bold text-gray-900">
                      98%
                    </span>
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                      Response
                    </h4>
                    <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                      Rate
                    </h4>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shrink-0 w-[130px]">
                  {hideEditButtons ? 'Message' : 'See Chats'}
                </Button>
              </div>
            </Card> */}

            <ProfileRating rating={4.8} reviewCount={8} />
          </div>

          {/* Activity Stats */}
          {!hideEditButtons && (
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-white border-none drop-shadow-md text-center">
                <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-2">
                  Profile searches
                </h4>
                <p className="text-3xl font-bold text-gray-900 mb-1">11</p>
                <p className="text-xs text-gray-900">
                  people have searched your profile this week
                </p>
              </Card>

              <Card className="p-4 bg-white border-none drop-shadow-md text-center">
                <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-2">
                  Profile views
                </h4>
                <p className="text-3xl font-bold text-gray-900 mb-1">4</p>
                <p className="text-xs text-gray-900">
                  people have checked your profile this week
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
