# Implementation Plan: Redefine Home and Navigation Experience

**Branch**: `003-redefine-home-navigation` | **Date**: 2026-04-10 | **Spec**: [specs/003-redefine-home-navigation/spec.md](specs/003-redefine-home-navigation/spec.md)
**Input**: Feature specification from `/specs/003-redefine-home-navigation/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

Replace the current one-screen Home intro and sticky branded header with a
scroll-driven landing composition and a minimal overlay navigation that work
inside the existing React/Vite/Tailwind/Motion app structure. The new Home will
stay in `features/home`, expose reusable scene parts for the sky layer, cloud
field, title reveal, and footer, and drive all motion from a normalized scroll
state. The shared `AppShell` remains the global navigation host, but its current
sticky header becomes a fixed top-right trigger that opens a full-screen overlay
with only the three existing primary routes.

## Technical Context

**Language/Version**: TypeScript + React 18  
**Primary Dependencies**: React, Vite, React Router, Tailwind CSS, Motion, Radix Dialog, Lucide React  
**Storage**: Static typed scene/navigation configuration in `src/shared/constants`; existing localStorage and Supabase integrations remain unchanged for RSVP and messages  
**Testing**: Manual validation only  
**Target Platform**: Responsive web (mobile-first, tablet, desktop)  
**Project Type**: Frontend web application  
**Performance Goals**: Smooth scroll-linked transforms and subtle ambient motion, targeting 60 fps on modern devices with GPU-friendly `transform`/`opacity` updates only  
**Constraints**: Keep the three existing routes, remove timed intro behavior, start Home on a full-screen `#BFE9FF` sky field, keep title/date hidden until scroll begins, source clouds from `Components/Clouds`, preserve reduced-motion access, avoid new dependencies, and adapt the current repo structure instead of introducing a parallel architecture  
**Scale/Scope**: Shared navigation shell plus one redesigned landing route and coherence updates for the two existing secondary routes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Stack remains React + Vite + React Router + Tailwind CSS + Motion, reusing the
  existing Radix dialog overlay already present in `AppShell`.
- Proposed files keep app wiring in `src/app`, Home composition in `src/features/home`,
  route entry points in `src/pages`, and reusable config/types in `src/shared`.
- Motion has a clear storytelling purpose: scroll reveals title/date, layers clouds,
  and resolves into a footer. Reduced motion is explicitly defined.
- Repeatable copy, cloud metadata, scene ranges, and navigation labels remain
  centralized in typed constants instead of page-local literals.
- No new data service or storage path is introduced, so future CMS/admin expansion
  remains viable.
- No additional dependency is required; Motion, Radix, and Tailwind are sufficient.
- Performance risk is controlled by a fixed cloud set, deterministic motion tokens,
  and transform-only animation.

## Project Structure

### Documentation (this feature)

```text
specs/003-redefine-home-navigation/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- home-scene.contract.ts
|   `-- navigation-overlay.contract.ts
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- app/
|   |-- AppRouter.tsx
|   `-- AppShell.tsx
|-- features/
|   |-- home/
|   |   |-- components/
|   |   |   |-- HomeScene.tsx
|   |   |   |-- HomeSkyLayer.tsx
|   |   |   |-- HomeCloudField.tsx
|   |   |   |-- HomeTitleReveal.tsx
|   |   |   `-- HomeFooter.tsx
|   |   `-- useHomeSceneProgress.ts
|   `-- components/
|       `-- PersistentNavigation.tsx
|-- pages/
|   `-- HomePage/
|-- shared/
|   |-- constants/
|   |   |-- home.constants.ts
|   |   `-- navigation.constants.ts
|   |-- types/
|   |   `-- site.types.ts
|   `-- components/
|-- styles/
|   `-- global.css
`-- index.css
```

**Structure Decision**: Adapt the existing file layout rather than replacing it.
`HomePage` stays a route entry only. `HomeScene` becomes the composition root for
the landing experience. `AppShell` remains the shared wrapper for all routes and
owns the overlay dialog state. `navigation.constants.ts` becomes the single source
for route labels and paths, while `home.constants.ts` owns scene copy, cloud layer
tokens, and scroll ranges. `src/index.css` should be neutralized or reduced to
avoid Vite starter styles fighting the new full-bleed layout.

## Phase 0: Research Summary

- Use a sticky viewport plus normalized `useScroll` progress instead of reviving the
  current `useHomeScrollAnimation` enter-on-view helper. The redesign is one
  continuous scene, not stacked reveal cards.
- Treat the six files in `Components/Clouds/` as individual imported assets with
  deterministic metadata. Pseudo-random motion comes from per-layer offsets and
  durations in config, not runtime randomness.
- Keep ambient drift subtle and secondary to scroll by combining a small continuous
  oscillation with a larger scroll-linked horizontal travel value.
- Simplify the current navigation overlay behavior. Radix already supplies focus
  management and Escape handling, so the custom hook should stop owning keyboard
  routing and `window.location` navigation.
- Preserve reduced-motion readability by keeping scroll progression intact while
  removing continuous drift and reducing transform distance.

## Phase 1: Design

### Component Boundaries

- `HomePage`
  Keeps route responsibility only and renders the new `HomeScene`.
- `HomeScene`
  Owns the scene root ref, normalized progress values, sticky viewport layout, and
  composition order for sky, clouds, title, and footer.
- `HomeSkyLayer`
  Renders the full-screen base layer with solid color `#BFE9FF`. No clouds or title
  markup may be embedded here.
- `HomeCloudField`
  Maps typed cloud layer config to absolutely positioned layered assets. Owns only
  layer rendering and transform application.
- `HomeTitleReveal`
  Renders the centered title and date, using the requested MaisonNeue, Helvetica,
  sans-serif visual direction in black. It does not calculate scroll progress.
- `HomeFooter`
  Renders the visual landing state and light directional content once the scene
  resolves near the end of the scroll path.
- `PersistentNavigation`
  Renders the full-screen overlay menu contents only.
- `AppShell`
  Renders the fixed top-right trigger, owns the dialog root, and mounts
  `PersistentNavigation` above route content on every page.
- `useHomeSceneProgress`
  Replaces the current entrance-animation hook for Home only. It derives
  `sceneProgress`, `titleProgress`, `dateProgress`, `cloudProgress`, and
  `footerProgress` from one scroll target.
- `useNavigationOverlay`
  Keeps open/close/toggle state and scroll restoration only. It should not persist
  to localStorage or change routes via `window.location`.

### Data and Config Ownership

- `src/shared/constants/navigation.constants.ts`
  Owns the only three route entries and exposes a single typed list that both
  `AppRouter` and the overlay use.
- `src/shared/constants/home.constants.ts`
  Owns:
  - scene copy: title, date, footer label/headline/body/hint
  - visual tokens: sky color, title font stack, title/date sizing ramps
  - motion ranges: reveal windows, footer arrival window, cloud travel limits
  - cloud metadata: per-asset positioning and motion tokens
- `src/shared/types/site.types.ts`
  Gains the new scene and cloud interfaces; old stage-based types can be removed or
  kept temporarily only if the implementation still references them during the refactor.

### Cloud Asset Model

Each cloud is modeled as a reusable layer object rather than a background fragment:

- `id`
- `assetKey`
- `assetSrc`
- `depth`: `far | mid | near`
- `baseXPercent`
- `baseYPercent`
- `width`
- `opacity`
- `zIndex`
- `scrollTravelX`
- `ambientDriftX`
- `ambientDurationSeconds`
- `ambientDelaySeconds`

Rendering rules:

- Assets are imported from `Components/Clouds/1.png` through `6.png`.
- Each cloud renders as its own absolutely positioned element inside
  `HomeCloudField`.
- Layer order comes from `zIndex` and `depth`, not DOM order assumptions.
- There is no runtime random placement. The "pseudo-random" feel is achieved through
  different base positions, drift amplitudes, and durations defined in config.
- If one asset fails to load, the scene still renders with the remaining layers and
  title/footer intact.

### Scroll State and Motion Model

The Home route uses one continuous scroll model:

- Scene container height: `min-h-[300svh]`
- Sticky viewport region: first `200svh`
- Footer landing region: final `100svh`
- Normalized `sceneProgress`: `0 -> 1` across the entire Home scene

Progress windows:

- Title reveal starts after scroll begins, not on load:
  - `titleProgress`: clamp `sceneProgress` from `0.06 -> 0.28`
  - `dateProgress`: clamp `sceneProgress` from `0.12 -> 0.34`
- Cloud travel remains active until the footer handoff:
  - `cloudProgress`: clamp `sceneProgress` from `0 -> 0.82`
- Footer arrival:
  - `footerProgress`: clamp `sceneProgress` from `0.72 -> 1`

Animation responsibility:

- `HomeTitleReveal`
  Uses `titleProgress` and `dateProgress` for opacity and a small upward translation.
  Before `0.06`, both elements remain fully hidden.
- `HomeCloudField`
  Applies `scrollTravelX * cloudProgress` plus an ambient oscillation value per cloud.
  Vertical position stays largely fixed so the scene reads as calm and editorial.
- `HomeFooter`
  Fades and lifts into place from `footerProgress`, while the cloud field settles and
  title emphasis reduces so the footer becomes the visual landing state.

### Reduced Motion

Reduced motion preserves sequence and meaning but removes continuous ambience:

- Continuous ambient drift is disabled.
- Cloud motion keeps only a smaller scroll-linked horizontal translation.
- Title/date reveal uses opacity plus at most a minimal `translateY(8px)` shift.
- Footer arrival uses opacity only or a very small lift.
- Overlay open/close uses no elaborate entrance choreography; a quick fade is enough.

### Navigation Trigger and Overlay Behavior

- The existing sticky header bar is removed from `AppShell`.
- A minimal fixed trigger sits at the top-right on every main route.
- The trigger remains visible over Home without blocking the centered title/date on
  mobile or desktop.
- Opening the trigger launches a full-screen Radix dialog overlay.
- The overlay renders only three interactive entries:
  - Home
  - Are You Coming?
  - Drop a Message
- Menu entries are large, clearly spaced, and lightweight. Interactive list items do
  not render secondary descriptions.
- The same trigger position is reused for closing, either through a close icon/label
  in the overlay chrome or the existing dialog close control.
- Closing the overlay without navigation returns the user to the same scroll position.
- Selecting a route closes the overlay and relies on React Router navigation instead
  of `window.location`.
- When the active route changes, overlay state resets cleanly.

### Route Coherence Outside Home

- `GuestListPage` and `MessagesPage` keep their current page content for now.
- They inherit the new fixed trigger and overlay automatically through `AppShell`.
- No route labels or paths change; legacy redirects in `AppRouter` remain in place.
- Shared shell spacing must be updated so the fixed trigger does not require every
  page to reserve header height.

### Manual Validation Strategy

Only manual validation is planned for this feature:

1. Load `/` and verify the first viewport is a solid `#BFE9FF` field with no title or
   date visible before scroll.
2. Scroll through Home and verify title/date reveal only after scrolling starts.
3. Continue scrolling and verify cloud layers feel separate from the background and
   combine scroll travel with subtle ambience until the footer is reached.
4. Reach the footer and confirm it reads as the end state and offers light directional
   guidance without becoming a heavy content block.
5. Open and close the top-right trigger on all three main routes and verify the
   overlay contains only the three approved entries.
6. Open the overlay mid-scroll on Home, close it, and verify the prior scroll
   position is preserved.
7. Emulate `prefers-reduced-motion: reduce` and verify the Home structure remains
   understandable with simplified motion.
8. Check mobile, tablet, and desktop breakpoints for readable title/date placement,
   accessible trigger placement, and no horizontal scrolling.

## Post-Design Constitution Check

- Stack remains compliant and dependency-neutral.
- Modular boundaries are clearer than the current implementation: route shell,
  navigation shell, scene orchestration, and visual parts are separated.
- The design keeps motion purposeful and reduced-motion aware.
- Content remains data-driven through centralized scene/navigation constants.
- The plan improves maintainability by removing page-local intro logic and replacing
  it with typed scene config.
- Performance remains bounded by fixed assets and transform-only animation.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

None.
