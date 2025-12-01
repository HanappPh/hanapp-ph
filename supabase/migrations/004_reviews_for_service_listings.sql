-- Add service_listing_id column to reviews table to support reviews on listings
-- Keep the old columns for backward compatibility with bookings-based reviews

ALTER TABLE public.reviews 
ADD COLUMN IF NOT EXISTS service_listing_id UUID REFERENCES public.service_listings(id) ON DELETE CASCADE;

-- Update the check constraint to allow reviews without bookings (for listing-based reviews)
ALTER TABLE public.reviews 
DROP CONSTRAINT IF EXISTS reviews_booking_id_fkey;

-- Make booking_id optional (nullable) for listing-based reviews
ALTER TABLE public.reviews 
ALTER COLUMN booking_id DROP NOT NULL;

-- Add index for service_listing_id
CREATE INDEX IF NOT EXISTS idx_reviews_service_listing_id ON public.reviews(service_listing_id);

-- Update RLS policy to allow clients to create reviews for service listings
DROP POLICY IF EXISTS "Clients can create reviews for their bookings" ON public.reviews;

CREATE POLICY "Clients can create reviews for bookings or listings" 
  ON public.reviews FOR INSERT 
  WITH CHECK (
    auth.uid() = client_id AND 
    (booking_id IS NOT NULL OR service_listing_id IS NOT NULL)
  );

-- Policy to allow clients to update their own reviews
CREATE POLICY "Clients can update their own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = client_id);

-- Policy to allow clients to delete their own reviews
CREATE POLICY "Clients can delete their own reviews"
  ON public.reviews FOR DELETE
  USING (auth.uid() = client_id);

-- Create a view to get average ratings for service listings
CREATE OR REPLACE VIEW public.service_listing_ratings AS
SELECT 
  service_listing_id,
  COUNT(*) as review_count,
  ROUND(AVG(rating)::numeric, 2) as average_rating
FROM public.reviews
WHERE service_listing_id IS NOT NULL
GROUP BY service_listing_id;

-- Grant access to the view
GRANT SELECT ON public.service_listing_ratings TO authenticated, anon;
