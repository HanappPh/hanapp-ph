-- Add service_request_id column to reviews table
-- This allows reviews to be created from service requests (client-created job postings)

ALTER TABLE public.reviews 
ADD COLUMN IF NOT EXISTS service_request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE;

-- Add provider_id column to reviews table if it doesn't exist
ALTER TABLE public.reviews 
ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_service_request_id ON public.reviews(service_request_id);
CREATE INDEX IF NOT EXISTS idx_reviews_provider_id ON public.reviews(provider_id);
