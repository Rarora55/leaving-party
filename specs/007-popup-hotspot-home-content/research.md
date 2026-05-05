# Research: Popup Overlay and Content Updates

## Decision 1: Popup dismissal methods
- Decision: Support dismissal via `X`, `Got it`, `Escape`, and overlay click/tap.
- Rationale: Matches user requirements and standard modal interaction expectations while preserving keyboard and touch usability.
- Alternatives considered:
  - Restrict dismissal to explicit buttons only: clearer accidental-close prevention but less ergonomic.
  - Escape-only keyboard dismissal without overlay close: insufficient for touch-first users.

## Decision 2: Focus restoration behavior
- Decision: Return focus to the same hotspot that opened the popup after close.
- Rationale: Predictable keyboard flow and accessibility best practice for transient dialogs.
- Alternatives considered:
  - Move focus to page root/first control: disorients keyboard users.
  - No focus management: creates focus loss risk.

## Decision 3: Visual layering strategy
- Decision: Render popup as a centered fixed card with dark translucent backdrop and light blur.
- Rationale: Clear visual separation, minimal style drift, and preserved readability across map backgrounds.
- Alternatives considered:
  - Keep anchored tooltip-style card: insufficient emphasis for modal behavior requirement.
  - Fullscreen panel: over-scoped and visually disruptive.

## Decision 4: Signature Brew star alignment
- Decision: Render `star.png` absolutely centered inside the Signature Brew hotspot button with clamp-based responsive sizing.
- Rationale: Ensures marker remains aligned with existing hotspot coordinates at all breakpoints.
- Alternatives considered:
  - Separate layer anchored by duplicated coordinates: higher drift risk and duplicated positioning logic.
  - Static pixel sizing: weaker cross-device alignment.

## Decision 5: Home content insertion approach
- Decision: Append two additional text rows in `HomeTitleReveal` with shared motion/opacity transforms and red-highlighted time token.
- Rationale: Preserves existing reveal choreography and avoids introducing new content systems for one-time copy.
- Alternatives considered:
  - Extend constants/types first for every new line: more reusable long-term but unnecessary overhead for current scope.
  - Render plain static text outside title reveal: would break existing visual rhythm.
