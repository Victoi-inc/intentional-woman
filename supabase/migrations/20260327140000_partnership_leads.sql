-- Run in Supabase SQL editor or via CLI. Enables anonymous inserts from the partner form (adjust RLS for your security model).

create table if not exists public.partnership_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  identity text not null,
  objective text not null,
  reach text not null,
  projected_leverage_usd numeric not null,
  projected_women integer not null,
  name text not null,
  email text not null,
  phone text,
  message text
);

alter table public.partnership_leads enable row level security;

grant usage on schema public to anon;
grant insert on table public.partnership_leads to anon;

create policy "Allow anon insert partnership_leads"
  on public.partnership_leads
  for insert
  to anon
  with check (true);

-- Optional: service role bypasses RLS for admin dashboards.
