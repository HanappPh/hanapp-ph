import { Badge, Card } from '@hanapp-ph/commons';
import React from 'react';

const payoutHistory = [
  {
    id: 'PAY-001',
    service: 'Tutor in Math',
    amount: '₱1,200.00',
    date: 'Feb 24, 2026',
    status: 'Released',
  },
  {
    id: 'PAY-002',
    service: 'Deep Cleaning',
    amount: '₱950.00',
    date: 'Feb 22, 2026',
    status: 'Released',
  },
  {
    id: 'PAY-003',
    service: 'Tutor in Science',
    amount: '₱800.00',
    date: 'Feb 20, 2026',
    status: 'Released',
  },
];

export function ProfileEarningsContent() {
  return (
    <main className="flex-1 p-6">
      <div className="space-y-6">
        <Card className="border-none p-6 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E] drop-shadow-md">
          <h3 className="text-sm text-gray-700 mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-[#102E50]">₱ 12,450.00</p>
        </Card>

        <Card className="p-6 bg-white border-none drop-shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Payout History
          </h2>
          <div className="space-y-3">
            {payoutHistory.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
              >
                <div>
                  <p className="text-xs text-gray-500">{item.id}</p>
                  <h4 className="font-medium text-gray-900">{item.service}</h4>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#102E50]">{item.amount}</p>
                  <Badge className="bg-[#10B981] text-white">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
