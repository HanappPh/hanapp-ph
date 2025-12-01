import { Button, Checkbox } from '@hanapp-ph/commons';
import { useState } from 'react';

interface TermsSubmitSectionProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function TermsSubmitSection({
  onSubmit,
  isSubmitting,
}: TermsSubmitSectionProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          className="mt-1"
          checked={agreedToTerms}
          onCheckedChange={checked => setAgreedToTerms(checked === true)}
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-600 leading-relaxed"
        >
          By clicking Post, you agree to the{' '}
          <a href="#" className="text-blue-600 underline">
            Terms and Conditions
          </a>{' '}
          of Hanapp and confirm that all information provided is true and
          legitimate
        </label>
      </div>

      <Button
        className="w-full text-white py-3 text-lg font-medium border-0"
        style={{
          background: 'linear-gradient(to bottom, #025fbdff, #102E50FC)',
        }}
        onClick={onSubmit}
        disabled={isSubmitting || !agreedToTerms}
      >
        {isSubmitting ? 'Posting...' : 'Post'}
      </Button>
    </div>
  );
}
