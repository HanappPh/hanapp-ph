drop extension if exists "pg_net";


  create table "public"."activity_events" (
    "id" uuid not null default gen_random_uuid(),
    "actor_id" uuid not null,
    "target_user_id" uuid,
    "event_type" text not null,
    "title" text not null,
    "description" text,
    "visibility" text not null default 'private'::text,
    "service_request_id" uuid,
    "listing_id" uuid,
    "metadata" jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."activity_events" enable row level security;


  create table "public"."job_applications" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "service_request_id" uuid not null,
    "provider_id" uuid not null,
    "client_id" uuid not null,
    "qualifications" text not null,
    "experience" text not null,
    "status" text default 'pending'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "booking_id" text not null
      );


alter table "public"."job_applications" enable row level security;


  create table "public"."messages" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "sender_id" uuid,
    "receiver_id" uuid,
    "booking_id" uuid,
    "content" text not null,
    "is_read" boolean default false,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."messages" enable row level security;


  create table "public"."otp_verifications" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "phone" text not null,
    "otp_code" text not null,
    "expires_at" timestamp with time zone not null,
    "verified" boolean default false,
    "attempts" integer default 0,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."otp_verifications" enable row level security;


  create table "public"."reviews" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "booking_id" uuid,
    "service_id" uuid,
    "client_id" uuid,
    "provider_id" uuid,
    "rating" integer,
    "comment" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "service_listing_id" uuid,
    "service_request_id" uuid
      );


alter table "public"."reviews" enable row level security;


  create table "public"."service_listing_details" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "listing_id" uuid not null,
    "title" text not null,
    "description" text not null,
    "rate" numeric(10,2) not null,
    "charge" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."service_listing_details" enable row level security;


  create table "public"."service_listings" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "provider_id" uuid,
    "category_id" integer not null,
    "title" text not null,
    "description" text,
    "price_from" numeric(10,2),
    "availability_schedule" text,
    "service_areas" text[],
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "images" text[]
      );


alter table "public"."service_listings" enable row level security;


  create table "public"."service_requests" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "client_id" uuid,
    "category_id" integer,
    "title" text not null,
    "description" text not null,
    "rate" numeric(10,2) not null,
    "contact" text not null,
    "job_location" text not null,
    "date" date,
    "time" time without time zone,
    "images" text[],
    "status" text default 'pending'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "additional_requirements" text,
    "time_2" time without time zone,
    "is_provider_finished" boolean default false,
    "provider_id" uuid,
    "booking_group_id" uuid,
    "listing_id" uuid,
    "service_detail_id" uuid,
    "custom_service_name" text,
    "custom_service_description" text,
    "is_custom_service" boolean default false,
    "booking_id" text not null
      );


alter table "public"."service_requests" enable row level security;


  create table "public"."services" (
    "title" text not null,
    "description" text,
    "rate" numeric not null,
    "is_active" boolean default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp without time zone default now(),
    "id" uuid not null default gen_random_uuid(),
    "listing_id" uuid not null,
    "charge" text,
    "is_addon" boolean not null default false
      );


alter table "public"."services" enable row level security;


  create table "public"."users" (
    "id" uuid not null,
    "email" text not null,
    "full_name" text,
    "phone" text not null,
    "avatar_url" text,
    "user_type" text default 'client'::text,
    "phone_verified" boolean default false,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX activity_events_pkey ON public.activity_events USING btree (id);

CREATE INDEX idx_activity_events_actor_id ON public.activity_events USING btree (actor_id);

CREATE INDEX idx_activity_events_created_at ON public.activity_events USING btree (created_at DESC);

CREATE INDEX idx_activity_events_target_user_id ON public.activity_events USING btree (target_user_id);

CREATE INDEX idx_job_applications_booking_id ON public.job_applications USING btree (booking_id);

CREATE INDEX idx_job_applications_client_id ON public.job_applications USING btree (client_id);

CREATE INDEX idx_job_applications_created_at ON public.job_applications USING btree (created_at DESC);

CREATE INDEX idx_job_applications_provider_id ON public.job_applications USING btree (provider_id);

CREATE INDEX idx_job_applications_service_request_id ON public.job_applications USING btree (service_request_id);

CREATE INDEX idx_job_applications_status ON public.job_applications USING btree (status);

CREATE INDEX idx_messages_created_at ON public.messages USING btree (created_at DESC);

CREATE INDEX idx_messages_receiver_id ON public.messages USING btree (receiver_id);

CREATE INDEX idx_messages_sender_id ON public.messages USING btree (sender_id);

CREATE INDEX idx_reviews_provider_id ON public.reviews USING btree (provider_id);

CREATE INDEX idx_reviews_service_listing_id ON public.reviews USING btree (service_listing_id);

CREATE INDEX idx_reviews_service_request_id ON public.reviews USING btree (service_request_id);

CREATE INDEX idx_service_listing_details_listing_id ON public.service_listing_details USING btree (listing_id);

CREATE INDEX idx_service_listings_category_id ON public.service_listings USING btree (category_id);

CREATE INDEX idx_service_requests_booking_group_id ON public.service_requests USING btree (booking_group_id);

CREATE INDEX idx_service_requests_booking_id ON public.service_requests USING btree (booking_id);

CREATE INDEX idx_service_requests_category_id ON public.service_requests USING btree (category_id);

CREATE INDEX idx_service_requests_client_id ON public.service_requests USING btree (client_id);

CREATE INDEX idx_service_requests_created_at ON public.service_requests USING btree (created_at DESC);

CREATE INDEX idx_service_requests_is_provider_finished ON public.service_requests USING btree (is_provider_finished);

CREATE INDEX idx_service_requests_listing_id ON public.service_requests USING btree (listing_id);

CREATE INDEX idx_service_requests_provider_id ON public.service_requests USING btree (provider_id);

CREATE INDEX idx_service_requests_service_detail_id ON public.service_requests USING btree (service_detail_id);

CREATE INDEX idx_service_requests_status ON public.service_requests USING btree (status);

CREATE UNIQUE INDEX job_applications_pkey ON public.job_applications USING btree (id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX otp_verifications_pkey ON public.otp_verifications USING btree (id);

CREATE UNIQUE INDEX reviews_pkey ON public.reviews USING btree (id);

CREATE UNIQUE INDEX service_listing_details_pkey ON public.service_listing_details USING btree (id);

CREATE UNIQUE INDEX service_requests_pkey ON public.service_requests USING btree (id);

CREATE UNIQUE INDEX services_pkey ON public.service_listings USING btree (id);

CREATE UNIQUE INDEX services_pkey1 ON public.services USING btree (id);

CREATE UNIQUE INDEX users_phone_key ON public.users USING btree (phone);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."activity_events" add constraint "activity_events_pkey" PRIMARY KEY using index "activity_events_pkey";

alter table "public"."job_applications" add constraint "job_applications_pkey" PRIMARY KEY using index "job_applications_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."otp_verifications" add constraint "otp_verifications_pkey" PRIMARY KEY using index "otp_verifications_pkey";

alter table "public"."reviews" add constraint "reviews_pkey" PRIMARY KEY using index "reviews_pkey";

alter table "public"."service_listing_details" add constraint "service_listing_details_pkey" PRIMARY KEY using index "service_listing_details_pkey";

alter table "public"."service_listings" add constraint "services_pkey" PRIMARY KEY using index "services_pkey";

alter table "public"."service_requests" add constraint "service_requests_pkey" PRIMARY KEY using index "service_requests_pkey";

alter table "public"."services" add constraint "services_pkey1" PRIMARY KEY using index "services_pkey1";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."activity_events" add constraint "activity_events_actor_id_fkey" FOREIGN KEY (actor_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."activity_events" validate constraint "activity_events_actor_id_fkey";

alter table "public"."activity_events" add constraint "activity_events_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.service_listings(id) ON DELETE SET NULL not valid;

alter table "public"."activity_events" validate constraint "activity_events_listing_id_fkey";

alter table "public"."activity_events" add constraint "activity_events_service_request_id_fkey" FOREIGN KEY (service_request_id) REFERENCES public.service_requests(id) ON DELETE SET NULL not valid;

alter table "public"."activity_events" validate constraint "activity_events_service_request_id_fkey";

alter table "public"."activity_events" add constraint "activity_events_target_user_id_fkey" FOREIGN KEY (target_user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."activity_events" validate constraint "activity_events_target_user_id_fkey";

alter table "public"."activity_events" add constraint "activity_events_visibility_check" CHECK ((visibility = ANY (ARRAY['private'::text, 'shared'::text]))) not valid;

alter table "public"."activity_events" validate constraint "activity_events_visibility_check";

alter table "public"."job_applications" add constraint "job_applications_client_id_fkey" FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."job_applications" validate constraint "job_applications_client_id_fkey";

alter table "public"."job_applications" add constraint "job_applications_provider_id_fkey" FOREIGN KEY (provider_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."job_applications" validate constraint "job_applications_provider_id_fkey";

alter table "public"."job_applications" add constraint "job_applications_service_request_id_fkey" FOREIGN KEY (service_request_id) REFERENCES public.service_requests(id) ON DELETE CASCADE not valid;

alter table "public"."job_applications" validate constraint "job_applications_service_request_id_fkey";

alter table "public"."job_applications" add constraint "job_applications_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'accepted'::text, 'rejected'::text, 'withdrawn'::text]))) not valid;

alter table "public"."job_applications" validate constraint "job_applications_status_check";

alter table "public"."messages" add constraint "messages_receiver_id_fkey" FOREIGN KEY (receiver_id) REFERENCES public.users(id) not valid;

alter table "public"."messages" validate constraint "messages_receiver_id_fkey";

alter table "public"."messages" add constraint "messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public.users(id) not valid;

alter table "public"."messages" validate constraint "messages_sender_id_fkey";

alter table "public"."reviews" add constraint "reviews_client_id_fkey" FOREIGN KEY (client_id) REFERENCES public.users(id) not valid;

alter table "public"."reviews" validate constraint "reviews_client_id_fkey";

alter table "public"."reviews" add constraint "reviews_provider_id_fkey" FOREIGN KEY (provider_id) REFERENCES public.users(id) not valid;

alter table "public"."reviews" validate constraint "reviews_provider_id_fkey";

alter table "public"."reviews" add constraint "reviews_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."reviews" validate constraint "reviews_rating_check";

alter table "public"."reviews" add constraint "reviews_service_id_fkey" FOREIGN KEY (service_id) REFERENCES public.service_listings(id) not valid;

alter table "public"."reviews" validate constraint "reviews_service_id_fkey";

alter table "public"."reviews" add constraint "reviews_service_listing_id_fkey" FOREIGN KEY (service_listing_id) REFERENCES public.service_listings(id) ON DELETE CASCADE not valid;

alter table "public"."reviews" validate constraint "reviews_service_listing_id_fkey";

alter table "public"."reviews" add constraint "reviews_service_request_id_fkey" FOREIGN KEY (service_request_id) REFERENCES public.service_requests(id) ON DELETE CASCADE not valid;

alter table "public"."reviews" validate constraint "reviews_service_request_id_fkey";

alter table "public"."service_listing_details" add constraint "service_listing_details_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.service_listings(id) ON DELETE CASCADE not valid;

alter table "public"."service_listing_details" validate constraint "service_listing_details_listing_id_fkey";

alter table "public"."service_listings" add constraint "services_provider_id_fkey" FOREIGN KEY (provider_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."service_listings" validate constraint "services_provider_id_fkey";

alter table "public"."service_requests" add constraint "service_requests_category_id_check" CHECK ((category_id = ANY (ARRAY[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))) not valid;

alter table "public"."service_requests" validate constraint "service_requests_category_id_check";

alter table "public"."service_requests" add constraint "service_requests_client_id_fkey" FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."service_requests" validate constraint "service_requests_client_id_fkey";

alter table "public"."service_requests" add constraint "service_requests_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.service_listings(id) ON DELETE SET NULL not valid;

alter table "public"."service_requests" validate constraint "service_requests_listing_id_fkey";

alter table "public"."service_requests" add constraint "service_requests_provider_id_fkey" FOREIGN KEY (provider_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."service_requests" validate constraint "service_requests_provider_id_fkey";

alter table "public"."service_requests" add constraint "service_requests_service_detail_id_fkey" FOREIGN KEY (service_detail_id) REFERENCES public.service_listing_details(id) ON DELETE SET NULL not valid;

alter table "public"."service_requests" validate constraint "service_requests_service_detail_id_fkey";

alter table "public"."service_requests" add constraint "service_requests_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'accepted'::text, 'rejected'::text, 'cancelled'::text, 'completed'::text]))) not valid;

alter table "public"."service_requests" validate constraint "service_requests_status_check";

alter table "public"."services" add constraint "services_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.service_listings(id) ON DELETE CASCADE not valid;

alter table "public"."services" validate constraint "services_listing_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_phone_key" UNIQUE using index "users_phone_key";

alter table "public"."users" add constraint "users_user_type_check" CHECK ((user_type = ANY (ARRAY['client'::text, 'provider'::text, 'both'::text]))) not valid;

alter table "public"."users" validate constraint "users_user_type_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  DELETE FROM public.otp_verifications
  WHERE expires_at < NOW() - INTERVAL '1 day';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.generate_booking_id()
 RETURNS text
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, user_type)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'client')
  );
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_job_application_booking_id()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.booking_id IS NULL THEN
    NEW.booking_id := generate_booking_id();
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_service_request_booking_id()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.booking_id IS NULL THEN
    NEW.booking_id := generate_booking_id();
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."activity_events" to "anon";

grant insert on table "public"."activity_events" to "anon";

grant references on table "public"."activity_events" to "anon";

grant select on table "public"."activity_events" to "anon";

grant trigger on table "public"."activity_events" to "anon";

grant truncate on table "public"."activity_events" to "anon";

grant update on table "public"."activity_events" to "anon";

grant delete on table "public"."activity_events" to "authenticated";

grant insert on table "public"."activity_events" to "authenticated";

grant references on table "public"."activity_events" to "authenticated";

grant select on table "public"."activity_events" to "authenticated";

grant trigger on table "public"."activity_events" to "authenticated";

grant truncate on table "public"."activity_events" to "authenticated";

grant update on table "public"."activity_events" to "authenticated";

grant delete on table "public"."activity_events" to "service_role";

grant insert on table "public"."activity_events" to "service_role";

grant references on table "public"."activity_events" to "service_role";

grant select on table "public"."activity_events" to "service_role";

grant trigger on table "public"."activity_events" to "service_role";

grant truncate on table "public"."activity_events" to "service_role";

grant update on table "public"."activity_events" to "service_role";

grant delete on table "public"."job_applications" to "anon";

grant insert on table "public"."job_applications" to "anon";

grant references on table "public"."job_applications" to "anon";

grant select on table "public"."job_applications" to "anon";

grant trigger on table "public"."job_applications" to "anon";

grant truncate on table "public"."job_applications" to "anon";

grant update on table "public"."job_applications" to "anon";

grant delete on table "public"."job_applications" to "authenticated";

grant insert on table "public"."job_applications" to "authenticated";

grant references on table "public"."job_applications" to "authenticated";

grant select on table "public"."job_applications" to "authenticated";

grant trigger on table "public"."job_applications" to "authenticated";

grant truncate on table "public"."job_applications" to "authenticated";

grant update on table "public"."job_applications" to "authenticated";

grant delete on table "public"."job_applications" to "service_role";

grant insert on table "public"."job_applications" to "service_role";

grant references on table "public"."job_applications" to "service_role";

grant select on table "public"."job_applications" to "service_role";

grant trigger on table "public"."job_applications" to "service_role";

grant truncate on table "public"."job_applications" to "service_role";

grant update on table "public"."job_applications" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

grant delete on table "public"."otp_verifications" to "anon";

grant insert on table "public"."otp_verifications" to "anon";

grant references on table "public"."otp_verifications" to "anon";

grant select on table "public"."otp_verifications" to "anon";

grant trigger on table "public"."otp_verifications" to "anon";

grant truncate on table "public"."otp_verifications" to "anon";

grant update on table "public"."otp_verifications" to "anon";

grant delete on table "public"."otp_verifications" to "authenticated";

grant insert on table "public"."otp_verifications" to "authenticated";

grant references on table "public"."otp_verifications" to "authenticated";

grant select on table "public"."otp_verifications" to "authenticated";

grant trigger on table "public"."otp_verifications" to "authenticated";

grant truncate on table "public"."otp_verifications" to "authenticated";

grant update on table "public"."otp_verifications" to "authenticated";

grant delete on table "public"."otp_verifications" to "service_role";

grant insert on table "public"."otp_verifications" to "service_role";

grant references on table "public"."otp_verifications" to "service_role";

grant select on table "public"."otp_verifications" to "service_role";

grant trigger on table "public"."otp_verifications" to "service_role";

grant truncate on table "public"."otp_verifications" to "service_role";

grant update on table "public"."otp_verifications" to "service_role";

grant delete on table "public"."reviews" to "anon";

grant insert on table "public"."reviews" to "anon";

grant references on table "public"."reviews" to "anon";

grant select on table "public"."reviews" to "anon";

grant trigger on table "public"."reviews" to "anon";

grant truncate on table "public"."reviews" to "anon";

grant update on table "public"."reviews" to "anon";

grant delete on table "public"."reviews" to "authenticated";

grant insert on table "public"."reviews" to "authenticated";

grant references on table "public"."reviews" to "authenticated";

grant select on table "public"."reviews" to "authenticated";

grant trigger on table "public"."reviews" to "authenticated";

grant truncate on table "public"."reviews" to "authenticated";

grant update on table "public"."reviews" to "authenticated";

grant delete on table "public"."reviews" to "service_role";

grant insert on table "public"."reviews" to "service_role";

grant references on table "public"."reviews" to "service_role";

grant select on table "public"."reviews" to "service_role";

grant trigger on table "public"."reviews" to "service_role";

grant truncate on table "public"."reviews" to "service_role";

grant update on table "public"."reviews" to "service_role";

grant delete on table "public"."service_listing_details" to "anon";

grant insert on table "public"."service_listing_details" to "anon";

grant references on table "public"."service_listing_details" to "anon";

grant select on table "public"."service_listing_details" to "anon";

grant trigger on table "public"."service_listing_details" to "anon";

grant truncate on table "public"."service_listing_details" to "anon";

grant update on table "public"."service_listing_details" to "anon";

grant delete on table "public"."service_listing_details" to "authenticated";

grant insert on table "public"."service_listing_details" to "authenticated";

grant references on table "public"."service_listing_details" to "authenticated";

grant select on table "public"."service_listing_details" to "authenticated";

grant trigger on table "public"."service_listing_details" to "authenticated";

grant truncate on table "public"."service_listing_details" to "authenticated";

grant update on table "public"."service_listing_details" to "authenticated";

grant delete on table "public"."service_listing_details" to "service_role";

grant insert on table "public"."service_listing_details" to "service_role";

grant references on table "public"."service_listing_details" to "service_role";

grant select on table "public"."service_listing_details" to "service_role";

grant trigger on table "public"."service_listing_details" to "service_role";

grant truncate on table "public"."service_listing_details" to "service_role";

grant update on table "public"."service_listing_details" to "service_role";

grant delete on table "public"."service_listings" to "anon";

grant insert on table "public"."service_listings" to "anon";

grant references on table "public"."service_listings" to "anon";

grant select on table "public"."service_listings" to "anon";

grant trigger on table "public"."service_listings" to "anon";

grant truncate on table "public"."service_listings" to "anon";

grant update on table "public"."service_listings" to "anon";

grant delete on table "public"."service_listings" to "authenticated";

grant insert on table "public"."service_listings" to "authenticated";

grant references on table "public"."service_listings" to "authenticated";

grant select on table "public"."service_listings" to "authenticated";

grant trigger on table "public"."service_listings" to "authenticated";

grant truncate on table "public"."service_listings" to "authenticated";

grant update on table "public"."service_listings" to "authenticated";

grant delete on table "public"."service_listings" to "service_role";

grant insert on table "public"."service_listings" to "service_role";

grant references on table "public"."service_listings" to "service_role";

grant select on table "public"."service_listings" to "service_role";

grant trigger on table "public"."service_listings" to "service_role";

grant truncate on table "public"."service_listings" to "service_role";

grant update on table "public"."service_listings" to "service_role";

grant delete on table "public"."service_requests" to "anon";

grant insert on table "public"."service_requests" to "anon";

grant references on table "public"."service_requests" to "anon";

grant select on table "public"."service_requests" to "anon";

grant trigger on table "public"."service_requests" to "anon";

grant truncate on table "public"."service_requests" to "anon";

grant update on table "public"."service_requests" to "anon";

grant delete on table "public"."service_requests" to "authenticated";

grant insert on table "public"."service_requests" to "authenticated";

grant references on table "public"."service_requests" to "authenticated";

grant select on table "public"."service_requests" to "authenticated";

grant trigger on table "public"."service_requests" to "authenticated";

grant truncate on table "public"."service_requests" to "authenticated";

grant update on table "public"."service_requests" to "authenticated";

grant delete on table "public"."service_requests" to "service_role";

grant insert on table "public"."service_requests" to "service_role";

grant references on table "public"."service_requests" to "service_role";

grant select on table "public"."service_requests" to "service_role";

grant trigger on table "public"."service_requests" to "service_role";

grant truncate on table "public"."service_requests" to "service_role";

grant update on table "public"."service_requests" to "service_role";

grant delete on table "public"."services" to "anon";

grant insert on table "public"."services" to "anon";

grant references on table "public"."services" to "anon";

grant select on table "public"."services" to "anon";

grant trigger on table "public"."services" to "anon";

grant truncate on table "public"."services" to "anon";

grant update on table "public"."services" to "anon";

grant delete on table "public"."services" to "authenticated";

grant insert on table "public"."services" to "authenticated";

grant references on table "public"."services" to "authenticated";

grant select on table "public"."services" to "authenticated";

grant trigger on table "public"."services" to "authenticated";

grant truncate on table "public"."services" to "authenticated";

grant update on table "public"."services" to "authenticated";

grant delete on table "public"."services" to "service_role";

grant insert on table "public"."services" to "service_role";

grant references on table "public"."services" to "service_role";

grant select on table "public"."services" to "service_role";

grant trigger on table "public"."services" to "service_role";

grant truncate on table "public"."services" to "service_role";

grant update on table "public"."services" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


  create policy "Clients can update applications status"
  on "public"."job_applications"
  as permissive
  for update
  to public
using ((auth.uid() = client_id));



  create policy "Clients can view applications to their service requests"
  on "public"."job_applications"
  as permissive
  for select
  to public
using ((auth.uid() = client_id));



  create policy "Providers can create applications"
  on "public"."job_applications"
  as permissive
  for insert
  to public
with check ((auth.uid() = provider_id));



  create policy "Providers can update their own applications"
  on "public"."job_applications"
  as permissive
  for update
  to public
using ((auth.uid() = provider_id));



  create policy "Providers can view their own applications"
  on "public"."job_applications"
  as permissive
  for select
  to public
using ((auth.uid() = provider_id));



  create policy "Users can send messages"
  on "public"."messages"
  as permissive
  for insert
  to public
with check ((auth.uid() = sender_id));



  create policy "Users can view their own messages"
  on "public"."messages"
  as permissive
  for select
  to public
using (((auth.uid() = sender_id) OR (auth.uid() = receiver_id)));



  create policy "Anyone can insert OTP"
  on "public"."otp_verifications"
  as permissive
  for insert
  to public
with check (true);



  create policy "Anyone can update OTP"
  on "public"."otp_verifications"
  as permissive
  for update
  to public
using (true);



  create policy "Users can view their own OTPs"
  on "public"."otp_verifications"
  as permissive
  for select
  to public
using (true);



  create policy "Clients can create reviews for bookings or listings"
  on "public"."reviews"
  as permissive
  for insert
  to public
with check (((auth.uid() = client_id) AND ((booking_id IS NOT NULL) OR (service_listing_id IS NOT NULL))));



  create policy "Clients can delete their own reviews"
  on "public"."reviews"
  as permissive
  for delete
  to public
using ((auth.uid() = client_id));



  create policy "Clients can update their own reviews"
  on "public"."reviews"
  as permissive
  for update
  to public
using ((auth.uid() = client_id));



  create policy "Reviews are viewable by everyone"
  on "public"."reviews"
  as permissive
  for select
  to public
using (true);



  create policy "Providers can create details for their own service listings"
  on "public"."service_listing_details"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.service_listings
  WHERE ((service_listings.id = service_listing_details.listing_id) AND (service_listings.provider_id = auth.uid())))));



  create policy "Providers can delete their own service listing details"
  on "public"."service_listing_details"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.service_listings
  WHERE ((service_listings.id = service_listing_details.listing_id) AND (service_listings.provider_id = auth.uid())))));



  create policy "Providers can update their own service listing details"
  on "public"."service_listing_details"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.service_listings
  WHERE ((service_listings.id = service_listing_details.listing_id) AND (service_listings.provider_id = auth.uid())))));



  create policy "Service listing details are viewable by everyone"
  on "public"."service_listing_details"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.service_listings
  WHERE ((service_listings.id = service_listing_details.listing_id) AND ((service_listings.is_active = true) OR (service_listings.provider_id = auth.uid()))))));



  create policy "Providers can insert their own services"
  on "public"."service_listings"
  as permissive
  for insert
  to public
with check ((auth.uid() = provider_id));



  create policy "Providers can update their own services"
  on "public"."service_listings"
  as permissive
  for update
  to public
using ((auth.uid() = provider_id));



  create policy "Services are viewable by everyone"
  on "public"."service_listings"
  as permissive
  for select
  to public
using (true);



  create policy "Providers can view service requests assigned to them"
  on "public"."service_requests"
  as permissive
  for select
  to public
using ((auth.uid() = provider_id));



  create policy "Users can create their own service requests"
  on "public"."service_requests"
  as permissive
  for insert
  to public
with check ((auth.uid() = client_id));



  create policy "Users can delete their own service requests"
  on "public"."service_requests"
  as permissive
  for delete
  to public
using ((auth.uid() = client_id));



  create policy "Users can update their own service requests"
  on "public"."service_requests"
  as permissive
  for update
  to public
using ((auth.uid() = client_id));



  create policy "Users can view their own service requests"
  on "public"."service_requests"
  as permissive
  for select
  to public
using ((auth.uid() = client_id));



  create policy "Allow users to add services to their own listings"
  on "public"."services"
  as permissive
  for insert
  to authenticated
with check ((listing_id IN ( SELECT service_listings.id
   FROM public.service_listings
  WHERE (service_listings.provider_id = auth.uid()))));



  create policy "Enable read access for all users"
  on "public"."services"
  as permissive
  for select
  to public
using (true);



  create policy "Public users are viewable by everyone"
  on "public"."users"
  as permissive
  for select
  to public
using (true);



  create policy "Users can insert their own profile"
  on "public"."users"
  as permissive
  for insert
  to public
with check ((auth.uid() = id));



  create policy "Users can update their own profile"
  on "public"."users"
  as permissive
  for update
  to public
using ((auth.uid() = id));


CREATE TRIGGER trigger_set_job_application_booking_id BEFORE INSERT ON public.job_applications FOR EACH ROW EXECUTE FUNCTION public.set_job_application_booking_id();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON public.job_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_listing_details_updated_at BEFORE UPDATE ON public.service_listing_details FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_listings_updated_at BEFORE UPDATE ON public.service_listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.service_listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_set_service_request_booking_id BEFORE INSERT ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.set_service_request_booking_id();

CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "Allow authenticated deletes"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using ((bucket_id = 'service-images'::text));



  create policy "Allow authenticated uploads"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'service-images'::text));



  create policy "Allow public reads"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'service-images'::text));



  create policy "Avatar images are publicly accessible"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



  create policy "Users can delete their own avatar"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'avatars'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "Users can update their own avatar"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'avatars'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "Users can upload their own avatar"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'avatars'::text) AND (auth.role() = 'authenticated'::text)));



