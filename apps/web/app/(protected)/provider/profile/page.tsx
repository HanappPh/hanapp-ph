'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import { MainContent } from '../../../../components/profile/profile-content';
import { ProfileEarningsContent } from '../../../../components/profile/profile-earnings-content';
import { ReviewsContent } from '../../../../components/profile/profile-reviews-content';
import { ProfileWorkContent } from '../../../../components/profile/profile-work-content';
import type { ServiceListingResponse } from '../../../../lib/api/serviceListings';
import { useAuth } from '../../../../lib/hooks/useAuth';
import { supabase } from '../../../../lib/supabase/client';
import type { Profile } from '../../../../types/profiletype';

export default function ProfilePage() {
  const [currentTab, setCurrentTab] = React.useState('Profile');
  const {
    profile: authProfile,
    activeRole,
    switchRole,
    updateProfileAvatar,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get('id');
  const targetProviderId = providerId || authProfile?.id;
  const isViewingOtherProvider = Boolean(providerId);

  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [listings, setListings] = React.useState<ServiceListingResponse[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [currentAvatarUrl, setCurrentAvatarUrl] =
    React.useState('/profile-pic.png');
  const [currentCoverUrl, setCurrentCoverUrl] = React.useState(
    '/house-cleaning-service.png'
  );
  const [isUploadingAvatar, setIsUploadingAvatar] = React.useState(false);
  const [isUploadingCover, setIsUploadingCover] = React.useState(false);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);

  const availableTabs = React.useMemo(
    () =>
      isViewingOtherProvider
        ? ['Profile', 'Reviews']
        : ['Profile', 'Reviews', 'Services', 'Earnings', 'Settings'],
    [isViewingOtherProvider]
  );

  React.useEffect(() => {
    const loadProviderProfile = async () => {
      if (!targetProviderId) {
        setProfile(authProfile || null);
        setListings([]);
        return;
      }

      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (providerId) {
          const response = await fetch(`${apiUrl}/api/user/${providerId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            const providerData = await response.json();
            setProfile(providerData);
          }
        } else {
          setProfile(authProfile || null);
        }

        const listingsResponse = await fetch(
          `${apiUrl}/api/service-listings?providerId=${targetProviderId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (listingsResponse.ok) {
          const listingsData = await listingsResponse.json();
          setListings(listingsData);
        }
      } catch (error) {
        console.error('Failed to load provider profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProviderProfile();
  }, [providerId, targetProviderId, authProfile]);

  React.useEffect(() => {
    setCurrentAvatarUrl(profile?.avatar_url || '/profile-pic.png');
  }, [profile?.avatar_url]);

  React.useEffect(() => {
    setCurrentCoverUrl(
      profile?.cover_photo_url || '/house-cleaning-service.png'
    );
  }, [profile?.cover_photo_url]);

  React.useEffect(() => {
    if (!availableTabs.includes(currentTab)) {
      setCurrentTab('Profile');
    }
  }, [availableTabs, currentTab]);

  const handleRoleSwitch = (role: 'client' | 'provider') => {
    if (activeRole === role) {
      return;
    }

    switchRole(role);
    router.push(role === 'provider' ? '/provider/profile' : '/profile');
  };

  const uploadToStorage = async (file: File, folder: 'avatars' | 'covers') => {
    if (!profile?.id) {
      throw new Error('User profile not loaded');
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
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

  const patchProfileImageField = async (
    field: 'avatar_url' | 'cover_photo_url',
    value: string
  ) => {
    if (!profile?.id) {
      throw new Error('Profile not loaded');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const session = await supabase.auth.getSession();

    const response = await fetch(`${apiUrl}/api/user/profile/${profile.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.data.session?.access_token}`,
      },
      body: JSON.stringify({ [field]: value }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${field}`);
    }
  };

  const onAvatarFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !profile?.id || isViewingOtherProvider) {
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
      await patchProfileImageField('avatar_url', publicUrl);
      await removeOldStoredImage(currentAvatarUrl);

      setCurrentAvatarUrl(publicUrl);
      setProfile(prev => (prev ? { ...prev, avatar_url: publicUrl } : prev));

      if (!providerId) {
        updateProfileAvatar(publicUrl);
      }
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
    if (!file || !profile?.id || isViewingOtherProvider) {
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
      await patchProfileImageField('cover_photo_url', publicUrl);
      await removeOldStoredImage(currentCoverUrl);

      setCurrentCoverUrl(publicUrl);
      setProfile(prev =>
        prev ? { ...prev, cover_photo_url: publicUrl } : prev
      );
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

  if (loading) {
    return (
      <div className="bg-[#F3F5F9] flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#102E50]"></div>
      </div>
    );
  }

  const displayName = profile?.full_name || 'User';
  return (
    <div className="min-h-screen bg-[#F3F5F9] flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto px-0 md:px-4">
        <section className="bg-white border border-gray-200 rounded-b-lg overflow-hidden">
          <div
            className={`relative h-44 md:h-72 w-full overflow-hidden ${
              isViewingOtherProvider ? '' : 'group cursor-pointer'
            }`}
            onClick={() => {
              if (!isViewingOtherProvider && !isUploadingCover && profile?.id) {
                coverInputRef.current?.click();
              }
            }}
          >
            <Image
              src={currentCoverUrl}
              alt="Profile cover"
              fill
              className="object-cover"
              priority
            />
            {!isViewingOtherProvider && (
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black/35 transition-opacity ${
                  isUploadingCover
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <Camera className="w-8 h-8 text-white" />
              </div>
            )}
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
                  className={`relative w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden bg-white ${
                    isViewingOtherProvider ? '' : 'group cursor-pointer'
                  }`}
                  onClick={() => {
                    if (
                      !isViewingOtherProvider &&
                      !isUploadingAvatar &&
                      profile?.id
                    ) {
                      avatarInputRef.current?.click();
                    }
                  }}
                >
                  <Image
                    src={currentAvatarUrl}
                    alt="Profile avatar"
                    fill
                    className="object-cover"
                  />
                  {!isViewingOtherProvider && (
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-black/35 transition-opacity ${
                        isUploadingAvatar
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Camera className="w-7 h-7 text-white" />
                    </div>
                  )}
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
              {!isViewingOtherProvider && (
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
              )}
            </div>

            <div className="mt-6 border-b border-gray-200 overflow-x-auto">
              <div className="flex items-center justify-center md:justify-start gap-4 md:gap-8 min-w-max">
                {availableTabs.map(tab => {
                  const isActive = currentTab === tab;
                  return (
                    <button
                      key={tab}
                      className={`px-1 md:px-2 py-3 md:py-4 font-medium text-sm md:text-base border-b-2 transition-colors ${
                        isActive
                          ? 'border-[#2563eb] text-[#2563eb]'
                          : 'border-transparent text-gray-600 hover:text-[#102E50]'
                      }`}
                      onClick={() => setCurrentTab(tab)}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="transform-gpu origin-top scale-[0.97] sm:scale-[0.985] md:scale-100">
            {currentTab === 'Profile' ? (
              <MainContent
                initialSelected="Provider"
                profile={profile}
                hideEditButtons={isViewingOtherProvider}
                embedded
                providerListings={isViewingOtherProvider ? listings : undefined}
                servicePreferenceListings={listings}
              />
            ) : currentTab === 'Reviews' ? (
              <ReviewsContent
                initialSelected="Provider"
                providerId={profile?.id || providerId || undefined}
                embedded
              />
            ) : currentTab === 'Services' ? (
              <ProfileWorkContent
                role="Provider"
                serviceListings={listings}
                embedded
              />
            ) : currentTab === 'Earnings' ? (
              <ProfileEarningsContent embedded />
            ) : (
              <MainContent
                initialSelected="Provider"
                profile={profile}
                hideEditButtons={isViewingOtherProvider}
                embedded
                providerListings={isViewingOtherProvider ? listings : undefined}
                servicePreferenceListings={listings}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
