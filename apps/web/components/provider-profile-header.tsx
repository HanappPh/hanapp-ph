import {
  Bell,
  ChevronDown,
  Home,
  Calendar,
  Users,
  MessageCircle,
} from 'lucide-react';
import Image from 'next/image';

import { Badge } from '../../../libs/commons/src/components/ui/badge';
import { Button } from '../../../libs/commons/src/components/ui/button';

export function Header({
  bellColor,
  badgeColor,
  InitialsBgColor,
  InitialsTextColor,
  headerHoverColor,
}: {
  bellColor?: string;
  badgeColor?: string;
  InitialsBgColor?: string;
  InitialsTextColor?: string;
  headerHoverColor?: string;
}) {
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
            className={`flex items-center space-x-2 text-[#102E50] bg-[${InitialsBgColor}] hover:text-white`}
            onMouseOver={e =>
              (e.currentTarget.style.background = headerHoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 text-[#102E50] hover:text-white hover:bg-${headerHoverColor}`}
            onMouseOver={e =>
              (e.currentTarget.style.background = headerHoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <Calendar className="w-5 h-5" />
            <span>Bookings</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 text-[#102E50] hover:text-white hover:bg-${headerHoverColor}`}
            onMouseOver={e =>
              (e.currentTarget.style.background = headerHoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <Users className="w-5 h-5" />
            <span>Providers</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 text-[#102E50] hover:text-white hover:bg-${headerHoverColor}`}
            onMouseOver={e =>
              (e.currentTarget.style.background = headerHoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat</span>
          </Button>
        </nav>

        {/* Right: User Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className={`w-6 h-6 ${bellColor}`} />
            <Badge
              className={`absolute -top-2 -right-2 ${badgeColor} text-white ${InitialsTextColor} px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center`}
            >
              8
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 ${InitialsBgColor} rounded-full flex items-center justify-center text-sm font-bold ${InitialsTextColor}`}
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
