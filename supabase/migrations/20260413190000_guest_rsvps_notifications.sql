do $$
begin
  if to_regclass('public.guest_rsvps') is null then
    return;
  end if;

  alter table public.guest_rsvps
    add column if not exists notification_status text not null default 'pending',
    add column if not exists notification_recipient text not null default 'ramwill1991@gmail.com',
    add column if not exists notification_attempts integer not null default 0,
    add column if not exists notification_last_attempt_at timestamptz,
    add column if not exists notification_sent_at timestamptz,
    add column if not exists notification_error text;

  alter table public.guest_rsvps
    alter column status set default 'confirmed';

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guest_rsvps_notification_status_check'
  ) then
    alter table public.guest_rsvps
      add constraint guest_rsvps_notification_status_check
      check (notification_status in ('pending', 'sent', 'retry_required'));
  end if;
end $$;
