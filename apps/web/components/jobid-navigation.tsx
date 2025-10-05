'use client';
import { Button } from '@hanapp-ph/commons';
import { Menu, Search, Bell, User } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm w-full">
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-8 overflow-hidden">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18 w-full">
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center">
              <Image
                src="/Hanapp-Logo-Registered.png"
                alt="Hanapp Logo"
                width={120}
                height={50}
                className="h-6 sm:h-8 md:h-10 w-auto"
                priority
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
            <a
              href="#"
              className="flex flex-col items-center gap-1 text-[#F5C45E] hover:text-[#F5C45E]/80 transition-colors"
            >
              <div className="p-2 bg-[#F5C45E]/10 rounded-lg">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Home</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center gap-1 text-[#102E50] hover:text-[#102E50]/80 transition-colors"
            >
              <div className="p-2 hover:bg-[#102E50]/10 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Bookings</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center gap-1 text-[#102E50] hover:text-[#102E50]/80 transition-colors"
            >
              <div className="p-2 hover:bg-[#102E50]/10 rounded-lg">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Providers</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center gap-1 text-[#102E50] hover:text-[#102E50]/80 transition-colors"
            >
              <div className="p-2 hover:bg-[#102E50]/10 rounded-lg">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Chat</span>
            </a>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div className="relative hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#102E50] hover:text-[#102E50]/80 hover:bg-[#102E50]/10 relative p-1.5 lg:p-2"
              >
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="absolute -top-0.5 -right-0.5 bg-[#F5C45E] text-[#102E50] text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-medium text-[9px] lg:text-[10px]">
                  1
                </span>
              </Button>
            </div>

            <div className="flex items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-[#F5C45E] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#102E50] font-semibold text-xs sm:text-sm">
                  MG
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-[#102E50] hover:text-[#102E50]/80 hover:bg-[#102E50]/10 p-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-2 border-t border-gray-200 bg-gray-50/30 w-full">
            <div className="flex flex-col gap-0.5 w-full">
              <a
                href="#"
                className="flex items-center gap-3 text-[#F5C45E] hover:text-[#F5C45E]/80 transition-colors py-3 px-2 rounded-lg hover:bg-[#F5C45E]/5 w-full"
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">Home</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-[#102E50] hover:text-[#102E50]/80 transition-colors py-3 px-2 rounded-lg hover:bg-[#102E50]/5 w-full"
              >
                <Bell className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">Bookings</span>
                <span className="ml-auto bg-[#F5C45E] text-[#102E50] text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium flex-shrink-0">
                  1
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-[#102E50] hover:text-[#102E50]/80 transition-colors py-3 px-2 rounded-lg hover:bg-[#102E50]/5 w-full"
              >
                <User className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">Providers</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-[#102E50] hover:text-[#102E50]/80 transition-colors py-3 px-2 rounded-lg hover:bg-[#102E50]/5 w-full"
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">Chat</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
