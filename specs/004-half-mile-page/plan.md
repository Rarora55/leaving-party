# Implementation Plan: The Half Mile Map Page

**Branch**: `[004-half-mile-page]` | **Date**: 2026-04-17 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/004-half-mile-page/spec.md`

## Summary

Add a new `The Half Mile` route and page that renders the existing map artwork centered and full-width against the same sky atmosphere used on Home, with randomized cloud decoration and invisible interactive brewery hotspots. Hotspots open a single accessible brewery popover at a time, external links open in a new tab, a fixed lower CTA returns to Home, and the destination is added to shared navbar configuration.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2  
**Primary Dependencies**: React 19, Vite 8, React Router 7, Tailwind CSS 4, Motion 12, Radix Dialog 1.1 (existing only)  
**Storage**: Static typed constants for map/cloud/hotspot/navigation configuration; no new Supabase or localStorage behavior  
**Testing**: Vitest 4 + React Testing Library + `@testing-library/user-event`; targeted manual QA for responsive and keyboard behavior  
**Target Platform**: Responsive web (mobile-first, tablet, desktop)  
**Project Type**: Frontend web application  
**Performance Goals**: Maintain smooth interaction and animation perception on modern devices; avoid hotspot misalignment or layout shift during resize  
**Constraints**: Preserve pixel-art atmosphere, reuse Home sky styling, keep one-open-popover rule, support pointer + keyboard interactions, keep content data-driven, and avoid new dependencies  
**Scale/Scope**: One new route/page and related navigation/config/test updates; no RSVP/message backend or schema changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Pre-Design Gate: PASS

- Stack remains within the canonical frontend toolchain and existing dependencies.
- Work is modularized across app router, page shell, feature components, shared constants/types, and tests.
- Pixel-art continuity is preserved by reusing Home sky tokens and existing cloud/map artwork.
- Motion is limited to atmospheric behavior with reduced-motion-safe defaults.
- Repeatable content (breweries, hotspots, clouds, CTA metadata) is centralized in typed configuration.
- Architecture keeps future CMS/content-admin migration viable by separating content data from render logic.
- No dependency additions are planned.
- Performance constraints are addressed through deterministic layout anchoring and lightweight overlay interactions.

Post-Design Gate (after Phase 1): PASS  
Design artifacts keep boundaries clear, accessibility explicit, and configuration reusable without violating constitution principles.

## Project Structure

### Documentation (this feature)

```text
specs/004-half-mile-page/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- half-mile-map-contract.md
`-- tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
src/
|-- app/
|   `-- AppRouter.tsx
|-- pages/
|   `-- HalfMilePage/
|       `-- HalfMilePage.tsx               # new
|-- features/
|   |-- half-mile/
|   |   `-- components/
|   |       |-- HalfMileScene.tsx          # new
|   |       |-- HalfMileHotspots.tsx       # new
|   |       `-- HalfMileBreweryCard.tsx    # new
|   `-- home/
|       `-- components/                    # reference-only for visual parity
|-- shared/
|   |-- constants/
|   |   |-- navigation.constants.ts
|   |   |-- home.constants.ts              # token reuse
|   |   `-- halfMile.constants.ts          # new
|   `-- types/
|       `-- site.types.ts
`-- tests/
    `-- half-mile/
        |-- HalfMilePage.layout.test.tsx   # new
        |-- HalfMilePage.hotspots.test.tsx # new
        `-- HalfMilePage.a11y.test.tsx     # new
```

**Structure Decision**: Keep route registration in `AppRouter`, page composition in `pages/HalfMilePage`, interaction rendering in `features/half-mile/components`, and all repeatable map/cloud/brewery/nav metadata in `shared/constants` + `shared/types`. This keeps scene content data-driven and isolated from routing logic.

## Phased Technical Plan

### Phase 0: Research and Decision Freeze

- Confirm Home sky token reuse strategy (`home.constants`) for background parity without duplicating style values.
- Decide cloud randomization model that remains decorative and never blocks hotspot/CTA interaction.
- Decide hotspot anchoring model using map-relative coordinates to keep brewery alignment stable across breakpoints.
- Decide popover interaction contract for one-open-at-a-time, outside-click dismissal, close control, and `Esc` close.
- Confirm external-link behavior (`new tab` + safe link attributes) and keyboard semantics for invisible hotspots.
- Output: `research.md`.

### Phase 1: Design and Contracts

- Define typed entities for breweries, hotspots, card state, cloud instances, and CTA/navigation metadata.
- Define state transitions for hotspot activation, card dismissal, and keyboard interaction.
- Define UI contract for layout, interactions, accessibility, and responsive behavior.
- Document implementation and QA sequence in `quickstart.md`.
- Output: `data-model.md`, `contracts/half-mile-map-contract.md`, `quickstart.md`.

### Phase 2: Implementation Planning

- Route and page scaffolding:
  - Add `THE_HALF_MILE_ROUTE` and destination entry in `navigation.constants.ts`.
  - Register route in `AppRouter` and wire `HalfMilePage`.
- Scene composition:
  - Build page shell with Home-sky background token reuse.
  - Render map asset full-width and centered with explicit top/bottom spacing.
  - Render randomized decorative clouds with pointer-events disabled.
- Interactive map overlay:
  - Add invisible circular hotspots bound to five brewery definitions.
  - Enforce single active brewery card.
  - Support pointer and keyboard activation (`Enter`/`Space`), and `Esc` close.
  - Provide outside-click and explicit close-control dismissal.
  - Keep popover placement readable near viewport edges.
- Navigation and CTA:
  - Add `The Half Mile` navbar destination and verify active-route behavior.
  - Add lower fixed CTA that navigates back to Home.
- Validation:
  - Add automated tests for layout/rendering, hotspot-card behavior, keyboard flow, and link target behavior.
  - Run responsive/manual checks for desktop/mobile alignment and usability.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Hotspot coordinates drift from brewery markers on narrow or wide viewports | Core interaction becomes misleading | Anchor hotspots with percentage-based map coordinates tied to map intrinsic aspect ratio and validate at multiple breakpoints |
| Random cloud placement overlaps CTA or hotspots | Blocks key interactions | Apply safe-zones and `pointer-events: none` on cloud layers; clamp random coordinates away from CTA zone |
| Invisible hotspots are inaccessible to keyboard users | Accessibility regression | Make hotspots focusable with visible focus affordance and explicit keyboard handlers |
| Multiple cards appear simultaneously | State/UX inconsistency | Centralize active-card state as single nullable id and close previous on every open |
| External links replace app context | Navigation friction | Enforce `target="_blank"` with safe rel attributes and verify in tests |

## Acceptance Criteria (Implementation-Level)

- `The Half Mile` route is reachable from navbar and renders the new page.
- Map renders full-width, centered, with preserved top/bottom margin at target breakpoints.
- Background style is visually aligned with Home sky tokens.
- Cloud decoration appears in varied positions and does not block CTA/hotspots.
- All five brewery hotspots open correct card content; only one card can be open.
- Card closes via outside-click, close control, hotspot switch, and `Esc`.
- Hotspots are keyboard-focusable and open with `Enter`/`Space`.
- Brewery links open in a new tab.
- Bottom CTA navigates back to Home from desktop and mobile layouts.

## Testing Strategy

Unit/Component (Vitest + RTL):

- Route rendering test ensures new destination navigates to `The Half Mile` page.
- Hotspot tests verify:
  - correct brewery card content per hotspot,
  - one-open-card constraint,
  - dismissal via outside click and explicit close control,
  - keyboard open/close behavior.
- Link behavior test verifies brewery links are rendered with new-tab semantics.
- Layout test verifies map container/overlay layers render expected structure classes.

Integration:

- App shell + navigation flow verifies navbar entry and return CTA pathing.
- Resize-oriented assertions validate hotspot anchoring and map visibility constraints.

Manual QA:

- Verify at `360x800`, `768x1024`, `1440x900`:
  - map centering/full-width behavior,
  - top and bottom spacing,
  - hotspot alignment accuracy,
  - card readability near edges,
  - CTA placement and tap/click reliability.
- Verify keyboard-only flow:
  - focus reaches hotspots,
  - `Enter`/`Space` opens card,
  - `Esc` closes card,
  - focus visibility remains clear.
- Verify each brewery link opens in a new tab and does not unload the current page.

## File-by-File Change List

- `src/shared/constants/navigation.constants.ts`
  - Add route and destination metadata for `The Half Mile`.
- `src/app/AppRouter.tsx`
  - Register `The Half Mile` route and page component.
- `src/pages/HalfMilePage/HalfMilePage.tsx` (new)
  - Add page-level wrapper and mount `HalfMileScene`.
- `src/shared/constants/halfMile.constants.ts` (new)
  - Define map asset, brewery hotspot coordinates, cloud config, and CTA metadata.
- `src/features/half-mile/components/HalfMileScene.tsx` (new)
  - Compose background, map, clouds, hotspots, and CTA.
- `src/features/half-mile/components/HalfMileHotspots.tsx` (new)
  - Render interactive hotspot controls and manage active-card transitions.
- `src/features/half-mile/components/HalfMileBreweryCard.tsx` (new)
  - Render lightweight readable popover with close behavior and external link.
- `src/shared/types/site.types.ts`
  - Add/extend typed interfaces for Half Mile entities as needed.
- `tests/half-mile/HalfMilePage.layout.test.tsx` (new)
  - Validate scene structure and responsive layout primitives.
- `tests/half-mile/HalfMilePage.hotspots.test.tsx` (new)
  - Validate hotspot-card behavior, dismissal semantics, and one-open-card rule.
- `tests/half-mile/HalfMilePage.a11y.test.tsx` (new)
  - Validate keyboard interactions and new-tab link behavior.

## Complexity Tracking

No constitution violations expected; section intentionally left without entries.
