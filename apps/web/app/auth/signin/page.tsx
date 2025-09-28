'use client';

import { BackgroundImage } from '../../../components/login-background';
import { LoginDialog } from '../../../components/login-dialog';
import { MainHeader } from '../../../components/login-header';

export default function SigninPage() {
  return (
    <>
      <div className="hidden lg:block">
        <BackgroundImage imageSrc="/placeholder.jpg" />
      </div>

      <div className="hidden lg:block">
        <MainHeader />
      </div>

      <LoginDialog />
    </>
  );
}
