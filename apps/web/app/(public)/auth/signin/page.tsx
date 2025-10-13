'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useRef } from 'react';

import { BackgroundImage } from '../../../../components/background';
import { LoginDialog } from '../../../../components/login/login-dialog';
import { MainHeader } from '../../../../components/login/login-header';
import SignInBrandHeader from '../../../../components/signup/SignupBrandHeader';
import SignUpForm from '../../../../components/signup/SignupForms';
import SignInServiceSelector from '../../../../components/signup/SignupService';
import { FormData, SignUpFormRef } from '../../../../types/signupinterface';

type ServiceOption = 'jobs' | 'services' | 'both';

function AuthPageContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';

  const formRef = useRef<SignUpFormRef>(null);

  const handleSelectionChange = (_selection: ServiceOption | null) => {
    // Handle selection change
  };

  // const handleCreateAccount = (_selection: ServiceOption | null) => {
  //   // Call the form's submit method via ref
  //   const success = formRef.current?.submitForm();
  //   if (success) {
  //     alert('Form submitted! Selection: ' + _selection);
  //   }
  // };

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
                <SignUpForm ref={formRef} onSubmit={handleFormSubmit} />
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a
                  href="/auth/signin?mode=login"
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
                //onCreateAccount={handleCreateAccount}
              />
            </div>
            {/* Right - Service Selector (Mobile) */}
            <div className="lg:hidden bg-white p-4 sm:p-6">
              <SignInServiceSelector
                onSelectionChange={handleSelectionChange}
                //onCreateAccount={handleCreateAccount}
              />
            </div>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
}

export default function SigninPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
