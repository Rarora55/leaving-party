# Research: 004-half-mile-page

## Decision 1: Reuse Home sky tokens as the Half Mile page background source

- Decision: Use `HOME_SURFACE_TOKENS` and related sky-layer tokens from `src/shared/constants/home.constants.ts` as the background source for The Half Mile scene.
- Rationale: This guarantees visual continuity with Home and avoids style drift from duplicated gradient values.
- Alternatives considered:
  - Recreate similar sky gradients in a new component.
    - Rejected because duplicated style values are harder to maintain and can diverge.
  - Use a flat background color only.
    - Rejected because it breaks the established atmospheric pixel-art look.

## Decision 2: Cloud randomization should be per-render deterministic and interaction-safe

- Decision: Generate cloud positions from a bounded random set once per page mount and clamp them to non-interactive safe zones.
- Rationale: The page should feel alive and varied while preserving predictable CTA and hotspot interactions.
- Alternatives considered:
  - Hardcode static cloud positions.
    - Rejected because the spec explicitly asks for random positioning.
  - Recompute random positions continuously.
    - Rejected because it creates visual noise and can overlap interactive targets over time.

## Decision 3: Anchor hotspots with map-relative percentages

- Decision: Store hotspot coordinates as normalized percentages (`xPercent`, `yPercent`) relative to map dimensions and render them in an absolutely positioned overlay matching map bounds.
- Rationale: Percentage anchors scale with responsive image sizing and keep brewery markers aligned across viewports.
- Alternatives considered:
  - Pixel-based hotspot coordinates.
    - Rejected because they drift on responsive resize.
  - SVG map rewrite with embedded points.
    - Rejected because the map artwork must not be altered.

## Decision 4: Keep brewery card state single-source and mutually exclusive

- Decision: Manage one `activeBreweryId: string | null` state for the page; opening any hotspot replaces the previous value.
- Rationale: This directly enforces the clarified one-open-card rule and simplifies testing.
- Alternatives considered:
  - Independent open state per hotspot.
    - Rejected because multiple cards could remain open.
  - Global modal store reused from navigation overlay.
    - Rejected because this interaction is local to Half Mile and does not require shared app state.

## Decision 5: Accessibility contract for invisible hotspots must include visible focus cues

- Decision: Keep hotspots visually hidden at rest but keyboard-focusable with a visible focus style; open with `Enter`/`Space`, close active card with `Esc`.
- Rationale: Invisible pointer targets without focus affordance fail keyboard discoverability and violate accessibility expectations.
- Alternatives considered:
  - Pointer-only invisible hotspots.
    - Rejected due accessibility regression.
  - Add a separate visible list only.
    - Rejected because it duplicates content and weakens direct map interaction intent.

## Decision 6: External brewery links open in a new tab with safe attributes

- Decision: Render brewery links with new-tab behavior and secure rel attributes.
- Rationale: Clarified behavior requires keeping users on the map page while allowing external exploration.
- Alternatives considered:
  - Open links in current tab.
    - Rejected because it disrupts page context.
  - Show intermediate confirmation modal before opening.
    - Rejected as unnecessary friction for low-risk external links.

## Decision 7: Reuse shared navigation constants for navbar integration

- Decision: Add The Half Mile destination to shared navigation constants consumed by persistent navigation.
- Rationale: Keeps route metadata centralized and maintainable, aligned with the data-driven architecture principle.
- Alternatives considered:
  - Hardcode new link in `PersistentNavigation.tsx`.
    - Rejected because it creates component-level routing duplication.
