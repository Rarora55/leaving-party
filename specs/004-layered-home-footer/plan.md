# Implementation Plan: Layered Home Footer Scene

**Branch**: `004-layered-home-footer` | **Date**: 2026-04-11 | **Spec**: [specs/004-layered-home-footer/spec.md](specs/004-layered-home-footer/spec.md)
**Input**: Feature specification from `/specs/004-layered-home-footer/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

Replace the current card-style `HomeFooter` ending with a layered pixel-art footer
scene that is fully resolved inside the final sticky Home viewport. The new footer
must preserve the `Components/RoadLayers/Sample2.png` visual reference, render the
three road layers in the exact accepted order
(`1Landscape-front`, `2Landscape-Road`, `3Landscape-mountains`), keep the composition
full-width and bottom-grounded, fade the Home title and date out before the footer
reaches its final visible state, keep all three layers visible together on short
screens, and include a footer-local `Are You Coming?` CTA that routes to the existing
RSVP page at `/are-you-coming`.

## Technical Context

**Language/Version**: TypeScript + React 18  
**Primary Dependencies**: React, Vite, React Router, Tailwind CSS, Motion  
**Storage**: Static typed scene and navigation configuration in `src/shared/constants`; no new localStorage or Supabase behavior  
**Testing**: Manual validation only for this feature, using `specs/004-layered-home-footer/quickstart.md`  
**Target Platform**: Responsive web (mobile-first, tablet, desktop, short-height screens)  
**Project Type**: Frontend web application  
**Performance Goals**: Preserve smooth Home scrolling and footer reveal with transform/opacity-heavy updates, targeting 60 fps on modern devices  
**Constraints**: Keep the existing Home background and stack, preserve the exact layer order and stepped depth from `Components/RoadLayers/Sample2.png`, fully resolve the footer inside the final sticky viewport with no extra trailing scroll, fade title/date before footer settle, keep all three layers visible together on short screens, add a footer-local CTA to `/are-you-coming`, avoid new dependencies, and keep scene behavior data-driven  
**Scale/Scope**: Home route ending only, including title/date exit timing and footer CTA handoff; no RSVP flow, guest-message flow, or navigation-shell redesign

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Stack remains React + Vite + React Router + Tailwind CSS + Motion.
- Proposed changes stay within `src/features/home` for scene rendering/timing and
  `src/shared` for typed scene/navigation metadata, preserving modular boundaries.
- The new ending keeps the pixel-art storytelling direction by reusing the approved
  road-layer art and its in-repo visual reference rather than flattening the scene.
- Motion remains purposeful: it coordinates title/date exit with footer arrival and
  will degrade cleanly under reduced motion.
- Layer identity, stacking order, offsets, short-height tuning, and CTA metadata
  remain in typed config rather than page-local hardcoded positioning.
- Existing navigation data remains reusable because the footer CTA points at the
  established RSVP destination instead of introducing a special-case route.
- No new services, storage paths, or dependencies are introduced.
- Performance remains bounded by three deterministic image layers, a small CTA
  surface, and transform/opacity-only animation.

## Project Structure

### Documentation (this feature)

```text
specs/004-layered-home-footer/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- home-footer-scene.contract.ts
`-- tasks.md
```

### Source Code (repository root)

```text
Components/
`-- RoadLayers/
    |-- 1landscape-front.png
    |-- 2landscape-road.png
    |-- 3landscape-mountains.png
    `-- Sample2.png

src/
|-- app/
|   `-- AppRouter.tsx
|-- features/
|   `-- home/
|       |-- components/
|       |   |-- HomeScene.tsx
|       |   |-- HomeTitleReveal.tsx
|       |   |-- HomeFooter.tsx
|       |   |-- HomeFooterScene.tsx
|       |   `-- HomeFooterLayer.tsx
|       `-- useHomeSceneProgress.ts
|-- shared/
|   |-- constants/
|   |   |-- home.constants.ts
|   |   `-- navigation.constants.ts
|   `-- types/
|       `-- site.types.ts
`-- styles/
    `-- global.css
```

**Structure Decision**: Keep `HomeScene` as the sticky composition root, coordinate
title/date exit in the Home feature boundary, and keep footer layer plus CTA metadata
in shared typed constants. The layered footer remains a dedicated scene component, but
it is no longer decorative-only: it must expose a footer-local RSVP action without
moving navigation logic or route definitions out of the shared navigation layer.

## Phase 0: Research Summary

- Reuse the current `footerProgress` handoff from `useHomeSceneProgress` instead of
  inventing a second scroll driver, but interpret it as the final sticky viewport
  settle state rather than a lead-in to extra trailing scroll.
- Add an explicit title/date exit window that completes before the footer reaches its
  fully visible settled state.
- Treat the road-layer artwork as three independent, typed scene layers sourced from
  `Components/RoadLayers/1landscape-front.png`,
  `Components/RoadLayers/2landscape-road.png`, and
  `Components/RoadLayers/3landscape-mountains.png`, while preserving the spec's
  logical names in config and using `Components/RoadLayers/Sample2.png` as the local
  visual QA reference.
- Model visual depth with explicit z-index order plus stepped bottom offsets rather
  than relying on DOM order alone. This keeps the accepted front/middle/far
  relationship stable across responsive breakpoints.
- Solve short-height behavior with breakpoint-aware height and offset compression
  tokens so all three layers remain visible together in the final state instead of
  letting deeper layers disappear below the fold.
- Add the footer-local CTA as typed scene metadata that targets the existing RSVP
  route (`/are-you-coming`) rather than reviving the old footer link cluster.
- Preserve reduced-motion comprehension by keeping the same stacking, offsets, CTA
  availability, and title/date exit order while minimizing or removing reveal lift
  animation.

## Phase 1: Design

### Architecture Decisions

- `HomeScene` remains responsible for sticky scene layout, background gradient handoff,
  and mounting the final footer section inside the last sticky viewport state.
- `HomeTitleReveal` and footer reveal timing are coordinated so title/date opacity
  reaches zero before the footer reaches its fully visible settled state.
- Footer composition remains a dedicated layered scene component, but it must now
  render a footer-local RSVP CTA inside the final state instead of being scenic-only.
- Footer CTA behavior reuses the existing React Router RSVP destination
  (`/are-you-coming`) from shared navigation constants rather than introducing new
  routing or data dependencies.
- Footer layer definitions, title-exit timing, CTA metadata, and short-height tuning
  live in shared constants as ordered metadata, not as hardcoded JSX values.
- Each footer layer is rendered through a reusable layer component that receives asset
  source, depth role, z-index, bottom offset, and responsive sizing tokens.

### Affected Files and Modules

- `src/features/home/components/HomeScene.tsx`
  Keeps the sticky Home structure but must ensure the footer fully resolves within the
  final viewport state and that title/date exit completes before footer settle.
- `src/features/home/components/HomeTitleReveal.tsx`
  Must honor the corrected fade-out timing so title/date yield to the final footer
  scene before it fully settles.
- `src/features/home/components/HomeFooter.tsx`
  Remains a thin Motion wrapper, but can no longer mark the footer region as
  decorative-only because it must host an interactive CTA.
- `src/features/home/components/HomeFooterScene.tsx`
  Renders the layered footer, bottom-grounded frame, short-height tuning, and footer-
  local RSVP CTA.
- `src/features/home/components/HomeFooterLayer.tsx`
  Reusable presentational component for one road layer, including degraded-asset
  fallback handling without reviving the legacy footer.
- `src/features/home/useHomeSceneProgress.ts`
  Keeps the existing `footerProgress` handoff while exposing timing that lets title
  exit complete before the footer reaches its final settled state.
- `src/shared/constants/home.constants.ts`
  Owns the three required road-layer assets, per-breakpoint heights, stepped bottom
  offsets, short-height tuning, title/date exit timing, and footer CTA metadata.
- `src/shared/constants/navigation.constants.ts`
  Remains the source of truth for the RSVP route the footer CTA must use.
- `src/shared/types/site.types.ts`
  Adds or refines scene-oriented footer config, CTA, and title-exit interfaces.
- `src/styles/global.css`
  Optional only if a shared class is needed for pixel-art image rendering or CTA-safe
  layout helpers; otherwise styling stays in Tailwind utility classes.

### Implementation Notes

- The final footer scene must settle inside the sticky viewport with bottom anchoring
  and no hidden layer reveal below the viewport after the ending state is reached.
- The Home title and date must fully fade out before `footerProgress` reaches its
  final settled state. Title/date motion is part of the footer-transition contract,
  not a separate decorative effect.
- The footer-local CTA must remain discoverable in the final state without competing
  with the stepped depth read. A safe placement zone above or within the front-layer
  negative space is preferred over overlaying the CTA across the mountains or road.
- `HomeFooter.tsx` can no longer use `aria-hidden="true"` once the CTA becomes
  interactive; the footer scene must expose meaningful accessible structure.
- `HomeFooterLayer.tsx` keeps each image full-width with grounded positioning and can
  fall back to a tinted band if an asset fails, preserving the ending scene without
  reviving the legacy footer panel.
- The implemented footer CTA now reuses the exported shared RSVP route constant
  rather than duplicating a literal path inside the Home feature.
- Exact footer DOM order is enforced with an explicit render-order constant while the
  config order remains front -> road -> mountains for validation.
- Compact-height mode is implemented with a viewport-height media query and scales
  both layer offsets and CTA offsets into the reduced footer frame.

### Data and Config Updates

- Replace the current footer config shape:
  - from scene-only fields (`revealRange`, `minHeight`, `bottomInset`, `layers`)
  - to a scene model centered on ordered layers, title/date exit timing,
    short-height tuning, and a local CTA
- Add or refine a typed `HomeFooterSceneConfig` with:
  - `revealRange`
  - `titleFadeOutRange`
  - `minHeight`
  - `bottomInset`
  - `compactHeightMax`
  - `compactHeightLayerScale`
  - `cta`
  - `layers`
- Add a typed `HomeFooterSceneCTA` with:
  - `id`
  - `label`
  - `route`
  - `ariaLabel`
  - `placement`
- Keep a typed `HomeFooterSceneLayer` with:
  - `id`
  - `label`
  - `assetSrc`
  - `depth`: `front | mid | far`
  - `zIndex`
  - `bottomOffsetMobile`
  - `bottomOffsetTablet`
  - `bottomOffsetDesktop`
  - `heightMobile`
  - `heightTablet`
  - `heightDesktop`
  - `objectPosition`
- Preserve exact ordered mapping:
  1. `1Landscape-front` -> `Components/RoadLayers/1landscape-front.png`
  2. `2Landscape-Road` -> `Components/RoadLayers/2landscape-road.png`
  3. `3Landscape-mountains` -> `Components/RoadLayers/3landscape-mountains.png`
- Validation rules:
  - exactly three layers
  - exact accepted order in config and render output
  - unique ids and z-indices
  - `front` z-index greater than `mid`, `mid` greater than `far`
  - deeper layers use larger bottom offsets so they sit higher than the layer ahead
  - `titleFadeOutRange` completes before the footer's final settled state
  - `cta.route` must equal `/are-you-coming`
  - compact-height tuning must preserve simultaneous visibility of all three layers

### Component and Render Model

- Scene render order inside the Home ending:
  1. existing Home background and footer gradient handoff
  2. title/date during their remaining fade-out window only
  3. far layer: `3Landscape-mountains`
  4. middle layer: `2Landscape-Road`
  5. front layer: `1Landscape-front`
  6. footer-local CTA targeting `Are You Coming?`
  7. persistent menu trigger from `AppShell`
- Footer scene container behavior:
  - occupies the final sticky Home viewport state
  - aligns the layered composition to the bottom edge
  - clips overflow horizontally
  - keeps all three layers visible together at the same time
  - does not rely on extra trailing scroll to reveal the layers after the sticky state
    has resolved
- Layer behavior:
  - all layers span the available scene width
  - all layers are anchored to the same horizontal frame
  - layer 2 sits slightly higher than layer 1
  - layer 3 sits higher than layer 2
  - the stepped composition must continue to read like `Sample2.png`
  - no legacy footer card or link cluster remains beyond the required local RSVP CTA

### Responsive and Reduced-Motion Strategy

- Mobile:
  - use taller scene framing and compact-height tuning so the three layers remain
    readable without pushing the back layers below the fold
  - keep CTA placement in a tappable safe area that does not obscure the stepped layer
    read
- Tablet:
  - increase layer heights and offsets slightly to preserve depth without leaving gaps
  - keep the full footer composition visible inside the final sticky viewport
- Desktop:
  - maintain full-width coverage across wide screens by letting each asset fill the
    scene width and using bottom alignment rather than centering a narrow image stack
- Short-height screens:
  - compress layer heights and offsets using typed compact-height tokens
  - keep all three layers visible together in the final settled state
  - keep the CTA visible without forcing a second scroll reveal
- Reduced motion:
  - preserve the same layer order, title/date exit order, and CTA availability
  - limit reveal animation to opacity or a minimal upward settle
  - remove decorative drift/parallax from the footer layers
- Asset failure fallback:
  - if one image fails, keep rendering the remaining layers, CTA, and ending container
  - never fall back to the old footer layout

### Implementation Phases

1. **Config and type refactor**
   Refine footer scene interfaces, title/date exit timing, compact-height tokens, and
   RSVP CTA metadata in `src/shared/types/site.types.ts`,
   `src/shared/constants/home.constants.ts`, and existing navigation constants.
2. **Footer component replacement**
   Refactor `HomeFooter.tsx`, `HomeFooterScene.tsx`, and `HomeFooterLayer.tsx` so the
   layered scene is bottom-grounded, interactive where needed, and stable on short
   screens.
3. **Home scene timing integration**
   Update `HomeScene.tsx`, `HomeTitleReveal.tsx`, and `useHomeSceneProgress.ts` to
   guarantee the title/date fade-out completes before the footer settles in the final
   sticky viewport.
4. **Responsive, CTA, and reduced-motion tuning**
   Validate layer sizing, stepped offsets, CTA placement, and reveal behavior across
   mobile, tablet, desktop, short-height, and reduced-motion settings.
5. **Manual verification and cleanup**
   Confirm the old footer UI is fully removed, the new CTA routes to RSVP, and no
   stale scenic-only assumptions remain in shared types, constants, or docs.

### Risks and Validation Strategy

- **Risk**: The footer still requires extra trailing scroll to fully reveal the
  composition because the final sticky viewport sizing and layer heights are not tuned
  together.
  **Mitigation**: Treat final sticky-state completeness as a first-class layout
  contract and validate with explicit no-trailing-scroll manual checks.
- **Risk**: Title/date fade timing overlaps too long with the footer, weakening the
  ending beat or obscuring the CTA.
  **Mitigation**: Define a dedicated `titleFadeOutRange` that completes before footer
  settle and validate the handoff in the Home scene rather than only within the title
  component.
- **Risk**: Short screens crop deeper layers or push the CTA out of view.
  **Mitigation**: Use compact-height tokens for layer sizes and offsets and validate
  explicit short-height viewports in manual QA.
- **Risk**: CTA placement breaks the grounded scene or visually competes with the
  stepped depth order.
  **Mitigation**: Restrict CTA placement to a defined safe zone and compare against
  the `Sample2.png` composition during review.
- **Risk**: Reduced-motion mode preserves the layers but not the narrative handoff.
  **Mitigation**: Treat static stacking, title/date exit order, and CTA visibility as
  the primary cues rather than relying on translation.
- **Validation strategy**:
  - review `/` on mobile (`>=320px`), tablet (`>=768px`), desktop (`>=1024px`), and
    short-height viewports
  - verify the footer fully resolves inside the final sticky viewport with no extra
    trailing scroll to reveal the layers
  - verify title and date have faded out before the footer reaches its final visible
    state
  - verify all three layers remain visible together on short screens
  - verify order is mountains behind road behind front
  - verify layer 2 is higher than layer 1 and layer 3 is higher than layer 2
  - verify the composition stays bottom-grounded with no horizontal scrolling
  - verify the footer CTA is visible in the final state and routes to
    `/are-you-coming`
  - verify reduced-motion mode preserves the same readable hierarchy and CTA access
  - compare the implemented composition against `Components/RoadLayers/Sample2.png`

## Implementation Status

- Shared footer config, CTA metadata, title fade-out timing, compact-height tuning,
  and explicit DOM render order have been implemented in the Home scene source.
- Targeted eslint for the modified Home files passes, and `npx tsc --noEmit` passes.
- Full repository lint still fails because of unrelated pre-existing issues outside
  this feature.
- Manual browser validation is still required. Playwright is not installed in the
  local environment, and `npm run build` is blocked here by a local Tailwind oxide
  binary loading error (`spawn EPERM` / invalid UTF-8 in the native module).

## Post-Design Constitution Check

- Stack remains unchanged and compliant.
- The plan strengthens modularity by coordinating title/footer timing inside the Home
  feature while keeping footer depth/layout/CTA tokens in shared config.
- Pixel-art continuity is preserved through direct reuse of the approved road-layer
  artwork and the in-repo sample reference.
- Reduced motion is handled without removing scene meaning or CTA access.
- No repeatable footer layout values or CTA targets are hardcoded into the page route.
- No new dependency, storage path, or service is introduced.
- Performance remains bounded by three static assets, one small CTA surface, and
  transform/opacity-only reveal behavior.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

None.
