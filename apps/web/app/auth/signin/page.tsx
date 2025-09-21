'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import SignInBrandHeader from '../../../components/signin-brand-header';

// Dynamically import components that might cause hydration issues
const SignInForms = dynamic(() => import('../../../components/signin-forms'), {
  ssr: false,
});

const SignInServiceSelector = dynamic(
  () => import('../../../components/signin-service-selector'),
  {
    ssr: false,
  }
);

/*interface FormData {
  firstName: string
  lastName: string
  displayName: string
  phoneNumber: string
  email: string
}*/

type ServiceOption = 'jobs' | 'services' | 'both';

export default function SignUpPage() {
  const [validateTrigger, setValidateTrigger] = useState(false);

  const handleSelectionChange = (_selection: ServiceOption | null) => {
    // Handle selection change logic here
    // TODO: Implement selection change
  };

  const handleCreateAccount = (_selection: ServiceOption | null) => {
    // Trigger form validation
    setValidateTrigger(true);
    // Reset trigger after a brief moment to allow for re-validation
    setTimeout(() => setValidateTrigger(false), 100);

    // Handle account creation logic here
    // TODO: Implement account creation
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#102E50] to-[#014182] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-5xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px]">
          {/* Left Side - Form */}
          <div className="flex-1 p-4 sm:p-6 lg:p-12 flex flex-col">
            <SignInBrandHeader logoSrc="/logo.png" logoAlt="HanApp Logo" />
            <div className="flex-1 mt-4 sm:mt-0">
              <SignInForms validateTrigger={validateTrigger} />
            </div>
          </div>

          {/* Right Side - Service Selection - Hidden on mobile, visible on large screens */}
          <div className="hidden lg:flex flex-1 bg-white p-8 lg:p-12 flex-col">
            <SignInServiceSelector
              onSelectionChange={handleSelectionChange}
              onCreateAccount={handleCreateAccount}
            />
          </div>

          {/* Mobile Service Selection - Visible only on mobile */}
          <div className="lg:hidden bg-white p-4 sm:p-6">
            <SignInServiceSelector
              onSelectionChange={handleSelectionChange}
              onCreateAccount={handleCreateAccount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
