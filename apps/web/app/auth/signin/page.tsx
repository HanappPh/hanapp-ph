'use client';

import { BackgroundImage } from '../../../components/background';
import { MainHeader } from '../../../components/header';
import { LoginDialog } from '../../../components/login-dialog';

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
