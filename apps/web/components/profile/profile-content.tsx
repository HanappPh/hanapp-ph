import { Badge, Button, Card } from '@hanapp-ph/commons';
import {
  Edit,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  MessageCircle,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';
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
}: {
  initialSelected?: 'Provider' | 'Client';
}) {
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
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Full Name
                  </label>
                  <p className="text-gray-900 font-medium">Mario M. Garcia</p>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  <p className="text-gray-900">andrevel@gmail.com</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </label>
                  <p className="text-gray-900">+63 0956 056 0560</p>
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

          {/* Recent Activity */}
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
                <Badge className="bg-orange-500 text-white p-2">Pending</Badge>
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

          {/* Favorite Providers Section (Web version) */}
          {initialSelected === 'Client' && (
            <Card className="p-6 bg-white border-none drop-shadow-md mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900 mb-6">
                  Favorite Providers
                </span>
                <button className="flex items-center text-xs text-[#014182] font-semibold gap-1 hover:underline">
                  Edit
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="inline-block ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 20h9"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex overflow-x-auto pb-3 whitespace-nowrap gap-3">
                {providers.map(p => (
                  <div
                    key={p.name}
                    className="bg-white flex flex-col items-center border border-[#8e8e8e] p-4 rounded-lg w-36 flex-shrink-0"
                  >
                    <div className="flex flex-col items-center flex-grow w-full">
                      <Image
                        src={p.img}
                        alt={p.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover border border-[#8e8e8e]"
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
          {initialSelected !== 'Client' && (
            <Card className="border-none p-6 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E] drop-shadow-md">
              <h3 className="text-sm text-gray-600 mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-[#102E50]">₱ 12,450.00</p>
            </Card>
          )}

          {/* Rating and Response Rate */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white border-none drop-shadow-md">
              <h4 className="text-sm text-gray-600 mb-2">Rating</h4>
              <div className="flex items-center space-x-2 mb-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold text-gray-900">4.8</span>
              </div>
              <p className="text-xs text-gray-500">8 reviews</p>
              <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                See Reviews
              </Button>
            </Card>

            <Card className="p-4 bg-white border-none drop-shadow-md">
              <h4 className="text-sm text-gray-600 mb-2">Response Rate</h4>
              <div className="flex items-center space-x-2 mb-1">
                <MessageCircle className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900">98%</span>
              </div>
              <p className="text-xs text-gray-500">18 conversations</p>
              <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                See Chats
              </Button>
            </Card>
          </div>

          {/* Activity Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white border-none drop-shadow-md text-center">
              <h4 className="text-sm text-gray-600 mb-2">You appeared in</h4>
              <p className="text-3xl font-bold text-gray-900 mb-1">11</p>
              <p className="text-xs text-gray-500 mb-3">searches this week</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                See More
              </Button>
            </Card>

            <Card className="p-4 bg-white border-none drop-shadow-md text-center">
              <h4 className="text-sm text-gray-600 mb-2">Profile views</h4>
              <p className="text-3xl font-bold text-gray-900 mb-1">4</p>
              <p className="text-xs text-gray-500 mb-3">
                people checked your profile this week
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                See More
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
