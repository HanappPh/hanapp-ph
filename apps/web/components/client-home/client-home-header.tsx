import { Badge, Avatar, AvatarFallback } from '@hanapp-ph/commons';
import { Home, Calendar, Users, MessageCircle, Bell } from 'lucide-react';

const Header = () => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Calendar, label: 'Bookings' },
    { icon: Users, label: 'Providers' },
    { icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">
            Hanapp<span className="text-warning">®</span>
          </h1>

          <nav className="hidden md:flex space-x-1">
            {navItems.map(item => (
              <button
                key={item.label}
                className={`flex flex-col items-center justify-center px-6 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-primary-foreground/10 text-primary-foreground'
                    : 'hover:bg-primary-foreground/5 text-primary-foreground/70'
                }`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-5 w-5 cursor-pointer" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs">
              2
            </Badge>
          </div>

          <Avatar className="h-8 w-8 bg-primary-foreground text-primary cursor-pointer">
            <AvatarFallback className="bg-primary-foreground text-primary font-semibold text-sm">
              MG
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex border-t border-primary-foreground/10">
        {navItems.map(item => (
          <button
            key={item.label}
            className={`flex-1 flex flex-col items-center justify-center py-3 ${
              item.active
                ? 'bg-primary-foreground/10 text-primary-foreground'
                : 'text-primary-foreground/70'
            }`}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
