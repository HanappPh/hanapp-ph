'use client';

import { Button } from '@hanapp-ph/commons';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { useAuth } from '../../lib/hooks/useAuth';

import { OtpVerificationButtons } from './login-otp-verification';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  const { sendOTP: sendOTPApi, verifyOTP: verifyOTPApi } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    setError('');
    setLoading(true);

    // Format phone number
    let formattedPhone = phoneNumber.trim();
    if (!formattedPhone.startsWith('0') && !formattedPhone.startsWith('+')) {
      formattedPhone = '0' + formattedPhone;
    }

    const result = await sendOTPApi(formattedPhone);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setShowOtpVerification(true);
      setLoading(false);
      if (onSendOTP) {
        onSendOTP(formattedPhone);
      }
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setError('');
    setLoading(true);

    let formattedPhone = phoneNumber.trim();
    if (!formattedPhone.startsWith('0') && !formattedPhone.startsWith('+')) {
      formattedPhone = '0' + formattedPhone;
    }

    const result = await verifyOTPApi(formattedPhone, otp);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return false;
    } else {
      // OTP verified successfully
      // Check if user exists - if yes, log them in; if no, redirect to signup
      const { data: verifyData } = result;

      if (verifyData?.userExists) {
        // User exists, redirect to home
        router.push(redirectTo);
      } else {
        // New user, redirect to signup with phone number
        router.push(
          `/auth/signin?mode=signup&phone=${encodeURIComponent(formattedPhone)}`
        );
      }

      setLoading(false);
      return true;
    }
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
    setError('');
  };

  return (
    <div
      className={`flex flex-col flex-1 min-h-0 overflow-y-auto gap-2 sm:gap-4 px-2 sm:px-4 ${className}`}
    >
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {showOtpVerification ? (
        <OtpVerificationButtons
          phoneNumber={phoneNumber}
          onBackToLogin={handleBackToLogin}
          onVerifyOtp={handleVerifyOTP}
          onResendCode={handleSendOTP}
        />
      ) : (
        <>
          <div className="text-center flex-shrink-0">
            <label className="block text-[0.9rem] sm:text-[1rem] text-gray-700 mb-3 sm:mb-4 pt-1 sm:pt-2 font-medium">
              Enter your Phone Number to Receive an OTP
            </label>
            <div className="flex flex-row flex-nowrap justify-center gap-2 sm:gap-3 px-0 sm:px-2">
              <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-[14px] px-2.5 py-2 sm:px-3 sm:py-2.5 min-w-[50px] max-w-[68px] flex-shrink-0">
                <span className="text-gray-700 font-semibold text-base sm:text-lg">
                  +63
                </span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className="flex-1 max-w-[220px] sm:max-w-[240px] border border-gray-200 rounded-[14px] px-3 py-2 sm:px-3.5 sm:py-2.5 text-base sm:text-lg focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0 justify-center pt-3 sm:pt-4">
            <Button
              onClick={handleSendOTP}
              className="w-full sm:mx-auto sm:w-[240px] h-[42px] sm:h-[48px] bg-[#F5C45E] hover:bg-[#F5C45E]/90 text-gray-900 text-[0.95rem] sm:text-base font-semibold rounded-[14px] transition-colors disabled:opacity-80 disabled:cursor-not-allowed shadow-md flex items-center justify-center mb-3 sm:mb-3 border-0"
              style={{ backdropFilter: 'blur(2px)' }}
              disabled={!phoneNumber.trim() || loading}
            >
              <span className="font-bold text-black text-[0.95rem] sm:text-base">
                {loading ? 'Sending...' : 'Send OTP'}
              </span>
            </Button>

            <div className="relative mb-3 sm:mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-gray-500">or</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full sm:mx-auto sm:w-[240px] h-[42px] sm:h-[48px] border border-gray-500 hover:bg-gray-50 bg-white rounded-[14px] transition-colors flex items-center justify-center shadow-sm mb-4 sm:mb-6"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5"
                viewBox="0 0 24 24"
              >
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
              <span className="text-black text-[0.9rem] sm:text-[0.95rem] font-normal">
                Continue with Google
              </span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
