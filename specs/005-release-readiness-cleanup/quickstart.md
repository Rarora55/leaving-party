# Quickstart: 005-release-readiness-cleanup

This runbook executes pre-release cleanup and publication-readiness checks while
keeping product behavior and visual design unchanged except for blocker fixes.

## 1) Prerequisites

- Node.js 22.x
- npm
- repository access
- optional DB connectivity secret for schema verification:
  - `SUPABASE_DB_URL`

## 2) Install Dependencies

```bash
npm ci
```

## 3) Configure Environment

1. Create `.env.local` from `.env.example`.
2. Provide required client-safe values:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY` (or `VITE_SUPABASE_PUBLISHABLE_KEY`)
3. Confirm no server-only secrets are present in `VITE_*` variables.

## 4) Execute Mandatory Core Gates

```bash
npm run check:release
```

Optional full gate (requires `SUPABASE_DB_URL`):

```bash
npm run check:release:full
```

## 5) Run Repository Hygiene Pass

1. Inventory tracked artifacts.
2. Classify each (`required`, `removable`, `needs-confirmation`).
3. Resolve every `needs-confirmation` item before publication.
4. Align `.gitignore` with generated/local artifacts.

## 6) Run Publication Safety Checks

1. Review tracked files for real secret exposure.
2. Review git history for real secret exposure.
3. If real secrets exist, revoke/rotate and remediate before release.

## 7) Validate Runtime Release Blockers

1. Validate primary routes and wildcard fallback behavior.
2. Validate metadata baseline in `index.html`.
3. Validate failure-state UX for missing/invalid runtime configuration.

## 8) Validate Primary Deployment Target

1. Confirm target is documented in `README.md`.
2. Validate build and config workflow for the primary target only.

## 9) Final Documentation and Launch Checklist

Ensure primary docs include install, config, build, deployment prep, and manual
pre-launch checks.

---

## Execution Log

### Hygiene Validation

- Artifact inventory file: `specs/005-release-readiness-cleanup/evidence/tracked-artifact-inventory.md`
- Retained-artifact rationale: `specs/005-release-readiness-cleanup/evidence/retained-artifacts-rationale.md`
- Notes:
  - Removed `Components/RoadLayers/Sample2.png` (unused asset).
  - Removed `Components/RoadLayers/sample.png` (unused asset).
  - Removed `supabase/.temp/cli-latest` (temporary CLI artifact).
  - `needs-confirmation` entries remaining in inventory: `0`.

### Security Validation

- Secret review log: `specs/005-release-readiness-cleanup/evidence/secret-exposure-log.md`
- Notes:
  - Tracked-file scan completed with no verified real secrets.
  - Git-history regex scan completed with no verified real secrets.
  - Blocker status: PASS.

### Gate Command Outcomes

- `npm run lint`: PASS (`eslint .`)
- `npm test`: PASS (21 files, 60 tests passed)
- `npm run build`: PASS (`tsc -b && vite build`)
- `npm run verify:rsvp-schema`: BLOCKED (missing required `SUPABASE_DB_URL`)
- `npm run check:release`: PASS (`lint` + `test` + `build`)

### Runtime and Metadata Validation

- Route fallback check: PASS (`tests/release-readiness/router-metadata-smoke.test.tsx`)
- Metadata baseline check: PASS (`index.html` title/description/theme-color/viewport verified)
- Env failure-state UX check: PASS (`tests/release-readiness/env-config-failure.test.ts`)

### Documentation Validation

- Clean-checkout documentation trial:
  - `npm ci` attempted and failed due OS-level file lock on `node_modules/.../lightningcss...node`.
  - Non-install docs steps validated against current workspace and gate runs.
- Primary deployment target documented: PASS (`README.md`, `SUPABASE_ENVIRONMENT.md`)
- Manual pre-launch checklist documented: PASS (`README.md`)

### Responsive, Accessibility, and Motion Non-Regression

- Responsive verification (mobile/tablet/desktop): PASS via existing component/integration tests in `tests/messages`, `tests/guest-list`, `tests/half-mile`.
- Keyboard/focus/a11y verification: PASS via existing a11y suites (`tests/messages/MessagesPage.a11y.test.tsx`, `tests/half-mile/HalfMilePage.a11y.test.tsx`).
- Reduced-motion behavior verification: PASS via navigation integration tests (`tests/navigation/AppShell.navigation.test.tsx`).
