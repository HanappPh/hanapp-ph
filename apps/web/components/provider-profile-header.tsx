import {
  Bell,
  ChevronDown,
  Home,
  Calendar,
  Users,
  MessageCircle,
} from 'lucide-react';

import { Badge } from '../../../libs/commons/src/components/ui/badge';
import { Button } from '../../../libs/commons/src/components/ui/button';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Provider toggle */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/images/hanapp-logo-registered.png"
              alt="HanApp Logo"
              className="h-10 w-25"
            />
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="flex-1 flex items-center justify-center space-x-6">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-[#102E50] hover:text-[#F5C45E]"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-[#102E50] hover:text-[#F5C45E]"
          >
            <Calendar className="w-5 h-5" />
            <span>Bookings</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-[#102E50] hover:text-[#F5C45E]"
          >
            <Users className="w-5 h-5" />
            <span>Providers</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-[#102E50] hover:text-[#F5C45E]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat</span>
          </Button>
        </nav>

        {/* Right: User Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
              8
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-800">
              MG
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
