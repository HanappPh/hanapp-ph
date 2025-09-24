'use client';

import { useState } from 'react';

import { OtpVerificationButtons } from './signin-otp-verification-buttons';

interface AuthButtonsProps {
  onSendOTP?: (phoneNumber: string) => void;
  onGoogleLogin?: () => void;
  className?: string;
}

export function AuthButtons({
  onSendOTP,
  // onGoogleLogin,
  className = '',
}: AuthButtonsProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const handleSendOTP = () => {
    if (onSendOTP) {
      onSendOTP(phoneNumber);
    }
    setShowOtpVerification(true);
  };

  const handleGoogleLogin = () => {
    // if (onGoogleLogin) {
    //   onGoogleLogin();
    // } else {
    //   console.log('Continue with Google');
    // }
  };

  const handleBackToLogin = () => {
    setShowOtpVerification(false);
  };

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {showOtpVerification ? (
        <OtpVerificationButtons
          phoneNumber={phoneNumber}
          onBackToLogin={handleBackToLogin}
          // onVerifyOtp={otp => console.log('OTP Verified:', otp)}
          // onResendCode={() => console.log('Resending code...')}
        />
      ) : (
        <>
          <div className="text-center">
            <label className="block text-base sm:text-xl text-gray-700 mb-2 sm:mb-4 pt-4 sm:pt-6z">
              Enter your Phone Number to Receive an OTP
            </label>
            <div className="flex flex-row flex-nowrap justify-center gap-3 px-0 sm:px-4">
              <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-[18px] px-4 py-3 sm:py-4 min-w-[60px] max-w-[80px] flex-shrink-0">
                <span className="text-gray-700 font-semibold text-xl">+63</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className="flex-1 sm:w-[300px] border border-gray-200 rounded-[18px] px-4 py-3 sm:py-4 text-xl focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-12 sm:pt-16">
            <button
              onClick={handleSendOTP}
              className="w-full sm:mx-auto sm:w-[320px] h-[48px] sm:h-[60px] bg-[#F5C45E] text-gray-900 text-lg font-semibold rounded-[18px] transition-colors disabled:opacity-80 disabled:cursor-not-allowed block shadow-md flex items-center justify-center mb-4 sm:mb-6"
              style={{ backdropFilter: 'blur(2px)' }}
              disabled={!phoneNumber.trim()}
            >
              <span className="font-bold text-black text-base sm:text-[16px]">
                Send OTP
              </span>
            </button>

            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-base">
                <span className="bg-white px-5 text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full sm:mx-auto sm:w-[320px] h-[48px] sm:h-[60px] border border-gray-500 hover:bg-gray-50 rounded-[18px] transition-colors flex items-center justify-center shadow-sm"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-black text-base sm:text-[17px] font-normal">
                Continue with Google
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
