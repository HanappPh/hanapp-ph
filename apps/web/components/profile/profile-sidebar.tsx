import { Button, Card } from '@hanapp-ph/commons';
import {
  User,
  Star,
  Briefcase,
  DollarSign,
  Shield,
  CreditCard,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useAuth } from '../../lib/hooks/useAuth';

export function Sidebar({
  initialSelected,
  mainColorDark,
  mainColorLight,
  hoverColor,
  accentColorDark,
  accentColorLight,
  clickedColor,
  profile,
}: {
  initialSelected?: 'Provider' | 'Client';
  mainColorDark?: string;
  mainColorLight: string;
  hoverColor?: string;
  accentColorDark?: string;
  accentColorLight?: string;
  clickedColor?: string;
  profile: {
    full_name?: string;
    email?: string;
  } | null;
}) {
  const [selected, setSelected] = React.useState<'Provider' | 'Client'>(
    initialSelected ?? 'Client'
  );
  const router = useRouter();
  const { switchRole, activeRole } = useAuth();

  // Sync local state with prop changes (when user navigates back to profile)
  React.useEffect(() => {
    if (initialSelected) {
      setSelected(initialSelected);
    }
  }, [initialSelected]);

  const handleRoleSwitch = (role: 'Provider' | 'Client') => {
    const newRole = role.toLowerCase() as 'provider' | 'client';

    // First update the auth state
    switchRole(newRole);
    setSelected(role);

    // Use setTimeout to ensure state updates propagate before navigation
    setTimeout(() => {
      if (role === 'Provider') {
        router.push('/provider/profile');
      } else {
        router.push('/profile');
      }
    }, 0);
  };

  const displayName = profile?.full_name || 'User';

  return (
    <aside className="w-80 bg-white p-6">
      {/* Profile Card */}
      <Card className="p-6 mb-6 shadow-md">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
            {/* Profile Picture */}
            <Image
              src="/profile-pic.png"
              alt="Client Profile"
              width={150}
              height={150}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {displayName}
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Active</span>
          </div>

          {/* Toggle Buttons */}
        </div>
      </Card>

      <div className="flex rounded-full bg-gray-100 p-1 my-4 transition-colors duration-300">
        <Button
          variant="ghost"
          className={`flex-1 rounded-full transition-all duration-300 ${selected === 'Provider' ? 'bg-gradient-to-b text-white shadow' : 'bg-transparent text-gray-600'}`}
          style={
            selected === 'Provider'
              ? {
                  backgroundImage: `linear-gradient(to bottom, ${accentColorLight}, ${accentColorDark})`,
                  color: '#fff',
                }
              : {}
          }
          onClick={() => handleRoleSwitch('Provider')}
        >
          Provider
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-full transition-all duration-300 ${selected === 'Client' ? `bg-gradient-to-b text-white shadow` : 'bg-transparent text-gray-600'}`}
          style={
            selected === 'Client'
              ? {
                  backgroundImage: `linear-gradient(to bottom, ${mainColorLight}, ${mainColorDark})`,
                  color: '#fff',
                }
              : {}
          }
          onClick={() => handleRoleSwitch('Client')}
        >
          Client
        </Button>
      </div>

      {/* My Account Section */}
      <div className="pt-5 mb-6">
        <h4
          className="text-lg font-semibold mb-4"
          style={{ color: mainColorDark }}
        >
          My Account
        </h4>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start pl-2 rounded-md"
            style={{
              background:
                activeRole === 'provider' ? accentColorDark : clickedColor,
              color: '#fff',
            }}
          >
            <User className="w-5 h-5" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 pl-2 rounded-md"
            style={{}}
            onMouseOver={e =>
              (e.currentTarget.style.background = hoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <Star className="w-5 h-5" />
            Reviews
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 pl-2 rounded-md"
            style={{}}
            onMouseOver={e =>
              (e.currentTarget.style.background = hoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <Briefcase className="w-5 h-5" />
            My Services
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 pl-2 rounded-md"
            style={{}}
            onMouseOver={e =>
              (e.currentTarget.style.background = hoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <DollarSign className="w-5 h-5" />
            Earnings
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 pl-2 rounded-md"
            style={{}}
            onMouseOver={e =>
              (e.currentTarget.style.background = hoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <Shield className="w-5 h-5" />
            Security
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-600 pl-2 rounded-md"
            style={{}}
            onMouseOver={e =>
              (e.currentTarget.style.background = hoverColor || '')
            }
            onMouseOut={e => (e.currentTarget.style.background = '')}
          >
            <CreditCard className="w-5 h-5" />
            Payment Settings
          </Button>
        </nav>
      </div>
    </aside>
  );
}
