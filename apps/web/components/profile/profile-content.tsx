import { Badge, Button, Card } from '@hanapp-ph/commons';
import { Edit, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

// Example providers array (replace with real data as needed)
// Commented out for now - used when Recent Providers section is active
// const providers = [
//   {
//     name: 'John Benedict',
//     role: 'Cleaner',
//     distance: '0.3m',
//     img: '/profile-pic.png',
//   },
//   {
//     name: 'Mark Cruz',
//     role: 'Cleaner',
//     distance: '0.3m',
//     img: '/profile-pic.png',
//   },
//   {
//     name: 'Andi',
//     role: 'Cleaner',
//     distance: '0.3m',
//     img: '/profile-pic.png',
//   },
//   {
//     name: 'Glesinda De Ocampo Estanillo',
//     role: 'Cleaner',
//     distance: '0.3m',
//     img: '/profile-pic.png',
//   },
// ];

export function MainContent({
  initialSelected,
  profile,
  hideEditButtons = false,
  providerListings,
}: {
  initialSelected?: 'Provider' | 'Client';
  profile: {
    id?: string;
    full_name?: string;
    email?: string;
    phone_number?: string;
  } | null;
  hideEditButtons?: boolean;
  providerListings?: {
    id: string;
    title?: string;
    description?: string;
    images?: string[];
  }[];
}) {
  const router = useRouter();
  const [showAllListings, setShowAllListings] = React.useState(false);
  const [currentActivityPage, setCurrentActivityPage] = React.useState(1);
  const displayName = profile?.full_name || 'User';
  const displayEmail = profile?.email || 'Not provided';
  const displayPhone = profile?.phone_number || 'Not provided';

  // React.useEffect(() => {
  //   if (initialSelected === 'Client' || !profile?.id) {
  //     return;
  //   }
  //
  //   const loadMetrics = async () => {
  //     const data = await fetchProviderMetrics(profile.id as string);
  //     if (!data) {
  //       return;
  //     }
  //
  //     setMetrics({
  //       profileViews: data.profileViews || 0,
  //       responseRate: data.responseRate || 0,
  //     });
  //   };
  //
  //   loadMetrics();
  // }, [initialSelected, profile?.id]);

  // Hardcoded recent activity data
  const recentActivities = [
    {
      id: '1',
      title: 'Service request submitted',
      client: 'House Cleaning',
      time: '10 mins ago',
      status: 'Pending',
      statusColor: 'orange',
      amount: null,
    },
    {
      id: '2',
      title: 'Provider application confirmed',
      client: 'Math Tutoring',
      time: '3 hours ago',
      status: 'In Progress',
      statusColor: 'blue',
      amount: null,
    },
    {
      id: '3',
      title: 'Provider application deleted',
      client: 'Plumbing Service',
      time: '1 day ago',
      status: 'Cancelled',
      statusColor: 'red',
      amount: null,
    },
    {
      id: '4',
      title: 'Payment released',
      client: 'AC Repair',
      time: '2 days ago',
      status: 'Completed',
      statusColor: 'green',
      amount: '₱1,200.00 released',
    },
    {
      id: '5',
      title: 'Service request cancelled',
      client: 'Grocery Errand',
      time: '3 days ago',
      status: 'Cancelled',
      statusColor: 'red',
      amount: null,
    },
    {
      id: '6',
      title: 'Service request submitted',
      client: 'Pet Care',
      time: '4 days ago',
      status: 'Pending',
      statusColor: 'orange',
      amount: null,
    },
    {
      id: '7',
      title: 'Provider application confirmed',
      client: 'Home Painting',
      time: '5 days ago',
      status: 'In Progress',
      statusColor: 'blue',
      amount: null,
    },
    {
      id: '8',
      title: 'Payment released',
      client: 'Electrical Repair',
      time: '6 days ago',
      status: 'Completed',
      statusColor: 'green',
      amount: '₱2,500.00 released',
    },
    {
      id: '9',
      title: 'Provider application deleted',
      client: 'Laundry Service',
      time: '1 week ago',
      status: 'Cancelled',
      statusColor: 'red',
      amount: null,
    },
    {
      id: '10',
      title: 'Service request submitted',
      client: 'Appliance Repair',
      time: '1 week ago',
      status: 'Pending',
      statusColor: 'orange',
      amount: null,
    },
  ];

  const activitiesPerPage = 5;
  const totalActivityPages = Math.ceil(
    recentActivities.length / activitiesPerPage
  );
  const startActivityIndex = (currentActivityPage - 1) * activitiesPerPage;
  const endActivityIndex = startActivityIndex + activitiesPerPage;
  const currentActivities = recentActivities.slice(
    startActivityIndex,
    endActivityIndex
  );

  return (
    <main className="flex-1 p-6">
      <div className="space-y-6">
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
                <p className="text-green-600 font-medium">Verified Provider</p>
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

          {initialSelected !== 'Client' && (
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
          )}
        </Card>

        {/* {initialSelected !== 'Client' && (
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-4 bg-white border-none drop-shadow-md text-center">
                <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-2">
                  Response Rate
                </h4>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {metrics.responseRate}%
                </p>
                <p className="text-xs text-gray-900">
                  based on chat back-and-forth
                </p>
              </Card>

              <Card className="p-4 bg-white border-none drop-shadow-md text-center">
                <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-2">
                  Profile views
                </h4>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {metrics.profileViews}
                </p>
                <p className="text-xs text-gray-900">people viewed your profile</p>
              </Card>
            </div>
          )} */}

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
                          alt={listing.title || 'Service listing image'}
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
              {currentActivities.map(activity => (
                <div
                  key={activity.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                    activity.statusColor === 'green'
                      ? 'bg-[#ECFDF5] border-[#10B981]'
                      : activity.statusColor === 'red'
                        ? 'bg-[#FEF2F2] border-[#EF4444]'
                        : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {activity.client} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium bg-transparent cursor-default select-none ${
                      activity.statusColor === 'green'
                        ? 'border-[#10B981] text-[#10B981]'
                        : activity.statusColor === 'red'
                          ? 'border-[#EF4444] text-[#EF4444]'
                          : 'border-gray-500 text-gray-700'
                    }`}
                  >
                    {activity.amount || activity.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalActivityPages > 1 && (
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentActivityPage(prev => Math.max(1, prev - 1))
                  }
                  disabled={currentActivityPage === 1}
                  className="text-xs px-3 py-1 h-auto"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {(() => {
                    const maxPagesToShow = 3;
                    let startPage = Math.max(
                      1,
                      currentActivityPage - Math.floor(maxPagesToShow / 2)
                    );
                    const endPage = Math.min(
                      totalActivityPages,
                      startPage + maxPagesToShow - 1
                    );

                    // Adjust startPage if we're at the end
                    if (endPage - startPage + 1 < maxPagesToShow) {
                      startPage = Math.max(1, endPage - maxPagesToShow + 1);
                    }

                    return Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i
                    ).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentActivityPage(page)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                          currentActivityPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ));
                  })()}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentActivityPage(prev =>
                      Math.min(totalActivityPages, prev + 1)
                    )
                  }
                  disabled={currentActivityPage === totalActivityPages}
                  className="text-xs px-3 py-1 h-auto"
                >
                  Next
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Favorite Providers Section (Web version) - Commented out for now */}
      </div>
    </main>
  );
}
