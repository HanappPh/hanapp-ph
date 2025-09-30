'use client';

import { Card } from '@hanapp-ph/commons';

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
      className={`fixed inset-1 flex items-center justify-center lg:justify-end z-[100] ${className}`}
    >
      <Card className="w-full h-full rounded-none mx-0 bg-white shadow-2xl border-0 lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[650px] lg:rounded-3xl lg:min-h-[min(850px,85vh)] lg:max-h-[min(900px,90vh)] lg:h-auto lg:mx-auto lg:mr-[10%]">
        <div className="flex flex-col flex-1 min-h-0 h-full p-4 sm:p-12 items-center justify-center">
          <div className="flex flex-col flex-1 min-h-0 w-full max-w-xl items-center justify-center">
            <DialogHeader />
            <AuthButtons onSendOTP={onSendOTP} onGoogleLogin={onGoogleLogin} />
          </div>
        </div>
      </Card>
    </div>
  );
}
