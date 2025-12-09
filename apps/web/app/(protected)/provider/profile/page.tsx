'use client';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { MainContent } from '../../../../components/profile/profile-content';
import { Sidebar } from '../../../../components/profile/profile-sidebar';
import { MobileProfileBottom } from '../../../../components/profile-mobile/mobile-bottom';
import { MobileProfileDivider } from '../../../../components/profile-mobile/mobile-divider';
import { MobileProfileHeader } from '../../../../components/profile-mobile/mobile-header';
import { MobileProfileImage } from '../../../../components/profile-mobile/mobile-images';
import { MobileProfileInfo } from '../../../../components/profile-mobile/mobile-info';
import { MobileServicePreferences } from '../../../../components/profile-mobile/mobile-service-preference';
import { MobileProfileStats } from '../../../../components/profile-mobile/mobile-stats';
import { MobileProfileTabs } from '../../../../components/profile-mobile/mobile-tabs';
import { useAuth } from '../../../../lib/hooks/useAuth';
import type { Profile } from '../../../../types/profiletype';

export default function ProfilePage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Profile');
  const { profile: authProfile } = useAuth();
  const searchParams = useSearchParams();
  const providerId = searchParams.get('id');

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProviderProfile = async () => {
      // If providerId exists in query params, fetch that provider's profile
      if (providerId) {
        try {
          setLoading(true);
          const port = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${port}/api/user/${providerId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const providerData = await response.json();
            setProfile(providerData);
          }
        } catch (error) {
          console.error('Failed to load provider profile:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Use the logged-in user's profile
        setProfile(authProfile || null);
      }
    };

    loadProviderProfile();
  }, [providerId, authProfile]);

  if (loading) {
    return (
      <div className="bg-[#F3F5F9] flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#102E50]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F5F9] flex flex-col">
      {/* Desktop layout */}
      <div className="hidden md:block">
        {/* <Header
          bellColor="#6b7280"
          badgeColor="#f5c45e"
          InitialsBgColor="#f5c45e"
          InitialsTextColor="#ffffff"
          headerHoverColor="#F5C45E"
          activePage="Home"
        /> */}
        <div className="flex">
          <Sidebar
            initialSelected="Provider"
            mainColorDark="#102E50"
            mainColorLight="#014182"
            hoverColor="#ffdd8e"
            accentColorDark="#F5C45E"
            accentColorLight="#FFDD8E"
            clickedColor="#f5c45e"
            profile={profile}
          />
          <MainContent initialSelected="Provider" profile={profile} />
        </div>
      </div>
      {/* Mobile layout*/}
      <main className="flex flex-col items-center w-full px-0 pt-0 gap-0 md:hidden bg-white relative">
        {/* Mobile modular layout */}
        <MobileProfileHeader fromColor="#FFDD8E" toColor="#F5C45E" />
        <MobileProfileImage />
        <MobileProfileInfo profile={profile} />
        <MobileProfileStats />
        <MobileProfileDivider />
        <MobileProfileTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          tabTextColor="#102E50"
          tabHoverBg="#ffdd8e"
          tabSelectedBg="#F5C45E"
          tabSelectedTextColor="#FFFFFF"
        />
        <MobileProfileDivider />
        <MobileServicePreferences />
        <MobileProfileDivider />
        <MobileProfileBottom
          textColor="text-[#102E50]"
          hoverBg="hover:bg-[#f5c45e]"
          hoverText="hover:text-white"
        />
      </main>
    </div>
  );
}
