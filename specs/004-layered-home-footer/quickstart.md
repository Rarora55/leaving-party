# Quickstart: Layered Home Footer Scene

**Feature**: 004-layered-home-footer  
**Date**: 2026-04-11  
**Purpose**: Run the app locally and manually validate the corrected layered footer
ending for the Home route.

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.
3. Open the local Vite URL in a browser.

## Manual Validation

### Current Implementation Surface

- Home scene container: `src/features/home/components/HomeScene.tsx`
- Title/date reveal and exit: `src/features/home/components/HomeTitleReveal.tsx`
- Footer wrapper: `src/features/home/components/HomeFooter.tsx`
- Scene renderer: `src/features/home/components/HomeFooterScene.tsx`
- Layer renderer: `src/features/home/components/HomeFooterLayer.tsx`
- Scroll timing hook: `src/features/home/useHomeSceneProgress.ts`
- Scene config: `src/shared/constants/home.constants.ts`
- CTA route source: `src/shared/constants/navigation.constants.ts`

### Final Sticky Viewport and Title Exit

1. Visit `/`.
2. Scroll to the final Home sticky viewport state.
3. Confirm the footer composition is already fully visible in that final sticky state.
4. Confirm no extra trailing scroll is required to reveal hidden footer layers.
5. Confirm the Home title and date have faded out before the footer reaches its final
   fully visible state.

### Footer Replacement and Layer Order

1. Confirm the previous panel-style footer no longer appears.
2. Confirm the ending is a layered scene built from three road-layer visuals.
3. Confirm `1Landscape-front` reads as the nearest visible layer.
4. Confirm `2Landscape-Road` reads behind the front layer.
5. Confirm `3Landscape-mountains` reads as the farthest visible layer.
6. Confirm layer 2 sits slightly higher than layer 1.
7. Confirm layer 3 sits higher than layer 2.
8. Confirm the three layers remain visible together as one grounded composition.

### Footer-Local CTA

1. In the final footer state, confirm a footer-local CTA is visible without relying on
   the persistent overlay menu.
2. Confirm the CTA label communicates `Are You Coming?`.
3. Activate the CTA.
4. Confirm navigation reaches `/are-you-coming`.
5. Confirm the CTA remains discoverable in the footer without obscuring the stepped
   layer composition.

### Width, Grounding, and Short-Height Review

1. Confirm each layer spans the available width of the footer scene.
2. Confirm the composition aligns toward the bottom of the sticky viewport.
3. Confirm there is no horizontal scrolling.
4. Review mobile width at `320 x 568`.
5. Review tablet width at `768 x 1024`.
6. Review desktop width at `1280 x 800`.
7. Review at least one short-height viewport such as `1280 x 600`.
8. Confirm depth order, stepped offsets, bottom grounding, and CTA visibility remain
   intact at each viewport.
9. Confirm very short heights still keep all three layers visible together in the
   final state.
10. Confirm compact-height mode still keeps the CTA inside the reduced footer frame
    rather than leaving it stranded above the artwork.

### Reduced Motion

1. Enable `prefers-reduced-motion: reduce` in browser devtools or OS settings.
2. Reload `/`.
3. Scroll to the footer.
4. Confirm the same three layers, ordering, and stepped height relationship remain
   readable.
5. Confirm title/date still yield to the footer before the final state settles.
6. Confirm the footer CTA remains visible and usable.
7. Confirm any reveal motion is softened or removed without flattening the scene.

### Asset Failure Check

1. Temporarily simulate one missing layer asset during development if needed.
2. Confirm the ending container still renders without reviving the old footer layout.
3. Confirm the failed layer degrades to a tinted fallback band while the remaining
   layers and CTA still preserve a coherent ending state.

### Visual Reference Comparison

1. Open `Components/RoadLayers/Sample2.png`.
2. Compare the implemented footer against the sample.
3. Confirm the stepped depth, layer order, bottom grounding, and overall silhouette
   preserve the intended reference read rather than flattening into a single band.

## Local Verification Status

- Completed locally:
  - `cmd /c npx eslint src/app/AppRouter.tsx src/shared/constants/navigation.constants.ts src/shared/constants/home.constants.ts src/shared/types/site.types.ts src/features/home/useHomeSceneProgress.ts src/features/home/components/HomeScene.tsx src/features/home/components/HomeTitleReveal.tsx src/features/home/components/HomeFooter.tsx src/features/home/components/HomeFooterScene.tsx src/features/home/components/HomeFooterLayer.tsx`
  - `cmd /c npx tsc --noEmit`
- Pending manual/browser validation:
  - Full viewport and reduced-motion walkthrough in a browser
  - CTA click-through confirmation in a running dev session
  - Visual comparison against `Components/RoadLayers/Sample2.png`
- Known environment blockers:
  - Playwright is not installed in this workspace, so browser automation could not be
    run.
  - `cmd /c npm run build` is blocked locally by a Tailwind oxide native-module load
    failure in the environment.

## Notes

- Validation for this feature is manual only.
- The footer is no longer decorative-only; the final state must include a local CTA to
  the existing RSVP route.
- Design review should explicitly compare the implemented footer against
  `Components/RoadLayers/Sample2.png`.
