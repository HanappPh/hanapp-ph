-- Preferred schedule fields should be optional for service requests.
ALTER TABLE public.service_requests
  ALTER COLUMN date DROP NOT NULL,
  ALTER COLUMN time DROP NOT NULL;
