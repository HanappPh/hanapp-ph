'use client';

import { AuthButtons } from './login-auth-buttons';
import { DialogHeader } from './login-dialog-header';

interface LoginFormProps {
  onSendOTP?: (phoneNumber: string) => void;
  onGoogleLogin?: () => void;
  className?: string;
}

export function LoginDialog({
  onSendOTP,
  onGoogleLogin,
  className = '',
}: LoginFormProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center lg:justify-end z-[100] ${className}`}
    >
      <div className="w-full h-full rounded-none mx-0 bg-white shadow-2xl border-0 lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[650px] lg:rounded-3xl lg:min-h-[min(850px,85vh)] lg:max-h-[min(900px,90vh)] lg:h-auto lg:mx-auto lg:mr-[10%]">
        <div className="flex flex-col h-full p-4 sm:p-12 justify-center items-center">
          <div className="flex flex-col space-y-8 lg:pt-0 xl:pt-8 2xl:pt-12">
            <div className="flex flex-col justify-center">
              <DialogHeader />
            </div>
            <div className="px-4 pb-4 sm:px-8 sm:pb-8">
              <AuthButtons
                onSendOTP={onSendOTP}
                onGoogleLogin={onGoogleLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
