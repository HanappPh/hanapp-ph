'use client';
import * as React from 'react';

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

export default function ProfilePage() {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('Profile');
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
          />
          <MainContent initialSelected="Provider" />
        </div>
      </div>
      {/* Mobile layout*/}
      <main className="flex flex-col items-center w-full px-0 pt-0 gap-0 md:hidden bg-white relative">
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
