import React from 'react';

import { Header } from '../../../components/provider-profile-header';
import { MainContent } from '../../../components/provider-profile-main-content';
import { Sidebar } from '../../../components/provider-profile-sidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
