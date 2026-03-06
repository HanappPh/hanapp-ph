import { Button, Card } from '@hanapp-ph/commons';
import {
  User,
  Star,
  Briefcase,
  DollarSign,
  Settings,
  CreditCard,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useAuth } from '../../lib/hooks/useAuth';

import { ProfileImageUpload } from './profile-image-upload';

export function Sidebar({
  initialSelected,
  mainColorDark,
  mainColorLight,
  hoverColor,
  accentColorDark,
  accentColorLight,
  clickedColor,
  profile,
  hideRoleToggle = false,
  currentTab = 'Profile',
  onTabChange,
}: {
  initialSelected?: 'Provider' | 'Client';
  mainColorDark?: string;
  mainColorLight: string;
  hoverColor?: string;
  accentColorDark?: string;
  accentColorLight?: string;
  clickedColor?: string;
  profile: {
    id?: string;
    full_name?: string;
    email?: string;
    avatar_url?: string;
  } | null;
  hideRoleToggle?: boolean;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}) {
  const [selected, setSelected] = React.useState<'Provider' | 'Client'>(
    initialSelected ?? 'Client'
  );
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [currentAvatarUrl, setCurrentAvatarUrl] = React.useState(
    profile?.avatar_url
  );
  const router = useRouter();
  const { switchRole, activeRole, signOut, updateProfileAvatar } = useAuth();

  // Sync local state with prop changes (when user navigates back to profile)
  React.useEffect(() => {
    if (initialSelected) {
      setSelected(initialSelected);
    }
  }, [initialSelected]);

  // Update avatar URL when profile changes
  React.useEffect(() => {
    setCurrentAvatarUrl(profile?.avatar_url);
  }, [profile?.avatar_url]);

  const handleUploadSuccess = (newImageUrl: string) => {
    setCurrentAvatarUrl(newImageUrl);
    updateProfileAvatar(newImageUrl);
  };

  const handleUploadError = (error: string) => {
    alert(`Upload failed: ${error}`);
  };

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

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Logout error:', error);
        alert('Failed to logout. Please try again.');
        setIsLoggingOut(false);
      }
      // signOut handles redirect to home page
    } catch (err) {
      console.error('Logout error:', err);
      alert('Failed to logout. Please try again.');
      setIsLoggingOut(false);
    }
  };

  const displayName = profile?.full_name || 'User';

  return (
    <aside className="w-full md:w-80 bg-white p-6">
      {/* Profile Card */}
      <Card className="p-6 mb-6 shadow-md">
        <div className="text-center">
          {/* Profile Picture with Upload (only for own profile) */}
          {!hideRoleToggle && profile?.id ? (
            <div className="mb-4">
              <ProfileImageUpload
                currentImageUrl={currentAvatarUrl}
                userId={profile.id}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
              />
            </div>
          ) : (
            <div
              className={`w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden ${
                currentAvatarUrl
                  ? 'cursor-pointer hover:opacity-80 transition-opacity'
                  : ''
              }`}
              onClick={() => currentAvatarUrl && setShowImageModal(true)}
            >
              <Image
                src={currentAvatarUrl || '/profile-pic.png'}
                alt="Profile"
                width={192}
                height={192}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          {/* Full-size image modal */}
          {showImageModal && currentAvatarUrl && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setShowImageModal(false)}
            >
              <div className="relative max-w-3xl max-h-full">
                <Image
                  src={currentAvatarUrl}
                  alt="Profile"
                  width={600}
                  height={600}
                  className="rounded-lg object-contain max-h-[90vh]"
                  onClick={e => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {displayName}
          </h3>

          {/* Toggle Buttons */}
        </div>
      </Card>

      {!hideRoleToggle && (
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
      )}

      {/* My Account Section */}
      {!hideRoleToggle && (
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
                  currentTab === 'Profile'
                    ? activeRole === 'provider'
                      ? accentColorDark
                      : clickedColor
                    : '',
                color: currentTab === 'Profile' ? '#fff' : '#6b7280',
              }}
              onClick={() => onTabChange?.('Profile')}
              onMouseOver={e => {
                if (currentTab !== 'Profile') {
                  e.currentTarget.style.background = hoverColor || '';
                }
              }}
              onMouseOut={e => {
                if (currentTab !== 'Profile') {
                  e.currentTarget.style.background = '';
                }
              }}
            >
              <User className="w-5 h-5" />
              Profile
            </Button>
            {selected !== 'Client' && (
              <Button
                variant="ghost"
                className="flex items-center gap-3 w-full justify-start pl-2 rounded-md"
                style={{
                  background:
                    currentTab === 'Reviews'
                      ? activeRole === 'provider'
                        ? accentColorDark
                        : clickedColor
                      : '',
                  color: currentTab === 'Reviews' ? '#fff' : '#6b7280',
                }}
                onClick={() => onTabChange?.('Reviews')}
                onMouseOver={e => {
                  if (currentTab !== 'Reviews') {
                    e.currentTarget.style.background = hoverColor || '';
                  }
                }}
                onMouseOut={e => {
                  if (currentTab !== 'Reviews') {
                    e.currentTarget.style.background = '';
                  }
                }}
              >
                <Star className="w-5 h-5" />
                Reviews
              </Button>
            )}
            {selected !== 'Client' && (
              <Button
                variant="ghost"
                className="flex items-center gap-3 w-full justify-start pl-2 rounded-md"
                style={{
                  background:
                    currentTab === 'MyServices'
                      ? activeRole === 'provider'
                        ? accentColorDark
                        : clickedColor
                      : '',
                  color: currentTab === 'MyServices' ? '#fff' : '#6b7280',
                }}
                onClick={() => onTabChange?.('MyServices')}
                onMouseOver={e => {
                  if (currentTab !== 'MyServices') {
                    e.currentTarget.style.background = hoverColor || '';
                  }
                }}
                onMouseOut={e => {
                  if (currentTab !== 'MyServices') {
                    e.currentTarget.style.background = '';
                  }
                }}
              >
                <Briefcase className="w-5 h-5" />
                My Services
              </Button>
            )}
            {selected !== 'Client' && (
              <Button
                variant="ghost"
                className="flex items-center gap-3 w-full justify-start pl-2 rounded-md"
                style={{
                  background:
                    currentTab === 'Earnings'
                      ? activeRole === 'provider'
                        ? accentColorDark
                        : clickedColor
                      : '',
                  color: currentTab === 'Earnings' ? '#fff' : '#6b7280',
                }}
                onClick={() => onTabChange?.('Earnings')}
                onMouseOver={e => {
                  if (currentTab !== 'Earnings') {
                    e.currentTarget.style.background = hoverColor || '';
                  }
                }}
                onMouseOut={e => {
                  if (currentTab !== 'Earnings') {
                    e.currentTarget.style.background = '';
                  }
                }}
              >
                <DollarSign className="w-5 h-5" />
                Earnings
              </Button>
            )}
            <Button
              variant="ghost"
              className="flex items-center gap-3 w-full justify-start text-gray-600 pl-2 rounded-md"
              style={{}}
              onMouseOver={e =>
                (e.currentTarget.style.background = hoverColor || '')
              }
              onMouseOut={e => (e.currentTarget.style.background = '')}
            >
              <Settings className="w-5 h-5" />
              Settings
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
      )}

      {/* Logout Section */}
      {!hideRoleToggle && (
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-red-600 pl-2 rounded-md hover:bg-red-50"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="w-5 h-5" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      )}
    </aside>
  );
}
