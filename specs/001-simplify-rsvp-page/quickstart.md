# Quickstart: Simplified RSVP Route

## Prerequisites

- Working frontend install with `npm install`
- Supabase project and credentials configured for the app:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - Define these values in `.env.local` for local development or as build-time environment variables on the production host.
  - Vite loads `VITE_`-prefixed variables into client code at build time via `import.meta.env`.
- Secure server-side notification secrets configured for the edge function:
  - provider API key or SMTP credentials
  - configured host recipient (initially `ramwill1991@gmail.com`)

## Implementation Steps

1. Update the RSVP contracts and typed data model.
   - Extend `src/shared/types/site.types.ts`
   - Add RSVP page copy / notification config in `src/shared/constants/events.constants.ts`
   - Expose reusable Home atmosphere tokens in `src/shared/constants/home.constants.ts`

2. Add Supabase schema support.
   - Create a migration that adds notification metadata fields to `guest_rsvps`
   - Update `src/services/supabase/client.ts` table typings

3. Add secure notification delivery.
   - Create `supabase/functions/send-rsvp-notification`
   - Make the function update `notification_status`, attempts, timestamps, and error text
   - Keep provider credentials out of the browser

4. Refactor the RSVP service layer.
   - Add `fetchLatestConfirmedRSVPs(limit = 3)`
   - Update `submitRSVP` to separate persistence success from notification success
   - Remove GuestList page dependence on `readRsvps` / `appendRsvp`

5. Refactor feature hooks and UI.
   - Update `useRSVPForm.ts`
   - Add `useLatestConfirmations.ts`
   - Create `LatestConfirmations.tsx`
   - Rebuild `GuestListPage.tsx` into the required two-block Home-aligned layout

6. Add tests.
   - Configure Vitest + React Testing Library + `jsdom`
   - Cover validation, successful submit, duplicate names, newest-first order, max-3 behavior, and persistence-vs-notification separation

## Verification

- `npm run lint`
- `npx vitest run`
- Manual QA on mobile and desktop:
  - Only two primary content blocks are visible
  - Empty or whitespace-only names are blocked inline
  - Successful submit updates latest confirmations immediately
  - Latest confirmations always show at most three names, newest first
  - RSVP remains confirmed even if notification status returns `retry_required`
  - Home and RSVP feel visually continuous

## Operational Follow-Up

- Query `guest_rsvps` for rows where `notification_status = 'retry_required'`
- Reinvoke the notification function with the affected RSVP id for manual or scheduled retry
- Keep the retry path outside the guest-facing route UI unless a separate admin surface is introduced later
