'use client';

import type { Session, User } from '@supabase/supabase-js';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { Profile } from '../../types/profiletype';
import { getApiBaseUrl } from '../api/baseUrl';
import { supabase } from '../supabase/client';

const API_BASE_URL = getApiBaseUrl();

export type UserType = 'client' | 'provider' | 'both';
export type ActiveRole = 'client' | 'provider';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  activeRole: ActiveRole;
  /** True once activeRole has been definitively resolved (localStorage + profile). Use
   *  this anywhere you need to gate role-sensitive rendering to avoid flashes. */
  roleReady: boolean;
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
  fetchProfile: (userId: string) => Promise<Profile | null>;
  /** Immediately updates the avatar_url in the in-memory profile so every
   *  component that reads `profile` (navbar, sidebar, etc.) re-renders without
   *  needing a full page reload. */
  updateProfileAvatar: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeRole, setActiveRole] = useState<ActiveRole>('client');
  /** Flips to true once switchRole is called or the initial role has been resolved. */
  const [roleReady, setRoleReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tracks whether we are already processing a session change, preventing
  // the duplicate calls that arise from getSession() + onAuthStateChange(INITIAL_SESSION).
  const sessionHandledRef = useRef(false);

  // ─── Profile fetch (pure data – does NOT touch activeRole) ───────────────────
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      const token = currentSession?.access_token;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/user/profile/${userId}`,
        {
          headers,
        }
      );

      if (response.ok) {
        const data: Profile = await response.json();
        setProfile(data);
        return data;
      } else {
        console.error(
          'Failed to fetch profile:',
          response.status,
          response.statusText
        );
        return null;
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      return null;
    }
  };

  // ─── Role determination (single source of truth) ─────────────────────────────
  // Priority: localStorage > user_type from DB > default 'client'
  const determineRole = (profileData: Profile | null) => {
    const savedRole = localStorage.getItem('activeRole') as ActiveRole | null;

    if (savedRole === 'client' || savedRole === 'provider') {
      // Guard: a pure 'client' user_type must not be stuck in provider mode
      if (profileData?.user_type === 'client' && savedRole === 'provider') {
        localStorage.setItem('activeRole', 'client');
        setActiveRole('client');
      } else {
        setActiveRole(savedRole);
      }
    } else if (profileData?.user_type === 'provider') {
      // First login ever: default providers to provider mode
      localStorage.setItem('activeRole', 'provider');
      setActiveRole('provider');
    } else {
      setActiveRole('client');
    }

    setRoleReady(true);
  };

  // ─── Auth initialisation ─────────────────────────────────────────────────────
  // We use onAuthStateChange as the single source of truth.
  // getSession() is kept only as a fast-path to avoid an extra round-trip on
  // first load; the sessionHandledRef guard prevents the double-execution that
  // would otherwise occur when onAuthStateChange also fires INITIAL_SESSION.
  useEffect(() => {
    let isMounted = true;

    const handleSession = async (sess: Session | null) => {
      if (!isMounted) {
        return;
      }

      setSession(sess);
      setUser(sess?.user ?? null);

      if (sess?.user) {
        const profileData = await fetchProfile(sess.user.id);
        if (!isMounted) {
          return;
        }
        determineRole(profileData);
      } else {
        setProfile(null);
        setActiveRole('client');
        setRoleReady(true);
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    // Eagerly check the current session so we don't have to wait for the
    // onAuthStateChange INITIAL_SESSION event (avoids a perceptible flash).
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (!sessionHandledRef.current) {
        sessionHandledRef.current = true;
        handleSession(sess);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, sess) => {
      if (!isMounted) {
        return;
      }

      // INITIAL_SESSION is already handled by getSession() above.
      // Skip it only when we have already processed the eager check.
      if (event === 'INITIAL_SESSION' && sessionHandledRef.current) {
        return;
      }

      // TOKEN_REFRESHED: session rotated but user hasn't changed — just keep
      // the session object up-to-date without re-fetching the profile.
      if (event === 'TOKEN_REFRESHED') {
        setSession(sess);
        return;
      }

      // All other events (SIGNED_IN, SIGNED_OUT, USER_UPDATED, etc.)
      sessionHandledRef.current = true;

      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setProfile(null);
        setActiveRole('client');
        setRoleReady(true);
        setLoading(false);
        return;
      }

      handleSession(sess);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Avatar update (in-memory only, no refetch needed) ─────────────────────
  const updateProfileAvatar = (avatarUrl: string) => {
    setProfile(prev => (prev ? { ...prev, avatar_url: avatarUrl } : prev));
  };

  // ─── Role switching ───────────────────────────────────────────────────────────
  const switchRole = (role: ActiveRole) => {
    setActiveRole(role);
    setRoleReady(true);
    localStorage.setItem('activeRole', role);
  };

  // ============================================
  // AUTHENTICATION METHODS
  // ============================================

  const sendOTP = async (
    phone: string
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/send-otp`, {
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
      const response = await fetch(`${API_BASE_URL}/api/user/verify-otp`, {
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
          `${API_BASE_URL}/api/user/create-session`,
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
            const profileData = await fetchProfile(sessionData.user.id);
            determineRole(profileData);
            // Mark session as handled so the onAuthStateChange SIGNED_IN event
            // that fires next doesn't re-run fetchProfile + determineRole.
            sessionHandledRef.current = true;
            setLoading(false);
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

      const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
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
        const profileData = await fetchProfile(signInData.session.user.id);
        determineRole(profileData);
        sessionHandledRef.current = true;
        setLoading(false);
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
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
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
        const profileData = await fetchProfile(data.user.id);
        determineRole(profileData);
        sessionHandledRef.current = true;
        setLoading(false);
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
      // Get the current session to extract the access token
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      const token = currentSession?.access_token;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/user/logout`, {
        method: 'POST',
        headers,
      });

      if (!response.ok) {
        const data = await response.json();
        return { error: { message: data.message || 'Failed to sign out' } };
      }

      await supabase.auth.signOut();
      localStorage.removeItem('activeRole');
      sessionHandledRef.current = false;

      // Redirect to home page after successful logout
      window.location.href = '/';

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
    roleReady,
    loading,
    switchRole,
    sendOTP,
    verifyOTP,
    signUp,
    signIn,
    signOut,
    fetchProfile,
    updateProfileAvatar,
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
