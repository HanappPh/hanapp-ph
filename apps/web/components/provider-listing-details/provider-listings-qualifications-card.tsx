import { Card } from '@hanapp-ph/commons';
import { AlertCircle } from 'lucide-react';
import React from 'react';

interface QualificationsCardProps {
  qualifications: string[];
}

export const ProviderListingsQualificationsCard: React.FC<
  QualificationsCardProps
> = ({ qualifications }) => (
  <Card className="p-6">
    <div className="flex items-center gap-2 mb-4">
      <AlertCircle className="h-5 w-5" style={{ color: '#FFDD8E' }} />
      <h3 className="text-lg font-semibold">Qualifications</h3>
    </div>
    <ul className="space-y-2">
      {qualifications.map((req, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="mt-1" style={{ color: '#FFDD8E' }}>
            •
          </span>
          <span className="text-black leading-relaxed">{req}</span>
        </li>
      ))}
    </ul>
  </Card>
);
