'use client';

import type { Session, User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '../supabase/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export type UserType = 'client' | 'provider' | 'both';
export type ActiveRole = 'client' | 'provider';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: UserType;
  phone_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  activeRole: ActiveRole;
  loading: boolean;
  switchRole: (role: ActiveRole) => void;
  sendOTP: (
    phone: string
  ) => Promise<{ success: boolean; error: string | null }>;
  verifyOTP: (
    phone: string,
    otp: string
  ) => Promise<{
    success: boolean;
    error: string | null;
    data: { userExists: boolean; user: Profile | null } | null;
  }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    userType: string
  ) => Promise<{ data: User | null; error: { message: string } | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: User | null; error: { message: string } | null }>;
  signOut: () => Promise<{ error: { message: string } | null }>;
  fetchProfile: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeRole, setActiveRole] = useState<ActiveRole>('client');
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/user/profile/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);

        // Use saved role from localStorage if available, otherwise default to client
        const savedRole = localStorage.getItem('activeRole') as ActiveRole;
        if (savedRole && (savedRole === 'client' || savedRole === 'provider')) {
          setActiveRole(savedRole);
        } else {
          // Default to client role
          setActiveRole('client');
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setActiveRole('client');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Switch between client and provider role
  const switchRole = (role: ActiveRole) => {
    // eslint-disable-next-line no-console
    console.log('✅ Switching activeRole to:', role);
    setActiveRole(role);
    localStorage.setItem('activeRole', role);
  };

  // Load active role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('activeRole') as ActiveRole;
    if (savedRole && (savedRole === 'client' || savedRole === 'provider')) {
      setActiveRole(savedRole);
    }
  }, []);

  // ============================================
  // AUTHENTICATION METHODS
  // ============================================

  const sendOTP = async (
    phone: string
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      const response = await fetch(`${API_URL}/api/user/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Failed to send OTP' };
      }

      return { success: true, error: null };
    } catch {
      return { success: false, error: 'Failed to send OTP. Please try again.' };
    }
  };

  const verifyOTP = async (
    phone: string,
    otp: string
  ): Promise<{
    success: boolean;
    error: string | null;
    data: { userExists: boolean; user: Profile | null } | null;
  }> => {
    try {
      // Step 1: Verify OTP with backend
      const response = await fetch(`${API_URL}/api/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      if (!response.ok) {
        const data = await response.json();
        return {
          success: false,
          error: data.message || 'Invalid OTP',
          data: null,
        };
      }

      const data = await response.json();

      // Step 2: If user exists, create session
      if (data.userExists && data.user) {
        const storedPhone = data.user.phone;
        const tempPassword = `HanApp${storedPhone.slice(-4)}!`;

        // Create session via backend
        const sessionResponse = await fetch(
          `${API_URL}/api/user/create-session`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: data.user.id,
              email: data.user.email,
              password: tempPassword,
            }),
          }
        );

        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();

          if (sessionData.session) {
            // Set session in Supabase client
            await supabase.auth.setSession({
              access_token: sessionData.session.access_token,
              refresh_token: sessionData.session.refresh_token,
            });

            setSession(sessionData.session);
            setUser(sessionData.user);
            await fetchProfile(sessionData.user.id);
          }
        }
      }

      return {
        success: true,
        error: null,
        data: { userExists: data.userExists, user: data.user },
      };
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        error: 'Failed to verify OTP. Please try again.',
        data: null,
      };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    userType: string
  ) => {
    try {
      // Normalize phone to +63 format
      let normalizedPhone = phone.replace(/\D/g, '');
      if (normalizedPhone.startsWith('0')) {
        normalizedPhone = `+63${normalizedPhone.substring(1)}`;
      } else if (!normalizedPhone.startsWith('63')) {
        normalizedPhone = `+63${normalizedPhone}`;
      } else {
        normalizedPhone = `+${normalizedPhone}`;
      }

      const response = await fetch(`${API_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
          phone: normalizedPhone,
          userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null,
          error: { message: data.message || 'Failed to sign up' },
        };
      }

      // After successful signup, sign in to establish session
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        return {
          data: null,
          error: {
            message:
              'Account created but failed to sign in. Please try logging in.',
          },
        };
      }

      if (signInData.session) {
        setSession(signInData.session);
        setUser(signInData.session.user);
        await fetchProfile(signInData.session.user.id);
      }

      return { data: data.user, error: null };
    } catch {
      return {
        data: null,
        error: { message: 'Failed to sign up. Please try again.' },
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null,
          error: { message: data.message || 'Failed to sign in' },
        };
      }

      // Set session from backend response
      if (data.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        setSession(data.session);
        setUser(data.user);
        await fetchProfile(data.user.id);
      }

      return { data: data.user, error: null };
    } catch {
      return {
        data: null,
        error: { message: 'Failed to sign in. Please try again.' },
      };
    }
  };

  const signOut = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/logout`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        return { error: { message: data.message || 'Failed to sign out' } };
      }

      await supabase.auth.signOut();
      localStorage.removeItem('activeRole');

      return { error: null };
    } catch {
      return { error: { message: 'Failed to sign out. Please try again.' } };
    }
  };

  const value = {
    user,
    session,
    profile,
    activeRole,
    loading,
    switchRole,
    sendOTP,
    verifyOTP,
    signUp,
    signIn,
    signOut,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
