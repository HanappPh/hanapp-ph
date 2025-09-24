'use client';

import { BackgroundImage } from '../../../components/signin-background';
import { MainHeader } from '../../../components/signin-header';
import { LoginDialog } from '../../../components/signin-login-dialog';

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
