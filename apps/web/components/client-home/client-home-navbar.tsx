'use client';

import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '../../lib/hooks/useAuth';

import { NotificationsDialog } from './notifications-dialog';

interface ClientHomeNavbarProps {
  onProfileClick?: () => void;
  notificationCount?: number;
}

export function ClientHomeNavbar({
  onProfileClick,
  notificationCount = 3,
}: ClientHomeNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { activeRole, profile } = useAuth();
  const isProvider = activeRole === 'provider';

  const handleNotificationClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      router.push('/profile');
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (profile?.full_name) {
      const names = profile.full_name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return names[0].substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/Hanapp-Logo-Registered.png"
                alt="Hanapp Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href={isProvider ? '/provider' : '/'}
                prefetch={true}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                  pathname === '/' || pathname === '/provider'
                    ? isProvider
                      ? 'bg-[#F5C45E] text-gray-900'
                      : 'bg-hanapp-secondary text-white'
                    : isProvider
                      ? 'text-gray-500 hover:text-[#F5C45E] hover:bg-gray-100'
                      : 'text-gray-500 hover:text-hanapp-primary hover:bg-gray-100'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-xs font-medium">Home</span>
              </Link>
              <Link
                href="/bookings"
                prefetch={true}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                  pathname.startsWith('/bookings')
                    ? isProvider
                      ? 'bg-[#F5C45E] text-gray-900'
                      : 'bg-hanapp-secondary text-white'
                    : isProvider
                      ? 'text-gray-500 hover:text-[#F5C45E] hover:bg-gray-100'
                      : 'text-gray-500 hover:text-hanapp-primary hover:bg-gray-100'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium">Bookings</span>
              </Link>
              <Link
                href="/chat"
                prefetch={true}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                  pathname.startsWith('/chat')
                    ? isProvider
                      ? 'bg-[#F5C45E] text-gray-900'
                      : 'bg-hanapp-secondary text-white'
                    : isProvider
                      ? 'text-gray-500 hover:text-[#F5C45E] hover:bg-gray-100'
                      : 'text-gray-500 hover:text-hanapp-primary hover:bg-gray-100'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium">Chat</span>
              </Link>
            </div>

            {/* Right side - Notification and Profile */}
            <div className="flex items-center gap-4">
              {/* Notification Icon */}
              <button
                onClick={handleNotificationClick}
                className={`relative p-2 transition-colors ${
                  isProvider
                    ? 'text-gray-600 hover:text-[#F5C45E]'
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span
                    className={`absolute top-1 right-1 text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold ${
                      isProvider
                        ? 'bg-[#F5C45E] text-gray-900'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar */}
              <button
                onClick={handleProfileClick}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer ${
                  isProvider
                    ? 'bg-[#F5C45E] text-gray-900'
                    : 'bg-blue-900 text-white'
                }`}
                aria-label="Profile"
              >
                {getUserInitials()}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Dialog */}
        <NotificationsDialog
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />
      </nav>
    </>
  );
}
