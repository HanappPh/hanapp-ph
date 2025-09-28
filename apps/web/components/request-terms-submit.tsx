import { Button } from '../../../libs/commons/src/components/ui/button';
import { Checkbox } from '../../../libs/commons/src/components/ui/checkbox';

export function TermsSubmitSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Checkbox id="terms" className="mt-1" />
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
      >
        Post
      </Button>
    </div>
  );
}
