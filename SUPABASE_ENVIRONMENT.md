# Supabase Environment Contract

The RSVP and guest message flows read Supabase configuration from Vite client
environment variables at build time.

## Primary Production Deployment Target

Release-readiness validation for this feature is scoped to one deployment
target:

- **Target**: Vercel static deployment of the Vite build output (`dist/`)
- **Build command**: `npm run build`
- **Required environment source**: Hosting platform build-time environment
  variables

Other targets may be supported later, but they are out of scope for this
release-readiness pass.

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
  - `id`
  - `name`
  - `created_at`
  - `confirmed_at`
  - `status`
  - `notification_status`
  - `notification_recipient`
  - `notification_attempts`
  - `notification_last_attempt_at`
  - `notification_sent_at`
  - `notification_error`
- Required read path for latest confirmations:
  - select where `status = 'confirmed'`, ordered by `confirmed_at` and
    `created_at` descending.
- Required RLS permissions for browser anon key:
  - `insert` policy allowing valid RSVP rows.
  - `select` policy allowing confirmed rows for the latest confirmations feed.

Use migrations:
- `supabase/migrations/20260414164000_guest_rsvps_contract.sql`
- `supabase/migrations/20260417113000_guest_rsvps_schema_reconcile.sql`

to bootstrap and reconcile this contract safely if it is missing or drifted.

## Schema Verification Command

Run:

- `npm run verify:rsvp-schema`

Required environment variable:

- `SUPABASE_DB_URL` (direct Postgres connection string for the target DB)

CI usage:

- GitHub Actions workflow: `.github/workflows/ci.yml`
- Configure repository secret: `SUPABASE_DB_URL`

Verification SQL lives at:

- `supabase/scripts/verify-rsvp-schema.sql`

The command fails fast if required RSVP columns, constraints, RLS, policies, or
anon/authenticated `INSERT` + `SELECT` grants are missing.

## Security Note

- The browser must only use the public anon key.
- Never place a Supabase service role key in a client-visible environment file.

## Publication Blockers

The following conditions block publication readiness:

- Missing required client-safe Supabase variables.
- Any verified real secret in tracked files or git history.
- Failed mandatory release gates (`npm run check:release` and schema verification
  when `SUPABASE_DB_URL` is available).
