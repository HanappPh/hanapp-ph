'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import { BackgroundImage } from '../../../components/login-background';
import { LoginDialog } from '../../../components/login-dialog';
import { MainHeader } from '../../../components/login-header';
import SignInBrandHeader from '../../../components/signin-brand-header';
import SignUpForm from '../../../components/signin-forms';
import SignInServiceSelector from '../../../components/signin-service-selector';

type ServiceOption = 'jobs' | 'services' | 'both';

function AuthPageContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';

  const [validateTrigger, setValidateTrigger] = useState(false);

  const handleSelectionChange = (_selection: ServiceOption | null) => {
    // Handle selection change
  };

  const handleCreateAccount = (_selection: ServiceOption | null) => {
    setValidateTrigger(true);
    setTimeout(() => setValidateTrigger(false), 100);
    alert('Form submitted! Selection: ' + _selection);
  };

  interface FormData {
    firstName: string;
    lastName: string;
    displayName: string;
    phoneNumber: string;
    email: string;
  }

  const handleFormSubmit = (formData: FormData) => {
    // Handle form submission - integrate with your backend API
    alert(`Account created successfully for ${formData.firstName}!`);
  };

  // LOGIN PAGE
  if (mode === 'login') {
    return (
      <div className="h-screen w-screen overflow-hidden relative">
        <div className="hidden lg:block">
          <BackgroundImage imageSrc="/placeholder.jpg" />
        </div>
        <div className="hidden lg:block">
          <MainHeader />
        </div>
        <LoginDialog />
      </div>
    );
  }

  // SIGNUP PAGE
  return (
    <BackgroundImage imageSrc="/placeholder.jpg">
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-5xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px]">
            {/* Left - Form */}
            <div className="flex-1 p-4 sm:p-6 lg:p-12 flex flex-col">
              <SignInBrandHeader logoSrc="/logo.png" logoAlt="HanApp Logo" />
              <div className="flex-1 mt-4 sm:mt-0">
                <SignUpForm
                  validateTrigger={validateTrigger}
                  onSubmit={handleFormSubmit}
                />
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a
                  href="/auth?mode=login"
                  className="text-[#014182] hover:underline font-medium"
                >
                  Login here
                </a>
              </div>
            </div>
            {/* Right - Service Selector (Desktop) */}
            <div className="hidden lg:flex flex-1 bg-white p-8 lg:p-12 flex-col">
              <SignInServiceSelector
                onSelectionChange={handleSelectionChange}
                onCreateAccount={handleCreateAccount}
              />
            </div>
            {/* Right - Service Selector (Mobile) */}
            <div className="lg:hidden bg-white p-4 sm:p-6">
              <SignInServiceSelector
                onSelectionChange={handleSelectionChange}
                onCreateAccount={handleCreateAccount}
              />
            </div>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
}

function AuthPageFallback() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#102E50] to-[#014182]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Loading...</p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <AuthPageContent />
    </Suspense>
  );
}
