'use client';

import {
  Bell,
  ChevronDown,
  Home,
  Calendar,
  Users,
  MessageCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Badge } from '../../../libs/commons/src/components/ui/badge';
import { Button } from '../../../libs/commons/src/components/ui/button';

export function Header({
  bellColor,
  badgeColor,
  InitialsBgColor,
  InitialsTextColor,
  headerHoverColor,
  activePage,
}: {
  bellColor?: string;
  badgeColor?: string;
  InitialsBgColor?: string;
  InitialsTextColor?: string;
  headerHoverColor?: string;
  activePage?: 'Home' | 'Bookings' | 'Providers' | 'Chat';
}) {
  const router = useRouter();

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'Home':
        router.push('/');
        break;
      case 'Bookings':
        router.push('/bookings');
        break;
      case 'Providers':
        router.push('/providers');
        break;
      case 'Chat':
        router.push('/chat');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Provider toggle */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Image
            src="/hanapp-logo-registered.png"
            alt="HanApp Logo"
            width={150}
            height={50}
            className="h-15 w-35"
            priority
          />
        </div>

        {/* Home, Bookings, Providers, Chat */}
        <nav className="flex-1 flex items-center justify-center space-x-6">
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 hover:text-white ${
              activePage === 'Home' ? 'text-white' : 'text-[#102E50]'
            }`}
            style={{
              backgroundColor:
                activePage === 'Home' ? headerHoverColor : 'transparent',
            }}
            onClick={() => handleNavigation('Home')}
            onMouseOver={e => {
              if (activePage !== 'Home') {
                e.currentTarget.style.background = headerHoverColor || '';
              }
            }}
            onMouseOut={e => {
              if (activePage !== 'Home') {
                e.currentTarget.style.background = 'transparent';
              } else {
                e.currentTarget.style.background = headerHoverColor || '';
              }
            }}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 hover:text-white ${
              activePage === 'Bookings' ? 'text-white' : 'text-[#102E50]'
            }`}
            style={{
              backgroundColor:
                activePage === 'Bookings' ? headerHoverColor : 'transparent',
            }}
            onClick={() => handleNavigation('Bookings')}
            onMouseOver={e => {
              if (activePage !== 'Bookings') {
                e.currentTarget.style.background = headerHoverColor || '';
              }
            }}
            onMouseOut={e => {
              if (activePage !== 'Bookings') {
                e.currentTarget.style.background = 'transparent';
              } else {
                e.currentTarget.style.background = headerHoverColor || '';
              }
            }}
          >
            <Calendar className="w-5 h-5" />
            <span>Bookings</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 hover:text-white ${
              activePage === 'Providers' ? 'text-white' : 'text-[#102E50]'
            }`}
            style={{
              backgroundColor:
                activePage === 'Providers' ? headerHoverColor : 'transparent',
            }}
            onClick={() => handleNavigation('Providers')}
            onMouseOver={e => {
              if (activePage !== 'Providers') {
                e.currentTarget.style.background = headerHoverColor || '';
              }
            }}
            onMouseOut={e => {
              if (activePage !== 'Providers') {
                e.currentTarget.style.background = 'transparent';
              } else {
                e.currentTarget.style.background = headerHoverColor || '';
              }
            }}
          >
            <Users className="w-5 h-5" />
            <span>Providers</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 hover:text-white ${
              activePage === 'Chat' ? 'text-white' : 'text-[#102E50]'
            }`}
            style={{
              backgroundColor:
                activePage === 'Chat' ? headerHoverColor : 'transparent',
            }}
            onClick={() => handleNavigation('Chat')}
            onMouseOver={e => {
              if (activePage !== 'Chat') {
                e.currentTarget.style.background = headerHoverColor || '';
              }
            }}
            onMouseOut={e => {
              if (activePage !== 'Chat') {
                e.currentTarget.style.background = 'transparent';
              } else {
                e.currentTarget.style.background = headerHoverColor || '';
              }
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat</span>
          </Button>
        </nav>

        {/* Right: User Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6" style={{ color: bellColor }} />
            <Badge
              className="absolute -top-2 -right-2 text-white px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center"
              style={{ backgroundColor: badgeColor, color: InitialsTextColor }}
            >
              8
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: InitialsBgColor,
                color: InitialsTextColor,
              }}
            >
              MG
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
