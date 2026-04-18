# Research: 003-fix-navbar-interaction

## Decision 1: Keep the navigation overlay on Radix Dialog and enforce full-screen behavior via app shell state

- Decision: Continue using Radix Dialog as the accessibility primitive for the navigation overlay, with explicit app-state control (`isOpen`) and full-screen positioning.
- Rationale: Radix already provides robust focus management and escape-key semantics; preserving this avoids regressions and reduces implementation risk.
- Alternatives considered:
  - Replace Dialog with a custom overlay implementation.
    - Rejected because it increases accessibility and focus-trap complexity.
  - Use CSS-only hidden/visible panel without dialog semantics.
    - Rejected because keyboard and screen-reader behavior becomes less reliable.

## Decision 2: Use Home sky tokens as the single visual source for menu background parity

- Decision: Reuse `HOME_SURFACE_TOKENS` (or extracted derivatives) for overlay sky color and glow layers so menu visual style matches Home.
- Rationale: The requirement asks for both color and visual style parity; token reuse keeps this deterministic and maintainable.
- Alternatives considered:
  - Approximate colors directly inside navigation component.
    - Rejected because hardcoded values drift over time and violate data-driven style constraints.
  - Introduce a new independent navigation palette.
    - Rejected because it breaks pixel-art continuity with Home.

## Decision 3: Drive all menu links from shared typed destination config, not page logic

- Decision: Render overlay links from centralized navigation constants and keep type shapes flexible enough for future additions.
- Rationale: This directly satisfies extensibility requirements and keeps route metadata in one place.
- Alternatives considered:
  - Hardcode link JSX inside `PersistentNavigation`.
    - Rejected due duplication and maintenance cost.
  - Build menu entries dynamically from current routes at runtime.
    - Rejected because route map may include redirects/utility routes not intended for primary nav.

## Decision 4: Clarified current-route and non-link-space interactions are first-class contract behaviors

- Decision: Implement two explicit behaviors:
  - selecting current route closes overlay without navigation,
  - clicking/tapping non-link menu space closes overlay without navigation.
- Rationale: Both behaviors are clarified in spec and materially affect user flow and test coverage.
- Alternatives considered:
  - Treat current-route click as normal navigation.
    - Rejected because it can reset context unnecessarily.
  - Ignore non-link-space clicks.
    - Rejected because clarified spec requires close-on-empty-space behavior.

## Decision 5: Reduced-motion mode must minimize both overlay transition and icon morph

- Decision: Honor reduced-motion preference with minimal/near-instant transition durations for overlay open/close and trigger icon morph.
- Rationale: Accessibility requirement applies to all motion-bearing state changes, not only the overlay container.
- Alternatives considered:
  - Disable only large overlay animations.
    - Rejected because icon morph would still be unnecessary motion.
  - Keep full animation for all users.
    - Rejected due explicit reduced-motion requirement.

## Decision 6: Keep background fully inert while menu is open

- Decision: While overlay is open, disable background scrolling and pointer interaction so the menu is the only interactive surface.
- Rationale: Full-screen menu should behave as modal navigation mode; this reduces accidental interactions and aligns with clarified behavior.
- Alternatives considered:
  - Block click but allow scroll.
    - Rejected because it still produces visual/background state drift while navigating.
  - Allow full background interaction.
    - Rejected because it contradicts full-screen modal-navigation intent.
