'use client';
import * as React from 'react';

import { MobileProfileBottom } from '../../../components/mobile-profile-bottom';
import { MobileProfileDivider } from '../../../components/mobile-profile-divider';
import { MobileProfileFavoriteProviders } from '../../../components/mobile-profile-favorite-providers';
import { MobileProfileHeader } from '../../../components/mobile-profile-header';
import { MobileProfileImage } from '../../../components/mobile-profile-image';
import { MobileProfileInfo } from '../../../components/mobile-profile-info';
import { MobileProfileStats } from '../../../components/mobile-profile-stats';
import { MobileProfileTabs } from '../../../components/mobile-profile-tabs';
import { MobileServicePreferences } from '../../../components/mobile-service-preferences';
import { MainContent } from '../../../components/provider-profile-main-content';
import { Sidebar } from '../../../components/provider-profile-sidebar';

export default function ProfilePage() {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('Profile');
  return (
    <div className="min-h-screen bg-[#F3F5F9] flex flex-col">
      {/* Desktop layout */}
      <div className="hidden md:block">
        <div className="flex">
          <Sidebar
            initialSelected="Client"
            mainColorDark="#102E50"
            mainColorLight="#014182"
            hoverColor="#DEEFFF"
            accentColorDark="#F5C45E"
            accentColorLight="#FFDD8E"
            clickedColor="#102E50"
          />
          <MainContent initialSelected="Client" />
        </div>
      </div>
      {/* Mobile layout*/}
      <main className="flex-1 pb-24 flex flex-col items-center w-full px-0 pt-0 pb-4 gap-0 md:hidden bg-white relative">
        {/* Mobile modular layout */}
        <MobileProfileHeader fromColor="#014182" toColor="#102E50" />
        <MobileProfileImage />
        <MobileProfileInfo />
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
