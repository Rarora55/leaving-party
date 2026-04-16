# Leaving-Party Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-15

## Active Technologies
- TypeScript + React + React, Vite, React Router, Tailwind CSS, Motion (002-fix-ui-navigation)
- Browser localStorage for site data, Supabase for guest list and messages (002-fix-ui-navigation)
- TypeScript + React 18 + React, Vite, React Router, Tailwind CSS, Motion, Radix Dialog, Lucide React (003-redefine-home-navigation)
- Static typed scene/navigation configuration in `src/shared/constants`; existing localStorage and Supabase integrations remain unchanged for RSVP and messages (003-redefine-home-navigation)
- Static typed scene and navigation configuration in `src/shared/constants`; no new localStorage or Supabase behavior (004-layered-home-footer)
- TypeScript 5.9 + React 19.2 + React 19, Vite 8, React Router 7, Tailwind CSS 4, Motion 12, `@supabase/supabase-js`, browser `localStorage` for temporary form recovery only (001-simplify-rsvp-page)
- Supabase `guest_rsvps` table as the authoritative RSVP store; browser `localStorage` only for unsent form recovery; new Supabase Edge Function (or equivalent secure server-side endpoint) for email delivery and notification-status updates (001-simplify-rsvp-page)
- TypeScript 5.9, React 19.2 + React 19, React Router 7, Tailwind CSS 4, Motion 12, `@supabase/supabase-js` (existing only) (002-simplify-message-page)
- Existing Supabase `guest_messages` reads/writes via `guestMessages.api.ts`; existing localStorage draft recovery via `siteStorage`; no storage changes (002-simplify-message-page)

- TypeScript + React 18+ + React, Vite, React Router v6+, Tailwind CSS, Motion (Framer Motion) (001-farewell-party-site)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript + React 18+: Follow standard conventions

## Recent Changes
- 002-simplify-message-page: Added TypeScript 5.9, React 19.2 + React 19, React Router 7, Tailwind CSS 4, Motion 12, `@supabase/supabase-js` (existing only)
- 001-simplify-rsvp-page: Added TypeScript 5.9 + React 19.2 + React 19, Vite 8, React Router 7, Tailwind CSS 4, Motion 12, `@supabase/supabase-js`, browser `localStorage` for temporary form recovery only
- 004-layered-home-footer: Added TypeScript + React 18 + React, Vite, React Router, Tailwind CSS, Motion


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
