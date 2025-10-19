'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, KeyboardEvent } from 'react';

interface ClientHomeHeroProps {
  userName?: string;
}

export function ClientHomeHero({ userName = 'Andrew' }: ClientHomeHeroProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(
        `/jobs/categories?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-gray-50">
      {/* Blue gradient background - only top half */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-hanapp-gradient" />

      <div className="relative container mx-auto px-4 py-6">
        {/* Greeting */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-white">
            Ano <span className="text-yellow-400">Hanapp</span> mo, {userName}?
          </h1>
        </div>

        {/* Voucher Banner */}
        <div className="mb-6 rounded-lg overflow-hidden">
          <Image
            src="/hanapp-banner.jpg"
            alt="Invite a friend and claim your 50% off voucher - Hanapp"
            width={1092}
            height={150}
            className="w-full h-auto block"
            priority
          />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
    </section>
  );
}
