# We Are Leaving

Pixel-art farewell invitation website with three main experiences:

- animated landing page
- RSVP confirmation flow
- public guest message wall

## Primary Production Deployment Target

This project is currently release-validated for:

- **Target**: Vercel static deployment
- **Build output**: `dist/`
- **Build command**: `npm run build`

## Requirements

- Node.js 22.x
- npm 10+

## Install

```bash
npm ci
```

## Environment Configuration

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Optional compatible alias:

```env
VITE_SUPABASE_PUBLISHABLE_KEY=your-public-anon-key
```

Important:

- only client-safe `VITE_*` values belong in browser-visible environment files
- never place service role or other server-only secrets in `VITE_*` variables

For full Supabase environment contract details, see
[`SUPABASE_ENVIRONMENT.md`](./SUPABASE_ENVIRONMENT.md).

## Run Locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Core Release Gates

Run mandatory quality gates:

```bash
npm run check:release
```

Run full gate pack (requires DB access secret):

```bash
npm run check:release:full
```

Notes:

- `npm run check:release` executes `lint`, `test`, and `build`
- `npm run verify:rsvp-schema` requires `SUPABASE_DB_URL`

## Deploy (Primary Target: Vercel)

1. Connect the repository to Vercel.
2. Configure build command: `npm run build`.
3. Configure output directory: `dist`.
4. Set required environment variables in Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY`
5. Trigger deployment.
6. Run manual pre-launch checks below before approving production launch.

## Manual Pre-Launch Checklist

- [ ] Repository hygiene reviewed; no temporary/duplicate/accidental tracked artifacts remain.
- [ ] No unresolved `needs-confirmation` artifacts remain in release evidence.
- [ ] Real secret scan for tracked files and git history completed; no unresolved incidents.
- [ ] `npm run check:release` passed on current release candidate.
- [ ] `npm run verify:rsvp-schema` passed (or explicit blocker noted if DB access unavailable).
- [ ] Core routes and fallback behavior smoke-validated.
- [ ] Metadata baseline validated (`title`, `description`, `viewport`, `favicon`).
- [ ] Basic failure-state UX validated for missing/invalid Supabase config.
- [ ] Deployment configuration validated for the primary target.
- [ ] Documentation trial from clean checkout completed without undocumented steps.

## Project Scripts

- `npm run dev` - start local dev server
- `npm run lint` - run ESLint
- `npm test` - run Vitest
- `npm run build` - compile and build production assets
- `npm run verify:rsvp-schema` - validate RSVP DB schema contract
- `npm run check:release` - run core release gate pack
- `npm run check:release:full` - run core gates plus schema verification
