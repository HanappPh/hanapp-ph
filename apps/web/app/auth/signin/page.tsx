'use client';

import { useState, useEffect } from 'react';

import { BackgroundImage } from '../../../components/background';
import { MainHeader } from '../../../components/header';
import { LoginDialog } from '../../../components/login-dialog';

export default function SigninPage() {
  const [isDesktopView, setIsDesktopView] = useState(true);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsDesktopView(window.innerWidth >= 1024);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  return (
    <>
      {isDesktopView && (
        <BackgroundImage imageSrc="/placeholder.jpg"></BackgroundImage>
      )}
      {isDesktopView && <MainHeader />}
      <LoginDialog />
    </>
  );
}
