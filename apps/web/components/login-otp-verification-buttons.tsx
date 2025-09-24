'use client';

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
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      <div className="mb-6">
        <p className="w-full text-center text-gray-700 text-base sm:text-xl font-normal">
          We sent a 6-digit code to{' '}
          <span className="font-bold text-gray-700 text-base sm:text-xl">
            {phoneNumber}
          </span>
        </p>
      </div>

      <div className="w-full max-w-[320px] mx-auto">
        <div className="flex justify-center gap-3 mb-2">
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
              className="w-12 h-12 sm:w-[53px] sm:h-[47px] text-center text-lg font-semibold border-[1px] border-[#E0E0E0] rounded-[10px] focus:border-yellow-400 focus:outline-none bg-[#F6F6F6]"
            />
          ))}
        </div>

        <div className="mt-1 text-right">
          <p className="text-sm sm:text-[13px] text-[#014182] font-bold underline flex items-end sm:justify-end min-h-[15px]">
            Resend code in XX
          </p>
        </div>
      </div>

      <button
        onClick={handleVerifyOtp}
        className="w-full sm:w-[320px] h-[48px] sm:h-[60px] bg-[#F5C45E] text-gray-900 text-base sm:text-[16px] font-semibold rounded-[18px] transition-colors disabled:opacity-80 disabled:cursor-not-allowed mx-auto block shadow-md flex items-center justify-center"
        disabled={code.some(digit => !digit)}
      >
        <span className="font-bold text-black text-base sm:text-[16px]">
          Verify & Continue
        </span>
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-base">
          <span className="bg-white px-5 text-gray-500">or</span>
        </div>
      </div>

      <button
        onClick={handleBackToLogin}
        className="w-full sm:w-[320px] h-[48px] sm:h-[60px] border border-gray-500 hover:bg-gray-50 rounded-[18px] transition-colors flex items-center justify-center mx-auto shadow-sm bg-transparent"
      >
        <span className="text-black text-base sm:text-[17px] font-normal">
          Back to Login
        </span>
      </button>
    </div>
  );
}
