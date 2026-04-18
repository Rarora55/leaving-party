# Quickstart: 003-fix-navbar-interaction

## Goal

Implement a full-screen, Home-sky-matched navigation overlay with clear link set (`Home`, `Drop a Message`, `MessageList`), accessible keyboard behavior, reduced-motion support, and data-driven extensibility.

## Prerequisites

- Node.js + npm installed
- Dependencies installed:

```bash
npm install
```

## Implementation Sequence

1. Update shared navigation config in `src/shared/constants/navigation.constants.ts`:
   - Ensure overlay destinations are Home, Drop a Message, MessageList.
   - Keep destination definitions centralized and extendable.
2. Update related type definitions in `src/shared/types/site.types.ts` if needed:
   - Reduce brittle literal unions that block scalable link additions.
3. Update `src/app/AppShell.tsx`:
   - Trigger closed state: white single line.
   - Trigger open state: black X.
   - Preserve current page on close unless route selection occurs.
4. Update `src/features/components/PersistentNavigation.tsx`:
   - Full-screen overlay with Home-sky visual style parity.
   - Active-route indicator.
   - Same-route selection closes without navigation.
   - Different-route selection navigates and closes.
   - Non-link-space click/tap closes.
5. Update `src/features/components/useNavigationOverlay.ts`:
   - Validate open/close source-of-truth behavior.
   - Keep body scroll/interaction lock stable.
6. Apply reduced-motion behavior for overlay + trigger transitions.
7. Add/adjust tests in `tests/navigation/` for contract and interaction behavior.

## Verification Commands

```bash
npm run lint
npm test
```

## Manual QA Checklist

1. Visual/full-screen:
   - Open menu covers the entire viewport at `360x800`, `768x1024`, and `1440x900`.
   - Background style matches Home sky feel (color + glow/texture direction).
2. Destinations:
   - Menu displays exactly Home, Drop a Message, MessageList.
   - Active route is visually indicated.
3. Trigger:
   - Closed: single white line.
   - Open: black X.
   - Toggle close keeps user on current page when no destination selected.
4. Interaction/accessibility:
   - `Esc` closes overlay.
   - Focus is trapped while open.
   - Focus returns to trigger after close.
   - Background cannot be scrolled/interacted with while open.
5. Behavior specifics:
   - Selecting current route closes without navigation.
   - Selecting different route navigates then closes.
   - Clicking/tapping non-link menu space closes without navigation.
6. Reduced motion:
   - With reduced-motion preference enabled, transitions are near-instant but clear.

## Out of Scope

- Backend/Supabase schema changes
- New route creation unrelated to required nav destinations
- Home page scene redesign beyond shared sky-style token reuse

## Execution Results

- Date: 2026-04-17
- Automated navigation contract tests: PASS (`tests/navigation/*.test.tsx`)
- `npm run lint`: PASS
- `npm test`: PASS (`16` files, `43` tests)
- Responsive/accessibility verification log:
  - Fullscreen/inert background behavior validated by integration tests and code-level checks.
  - Keyboard flow (`Esc`, focus return, same-route close) validated in navigation tests.
  - Reduced-motion behavior validated via matchMedia-driven tests.
  - Physical-device visual QA at all target breakpoints should still be rechecked before release.
