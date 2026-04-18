# Implementation Plan: Fullscreen Navbar Interaction

**Branch**: `[003-fix-navbar-interaction]` | **Date**: 2026-04-17 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/003-fix-navbar-interaction/spec.md`

## Summary

Redefine the persistent navigation into a full-screen, Home-sky-aligned overlay with intentional open/close behavior and clear route choices (`Home`, `Drop a Message`, `MessageList`). The menu trigger must morph from a single white line (closed) to a black X (open), preserve current-page context when closed without route change, support keyboard/focus accessibility (`Esc`, focus trap, focus return), lock background scroll/interactions while open, support reduced motion, and stay data-driven so new links can be added without page-hardcoded logic.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2  
**Primary Dependencies**: React 19, React Router 7, Tailwind CSS 4, Motion 12, Radix Dialog 1.1 (existing only)  
**Storage**: No new storage; existing navigation overlay localStorage helpers may remain untouched or be removed only if unused by this feature scope  
**Testing**: Vitest 4 + React Testing Library + `@testing-library/user-event`; targeted manual responsive and accessibility QA  
**Target Platform**: Responsive web (mobile-first, tablet, desktop)  
**Project Type**: Frontend web application  
**Performance Goals**: Open/close interaction remains smooth and responsive, with no visible transition stalls during rapid toggles  
**Constraints**: Preserve pixel-art identity, reuse Home sky visual language, keep dependencies unchanged, enforce keyboard + reduced-motion behavior, and keep navigation configuration extendable  
**Scale/Scope**: Shared app shell navigation used by Home, Guest List, and Message pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Pre-Design Gate: PASS

- Stack remains within canonical frontend stack; no new dependency is required.
- Planned changes stay modular: app shell + navigation component + shared constants/types + tests.
- Visual direction explicitly reuses Home sky tokens to preserve pixel-art continuity.
- Motion is interaction-driven (state transition clarity), with reduced-motion fallback.
- Navigation labels/routes are modeled in shared constants/types, not page-local logic.
- CMS/admin readiness remains viable because route metadata stays centralized and typed.
- Performance risk is bounded to one overlay interaction surface with explicit rapid-toggle checks.

Post-Design Gate (after Phase 1): PASS  
Design artifacts keep architecture modular, content data-driven, accessibility-first, and compliant with reduced-motion/performance constraints.

## Project Structure

### Documentation (this feature)

```text
specs/003-fix-navbar-interaction/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- navigation-overlay-contract.md
`-- tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
src/
|-- app/
|   `-- AppShell.tsx
|-- features/components/
|   |-- PersistentNavigation.tsx
|   `-- useNavigationOverlay.ts
|-- shared/constants/
|   |-- home.constants.ts
|   `-- navigation.constants.ts
|-- shared/types/
|   `-- site.types.ts
`-- tests/
    `-- navigation/
        |-- AppShell.navigation.test.tsx
        `-- PersistentNavigation.contract.test.tsx
```

**Structure Decision**: Keep overlay orchestration in `AppShell`, interaction/presentation in `PersistentNavigation`, and all route/menu metadata in `shared/constants` + `shared/types`. This maintains a single extensible navigation source of truth and avoids page-level branching.

## Phased Technical Plan

### Phase 0: Research and Decision Freeze

- Confirm a robust full-screen overlay strategy with Radix Dialog that supports:
  - focus trap,
  - `Esc` close,
  - return focus to trigger,
  - background scroll and interaction lock.
- Define Home-sky visual token reuse strategy for the menu background (color + glow/texture parity).
- Define reduced-motion interaction behavior for both overlay transition and icon morph.
- Decide current-route item behavior and non-link-area click behavior to match clarified spec.
- Output: `research.md`.

### Phase 1: Design and Contracts

- Define UI/domain entities and transitions for:
  - menu open/closed state,
  - trigger icon visual state,
  - destination selection outcomes (same route vs different route),
  - reduced-motion variant behavior.
- Define navigation overlay contract for accessibility, behavior, and rendering expectations.
- Define implementation/QA execution path in `quickstart.md`.
- Output: `data-model.md`, `contracts/navigation-overlay-contract.md`, `quickstart.md`.

### Phase 2: Implementation Planning

- Update navigation data model:
  - Ensure overlay links are Home, Drop a Message, MessageList.
  - Keep destination config extensible and type-safe.
- Update trigger behavior in `AppShell`:
  - Closed: white single line.
  - Open: black X.
  - Toggle close keeps user on current page unless a destination is selected.
- Update `PersistentNavigation` overlay:
  - Full-screen coverage.
  - Home-sky visual style tokens.
  - Active-route indication; selecting current route closes without navigation.
  - Click/tap on non-link menu space closes menu.
- Preserve interaction guarantees:
  - focus trap while open,
  - `Esc` closes,
  - focus returns to trigger,
  - background scroll/interaction locked.
- Implement reduced-motion handling for overlay and icon transitions.
- Add/adjust tests for contract behavior, keyboard interactions, and link outcomes.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Overlay appears full-screen visually but background still interactive | UX and accessibility regression | Add explicit tests for blocked background interaction and locked body scroll while open |
| Trigger icon state drifts from overlay state under rapid toggles | Confusing UI feedback | Drive icon visuals strictly from one `isOpen` source of truth and test rapid open/close sequences |
| Current-route selection accidentally triggers redundant navigation | Scroll/context loss | Add explicit branch for same-route selection to close-only behavior |
| Reduced-motion fallback still animates too much | Accessibility non-compliance | Use reduced-motion preference branch that minimizes duration/intensity for both overlay and icon |
| Hardcoded route labels reappear in component markup | Extension friction | Keep labels/routes/order in shared typed navigation constants and render list from config |

## Acceptance Criteria (Implementation-Level)

- Overlay covers the full viewport on mobile/tablet/desktop with Home-sky visual treatment.
- Overlay shows exactly these destinations: `Home`, `Drop a Message`, `MessageList`.
- Trigger style states match contract: closed = white line, open = black X.
- Toggle close without destination selection keeps current page and context.
- Same-route destination selection closes only; different-route selection navigates then closes.
- Focus trap, `Esc` close, and focus return to trigger are verifiable in keyboard tests.
- Background interaction and background scroll are disabled while overlay is open.
- Reduced-motion preference uses minimal/near-instant transitions while preserving clear state feedback.
- Adding a new destination in shared config renders it in menu without page-specific conditional logic edits.

## Testing Strategy

Unit/Component (Vitest + RTL):

- `PersistentNavigation` renders required destinations and active-state semantics.
- Same-route selection closes without route transition; different-route selection triggers navigation + close.
- Non-link area click/tap closes the menu and keeps route unchanged.
- Trigger icon class/state reflects `isOpen` exactly.

Integration:

- `AppShell` open/close flow validates:
  - `Esc` close,
  - focus return to trigger,
  - background lock behavior while open.
- Route transitions from overlay close correctly and preserve closed state.

Manual QA:

- Verify full-screen overlay and Home-sky style parity at `360x800`, `768x1024`, `1440x900`.
- Verify rapid toggle stability (no stuck intermediate states).
- Verify reduced-motion mode in browser accessibility settings.
- Verify keyboard-only traversal and visible focus states.

## File-by-File Change List

- `src/app/AppShell.tsx`
  - Update trigger visual states and wiring for close behavior parity.
- `src/features/components/PersistentNavigation.tsx`
  - Rebuild overlay visual treatment and interaction contract (full-screen, links, active state, non-link close behavior).
- `src/features/components/useNavigationOverlay.ts`
  - Confirm source-of-truth open/close mechanics, background lock safety, and optional close semantics.
- `src/shared/constants/navigation.constants.ts`
  - Ensure destination definitions match required links and stay extendable.
- `src/shared/types/site.types.ts`
  - Remove brittle label unions if needed to support scalable destination additions.
- `src/shared/constants/home.constants.ts` (reference-only or shared token extraction)
  - Reuse Home sky visual tokens for overlay style alignment.
- `tests/navigation/AppShell.navigation.test.tsx` (new or updated)
  - Cover trigger state, keyboard close, focus restoration, and route preservation.
- `tests/navigation/PersistentNavigation.contract.test.tsx` (new or updated)
  - Cover rendered destinations, active behavior, same-route close-only, and non-link area close.

## Complexity Tracking

No constitution violations expected; section intentionally left without entries.
