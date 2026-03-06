-- Ensure cover photo column exists after remote schema snapshots.
ALTER TABLE IF EXISTS public.users
  ADD COLUMN IF NOT EXISTS cover_photo_url TEXT;
