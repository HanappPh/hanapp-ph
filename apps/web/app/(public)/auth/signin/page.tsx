'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useRef, useState } from 'react';

import { BackgroundImage } from '../../../../components/background';
import { LoginDialog } from '../../../../components/login/login-dialog';
import { MainHeader } from '../../../../components/login/login-header';
import SignUpForm from '../../../../components/signup/signup-forms';
import SignInBrandHeader from '../../../../components/signup/signup-header';
import SignInServiceSelector from '../../../../components/signup/signup-service';
import { useAuth, UserType } from '../../../../lib/hooks/useAuth';
import { FormData, SignUpFormRef } from '../../../../types/signupinterface';

type ServiceOption = 'jobs' | 'services' | 'both';

function AuthPageContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const verifiedPhone = searchParams.get('phone'); // Get verified phone from OTP
  const router = useRouter();
  const { signUp } = useAuth();

  const formRef = useRef<SignUpFormRef>(null);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectionChange = (_selection: ServiceOption | null) => {
    setError(null);
  };

  const handleUserTypeChange = (userType: UserType) => {
    setSelectedUserType(userType);
    setError(null); // Clear error when user selects a role
  };

  const handleCreateAccount = () => {
    // First check if user has selected a role
    if (!selectedUserType) {
      setError(
        'Please select whether you want to offer jobs or provide services'
      );
      return;
    }

    // Then validate and submit the form
    const isFormValid = formRef.current?.submitForm();

    if (!isFormValid) {
      setError('Please fill in all required fields correctly');
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    // Double-check role selection (should already be validated by handleCreateAccount)
    if (!selectedUserType) {
      setError(
        'Please select whether you want to offer jobs or provide services'
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the userType from service selector
      const userType = selectedUserType;
      const fullName = `${formData.firstName} ${formData.lastName}`;

      // Normalize phone number to +63XXXXXXXXXX format (must match backend)
      let normalizedPhone: string;
      if (verifiedPhone) {
        normalizedPhone = verifiedPhone;
      } else {
        normalizedPhone = formData.phoneNumber;
      }

      // Normalize to +63 format
      const cleaned = normalizedPhone.replace(/\D/g, '');
      if (cleaned.startsWith('0') && cleaned.length === 11) {
        normalizedPhone = `+63${cleaned.substring(1)}`;
      } else if (!cleaned.startsWith('63') && cleaned.length === 10) {
        normalizedPhone = `+63${cleaned}`;
      } else if (!normalizedPhone.startsWith('+')) {
        normalizedPhone = `+${cleaned}`;
      }

      // Generate temp password from normalized phone (last 4 digits)
      const tempPassword = `HanApp${normalizedPhone.slice(-4)}!`;

      const { data, error: signUpError } = await signUp(
        formData.email,
        tempPassword,
        normalizedPhone,
        {
          full_name: fullName,
          user_type: userType,
        }
      );

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data) {
        // Redirect based on user role
        if (userType === 'provider') {
          router.push('/provider'); // Provider home page
        } else if (userType === 'client') {
          router.push('/'); // Client home page (regular page.tsx)
        } else if (userType === 'both') {
          // Default to client view for 'both', they can switch later
          router.push('/');
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during signup'
      );
    } finally {
      setIsLoading(false);
    }
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
                  ref={formRef}
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                  initialPhone={verifiedPhone || undefined}
                />
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
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
                onCreateAccount={handleCreateAccount}
                onUserTypeChange={handleUserTypeChange}
                isLoading={isLoading}
              />
            </div>
            {/* Right - Service Selector (Mobile) */}
            <div className="lg:hidden bg-white p-4 sm:p-6">
              <SignInServiceSelector
                onSelectionChange={handleSelectionChange}
                onCreateAccount={handleCreateAccount}
                onUserTypeChange={handleUserTypeChange}
                isLoading={isLoading}
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
