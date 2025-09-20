import { Button } from '@hanapp-ph/commons';
import { Home, Calendar, Users, MessageCircle, Bell } from 'lucide-react';

interface NavigationHeaderProps {
  activeTab?: 'home' | 'bookings' | 'providers' | 'chat';
}

export const NavigationHeader = ({
  activeTab = 'home',
}: NavigationHeaderProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'providers', label: 'Providers', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
  ];

  return (
    <header className="bg-white border-b border-gray-200 h-15 flex items-center justify-between px-6">
      <div className="flex items-center space-x-2">
        <div className="bg-white border border-gray-300 rounded-lg px-3 py-1">
          <h1 className="text-lg font-bold" style={{ color: '#064283' }}>
            Temporary
          </h1>
        </div>
      </div>

      <nav className="flex items-center space-x-4">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              className={`flex flex-col items-center px-3 py-2 ${
                isActive ? '' : ''
              }`}
              style={{
                backgroundColor: isActive ? '#112d52' : 'transparent',
                borderRadius: isActive ? '0' : '0',
              }}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive ? 'text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{
                  backgroundColor: isActive ? 'transparent' : 'transparent',
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`text-xs mt-1 whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-800 relative"
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute -top-1 -right-1 bg-yellow-400 text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
            style={{ color: '#112d52' }}
          >
            8
          </span>
        </Button>
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold" style={{ color: '#112d52' }}>
            LR
          </span>
        </div>
      </div>
    </header>
  );
};
