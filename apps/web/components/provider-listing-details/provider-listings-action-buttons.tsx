import { Button, Card } from '@hanapp-ph/commons';
import { CheckCircle2, XCircle, MessageSquare } from 'lucide-react';
import React from 'react';

interface ActionButtonsProps {
  status: 'pending' | 'accepted' | 'declined';
  onAccept: () => void;
  onDecline: () => void;
}

export const ProviderListingsActionButtons: React.FC<ActionButtonsProps> = ({
  status,
  onAccept,
  onDecline: _onDecline,
}) => {
  if (status === 'pending') {
    return (
      <Button
        onClick={onAccept}
        className="w-full text-black font-semibold hover:opacity-90"
        size="lg"
        style={{ backgroundColor: '#F5C45E' }}
      >
        Apply Now
      </Button>
    );
  }

  if (status === 'accepted') {
    return (
      <Card className="p-6 border-success">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Request Accepted!</h3>
            <p className="text-sm text-muted-foreground">
              The client has been notified. You can now coordinate the service
              details.
            </p>
          </div>
          <Button variant="outline" className="w-full bg-transparent" size="lg">
            <MessageSquare className="h-5 w-5 mr-2" />
            Message Client
          </Button>
        </div>
      </Card>
    );
  }

  if (status === 'declined') {
    return (
      <Card className="p-6 border-destructive">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Request Declined</h3>
            <p className="text-sm text-muted-foreground">
              The client has been notified that you cannot fulfill this request.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return null;
};
