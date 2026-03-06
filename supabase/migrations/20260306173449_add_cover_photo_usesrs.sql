DO $$
BEGIN
	IF to_regclass('public.users') IS NOT NULL THEN
		ALTER TABLE public.users
		ADD COLUMN IF NOT EXISTS cover_photo_url TEXT;
	END IF;
END $$;