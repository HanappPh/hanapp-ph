# Authentication System Documentation

## Overview

HanApp PH uses a professional, multi-step authentication system with:

- **Phone verification** via Semaphore SMS OTP
- **Email/password authentication** via Supabase
- **Protected routes** with automatic redirects
- **Session management** with secure cookies
- **NestJS Backend API** - All auth logic is in the backend

---

## Architecture

### Backend (NestJS API - `apps/api`)

**User Module Structure:**

```
apps/api/src/app/
├── user/
│   ├── user.controller.ts    # User/Auth endpoints
│   ├── user.service.ts        # User/Auth business logic
│   ├── user.module.ts         # User module
│   └── dto/
│       └── user.dto.ts        # Validation DTOs
├── services/
│   ├── semaphore.service.ts   # SMS OTP service
│   └── supabase.service.ts    # Supabase client
└── app.module.ts              # Main app module
```

**API Base URL:** `http://localhost:3001/api`

### Frontend (Next.js - `apps/web`)

**Auth Components:**

- `middleware.ts` - Protects routes automatically
- `lib/hooks/useAuth.ts` - React hook that calls backend API
- `app/(public)/auth/signup/page.tsx` - Sign up flow
- `app/(public)/auth/signin/page.tsx` - Sign in page

---

## API Endpoints

All endpoints are prefixed with `/api/user`

### `POST /api/user/send-otp`

Send OTP verification code via SMS

**Request:**

```json
{
  "phone": "09171234567"
}
```

**Response:**

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### `POST /api/user/verify-otp`

Verify OTP code

**Request:**

```json
{
  "phone": "09171234567",
  "otp": "123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

### `POST /api/user/signup`

Create new account

**Request:**

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "Juan Dela Cruz",
  "phone": "09171234567",
  "userType": "client"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Account created successfully",
  "user": { ... }
}
```

### `POST /api/user/login`

Sign in user

**Request:**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Logged in successfully",
  "user": { ... },
  "session": { ... }
}
```

### `POST /api/user/logout`

Sign out user

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### `GET /api/user/profile/:userId`

Get user profile by ID

**Response:**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "Juan Dela Cruz",
  "phone": "09171234567",
  "user_type": "client",
  ...
}
```

### `PATCH /api/user/profile/:userId`

Update user profile

**Request:**

```json
{
  "full_name": "Juan P. Dela Cruz",
  "bio": "Software Developer",
  "location": "Manila, Philippines"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## Using the Auth Hook

```typescript
import { useAuth } from '@/lib/hooks/useAuth';

function MyComponent() {
  const { user, loading, signIn, signUp, signOut, sendOTP, verifyOTP } = useAuth();

  // Check if user is logged in
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  // Use auth functions
  const handleLogin = async () => {
    const result = await signIn('email@example.com', 'password');
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return <div>Welcome {user.email}</div>;
}
```

---

## Database Schema

### `users` Table

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('client', 'provider', 'both')),
  phone_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `otp_verifications` Table

```sql
CREATE TABLE public.otp_verifications (
  id UUID PRIMARY KEY,
  phone TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Semaphore SMS Configuration

### Environment Variables

```bash
SEMAPHORE_API_KEY=your-semaphore-api-key
```

### SMS Message Format

```
Your HanApp verification code is: 123456. Valid for 5 minutes. Do not share this code.
```

### Phone Number Formats Supported

- `09171234567` (with leading 0)
- `9171234567` (without leading 0)
- `+639171234567` (international format)
- `639171234567` (country code without +)

All formats are automatically converted to `639XXXXXXXXX` format for Semaphore.

---

## Security Features

1. **Row Level Security (RLS)** - All database tables have RLS policies
2. **HTTP-Only Cookies** - Session stored in secure cookies
3. **OTP Expiration** - Codes expire after 5 minutes
4. **Attempt Limiting** - Max 5 OTP verification attempts
5. **Phone Verification** - Required before account creation
6. **Password Requirements** - Minimum 8 characters
7. **Middleware Protection** - Server-side route protection

---

## Testing

### Test Phone Numbers (Development)

For development, you can use test phone numbers that don't actually send SMS:

1. Update `semaphore.ts` to include a test mode:

```typescript
const TEST_MODE = process.env.NODE_ENV === 'development';
const TEST_OTP = '123456';

if (TEST_MODE && phone.startsWith('0900')) {
  // Return success without sending SMS
  return { success: true, message: 'Test OTP: 123456' };
}
```

### Manual Testing Steps

1. Go to `/auth/signup`
2. Enter phone: `09001234567` (test number)
3. Use OTP: `123456`
4. Complete registration form
5. Should redirect to home page

---

## Troubleshooting

### "Phone number not verified"

- Ensure OTP was verified before calling signup
- Check `otp_verifications` table for verified=true record

### "Invalid OTP"

- Check OTP hasn't expired (5 min limit)
- Verify correct phone number format
- Check attempts count (max 5)

### Middleware redirect loops

- Check Supabase environment variables are set
- Verify cookies are enabled in browser
- Check middleware matcher patterns

### Semaphore SMS not sending

- Verify `SEMAPHORE_API_KEY` is set
- Check phone number format
- Check Semaphore account balance
- Review Semaphore API logs

---

## Production Checklist

- [ ] Update Supabase production credentials
- [ ] Set production Semaphore API key
- [ ] Enable Supabase email confirmation (optional)
- [ ] Configure password reset flow
- [ ] Set up monitoring for auth failures
- [ ] Add rate limiting on auth endpoints
- [ ] Review and test all RLS policies
- [ ] Set secure cookie options in production
- [ ] Configure CORS properly
- [ ] Add logging for security events

---

## Future Enhancements

- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Remember me functionality
- [ ] Password strength meter
- [ ] Account email verification
- [ ] Magic link login
- [ ] Biometric authentication support
