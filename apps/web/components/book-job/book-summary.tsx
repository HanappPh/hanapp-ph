import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from '@hanapp-ph/commons';
import { ClipboardPlus, Clock, MapPin, Wrench } from 'lucide-react';
import { useState } from 'react';

import { Service } from './book-select-services';
import TermsModal from './book-terms-modal';
interface CostBreakdownCardProps {
  selectedServices: Service[];
  customServices: Service[];
  selectedLocation: string;
  selectedDate: Date;
  selectedTime: string;
  total: number;
}

export function BookingSummaryCard({
  selectedServices,
  customServices,
  selectedLocation,
  selectedDate,
  selectedTime,
  total,
}: CostBreakdownCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="text-lg text-hanapp-secondary">
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-md font-medium text-hanapp-primary">
              <Clock className="inline w-4 h-4 mr-2 mb-1" />
              Schedule
            </p>
            <p className="text-sm text-hanapp-secondary">
              {selectedDate.toLocaleDateString()} at {selectedTime}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-md font-medium text-hanapp-primary">
              <MapPin className="inline w-4 h-4 mr-2 mb-1" />
              Service Location
            </p>
            <p className="text-sm text-hanapp-secondary">{selectedLocation}</p>
          </div>

          {selectedServices.length > 0 && (
            <div className="space-y-2">
              <p className="text-md font-medium text-hanapp-primary">
                <Wrench className="inline w-4 h-4 mr-2 mb-1" />
                Selected Services
              </p>
              {selectedServices.map(s => (
                <div
                  key={s.id}
                  className="flex justify-between text-sm text-hanapp-secondary"
                >
                  <span>{s.name}</span>
                  <span className="font-medium">₱{s.rate}</span>
                </div>
              ))}
            </div>
          )}

          {customServices.length > 0 && (
            <div className="space-y-2">
              <p className="text-md font-medium text-hanapp-primary">
                <ClipboardPlus className="inline w-4 h-4 mr-2 mb-1" />
                Custom Services
              </p>
              {customServices.map(s => (
                <div
                  key={s.id}
                  className="flex justify-between text-sm text-hanapp-secondary"
                >
                  <span>{s.name || 'Unnamed Service'}</span>
                  <span className="font-medium">
                    ₱{Number(s.rate).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold text-hanapp-secondary">Total</span>
            <span className="text-2xl font-bold text-hanapp-primary">
              ₱{total.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Prices include all agreed-upon services. Payment will be processed
            after you review the terms.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-hanapp-primary text-white hover:bg-hanapp-secondary text-md"
            onClick={() => setIsModalOpen(true)}
            size="lg"
          >
            Process Booking
          </Button>
        </CardFooter>
      </Card>

      <TermsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        // onAccept={handleAcceptTerms}
      />
    </>
  );
}
