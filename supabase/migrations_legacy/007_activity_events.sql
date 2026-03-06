create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.users(id) on delete cascade,
  target_user_id uuid references public.users(id) on delete cascade,
  event_type text not null,
  title text not null,
  description text,
  visibility text not null default 'private' check (visibility in ('private', 'shared')),
  service_request_id uuid references public.service_requests(id) on delete set null,
  listing_id uuid references public.service_listings(id) on delete set null,
  metadata jsonb,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists idx_activity_events_actor_id
  on public.activity_events(actor_id);

create index if not exists idx_activity_events_target_user_id
  on public.activity_events(target_user_id);

create index if not exists idx_activity_events_created_at
  on public.activity_events(created_at desc);
