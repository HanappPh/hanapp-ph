create table if not exists public.lgus (
  psgc_code text primary key,
  name text not null,
  region_code text not null,
  province_code text null,
  type text not null check (type in ('CITY', 'MUNICIPALITY')),
  is_active boolean not null default true
);

create index if not exists lgus_name_idx on public.lgus (name);
create index if not exists lgus_region_code_idx on public.lgus (region_code);
create index if not exists lgus_province_code_idx on public.lgus (province_code);