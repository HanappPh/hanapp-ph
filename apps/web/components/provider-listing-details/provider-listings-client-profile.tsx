import { Avatar, AvatarFallback, AvatarImage } from '@hanapp-ph/commons';
import { CheckCircle2, Star, Phone, Mail } from 'lucide-react';
import React from 'react';

// Simple separator component
const Separator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`border-t border-gray-200 ${className}`} />
);

interface Client {
  name: string;
  initials: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  phone: string;
  email: string;
  memberSince: string;
  avatar?: string;
}

interface ClientProfileProps {
  client: Client;
}

export const ProviderListingsClientProfile: React.FC<ClientProfileProps> = ({
  client,
}) => (
  <div>
    <div className="flex items-start gap-4 mb-4">
      <Avatar className="h-16 w-16 border-2 border-border">
        <AvatarImage
          src={client.avatar || '/placeholder.svg'}
          alt={client.name}
        />
        <AvatarFallback className="bg-muted text-foreground text-lg">
          {client.initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-semibold">{client.name}</h3>
          {client.verified && (
            <CheckCircle2 className="h-5 w-5" style={{ color: '#FFDD8E' }} />
          )}
        </div>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-current" style={{ color: '#FFDD8E' }} />
          <span className="text-lg font-semibold">{client.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({client.reviewCount} reviews)
          </span>
        </div>
      </div>
    </div>

    <Separator className="my-4" />

    <div className="space-y-3 mb-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Member Since</span>
        <span className="font-medium">{client.memberSince}</span>
      </div>
    </div>

    <Separator className="my-4" />

    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Phone className="h-4 w-4" style={{ color: '#FFDD8E' }} />
        <span className="text-sm">{client.phone}</span>
      </div>
      <div className="flex items-center gap-3">
        <Mail className="h-4 w-4" style={{ color: '#FFDD8E' }} />
        <span className="text-sm break-all">{client.email}</span>
      </div>
    </div>
  </div>
);
