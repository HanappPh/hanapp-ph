'use client';

import {
  Button,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Checkbox,
} from '@hanapp-ph/commons';
import { useState } from 'react';

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: () => void;
}

export default function TermsModal({
  open,
  onOpenChange,
  //   onAccept,
}: TermsModalProps) {
  const [accepted, setAccepted] = useState(false);

  //   const handleAccept = () => {
  //     if (accepted) {
  //       onAccept();
  //       setAccepted(false);
  //     }
  //   };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-hanapp-primary">Notice</DialogTitle>
          <DialogDescription className="text-hanapp-secondary">
            Important: Please review and accept our terms before proceeding with
            your booking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section className="space-y-2 text-sm text-hanapp-secondary">
            <p>
              1. Pay your provider directly after the service. Hanapp does not
              handle payments.
            </p>

            <p>
              2. We&apos;ll notify the provider when you submit. You&apos;ll be
              notified once they accept.
            </p>

            <p>
              3. Double check your job details and contact info before booking.
            </p>
          </section>

          <section className="space-y-2 text-md text-hanapp-primary">
            <p>
              By submitting, you agree to Hanapp&apos;s guidelines and terms of
              service and understand that all payments and arrangements take
              place directly with your provider.
            </p>
          </section>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <div className="flex items-center space-x-2 flex-1">
            <Checkbox
              id="accept-terms"
              checked={accepted}
              onCheckedChange={checked => setAccepted(checked as boolean)}
            />
            <Label htmlFor="accept-terms" className="text-sm cursor-pointer">
              I agree to the terms and conditions
            </Label>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              // onClick={handleAccept}
              disabled={!accepted}
              className="bg-hanapp-primary text-white hover:bg-hanapp-secondary transition-colors"
            >
              Accept & Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
