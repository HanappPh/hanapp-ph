create table if not exists public.profile_views (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references auth.users(id) on delete cascade,
  viewer_id uuid not null references auth.users(id) on delete cascade,
  view_date date not null default current_date,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique(provider_id, viewer_id, view_date)
);

create index if not exists idx_profile_views_provider_id
  on public.profile_views(provider_id);

create index if not exists idx_profile_views_view_date
  on public.profile_views(view_date);
