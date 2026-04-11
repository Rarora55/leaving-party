# Research: Layered Home Footer Scene

**Feature**: 004-layered-home-footer  
**Date**: 2026-04-11  
**Purpose**: Resolve implementation decisions for replacing the current Home footer
with a layered road-scene ending that remains fully visible inside the final sticky
viewport.

## Decision 1: Keep the Existing Home Scroll Driver

- **Decision**: Reuse `useHomeSceneProgress` and its existing `footerProgress` value
  to reveal the new footer scene during the final Home section.
- **Rationale**: The current Home architecture already defines the ending handoff in
  the last `100svh`. Reusing that driver avoids introducing a second animation model
  for a change that only replaces the footer presentation.
- **Alternatives considered**: Create a dedicated footer scroll observer or a new
  per-layer parallax controller. Rejected because it adds complexity without changing
  the user journey.

## Decision 2: Treat the Final Sticky Viewport as the Complete Footer State

- **Decision**: Implement the footer so the full layered composition is already
  visible inside the final sticky viewport state, with no extra trailing scroll needed
  to discover hidden layers.
- **Rationale**: The accepted clarifications make the final sticky state itself the
  resolved destination of the Home journey. A second reveal below the sticky viewport
  would directly violate that requirement.
- **Alternatives considered**: Let the footer continue revealing after the sticky
  state by relying on additional document scroll. Rejected because it breaks the
  accepted ending-state contract.

## Decision 3: Model Road Layers as Typed Footer Scene Metadata

- **Decision**: Represent the three required visuals as typed config objects in
  `src/shared/constants/home.constants.ts` and render them from config.
- **Rationale**: The spec requires a strict layer order, named assets, responsive
  full-width behavior, stepped vertical offsets, short-height tuning, and CTA-safe
  placement. Typed metadata is the cleanest place to preserve those rules.
- **Alternatives considered**: Hardcode the three image tags directly inside
  `HomeFooter.tsx`. Rejected because it makes future artwork swaps or offset tuning
  harder and violates the data-driven content principle.

## Decision 4: Use Explicit Z-Index and Bottom Offsets for Depth

- **Decision**: Encode both z-index and per-breakpoint bottom offsets for the three
  layers.
- **Rationale**: Depth in this footer depends on two separate cues: front-to-back
  stacking order and stepped vertical placement. Encoding both avoids accidental
  regressions if DOM order changes or responsive styles shift.
- **Alternatives considered**: Rely on DOM order only, or use a single shared offset
  scale. Rejected because those approaches are too fragile across breakpoints.

## Decision 5: Fade Title and Date Out Before Footer Settle

- **Decision**: Add a dedicated title/date fade-out window that completes before the
  footer reaches its final fully visible state.
- **Rationale**: The accepted clarifications define the layered footer as the sole
  final destination. Title and date must hand off to that scene, not compete with it
  until the end of the scroll.
- **Alternatives considered**: Leave existing title timing unchanged or let the title
  fade out simultaneously with final footer settle. Rejected because the footer would
  not read as the resolved ending state soon enough.

## Decision 6: Keep Short Screens in a Compact Height Mode

- **Decision**: Introduce compact-height layout tokens that compress layer heights and
  offsets when the viewport height is below a defined threshold.
- **Rationale**: The accepted clarifications require all three layers to remain
  visible together even on short supported screens. That needs a deliberate layout
  mode rather than assuming default mobile sizes will fit.
- **Alternatives considered**: Hide or crop the far layer on short screens, or let the
  scene overflow vertically. Rejected because both approaches violate the accepted
  visibility requirement.

## Decision 7: Use a Footer-Local CTA That Reuses Existing Navigation

- **Decision**: Add a footer-local CTA labeled `Are You Coming?` that routes to the
  existing RSVP page at `/are-you-coming`.
- **Rationale**: The footer can no longer be decorative-only. Reusing the established
  React Router destination satisfies the accepted clarification without introducing new
  routing or navigation abstractions.
- **Alternatives considered**: Leave navigation solely to the overlay menu, or invent
  a footer-specific intermediate route. Rejected because the first violates the
  accepted clarification and the second adds unnecessary architecture.

## Decision 8: Preserve the In-Repo Sample Reference as Visual QA Truth

- **Decision**: Use `Components/RoadLayers/Sample2.png` as the visual reference for
  manual QA of stepped depth, grounding, and overall composition.
- **Rationale**: The accepted clarifications explicitly preserve this reference, and
  the file is available in the repository. That makes it a concrete review artifact
  instead of an abstract note.
- **Alternatives considered**: Infer the composition only from text requirements.
  Rejected because a named visual reference exists and should anchor QA.

## Decision 9: Reduced Motion Preserves Composition, Not Decorative Lift

- **Decision**: Reduced-motion behavior keeps the same scene structure, title/date
  exit order, CTA availability, and stepped offsets while minimizing reveal
  translation and avoiding decorative per-layer movement.
- **Rationale**: The spec requires the same readable ordering and depth cues even when
  motion is softened. Static layering plus clear content handoff should carry most of
  the meaning.
- **Alternatives considered**: Disable the footer transition entirely or collapse all
  layers into a static flat strip. Rejected because both approaches weaken the final
  scene and violate the depth requirement.

## Implementation Follow-Through

- The CTA now reuses the shared `RSVP_ROUTE` export so the footer action stays pinned
  to the same destination as the rest of the app routing.
- Exact DOM order is enforced through a dedicated
  `HOME_FOOTER_LAYER_DOM_RENDER_ORDER` constant while z-index still preserves the
  front/mid/far stack.
- Compact-height mode is implemented with a viewport-height media query and scales
  both layer offsets and CTA offsets, not just image heights.
- Validation is partially automated: targeted eslint for the touched Home files and
  `npx tsc --noEmit` pass locally; browser/manual checks remain pending because
  Playwright is not installed in this workspace.
