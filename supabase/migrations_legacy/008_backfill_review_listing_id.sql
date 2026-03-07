-- Backfill service_listing_id for review rows created from service requests
-- where listing context exists on the linked service_request.

UPDATE public.reviews AS r
SET service_listing_id = sr.listing_id
FROM public.service_requests AS sr
WHERE r.service_request_id = sr.id
  AND r.service_listing_id IS NULL
  AND sr.listing_id IS NOT NULL;
