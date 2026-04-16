create extension if not exists pgcrypto;

create table if not exists public.guest_rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  confirmed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  status text not null default 'confirmed',
  notification_status text not null default 'pending',
  notification_recipient text not null default 'ramwill1991@gmail.com',
  notification_attempts integer not null default 0,
  notification_last_attempt_at timestamptz,
  notification_sent_at timestamptz,
  notification_error text
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'guest_rsvps_status_check'
  ) then
    alter table public.guest_rsvps
      add constraint guest_rsvps_status_check
      check (status in ('confirmed', 'pending'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'guest_rsvps_name_length_check'
  ) then
    alter table public.guest_rsvps
      add constraint guest_rsvps_name_length_check
      check (char_length(trim(name)) between 1 and 100);
  end if;
end $$;

create index if not exists guest_rsvps_latest_idx
  on public.guest_rsvps (confirmed_at desc, created_at desc);

alter table public.guest_rsvps enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert on table public.guest_rsvps to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'guest_rsvps'
      and policyname = 'guest_rsvps_public_insert'
  ) then
    create policy guest_rsvps_public_insert
      on public.guest_rsvps
      for insert
      to anon, authenticated
      with check (
        char_length(trim(name)) between 1 and 100
        and status = 'confirmed'
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'guest_rsvps'
      and policyname = 'guest_rsvps_public_select_confirmed'
  ) then
    create policy guest_rsvps_public_select_confirmed
      on public.guest_rsvps
      for select
      to anon, authenticated
      using (status = 'confirmed');
  end if;
end $$;
