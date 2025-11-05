# Job Listings API Integration

This document describes the integration between the frontend job listings component and the backend service requests API.

## Changes Made

### Backend Changes

1. **Updated DTOs**:
   - Removed `expertise` and `modeOfPayment` fields from `UpdateServiceRequestDto`
   - Changed `categoryId` from `number` to `string` (UUID) in `CreateServiceRequestDto`

2. **Added New Endpoint**:
   - `GET /service-requests/approved/job-listings` - Fetches approved service requests with related data for job listings

3. **Database Schema Updates**:
   - Migration to remove unused columns (`expertise`, `mop`)
   - Migration to fix category references (changed from INTEGER to UUID)
   - Added category seed data

4. **Service Updates**:
   - Added `findApprovedForJobListings()` method that joins with profiles and categories tables
   - Updated service methods to use UUID category references

### Frontend Changes

1. **Job Listings Component**:
   - Replaced hardcoded job data with API calls to fetch from Supabase
   - Added loading state and error handling
   - Updated routing to use `/jobs/{id}` instead of `/provider/jobs/{id}`

2. **API Client**:
   - Created `serviceRequests.ts` API client with proper TypeScript interfaces
   - Added data mapping function to transform service requests to job listing format
   - Includes fallback for missing data (default rating, placeholder images)

3. **Category Management**:
   - Created category constants file for UUID mappings
   - Added helper functions for backward compatibility

## Data Flow

1. **Database**: `service_requests` table with `status = 'approved'`
2. **API**: Backend joins with `profiles` and `categories` tables
3. **Frontend**: Fetches data and maps to job listing format
4. **Display**: Shows in paginated, filtered job listings

## API Response Structure

```typescript
interface ServiceRequest {
  id: string;
  client_id: string;
  category_id: string; // UUID
  title: string;
  description: string;
  rate: number;
  job_location: string;
  images: string[];
  // ... other fields
  profiles: {
    full_name: string;
    avatar_url?: string;
  };
  categories: {
    name: string;
  };
}
```

## Mapping to Job Listing

- `title` → job title
- `profiles.full_name` → provider name
- `job_location` → location
- `categories.name` → category
- `rate` → price (formatted as ₱)
- `images[0]` → job image (with fallback)
- Default rating of 4.5 (until rating system is implemented)

## Migration Notes

Run the following migrations in order:

1. `002_remove_unused_columns.sql` - Removes expertise and mop columns
2. `003_fix_category_references.sql` - Updates category_id to UUID and adds seed data

## Future Enhancements

- Add actual rating system
- Implement user reviews
- Add more sophisticated filtering
- Add search functionality
- Cache API responses for better performance
