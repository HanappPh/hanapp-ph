'use client';

import { Badge, Card } from '@hanapp-ph/commons';
import React from 'react';

import { useAuth } from '../../lib/hooks/useAuth';

interface ProviderServiceRequest {
  id: string;
  booking_id?: string;
  booking_group_id?: string;
  listing?: { title?: string } | null;
  service_detail?: { title?: string; description?: string } | null;
  is_custom_service?: boolean;
  custom_service_name?: string;
  title?: string;
  rate?: number;
  status?: string;
  updated_at?: string;
}

export function ProfileEarningsContent({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const { user, session } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [payoutHistory, setPayoutHistory] = React.useState<
    Array<{
      id: string;
      bookingReference: string;
      service: string;
      services: string[];
      amount: string;
      date: string;
      status: string;
    }>
  >([]);
  const [totalEarnings, setTotalEarnings] = React.useState(0);

  React.useEffect(() => {
    const loadPayoutHistory = async () => {
      if (!user?.id || !session?.access_token) {
        setPayoutHistory([]);
        setTotalEarnings(0);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(
          `${apiUrl}/api/service-requests?providerId=${user.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.access_token}`,
            },
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch provider bookings');
        }

        const providerRequests =
          (await response.json()) as ProviderServiceRequest[];

        const completedRequests = providerRequests.filter(
          request => request.status?.toLowerCase() === 'completed'
        );

        const grouped = completedRequests.reduce(
          (acc, request) => {
            const groupId = request.booking_group_id || request.id;
            if (!acc[groupId]) {
              acc[groupId] = [];
            }
            acc[groupId].push(request);
            return acc;
          },
          {} as Record<string, ProviderServiceRequest[]>
        );

        const rows = Object.entries(grouped)
          .map(([groupId, requests]) => {
            const first = requests[0];
            const amount = requests.reduce(
              (sum, item) => sum + Number(item.rate || 0),
              0
            );

            const serviceNames = Array.from(
              new Set(
                requests
                  .map(request => {
                    if (
                      request.is_custom_service &&
                      request.custom_service_name
                    ) {
                      return request.custom_service_name;
                    }
                    return (
                      request.service_detail?.title ||
                      request.title ||
                      'Service item'
                    );
                  })
                  .filter(Boolean)
              )
            );

            const bookingReference =
              first.booking_id ||
              first.booking_group_id ||
              (first.id ? `BKG-${first.id.slice(0, 8).toUpperCase()}` : 'N/A');

            return {
              id: groupId,
              bookingReference,
              service: first.listing?.title || first.title || 'Service Booking',
              services: serviceNames,
              amount: `₱${amount.toLocaleString()}`,
              date: first.updated_at
                ? new Date(first.updated_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : 'N/A',
              status: 'Released',
              numericAmount: amount,
              sortDate: first.updated_at
                ? new Date(first.updated_at).getTime()
                : 0,
            };
          })
          .sort((a, b) => b.sortDate - a.sortDate);

        setPayoutHistory(
          rows.map(
            ({ numericAmount: _numericAmount, sortDate: _sortDate, ...row }) =>
              row
          )
        );
        setTotalEarnings(rows.reduce((sum, row) => sum + row.numericAmount, 0));
      } catch (error) {
        console.error('Failed to load payout history:', error);
        setPayoutHistory([]);
        setTotalEarnings(0);
      } finally {
        setLoading(false);
      }
    };

    loadPayoutHistory();
  }, [user?.id, session?.access_token]);

  return (
    <main className={embedded ? 'p-6' : 'flex-1 p-6'}>
      <div className="space-y-6">
        {embedded ? (
          <div className="border border-[#F5C45E] p-6 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E] rounded-lg">
            <h3 className="text-sm text-gray-700 mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-[#102E50]">
              ₱ {totalEarnings.toLocaleString()}
            </p>
          </div>
        ) : (
          <Card className="border-none p-6 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E] drop-shadow-md">
            <h3 className="text-sm text-gray-700 mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-[#102E50]">
              ₱ {totalEarnings.toLocaleString()}
            </p>
          </Card>
        )}

        {embedded ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Payout History
            </h2>
            {loading ? (
              <p className="text-sm text-gray-600">Loading payout history...</p>
            ) : payoutHistory.length === 0 ? (
              <p className="text-sm text-gray-600">No payout history yet.</p>
            ) : (
              <div className="space-y-3">
                {payoutHistory.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                  >
                    <div>
                      <p className="text-xs text-gray-500">
                        Booking ID: {item.bookingReference}
                      </p>
                      <h4 className="font-medium text-gray-900">
                        {item.service}
                      </h4>
                      {item.services.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          Services: {item.services.join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#102E50]">
                        {item.amount}
                      </p>
                      <Badge className="bg-[#10B981] text-white">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Card className="p-6 bg-white border-none drop-shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Payout History
            </h2>
            {loading ? (
              <p className="text-sm text-gray-600">Loading payout history...</p>
            ) : payoutHistory.length === 0 ? (
              <p className="text-sm text-gray-600">No payout history yet.</p>
            ) : (
              <div className="space-y-3">
                {payoutHistory.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                  >
                    <div>
                      <p className="text-xs text-gray-500">
                        Booking ID: {item.bookingReference}
                      </p>
                      <h4 className="font-medium text-gray-900">
                        {item.service}
                      </h4>
                      {item.services.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          Services: {item.services.join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#102E50]">
                        {item.amount}
                      </p>
                      <Badge className="bg-[#10B981] text-white">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </main>
  );
}
