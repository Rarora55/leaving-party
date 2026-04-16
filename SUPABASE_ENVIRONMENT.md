# Supabase Environment Contract

The RSVP and guest message flows read Supabase configuration from Vite client
environment variables at build time.

## Required Variables

- `VITE_SUPABASE_URL`
- One client key variable:
  - `VITE_SUPABASE_ANON_KEY` (preferred), or
  - `VITE_SUPABASE_PUBLISHABLE_KEY` (compatible alias)

## Where They Must Live

- Local development: place them in `.env.local` in the Vite project root, next
  to the `package.json` and `vite.config.ts` that run the app.
- Production: define them as build-time environment variables in the hosting
  platform or deployment pipeline.

## How They Load

- Vite exposes only `import.meta.env.VITE_*` variables to browser code.
- The app validates the Supabase URL and anon key when the client starts.
- After changing `.env.local`, restart the dev server so Vite reloads the
  environment.

## Failure Behavior

- Users see a concise fallback message: the RSVP flow is temporarily
  unavailable.
- Developers get a console error with the missing or invalid variables and the
  placement contract.

## Database Contract

- The RSVP flow writes to `public.guest_rsvps`.
- Required columns used by the frontend insert:
  - `name`
  - `confirmed_at`
  - `status`
  - `notification_status`
  - `notification_attempts`
  - `notification_error`
- Required read path for latest confirmations:
  - select where `status = 'confirmed'`, ordered by `confirmed_at` and
    `created_at` descending.
- Required RLS permissions for browser anon key:
  - `insert` policy allowing valid RSVP rows.
  - `select` policy allowing confirmed rows for the latest confirmations feed.

Use migration `supabase/migrations/20260414164000_guest_rsvps_contract.sql` to
bootstrap this contract safely if it is missing.

## Security Note

- The browser must only use the public anon key.
- Never place a Supabase service role key in a client-visible environment file.
