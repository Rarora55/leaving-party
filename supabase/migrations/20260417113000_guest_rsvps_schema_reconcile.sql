create extension if not exists pgcrypto;

create table if not exists public.guest_rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz not null default now(),
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
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'guest_rsvps'
      and column_name = 'guest_name'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'guest_rsvps'
      and column_name = 'name'
  ) then
    alter table public.guest_rsvps rename column guest_name to name;
  end if;
end $$;

alter table public.guest_rsvps
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists name text,
  add column if not exists created_at timestamptz default now(),
  add column if not exists confirmed_at timestamptz default now(),
  add column if not exists status text default 'confirmed',
  add column if not exists notification_status text default 'pending',
  add column if not exists notification_recipient text default 'ramwill1991@gmail.com',
  add column if not exists notification_attempts integer default 0,
  add column if not exists notification_last_attempt_at timestamptz,
  add column if not exists notification_sent_at timestamptz,
  add column if not exists notification_error text;

update public.guest_rsvps
set id = gen_random_uuid()
where id is null;

update public.guest_rsvps
set name = left(trim(name), 100)
where name is not null;

update public.guest_rsvps
set created_at = now()
where created_at is null;

update public.guest_rsvps
set confirmed_at = coalesce(confirmed_at, created_at, now())
where confirmed_at is null;

update public.guest_rsvps
set status = 'confirmed'
where status is null or status not in ('confirmed', 'pending');

update public.guest_rsvps
set notification_status = 'pending'
where notification_status is null
   or notification_status not in ('pending', 'sent', 'retry_required');

update public.guest_rsvps
set notification_recipient = 'ramwill1991@gmail.com'
where notification_recipient is null or char_length(trim(notification_recipient)) = 0;

update public.guest_rsvps
set notification_attempts = 0
where notification_attempts is null or notification_attempts < 0;

update public.guest_rsvps
set name = 'Unknown guest'
where name is null or char_length(trim(name)) = 0;

alter table public.guest_rsvps
  alter column id set default gen_random_uuid(),
  alter column created_at set default now(),
  alter column confirmed_at set default now(),
  alter column status set default 'confirmed',
  alter column notification_status set default 'pending',
  alter column notification_recipient set default 'ramwill1991@gmail.com',
  alter column notification_attempts set default 0;

alter table public.guest_rsvps
  alter column id set not null,
  alter column name set not null,
  alter column created_at set not null,
  alter column confirmed_at set not null,
  alter column status set not null,
  alter column notification_status set not null,
  alter column notification_recipient set not null,
  alter column notification_attempts set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.guest_rsvps'::regclass
      and contype = 'p'
  ) then
    alter table public.guest_rsvps
      add constraint guest_rsvps_pkey primary key (id);
  end if;
end $$;

alter table public.guest_rsvps
  drop constraint if exists guest_rsvps_status_check,
  drop constraint if exists guest_rsvps_name_length_check,
  drop constraint if exists guest_rsvps_notification_status_check;

alter table public.guest_rsvps
  add constraint guest_rsvps_status_check
  check (status in ('confirmed', 'pending')),
  add constraint guest_rsvps_name_length_check
  check (char_length(trim(name)) between 1 and 100),
  add constraint guest_rsvps_notification_status_check
  check (notification_status in ('pending', 'sent', 'retry_required'));

create index if not exists guest_rsvps_latest_idx
  on public.guest_rsvps (confirmed_at desc, created_at desc);

alter table public.guest_rsvps enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert on table public.guest_rsvps to anon, authenticated;

drop policy if exists guest_rsvps_public_insert on public.guest_rsvps;
create policy guest_rsvps_public_insert
  on public.guest_rsvps
  for insert
  to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 100
    and status = 'confirmed'
  );

drop policy if exists guest_rsvps_public_select_confirmed on public.guest_rsvps;
create policy guest_rsvps_public_select_confirmed
  on public.guest_rsvps
  for select
  to anon, authenticated
  using (status = 'confirmed');
