'use client';
import * as React from 'react';

import { MainContent } from '../../../components/profile/profile-content';
import { Sidebar } from '../../../components/profile/profile-sidebar';
import { MobileProfileBottom } from '../../../components/profile-mobile/mobile-bottom';
import { MobileProfileDivider } from '../../../components/profile-mobile/mobile-divider';
import { MobileProfileFavoriteProviders } from '../../../components/profile-mobile/mobile-fav-providers';
import { MobileProfileHeader } from '../../../components/profile-mobile/mobile-header';
import { MobileProfileImage } from '../../../components/profile-mobile/mobile-images';
import { MobileProfileInfo } from '../../../components/profile-mobile/mobile-info';
import { MobileServicePreferences } from '../../../components/profile-mobile/mobile-service-preference';
import { MobileProfileStats } from '../../../components/profile-mobile/mobile-stats';
import { MobileProfileTabs } from '../../../components/profile-mobile/mobile-tabs';
import { useAuth } from '../../../lib/hooks/useAuth';

export default function ProfilePage() {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('Profile');
  const { profile, activeRole } = useAuth();

  // Convert activeRole to the format expected by Sidebar
  const initialSelected = activeRole === 'provider' ? 'Provider' : 'Client';

  return (
    <div className="min-h-screen bg-[#F3F5F9] flex flex-col">
      {/* Desktop layout */}
      <div className="hidden md:block">
        {/* <Header
          bellColor="#6b7280"
          badgeColor="#102E50"
          InitialsBgColor="#102E50"
          InitialsTextColor="#ffffff"
          headerHoverColor="#102E50"
          activePage="Home"
        /> */}
        <div className="flex">
          <Sidebar
            initialSelected={initialSelected}
            mainColorDark="#102E50"
            mainColorLight="#014182"
            hoverColor="#DEEFFF"
            accentColorDark="#F5C45E"
            accentColorLight="#FFDD8E"
            clickedColor="#102E50"
            profile={profile}
          />
          <MainContent initialSelected={initialSelected} profile={profile} />
        </div>
      </div>
      {/* Mobile layout*/}
      <main className="flex-1 flex flex-col items-center w-full px-0 pt-0 gap-0 md:hidden bg-white relative">
        {/* Mobile modular layout */}
        <MobileProfileHeader fromColor="#014182" toColor="#102E50" />
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
          tabHoverBg="#014182"
          tabSelectedBg="#102E50"
          tabSelectedTextColor="#FFFFFF"
        />
        <MobileProfileDivider />
        <MobileServicePreferences />
        <MobileProfileDivider />
        <MobileProfileFavoriteProviders
          providers={[
            {
              name: 'John Benedict',
              role: 'Cleaner',
              distance: '0.3m',
              img: '/profile-pic.png',
            },
            {
              name: 'Mark Cruz',
              role: 'Cleaner',
              distance: '0.3m',
              img: '/profile-pic.png',
            },
            {
              name: 'Andi',
              role: 'Cleaner',
              distance: '0.3m',
              img: '/profile-pic.png',
            },
            {
              name: 'Glesinda De Ocampo Estanillo',
              role: 'Cleaner',
              distance: '0.3m',
              img: '/profile-pic.png',
            },
          ]}
        />
        <MobileProfileBottom
          textColor="text-[#102E50]"
          hoverBg="hover:bg-[#014182]"
          hoverText="hover:text-white"
        />
      </main>
    </div>
  );
}
