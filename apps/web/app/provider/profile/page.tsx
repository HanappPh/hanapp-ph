'use client';
import * as React from 'react';

import { MobileProfileBottom } from '../../../components/mobile-profile-bottom';
import { MobileProfileDivider } from '../../../components/mobile-profile-divider';
import { MobileProfileHeader } from '../../../components/mobile-profile-header';
import { MobileProfileImage } from '../../../components/mobile-profile-image';
import { MobileProfileInfo } from '../../../components/mobile-profile-info';
import { MobileProfileStats } from '../../../components/mobile-profile-stats';
import { MobileProfileTabs } from '../../../components/mobile-profile-tabs';
import { MobileServicePreferences } from '../../../components/mobile-service-preferences';
import { Header } from '../../../components/provider-profile-header';
import { MainContent } from '../../../components/provider-profile-main-content';
import { Sidebar } from '../../../components/provider-profile-sidebar';

export default function ProfilePage() {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('Profile');
  return (
    <div className="min-h-screen bg-[#F3F5F9] flex flex-col">
      {/* Desktop layout */}
      <div className="hidden md:block">
        <Header
          bellColor="text-gray-600"
          badgeColor="bg-[#f5c45e]"
          InitialsBgColor="bg-[#f5c45e]"
          InitialsTextColor="text-white"
          headerHoverColor="#F5C45E"
        />
        <div className="flex">
          <Sidebar
            initialSelected="Provider"
            mainColorDark="#102E50"
            mainColorLight="#014182"
            hoverColor="#ffdd8e"
            accentColorDark="#F5C45E"
            accentColorLight="#FFDD8E"
            clickedColor="#f5c45e"
          />
          <MainContent initialSelected="Provider" />
        </div>
      </div>
      {/* Mobile layout*/}
      <main className="flex-1 pb-24 flex flex-col items-center w-full px-0 pt-0 pb-4 gap-0 md:hidden bg-white relative">
        {/* Mobile modular layout */}
        <MobileProfileHeader fromColor="#FFDD8E" toColor="#F5C45E" />
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
