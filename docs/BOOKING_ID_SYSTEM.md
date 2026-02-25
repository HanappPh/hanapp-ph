# Booking ID System

## Overview

The booking ID system provides unique identifiers for all bookings in the platform, whether they originate from:

- **Client-initiated service requests** (client books a provider's service)
- **Provider applications to job listings** (provider applies for a client's job posting)

## Booking ID Format

```
BK-YYYYMMDD-XXXXXX
```

- **BK**: Prefix identifying this as a booking
- **YYYYMMDD**: Date of booking creation (e.g., 20240125)
- **XXXXXX**: 6-character random alphanumeric string (uppercase)

**Example**: `BK-20240125-A3F9K2`

## Database Implementation

### Tables with Booking IDs

1. **`service_requests`** - Client-initiated bookings
2. **`job_applications`** - Provider applications to job listings

Both tables have:

- `booking_id` column (TEXT, UNIQUE, NOT NULL)
- Automatic generation via database triggers
- Indexed for fast lookups

### Migration File

Location: `supabase/migrations/005_add_booking_ids.sql`

The migration includes:

- Function to generate unique booking IDs
- Added `booking_id` columns to both tables
- Triggers to auto-generate booking IDs on insert
- Backfill for existing records
- Indexes for performance

### How It Works

1. **Insert**: When a new record is created, the trigger automatically generates a unique booking ID
2. **Uniqueness**: The generator checks both tables to ensure no duplicates
3. **Automatic**: No application code changes needed - works transparently

## Usage

### Frontend (TypeScript)

The `BookingDetails` interface includes the booking ID:

```typescript
interface BookingDetails {
  id: number | string;
  bookingId?: string; // Generated booking ID
  // ... other fields
}
```

### API Response

Booking IDs are automatically included in API responses:

**Service Requests:**

```json
{
  "id": "uuid-here",
  "booking_id": "BK-20240125-A3F9K2",
  "title": "House Cleaning",
  "rate": 500
  // ... other fields
}
```

**Job Applications:**

```json
{
  "id": "uuid-here",
  "booking_id": "BK-20240125-B7K3M9",
  "service_request_id": "uuid-here",
  "status": "pending"
  // ... other fields
}
```

### UI Display

Booking IDs are displayed on booking cards in a monospace font for easy reading:

```tsx
{
  booking.bookingId && (
    <p className="text-xs text-gray-500 font-mono">
      Booking ID: {booking.bookingId}
    </p>
  );
}
```

## Benefits

1. **Tracking**: Easy reference for customer support and tracking
2. **Unique**: Guaranteed unique across all booking types
3. **Human-Readable**: Format is easy to read and communicate
4. **Searchable**: Can search by booking ID in admin panels
5. **Consistent**: Same format for both service requests and applications

## Running the Migration

### Step 1: Copy SQL to Supabase

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/005_add_booking_ids.sql`
4. Paste into the SQL Editor
5. Click **Run**

### Step 2: Verify

After running the migration, verify with:

```sql
-- Check that booking_id columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name IN ('service_requests', 'job_applications')
  AND column_name = 'booking_id';

-- Check sample booking IDs
SELECT booking_id, title FROM service_requests LIMIT 5;
SELECT booking_id, status FROM job_applications LIMIT 5;
```

### Step 3: Deploy API Changes

The API has been updated to include `booking_id` in responses. Deploy the updated API:

```bash
# Build the API
cd apps/api
npm run build

# Or redeploy if using a platform like Railway
```

## API Updates

### Modified Files

- `apps/api/src/app/job-application/job-application.service.ts`
  - Added `booking_id` to select queries

### No Changes Required

Service request queries use `select('*')` so they automatically include the new column.

## Frontend Updates

### Modified Files

- `apps/web/app/(protected)/bookings/page.tsx`
  - Added `bookingId` to `BookingDetails` interface
  - Updated transformations to include booking IDs from API

- `apps/web/components/booking/booking-cards.tsx`
  - Added `bookingId` prop
  - Display booking ID in card header

## Future Enhancements

1. **Search by Booking ID**: Add search functionality in admin panel
2. **Booking History**: Track all status changes by booking ID
3. **Email/SMS**: Include booking ID in notifications
4. **Analytics**: Track booking lifecycle using booking ID
5. **Export**: Generate reports filtered by booking ID

## Support

For issues or questions about the booking ID system:

1. Check that the migration ran successfully
2. Verify triggers are enabled
3. Check API logs for any errors
4. Ensure frontend is fetching the latest API response format
