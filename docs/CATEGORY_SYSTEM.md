# Category System

## Overview

The category system provides a unified way to manage service categories across the platform. Both **service listings** (provider-created services) and **service requests** (client-created job posts) use consistent category naming and IDs.

## Database Structure

### Categories Table

- **Table**: `categories`
- **ID Type**: UUID
- **Columns**:
  - `id` (UUID) - Primary key
  - `name` (TEXT) - Display name (e.g., "Laundry", "Pet Care")
  - `slug` (TEXT) - URL-friendly identifier (e.g., "laundry", "pet-care")
  - `description` (TEXT) - Category description
  - `icon_url` (TEXT) - Optional icon URL
  - `created_at`, `updated_at` - Timestamps

### Service Listings

- **Table**: `service_listings`
- **Category Column**: `category_id` (UUID) - References `categories.id`
- Used by: Providers listing their services

### Service Requests

- **Table**: `service_requests`
- **Category Column**: `category_id` (INTEGER) - Values 1-17
- Used by: Clients posting job requests

## Standard Categories

| Integer ID | UUID                                 | Name                  | Slug                  |
| ---------- | ------------------------------------ | --------------------- | --------------------- |
| 1          | a1111111-1111-1111-1111-111111111111 | Laundry               | laundry               |
| 2          | a2222222-2222-2222-2222-222222222222 | Transportation        | transportation        |
| 3          | a3333333-3333-3333-3333-333333333333 | Babysitting           | babysitting           |
| 4          | a4444444-4444-4444-4444-444444444444 | Errands               | errands               |
| 5          | a5555555-5555-5555-5555-555555555555 | Pet Care              | pet-care              |
| 6          | a6666666-6666-6666-6666-666666666666 | Catering              | catering              |
| 7          | a7777777-7777-7777-7777-777777777777 | Construction          | construction          |
| 8          | a8888888-8888-8888-8888-888888888888 | Plumbing              | plumbing              |
| 9          | a9999999-9999-9999-9999-999999999999 | Auto Repair           | auto-repair           |
| 10         | aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa | Tech Support          | tech-support          |
| 11         | bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb | Gardening             | gardening             |
| 12         | cccccccc-cccc-cccc-cccc-cccccccccccc | Legal                 | legal                 |
| 13         | dddddddd-dddd-dddd-dddd-dddddddddddd | Painting              | painting              |
| 14         | eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee | Home Services         | home-services         |
| 15         | ffffffff-ffff-ffff-ffff-ffffffffffff | Electrical            | electrical            |
| 16         | 10101010-1010-1010-1010-101010101010 | Moving                | moving                |
| 17         | 11111111-1111-1111-1111-111111111111 | Professional Services | professional-services |

## Migration Setup

### Step 1: Run Categories Migration

Copy and run the migration in Supabase SQL Editor:

```bash
# File: supabase/migrations/006_populate_categories.sql
```

This will populate the `categories` table with all 17 standard categories using predefined UUIDs.

### Step 2: Verify Categories

```sql
-- Check all categories are populated
SELECT id, name, slug FROM categories ORDER BY name;

-- Should return 17 rows
```

## Frontend Implementation

### Centralized Constants

**File**: `apps/web/lib/constants/categories.ts`

This file provides:

- Full category list with UUIDs and integer IDs
- Helper functions for category lookups
- Consistent category management across the app

### Available Functions

```typescript
import {
  getAllCategories,
  getCategoryById,
  getCategoryByIntegerId,
  getCategoryByName,
  getCategoryName,
  getAllCategoryNames,
} from '@/lib/constants/categories';

// Get all categories for dropdowns
const categories = getAllCategories();
// Returns: Category[] with id, integerId, name, slug

// Get category by UUID (for service_listings)
const category = getCategoryById('a1111111-1111-1111-1111-111111111111');
// Returns: { id: '...', integerId: 1, name: 'Laundry', slug: 'laundry' }

// Get category by integer ID (for service_requests)
const category = getCategoryByIntegerId(1);
// Returns same as above

// Get category name from integer ID
const name = getCategoryName(5);
// Returns: 'Pet Care'

// Get all category names as array
const names = getAllCategoryNames();
// Returns: ['Laundry', 'Transportation', ...]
```

## Usage Examples

### Creating Service Listing (Provider)

```tsx
import { getAllCategories } from '@/lib/constants/categories';

function CreateListingForm() {
  const [categoryId, setCategoryId] = useState('');

  return (
    <Select value={categoryId} onValueChange={setCategoryId}>
      {getAllCategories().map(cat => (
        <SelectItem key={cat.id} value={cat.id}>
          {cat.name}
        </SelectItem>
      ))}
    </Select>
  );
}

// When submitting:
const payload = {
  categoryId: categoryId, // UUID
  // ... other fields
};
```

### Creating Service Request (Client)

Service requests use integer IDs (1-17) directly in the database.

```tsx
const payload = {
  category_id: 5, // Pet Care (integer)
  // ... other fields
};
```

### Displaying Categories

```tsx
import { getCategoryName } from '@/lib/constants/categories';

// For service requests with integer ID
const categoryName = getCategoryName(serviceRequest.category_id);

// For service listings with UUID
const category = getCategoryById(serviceListing.category_id);
const categoryName = category?.name || 'Other';
```

### Filtering by Category

```tsx
import { getCategoryByName } from '@/lib/constants/categories';

// Convert category name to UUID for filtering
const category = getCategoryByName('Pet Care');
if (category) {
  const filteredListings = await fetchServiceListings({
    categoryId: category.id,
  });
}
```

## Files Updated

### Migrations

- `supabase/migrations/006_populate_categories.sql` - Populates categories table

### New Files

- `apps/web/lib/constants/categories.ts` - Centralized category management

### Modified Files

- `apps/web/components/post-job-listing/post-service-create.tsx` - Uses category selector
- `apps/web/app/(protected)/provider/jobs/create/page.tsx` - Uses selected category UUID
- `apps/web/app/(protected)/jobs/categories/page.tsx` - Uses centralized categories
- `apps/web/app/(protected)/provider/jobs/[jobId]/page.tsx` - Uses centralized getCategoryName
- `apps/web/lib/api/serviceRequests.ts` - Uses centralized getCategoryName

## Benefits

1. **Consistency**: Single source of truth for categories
2. **Type Safety**: TypeScript interfaces for category objects
3. **Flexibility**: Easy to add/modify categories
4. **Maintainability**: Update in one place, reflects everywhere
5. **Filtering**: Proper category-based filtering works for both clients and providers
6. **UUID Stability**: Predefined UUIDs ensure consistency across environments

## Troubleshooting

### Categories not showing in dropdown

- Verify migration ran successfully
- Check browser console for errors
- Ensure `getAllCategories()` is imported correctly

### Filtering not working

- Check that service listings use UUID category_id
- Verify categories table is populated
- Check API responses include category data

### Category names mismatch

- All category names should match exactly between:
  - `categories` table
  - Constants file
  - UI labels
- Run migration if categories table is empty

## Future Considerations

1. **API Integration**: Fetch categories from API instead of hardcoding
2. **Admin Panel**: Allow adding/editing categories through UI
3. **Icons**: Add category icons for better UX
4. **Localization**: Support multiple languages for category names
5. **Dynamic Categories**: Allow users to request new categories
