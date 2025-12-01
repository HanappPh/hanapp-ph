import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Use placeholder values during build/SSR/tests when env vars aren't available
// The actual values will be used at runtime in the browser
// Only throw error in browser context when vars are missing
const isTest =
  process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined;
if (
  typeof window !== 'undefined' &&
  !isTest &&
  (!supabaseUrl || !supabaseAnonKey)
) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createBrowserClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
