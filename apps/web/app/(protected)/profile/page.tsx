'use client';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { MainContent } from '../../../components/profile/profile-content';
import { ReviewsContent } from '../../../components/profile/profile-reviews-content';
import { useAuth } from '../../../lib/hooks/useAuth';
import { supabase } from '../../../lib/supabase/client';

export default function ProfilePage() {
  const [currentDesktopTab, setCurrentDesktopTab] = React.useState('Profile');
  const { profile, activeRole, switchRole, updateProfileAvatar } = useAuth();
  const router = useRouter();
  const [currentAvatarUrl, setCurrentAvatarUrl] = React.useState(
    profile?.avatar_url || '/profile-pic.png'
  );
  const [currentCoverUrl, setCurrentCoverUrl] = React.useState(
    profile?.cover_photo_url || '/house-cleaning-service.png'
  );
  const [isUploadingAvatar, setIsUploadingAvatar] = React.useState(false);
  const [isUploadingCover, setIsUploadingCover] = React.useState(false);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);

  // Convert activeRole to the format expected by Sidebar
  const initialSelected = activeRole === 'provider' ? 'Provider' : 'Client';
  const availableTabs = React.useMemo(
    () =>
      initialSelected === 'Provider'
        ? ['Profile', 'Reviews', 'My Services', 'Earnings', 'Settings']
        : ['Profile', 'Settings', 'Payment Settings'],
    [initialSelected]
  );

  React.useEffect(() => {
    setCurrentAvatarUrl(profile?.avatar_url || '/profile-pic.png');
  }, [profile?.avatar_url]);

  React.useEffect(() => {
    setCurrentCoverUrl(
      profile?.cover_photo_url || '/house-cleaning-service.png'
    );
  }, [profile?.cover_photo_url]);

  React.useEffect(() => {
    if (!availableTabs.includes(currentDesktopTab)) {
      setCurrentDesktopTab('Profile');
    }
  }, [availableTabs, currentDesktopTab]);

  const handleRoleSwitch = (role: 'client' | 'provider') => {
    if (activeRole === role) {
      return;
    }

    switchRole(role);
    router.push(role === 'provider' ? '/provider/profile' : '/profile');
  };

  const uploadToStorage = async (file: File, folder: 'avatars' | 'covers') => {
    const userId = profile?.id;
    if (!userId) {
      throw new Error('User profile not loaded');
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const removeOldStoredImage = async (url?: string) => {
    if (!url || !url.includes('/avatars/')) {
      return;
    }

    const oldPath = url.split('/avatars/')[1];
    if (!oldPath) {
      return;
    }

    await supabase.storage.from('avatars').remove([oldPath]);
  };

  const onAvatarFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !profile?.id) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const publicUrl = await uploadToStorage(file, 'avatars');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const session = await supabase.auth.getSession();

      const response = await fetch(`${apiUrl}/api/user/profile/${profile.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify({
          avatar_url: publicUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update avatar.');
      }

      await removeOldStoredImage(currentAvatarUrl);
      setCurrentAvatarUrl(publicUrl);
      updateProfileAvatar(publicUrl);
    } catch (error) {
      console.error('Avatar upload error:', error);
      alert('Failed to upload avatar. Please try again.');
    } finally {
      setIsUploadingAvatar(false);
      if (avatarInputRef.current) {
        avatarInputRef.current.value = '';
      }
    }
  };

  const onCoverFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !profile?.id) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setIsUploadingCover(true);
    try {
      const publicUrl = await uploadToStorage(file, 'covers');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const session = await supabase.auth.getSession();

      const response = await fetch(`${apiUrl}/api/user/profile/${profile.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify({
          cover_photo_url: publicUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cover photo.');
      }

      await removeOldStoredImage(currentCoverUrl);
      setCurrentCoverUrl(publicUrl);
    } catch (error) {
      console.error('Cover upload error:', error);
      alert('Failed to upload cover photo. Please try again.');
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) {
        coverInputRef.current.value = '';
      }
    }
  };

  const displayName = profile?.full_name || 'User';
  return (
    <div className="min-h-screen bg-[#F3F5F9] flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto px-0 md:px-4">
        <section className="bg-white border border-gray-200 rounded-b-lg overflow-hidden">
          <div
            className="relative h-44 md:h-72 w-full overflow-hidden group cursor-pointer"
            onClick={() =>
              !isUploadingCover && profile?.id && coverInputRef.current?.click()
            }
          >
            <Image
              src={currentCoverUrl}
              alt="Profile cover"
              fill
              className="object-cover"
              priority
            />
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/35 transition-opacity ${
                isUploadingCover
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onCoverFileChange}
            />
          </div>

          <div className="px-4 md:px-8 pb-4 md:pb-0">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-12 md:-mt-16 gap-4">
              <div className="flex flex-col items-center text-center md:flex-row md:items-end md:text-left gap-3 md:gap-4">
                <div
                  className="relative w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden bg-white group cursor-pointer"
                  onClick={() =>
                    !isUploadingAvatar &&
                    profile?.id &&
                    avatarInputRef.current?.click()
                  }
                >
                  <Image
                    src={currentAvatarUrl}
                    alt="Profile avatar"
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/35 transition-opacity ${
                      isUploadingAvatar
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Camera className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="pb-1 md:pb-2">
                  <h1 className="text-2xl md:text-4xl font-semibold text-[#102E50]">
                    {displayName}
                  </h1>
                  <p className="text-gray-600 text-base md:text-lg">
                    Bacoor, Cavite
                  </p>
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onAvatarFileChange}
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-full p-1 self-center md:self-auto">
                <button
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeRole === 'provider'
                      ? 'bg-[#F5C45E] text-[#102E50]'
                      : 'text-gray-600'
                  }`}
                  onClick={() => handleRoleSwitch('provider')}
                  type="button"
                >
                  Provider
                </button>
                <button
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeRole === 'client'
                      ? 'bg-[#102E50] text-white'
                      : 'text-gray-600'
                  }`}
                  onClick={() => handleRoleSwitch('client')}
                  type="button"
                >
                  Client
                </button>
              </div>
            </div>

            <div className="mt-6 border-b border-gray-200 overflow-x-auto">
              <div className="flex items-center justify-center md:justify-start gap-4 md:gap-8 min-w-max">
                {availableTabs.map(tab => {
                  const isActive = currentDesktopTab === tab;
                  return (
                    <button
                      key={tab}
                      className={`px-1 md:px-2 py-3 md:py-4 font-medium text-sm md:text-base border-b-2 transition-colors ${
                        isActive
                          ? 'border-[#2563eb] text-[#2563eb]'
                          : 'border-transparent text-gray-600 hover:text-[#102E50]'
                      }`}
                      onClick={() => setCurrentDesktopTab(tab)}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="transform-gpu origin-top scale-[0.97] sm:scale-[0.985] md:scale-100">
            {currentDesktopTab === 'Profile' ? (
              <MainContent
                initialSelected={initialSelected}
                profile={profile}
                embedded
              />
            ) : currentDesktopTab === 'Reviews' ? (
              <ReviewsContent initialSelected={initialSelected} embedded />
            ) : (
              <MainContent
                initialSelected={initialSelected}
                profile={profile}
                embedded
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
