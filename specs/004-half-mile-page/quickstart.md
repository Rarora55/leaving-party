# Quickstart: 004-half-mile-page

## Goal

Implement `The Half Mile` page with centered full-width map rendering, Home-sky background continuity, randomized cloud decoration, invisible accessible brewery hotspots with single-open card behavior, a Home return CTA, and navbar entry integration.

## Prerequisites

- Node.js and npm installed
- Dependencies installed:

```bash
npm install
```

## Implementation Sequence

1. Update navigation config and route wiring:
  - Add `THE_HALF_MILE_ROUTE` and destination metadata in `src/shared/constants/navigation.constants.ts`.
  - Register new route in `src/app/AppRouter.tsx`.
2. Create page shell:
  - Add `src/pages/HalfMilePage/HalfMilePage.tsx`.
  - Mount a `HalfMileScene` feature component from the page.
3. Create feature configuration:
  - Add `src/shared/constants/halfMile.constants.ts` for map asset, brewery data, hotspot anchors, cloud seeds, and CTA copy/route.
  - Extend `src/shared/types/site.types.ts` with Half Mile typed models if needed.
4. Build Half Mile scene components:
  - `HalfMileScene.tsx` for background, map frame, cloud layer, and fixed CTA.
  - `HalfMileHotspots.tsx` for interactive hotspot overlay and active-card state handling.
  - `HalfMileBreweryCard.tsx` for popover card content and dismissal controls.
5. Implement interaction contracts:
  - Enforce one active card at a time.
  - Support close via outside click, close button, hotspot switch, and `Esc`.
  - Support keyboard focus and `Enter`/`Space` hotspot activation.
  - Ensure brewery links open in a new tab.
6. Add tests:
  - `tests/half-mile/HalfMilePage.layout.test.tsx`
  - `tests/half-mile/HalfMilePage.hotspots.test.tsx`
  - `tests/half-mile/HalfMilePage.a11y.test.tsx`

## Verification Commands

```bash
npm run lint
npm test
```

## Manual QA Checklist

1. Route and navigation:
  - Navbar includes `The Half Mile`.
  - Selecting `The Half Mile` opens the new page.
  - Fixed lower CTA returns to Home.
2. Layout and visuals:
  - Map is centered and full-width.
  - Top and bottom margins remain visible.
  - Background visually matches Home sky style.
  - Clouds appear in varied positions and do not block interactions.
3. Hotspot interactions:
  - Each brewery hotspot opens the correct card.
  - Only one card remains open at a time.
  - Card closes with outside click/tap, close button, and `Esc`.
4. Accessibility:
  - Hotspots are keyboard-focusable with visible focus indicators.
  - `Enter`/`Space` opens hotspot card.
  - `Esc` closes card without navigation.
5. External links:
  - All brewery links open in a new tab.
  - Current Half Mile page stays open in original tab.
6. Responsive coverage:
  - Verify at `360x800`, `768x1024`, and `1440x900`.
  - Confirm hotspot alignment and card readability at each viewport.

## Out of Scope

- Any RSVP or message flow changes
- Supabase schema or API changes
- Map artwork edits
- New dependency introduction

## Execution Results

- Date: 2026-04-17
- Planning artifacts generated: PASS
- Implementation status: PASS
- Automated command results:
  - `npm run lint`: PASS
  - `npm test`: PASS (`19` files, `53` tests)
- Responsive and interaction verification summary:
  - Map route rendering, map full-width layout classing, and CTA navigation covered in `tests/half-mile/HalfMilePage.layout.test.tsx`.
  - Hotspot mapping, single-open-card behavior, outside-click dismissal, and close-control flow covered in `tests/half-mile/HalfMilePage.hotspots.test.tsx`.
  - Keyboard focus + `Enter`/`Space` activation + `Esc` close and external new-tab link semantics covered in `tests/half-mile/HalfMilePage.a11y.test.tsx`.
  - Navbar contract now includes `The Half Mile` destination coverage in `tests/navigation/PersistentNavigation.contract.test.tsx`.
- Manual browser/device visual pass at physical breakpoints remains recommended before release.
