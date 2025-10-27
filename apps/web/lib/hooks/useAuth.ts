'use client';

import type { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from '../supabase/client';

// API URL from environment or default to localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export type UserType = 'client' | 'provider' | 'both';
export type ActiveRole = 'client' | 'provider';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  user_type?: UserType;
  phone_verified?: boolean;
  avatar_url?: string;
  created_at?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeRole, setActiveRole] = useState<ActiveRole>('client');

  // Fetch user profile from database
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data);
        // Set active role based on user_type
        if (data.user_type === 'provider') {
          setActiveRole('provider');
        } else {
          setActiveRole('client');
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Get initial session
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
    if (profile?.user_type === 'both' || profile?.user_type === role) {
      setActiveRole(role);
      // Persist to localStorage
      localStorage.setItem('activeRole', role);
    }
  };

  // Load active role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('activeRole') as ActiveRole;
    if (
      savedRole &&
      (profile?.user_type === 'both' || profile?.user_type === savedRole)
    ) {
      setActiveRole(savedRole);
    }
  }, [profile]);

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

      // Refresh session
      await supabase.auth.refreshSession();

      return { data: data.user, error: null };
    } catch {
      return {
        data: null,
        error: { message: 'Failed to sign in. Please try again.' },
      };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    phone: string,
    metadata?: { full_name?: string; user_type?: UserType }
  ) => {
    try {
      const response = await fetch(`${API_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          phone,
          fullName: metadata?.full_name,
          userType: metadata?.user_type || 'client',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null,
          error: { message: data.message || 'Failed to sign up' },
        };
      }

      // After successful signup, refresh the session to log the user in
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        setSession(sessionData.session);
        setUser(sessionData.session.user);
        await fetchProfile(sessionData.session.user.id);
      }

      return { data: data.user, error: null };
    } catch {
      return {
        data: null,
        error: { message: 'Failed to sign up. Please try again.' },
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

      // Clear local session
      await supabase.auth.signOut();
      localStorage.removeItem('activeRole');

      return { error: null };
    } catch {
      return { error: { message: 'Failed to sign out. Please try again.' } };
    }
  };

  const sendOTP = async (phone: string) => {
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

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      const response = await fetch(`${API_URL}/api/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Failed to verify OTP',
          data: null,
        };
      }

      return { success: true, error: null, data };
    } catch {
      return {
        success: false,
        error: 'Failed to verify OTP. Please try again.',
        data: null,
      };
    }
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  };

  return {
    user,
    session,
    loading,
    profile,
    activeRole,
    switchRole,
    signIn,
    signUp,
    signOut,
    sendOTP,
    verifyOTP,
    resetPassword,
  };
}
