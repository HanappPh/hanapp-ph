# Supabase Setup Guide

## Overview

This project uses Supabase as the backend platform, providing:

- PostgreSQL database
- Authentication
- Row Level Security (RLS)
- Real-time subscriptions
- Storage (for future use)

## Prerequisites

- Supabase account (https://supabase.com)
- Project created in Supabase dashboard

## Environment Variables

Your `.env.local` files in both `apps/web` and `apps/landing` should contain:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Setup

### 1. Run the Initial Migration

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and run the SQL

This will create:

- **profiles** - User profiles (extends auth.users)
- **categories** - Service categories
- **services** - Provider services
- **bookings** - Client bookings
- **reviews** - Service reviews
- **messages** - Chat messages

### 2. Verify Row Level Security (RLS)

All tables have RLS enabled. Check in **Authentication** > **Policies** to ensure policies are active.

## Client Usage

### Client-side (React Components)

```typescript
import { supabase } from '@/lib/supabase/client';

// Example: Fetch services
const { data, error } = await supabase
  .from('services')
  .select('*')
  .eq('is_active', true);
```

### Server-side (Server Components, API Routes)

```typescript
import { createServerClient } from '@/lib/supabase/server';

// Example: Fetch user profile
const supabase = await createServerClient();
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();
```

## Authentication

### Using the useAuth Hook

```typescript
import { useAuth } from '@/lib/hooks/useAuth';

function MyComponent() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;

  return <div>Welcome {user.email}</div>;
}
```

### Sign Up

```typescript
const { data, error } = await signUp('email@example.com', 'password', {
  full_name: 'John Doe',
});
```

### Sign In

```typescript
const { data, error } = await signIn('email@example.com', 'password');
```

### Sign Out

```typescript
const { error } = await signOut();
```

## Database Schema

### Profiles

- Extends Supabase auth.users
- Stores additional user info (name, phone, avatar, user_type)
- Auto-created when user signs up

### Services

- Created by providers
- Linked to categories
- Includes pricing, availability, and service areas

### Bookings

- Links clients to provider services
- Tracks status (pending, confirmed, completed, etc.)

### Reviews

- Clients can review completed bookings
- Updates service rating automatically

### Messages

- Real-time chat between clients and providers
- Linked to bookings

## Common Queries

### Fetch All Active Services

```typescript
const { data: services } = await supabase
  .from('services')
  .select(
    `
    *,
    provider:profiles!provider_id(*),
    category:categories(*)
  `
  )
  .eq('is_active', true);
```

### Create a Booking

```typescript
const { data, error } = await supabase.from('bookings').insert({
  service_id: serviceId,
  client_id: user.id,
  provider_id: providerId,
  scheduled_date: new Date().toISOString(),
  total_price: 500,
});
```

### Fetch User's Bookings

```typescript
const { data: bookings } = await supabase
  .from('bookings')
  .select(
    `
    *,
    service:services(*),
    provider:profiles!provider_id(*)
  `
  )
  .eq('client_id', user.id)
  .order('created_at', { ascending: false });
```

## Real-time Subscriptions

Listen to changes in real-time:

```typescript
const channel = supabase
  .channel('messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `receiver_id=eq.${user.id}`,
    },
    payload => {
      console.log('New message:', payload);
    }
  )
  .subscribe();

// Cleanup
channel.unsubscribe();
```

## Storage (Optional)

For user avatars and service images:

1. Create a bucket in **Storage** section
2. Set up RLS policies
3. Upload files:

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${user.id}/avatar.png`, file);
```

## Testing

Use Supabase local development for testing:

```bash
npx supabase init
npx supabase start
npx supabase db push
```

## Troubleshooting

### RLS Errors

If you get "row-level security" errors:

- Check that policies are enabled
- Verify user is authenticated
- Check policy conditions match your query

### Connection Issues

- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure network allows connections to Supabase

### Type Errors

- Update `types/supabase.ts` after schema changes
- Run TypeScript checks: `npm run typecheck`

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
