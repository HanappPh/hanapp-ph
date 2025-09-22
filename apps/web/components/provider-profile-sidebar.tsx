import {
  User,
  Star,
  Briefcase,
  DollarSign,
  Shield,
  CreditCard,
} from 'lucide-react';

import { Button } from '../../../libs/commons/src/components/ui/button';
import { Card } from '../../../libs/commons/src/components/ui/card';

export function Sidebar() {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6">
      {/* Profile Card */}
      <Card className="p-6 mb-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
            <img
              src="/images/maria-garcia-pfp.png"
              alt="Mario Garcia"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Mario Garcia
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Active</span>
          </div>

          {/* Toggle Buttons */}
        </div>
      </Card>

      <div className="flex rounded-full bg-gray-100 p-1">
        <Button className="flex-1 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E] text-gray-900 rounded-full">
          Provider
        </Button>
        <Button
          variant="ghost"
          className="flex-1 text-gray-600 hover:bg-gray-200 rounded-full"
        >
          Client
        </Button>
      </div>

      {/* My Account Section */}
      <div className="pt-5 mb-6">
        <h4 className="text-lg font-semibold text-[#102E50] mb-4">
          My Account
        </h4>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start bg-[#F5C45E] text-gray-900 hover:brightness-95 pl-2 rounded-md"
          >
            <User className="w-5 h-5" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 hover:bg-[#FFE8B9] pl-2 rounded-md"
          >
            <Star className="w-5 h-5" />
            Reviews
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 hover:bg-[#FFE8B9] pl-2 rounded-md"
          >
            <Briefcase className="w-5 h-5" />
            My Services
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 hover:bg-[#FFE8B9] pl-2 rounded-md"
          >
            <DollarSign className="w-5 h-5" />
            Earnings
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 hover:bg-[#FFE8B9] pl-2 rounded-md"
          >
            <Shield className="w-5 h-5" />
            Security
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 hover:bg-[#FFE8B9] pl-2 rounded-md"
          >
            <CreditCard className="w-5 h-5" />
            Payment Settings
          </Button>
        </nav>
      </div>
    </aside>
  );
}
