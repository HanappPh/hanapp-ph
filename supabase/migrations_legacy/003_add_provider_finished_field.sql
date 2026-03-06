-- Add is_provider_finished column to service_requests table
ALTER TABLE public.service_requests
ADD COLUMN is_provider_finished BOOLEAN DEFAULT FALSE;

-- Add provider_id column to track which provider was assigned
ALTER TABLE public.service_requests
ADD COLUMN provider_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Update status enum to include 'accepted' and 'completed'
ALTER TABLE public.service_requests
DROP CONSTRAINT IF EXISTS service_requests_status_check;

ALTER TABLE public.service_requests
ADD CONSTRAINT service_requests_status_check
CHECK (status IN ('pending', 'approved', 'accepted', 'rejected', 'cancelled', 'completed'));

-- Add index on provider_id for faster queries
CREATE INDEX idx_service_requests_provider_id ON public.service_requests(provider_id);

-- Add index on is_provider_finished for faster queries
CREATE INDEX idx_service_requests_is_provider_finished ON public.service_requests(is_provider_finished);
