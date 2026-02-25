-- Migration: Add Booking IDs to track bookings
-- This adds unique booking IDs to service_requests and job_applications
-- Booking ID Format: BK-YYYYMMDD-XXXXXX (e.g., BK-20240125-A3F9K2)

-- Function to generate booking ID
CREATE OR REPLACE FUNCTION generate_booking_id()
RETURNS TEXT AS $$
DECLARE
  date_part TEXT;
  random_part TEXT;
BEGIN
  -- Generate date part (YYYYMMDD)
  date_part := TO_CHAR(NOW(), 'YYYYMMDD');
  
  -- Generate random 6-character alphanumeric string (uppercase)
  random_part := UPPER(
    SUBSTRING(
      MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) 
      FROM 1 FOR 6
    )
  );
  
  -- Return booking ID
  RETURN 'BK-' || date_part || '-' || random_part;
END;
$$ LANGUAGE plpgsql;

-- Add booking_id column to service_requests table
ALTER TABLE public.service_requests 
ADD COLUMN IF NOT EXISTS booking_id TEXT;

-- Add booking_id column to job_applications table
ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS booking_id TEXT;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_service_requests_booking_id 
ON public.service_requests(booking_id);

CREATE INDEX IF NOT EXISTS idx_job_applications_booking_id 
ON public.job_applications(booking_id);

-- Function to set booking_id on service_requests insert
CREATE OR REPLACE FUNCTION set_service_request_booking_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_id IS NULL THEN
    NEW.booking_id := generate_booking_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to set booking_id on job_applications insert
CREATE OR REPLACE FUNCTION set_job_application_booking_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_id IS NULL THEN
    NEW.booking_id := generate_booking_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for service_requests
DROP TRIGGER IF EXISTS trigger_set_service_request_booking_id ON public.service_requests;
CREATE TRIGGER trigger_set_service_request_booking_id
  BEFORE INSERT ON public.service_requests
  FOR EACH ROW
  EXECUTE FUNCTION set_service_request_booking_id();

-- Create trigger for job_applications
DROP TRIGGER IF EXISTS trigger_set_job_application_booking_id ON public.job_applications;
CREATE TRIGGER trigger_set_job_application_booking_id
  BEFORE INSERT ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION set_job_application_booking_id();

-- Backfill existing service_requests with booking IDs
UPDATE public.service_requests
SET booking_id = generate_booking_id()
WHERE booking_id IS NULL;

-- Backfill existing job_applications with booking IDs
UPDATE public.job_applications
SET booking_id = generate_booking_id()
WHERE booking_id IS NULL;

-- Add NOT NULL constraint after backfilling
ALTER TABLE public.service_requests 
ALTER COLUMN booking_id SET NOT NULL;

ALTER TABLE public.job_applications 
ALTER COLUMN booking_id SET NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.service_requests.booking_id IS 'Unique booking identifier in format BK-YYYYMMDD-XXXXXX';
COMMENT ON COLUMN public.job_applications.booking_id IS 'Unique booking identifier in format BK-YYYYMMDD-XXXXXX';
