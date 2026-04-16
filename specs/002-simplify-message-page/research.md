# Research: 002-simplify-message-page

## Decision 1: Keep architecture frontend-only with zero backend/schema changes

- Decision: Implement all feature requirements in page/component/hook/validation layers and keep Supabase schema, table shape, and edge behavior unchanged.
- Rationale: Requirements explicitly prohibit backend changes, and existing `guest_messages` flow already supports fetch/insert and emoji-safe UTF-8 content.
- Alternatives considered:
  - Add backend validation for name letter-or-number requirement.
    - Rejected because the feature scope is UI/UX simplification only.
  - Add new API endpoint for sticky/mobile behavior telemetry.
    - Rejected because no backend behavior is needed for layout usability.

## Decision 2: Implement sticky composer with fixed-bottom dock plus viewport-aware spacing

- Decision: Keep `Leave a note` fixed at viewport bottom and reserve wall bottom space dynamically so wall content is never hidden; include safe-area and visual viewport handling for keyboard-open scenarios.
- Rationale: CSS-only fixed positioning is not enough on mobile keyboards where the visual viewport shrinks and controls can be obscured.
- Alternatives considered:
  - Use only `position: sticky`.
    - Rejected because sticky behavior can break with nested containers and does not reliably solve keyboard overlap.
  - Disable fixed behavior on mobile.
    - Rejected because requirement mandates sticky usability across mobile and desktop.

## Decision 3: Enforce emoji-friendly Name with at least one letter or number

- Decision: Validate trimmed Name with Unicode property checks requiring at least one `Letter` or `Number`, while allowing emoji and punctuation.
- Rationale: Requirement allows emojis but forbids emoji-only names; Unicode-aware validation avoids ASCII-only regressions for multilingual names.
- Alternatives considered:
  - ASCII `[A-Za-z0-9]` requirement.
    - Rejected because it fails non-Latin names.
  - Reject symbols/emoji entirely.
    - Rejected because requirement explicitly supports emoji-friendly inputs.

## Decision 4: Keep existing message max length without persistent counter UI

- Decision: Preserve max message length at existing value and remove always-visible character counter; show concise inline error only when validation fails.
- Rationale: This satisfies simplification goals and explicit requirement to remove persistent limit guidance while preserving existing constraints.
- Alternatives considered:
  - Keep live counter near label.
    - Rejected because requirement calls out removing pink/limit guidance clutter.
  - Remove max length entirely.
    - Rejected because requirement explicitly keeps current max length.

## Decision 5: Preserve Home artistic direction through shared palette/tone, not Home scene cloning

- Decision: Align MessagePage background and card treatment with existing Home palette/atmosphere while keeping MessagePage structurally simple.
- Rationale: Requirement asks for visual continuity, but cloning Home scroll scene would add unnecessary complexity and violate minimal layout intent.
- Alternatives considered:
  - Reuse full `HomeScene` in MessagePage.
    - Rejected due interaction/performance overhead and route complexity.
  - Create a brand-new unrelated theme.
    - Rejected because it breaks pixel-art continuity requirement.

## Decision 6: Two-section information architecture enforced in route composition

- Decision: Route-level layout renders only:
  - `Empty Wall` section (first).
  - Sticky `Leave a note` section (second, docked bottom).
- Rationale: Enforcing this at page composition level prevents reintroduction of third primary blocks.
- Alternatives considered:
  - Keep hero/stats and hide with CSS.
    - Rejected because hidden legacy blocks increase maintenance and violate "only two main sections".
