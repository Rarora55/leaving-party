# Implementation Plan: Mobile Home and Message Usability Fixes

**Branch**: `[006-fix-mobile-ui]` | **Date**: 2026-04-19 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/006-fix-mobile-ui/spec.md`

## Summary

Deliver three mobile-priority UI fixes without desktop regressions: increase Home final-scene prominence by at least 20% on phones, keep normal vertical page scrolling available while typing on Drop a Message, and add a collapsible/expandable message composer card with arrow-direction toggle semantics.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2  
**Primary Dependencies**: React 19, Vite 8, React Router 7, Tailwind CSS 4, Motion 12, `@supabase/supabase-js` (existing only)  
**Storage**: Existing Supabase + localStorage integrations remain unchanged; new UI interaction states are ephemeral in component state only  
**Testing**: Vitest 4 + React Testing Library + `@testing-library/user-event`; targeted manual QA for keyboard-open mobile behavior and desktop regression  
**Target Platform**: Responsive web (mobile-first, tablet, desktop)  
**Project Type**: Frontend web application  
**Performance Goals**: Preserve smooth scrolling/interaction perception at mobile breakpoints; avoid scroll lock and avoid introducing additional heavy animation cost  
**Constraints**: Mobile behavior changes are primary; desktop layout and styling are preserved unless strictly required for shared stability; keep pixel-art continuity, reduced-motion safety, and data-driven copy/config patterns  
**Scale/Scope**: Home footer scene sizing behavior and Drop a Message composer interaction behavior only; no route additions or backend/schema changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Pre-Design Gate: PASS

- Stack remains inside the canonical React + Vite + React Router + Tailwind + Motion toolchain.
- Proposed edits stay modular across `shared/constants`, `features/home`, `pages/MessagesPage`, and `features/guest-messages` boundaries.
- Pixel-art identity is preserved by scaling existing scene composition rather than replacing art direction.
- Motion remains purposeful (state-change clarity for card collapse/expand) and must support reduced-motion-safe behavior.
- Toggle copy/state labels stay data-driven via existing shared content/constants patterns.
- No dependency additions are required.
- Performance focus explicitly covers keyboard-open mobile scroll and fixed/sticky composer behavior.

Post-Design Gate (after Phase 1): PASS

- Research/design artifacts define measurable mobile behavior and clear desktop non-regression boundaries.
- State, interactions, and copy ownership remain explicit and testable without violating constitution principles.

## Project Structure

### Documentation (this feature)

```text
specs/006-fix-mobile-ui/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- mobile-message-usability-contract.md
`-- tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
src/
|-- features/
|   |-- home/
|   |   `-- components/
|   |       |-- HomeFooter.tsx
|   |       `-- HomeFooterScene.tsx
|   |-- guest-messages/
|   |   `-- hooks/
|   |       `-- useStickyComposerViewport.ts
|   `-- components/
|       `-- GuestMessageForm.tsx
|-- pages/
|   `-- MessagesPage/
|       `-- MessagesPages.tsx
|-- shared/
|   |-- constants/
|   |   |-- home.constants.ts
|   |   `-- events.constants.ts
|   `-- types/
|       `-- site.types.ts
`-- tests/
    `-- messages/
```

**Structure Decision**: Keep visual-scale tokens and copy/state labels in shared constants, keep scene rendering decisions in Home feature components, keep composer orchestration in `MessagesPage`, and keep viewport/keyboard handling isolated in the guest-messages hook. This preserves separation of concerns and keeps reusable content/config data-driven.

## Phased Technical Plan

### Phase 0: Research and Decision Freeze

- Decide mobile-only home final-scene scaling method that guarantees at least +20% prominence and zero desktop visual drift.
- Decide message typing-scroll behavior policy that keeps page-level vertical scrolling available with keyboard open.
- Decide composer collapse/expand interaction model, toggle icon semantics, and content-preservation behavior.
- Decide reduced-motion handling expectations for collapse/expand transitions.
- Output: `research.md`.

### Phase 1: Design and Contracts

- Define UI-state entities for home mobile scene sizing, composer viewport inset behavior, and composer expansion state.
- Define interaction state transitions for toggle behavior, keyboard-open scrolling, and form-content persistence through card state changes.
- Define explicit UI contract for:
  - mobile scene prominence threshold,
  - typing-scroll continuity,
  - arrow icon semantics,
  - desktop non-regression boundary.
- Produce implementation sequence and QA checklist in `quickstart.md`.
- Output: `data-model.md`, `contracts/mobile-message-usability-contract.md`, `quickstart.md`.

### Phase 2: Implementation Planning

- Home final scene sizing:
  - Adjust mobile-only footer scene sizing tokens and/or frame behavior to enforce +20% visual prominence.
  - Verify desktop/tablet frame widths remain unchanged.
- Message typing-scroll behavior:
  - Remove/avoid nested scroll traps while keyboard is open.
  - Keep natural page vertical scrolling available from focused input/textarea contexts.
  - Ensure composer offset logic remains stable across viewport resize + visual viewport events.
- Collapsible composer card:
  - Add top-area toggle button with directional arrow semantics:
    - expanded state: down arrow,
    - collapsed state: up arrow.
  - Ensure repeated toggles keep icon/state synchronized.
  - Preserve unsent `guestName` and `message` values while collapsed/expanded.
- Validation:
  - Add/extend tests for mobile behavior contracts and desktop non-regression.
  - Execute lint + test suite and targeted manual viewport checks.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Mobile scene increase causes clipping or CTA overlap on short-height phones | Home finale readability regresses | Use mobile-specific sizing with short-height guard behavior and validate at constrained heights |
| Keyboard-open behavior varies between iOS and Android visual viewport handling | Scroll-lock bug persists on one platform | Keep viewport logic centralized in `useStickyComposerViewport` and test with mocked viewport in unit tests plus device QA |
| Collapsed composer accidentally drops in-progress inputs | User data loss and frustration | Keep form state in existing hook; collapse only affects presentation layer, not form state ownership |
| Toggle icon and expansion state drift during rapid taps | Confusing UX | Use single source of truth (`isCollapsed`) with deterministic icon rendering and transition-safe updates |
| Desktop gets unintended spacing/layout changes | Non-target regression | Explicitly scope new sizing/interaction classes to mobile breakpoint logic and add desktop assertions in tests |

## Acceptance Criteria (Implementation-Level)

- Phone viewport home final scene renders at least 20% larger than current mobile baseline while remaining readable without zoom.
- Desktop home final scene composition remains unchanged from existing baseline.
- On phones, focusing message inputs/textarea does not lock vertical page scrolling while keyboard is open.
- Composer card toggle collapses/expands reliably with correct arrow direction and preserves in-progress form values.
- Repeated toggle actions and viewport changes keep composer state and icon semantics consistent.
- Existing message submission behavior and backend integration remain unchanged.

## Testing Strategy

Unit/Component (Vitest + RTL):

- Home footer scene sizing tests for mobile-only prominence adjustments and desktop non-regression.
- Message page tests for keyboard-open scroll behavior contract and non-locking interaction paths.
- Composer toggle tests for:
  - initial expanded state,
  - collapse/expand transitions,
  - arrow icon semantics,
  - form value preservation during toggle cycles.

Integration:

- Message page composition flow with mocked viewport inset updates and user typing/toggle sequences.
- Home + message route behavior checks to ensure no navigation regressions.

Manual QA:

- Validate on representative viewports: `360x800`, `390x844`, `768x1024`, `1440x900`.
- On phones:
  - type in name/message fields with keyboard open and continuously scroll page vertically,
  - verify no blocked-scroll/pull-refresh interruption behavior from form interactions,
  - toggle card repeatedly and confirm icon direction/state consistency.
- On desktop:
  - verify home final scene and message page layout remain visually consistent with current baseline.

## File-by-File Change List

- `src/shared/constants/home.constants.ts`
  - Adjust/add mobile-specific footer scene sizing tokens to satisfy +20% prominence target.
- `src/features/home/components/HomeFooterScene.tsx`
  - Apply the mobile-only sizing token usage and preserve existing desktop rendering behavior.
- `src/pages/MessagesPage/MessagesPages.tsx`
  - Add composer collapse/expand state orchestration and top-area toggle control integration.
- `src/features/components/GuestMessageForm.tsx`
  - Add toggle trigger surface and collapse-aware rendering while preserving form semantics and accessibility.
- `src/features/guest-messages/hooks/useStickyComposerViewport.ts`
  - Refine keyboard/viewport handling so typing contexts do not trap page scrolling.
- `src/shared/constants/events.constants.ts`
  - Add centralized copy/labels for composer toggle state text if required.
- `tests/messages/MessagesPage.a11y.test.tsx`
  - Extend accessibility and keyboard-open behavior assertions.
- `tests/messages/MessagesPage.formFlow.test.tsx`
  - Add interaction tests for collapse/expand and form-state preservation.
- `tests/messages/MessagesPage.layout.test.tsx`
  - Add structural assertions for toggle placement and desktop stability boundaries.

## Complexity Tracking

No constitution violations expected; section intentionally left without entries.
