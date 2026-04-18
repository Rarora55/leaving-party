do $$
declare
  required_columns text[] := array[
    'id',
    'name',
    'created_at',
    'confirmed_at',
    'status',
    'notification_status',
    'notification_recipient',
    'notification_attempts',
    'notification_last_attempt_at',
    'notification_sent_at',
    'notification_error'
  ];
  required_not_null_columns text[] := array[
    'id',
    'name',
    'created_at',
    'confirmed_at',
    'status',
    'notification_status',
    'notification_recipient',
    'notification_attempts'
  ];
  missing_columns text[];
  nullable_required_columns text[];
  rls_enabled boolean;
begin
  if to_regclass('public.guest_rsvps') is null then
    raise exception 'Missing required table: public.guest_rsvps';
  end if;

  select array_agg(expected.column_name order by expected.column_name)
  into missing_columns
  from unnest(required_columns) as expected(column_name)
  where not exists (
    select 1
    from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name = 'guest_rsvps'
      and c.column_name = expected.column_name
  );

  if missing_columns is not null then
    raise exception 'Missing required columns in public.guest_rsvps: %', missing_columns;
  end if;

  select array_agg(c.column_name order by c.column_name)
  into nullable_required_columns
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'guest_rsvps'
    and c.column_name = any(required_not_null_columns)
    and c.is_nullable = 'YES';

  if nullable_required_columns is not null then
    raise exception 'These required columns are nullable but must be NOT NULL: %', nullable_required_columns;
  end if;

  select cls.relrowsecurity
  into rls_enabled
  from pg_class cls
  join pg_namespace ns
    on ns.oid = cls.relnamespace
  where ns.nspname = 'public'
    and cls.relname = 'guest_rsvps';

  if coalesce(rls_enabled, false) = false then
    raise exception 'RLS is not enabled on public.guest_rsvps';
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'guest_rsvps'
      and policyname = 'guest_rsvps_public_insert'
  ) then
    raise exception 'Missing required RLS policy: guest_rsvps_public_insert';
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'guest_rsvps'
      and policyname = 'guest_rsvps_public_select_confirmed'
  ) then
    raise exception 'Missing required RLS policy: guest_rsvps_public_select_confirmed';
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guest_rsvps_status_check'
  ) then
    raise exception 'Missing required constraint: guest_rsvps_status_check';
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guest_rsvps_name_length_check'
  ) then
    raise exception 'Missing required constraint: guest_rsvps_name_length_check';
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'guest_rsvps_notification_status_check'
  ) then
    raise exception 'Missing required constraint: guest_rsvps_notification_status_check';
  end if;

  if exists (select 1 from pg_roles where rolname = 'anon')
     and not has_table_privilege('anon', 'public.guest_rsvps', 'INSERT,SELECT') then
    raise exception 'Role anon is missing INSERT/SELECT grants on public.guest_rsvps';
  end if;

  if exists (select 1 from pg_roles where rolname = 'authenticated')
     and not has_table_privilege('authenticated', 'public.guest_rsvps', 'INSERT,SELECT') then
    raise exception 'Role authenticated is missing INSERT/SELECT grants on public.guest_rsvps';
  end if;
end $$;

select
  'public.guest_rsvps' as table_name,
  count(*) filter (
    where column_name in (
      'id',
      'name',
      'created_at',
      'confirmed_at',
      'status',
      'notification_status',
      'notification_recipient',
      'notification_attempts',
      'notification_last_attempt_at',
      'notification_sent_at',
      'notification_error'
    )
  ) as required_column_count
from information_schema.columns
where table_schema = 'public'
  and table_name = 'guest_rsvps';
