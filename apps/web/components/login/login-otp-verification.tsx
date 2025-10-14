'use client';

import { Button } from '@hanapp-ph/commons';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';

interface OtpVerificationButtonsProps {
  onVerifyOtp?: (otp: string) => void;
  onResendCode?: () => void;
  onBackToLogin?: () => void;
  className?: string;
  phoneNumber?: string;
}

export function OtpVerificationButtons({
  // onVerifyOtp,
  onBackToLogin,
  className = '',
  phoneNumber = '09xx xxx xxxx',
}: OtpVerificationButtonsProps) {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (index: number, value: string) => {
    const newCode = [...code];
    if (value.length === 1 && /^[0-9]$/.test(value)) {
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length === 0) {
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    router.push('/auth/signin?mode=signup');
    // const fullOtp = code.join('');
    // if (onVerifyOtp) {
    //   onVerifyOtp(fullOtp);
    // } else {
    //   console.log('Verifying OTP:', fullOtp);
    // }
  };

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    }
  };

  return (
    <div
      className={`space-y-3 sm:space-y-4 w-full max-w-full overflow-hidden ${className}`}
    >
      <div className="mb-4">
        <p className="w-full text-center text-gray-700 text-sm sm:text-base font-normal px-4">
          We sent a 6-digit code to{' '}
          <span className="font-bold text-gray-700 text-sm sm:text-base">
            {phoneNumber}
          </span>
        </p>
      </div>

      <div className="w-full max-w-[260px] sm:max-w-[280px] mx-auto px-4">
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleInputChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              aria-label={`Digit ${index + 1} of 6`}
              autoComplete="one-time-code"
              className="w-9 h-9 sm:w-10 sm:h-10 text-center text-base sm:text-lg font-semibold border-[1px] border-[#E0E0E0] rounded-[8px] focus:border-yellow-400 focus:outline-none bg-[#F6F6F6]"
            />
          ))}
        </div>

        <div className="mt-1 text-right pr-1">
          <p className="text-xs sm:text-[12px] text-[#014182] font-bold underline flex items-end sm:justify-end min-h-[14px]">
            Resend code in XX
          </p>
        </div>
      </div>

      <Button
        onClick={handleVerifyOtp}
        className="w-full max-w-[260px] sm:max-w-[280px] h-[44px] sm:h-[50px] bg-[#F5C45E] hover:bg-[#F5C45E]/90 text-gray-900 text-sm sm:text-base font-semibold rounded-[14px] transition-colors disabled:opacity-80 disabled:cursor-not-allowed mx-auto shadow-md flex items-center justify-center border-0"
        disabled={code.some(digit => !digit)}
      >
        <span className="font-bold text-black text-sm sm:text-base">
          Verify & Continue
        </span>
      </Button>

      <div className="relative my-3 sm:my-4 px-4">
        <div className="absolute inset-0 flex items-center px-4">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">or</span>
        </div>
      </div>

      <Button
        onClick={handleBackToLogin}
        variant="outline"
        className="w-full max-w-[260px] sm:max-w-[280px] h-[44px] sm:h-[50px] border border-gray-500 hover:bg-gray-50 bg-transparent rounded-[14px] transition-colors flex items-center justify-center mx-auto shadow-sm"
      >
        <span className="text-black text-sm sm:text-base font-normal">
          Back to Login
        </span>
      </Button>
    </div>
  );
}
