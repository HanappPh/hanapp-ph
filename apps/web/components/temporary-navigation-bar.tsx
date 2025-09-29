import { Avatar, AvatarFallback } from '@hanapp-ph/commons';
import { Bell, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-800">Hanapp</span>
          </div>
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Client Mode
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-slate-700">
              <AvatarFallback className="text-white text-sm font-medium">
                MG
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
