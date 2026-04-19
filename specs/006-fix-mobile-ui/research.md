# Research: 006-fix-mobile-ui

## Decision 1: Enforce mobile home scene prominence with mobile-only frame sizing tokens

- Decision: Increase the mobile-only home footer scene frame width target to achieve the clarified minimum +20% visible-size increase, while leaving tablet/desktop sizing tokens unchanged.
- Rationale: Token-level sizing changes preserve the current scene composition and art direction while making the outcome measurable and scoped to phone breakpoints.
- Alternatives considered:
  - Scale the entire scene with `transform: scale(...)`.
    - Rejected because it complicates hit areas and can create blur/clipping artifacts on pixel art.
  - Increase image asset sizes independently per layer.
    - Rejected because it raises maintenance overhead and risks layer alignment drift.

## Decision 2: Keep desktop unchanged by explicitly isolating sizing behavior to phone breakpoints

- Decision: Apply the prominence increase only in phone sizing variables/class logic, with explicit non-changes for tablet and desktop values.
- Rationale: The spec requires desktop to remain unchanged; explicit breakpoint isolation minimizes regression risk.
- Alternatives considered:
  - Global scene resizing across all breakpoints.
    - Rejected because it violates non-regression scope.
  - Separate mobile-only duplicate scene component.
    - Rejected because it duplicates logic and increases long-term maintenance cost.

## Decision 3: Preserve natural page scroll while typing by avoiding nested scroll traps in the composer flow

- Decision: Favor page-level vertical scrolling behavior while keyboard is open and avoid introducing/retaining nested overflow patterns that capture touch-scroll within the composer card.
- Rationale: Nested scroll containers in keyboard-open contexts are a frequent cause of mobile scroll lock and poor pull-to-refresh behavior.
- Alternatives considered:
  - Keep or add keyboard-open composer-only scrolling (`overflow-y-auto` as primary interaction).
    - Rejected because it can trap scroll gestures and conflict with expected page movement.
  - Lock body scroll while typing and force composer-only movement.
    - Rejected because it directly violates the requested behavior.

## Decision 4: Model composer collapse as local UI state in page composition layer

- Decision: Maintain an `isComposerCollapsed` boolean in page-level UI state; collapsing only changes card presentation, not form state ownership.
- Rationale: Form values already live in `useGuestMessageForm`; keeping collapse state separate guarantees typed content survives collapse/expand cycles.
- Alternatives considered:
  - Persist collapse state in localStorage.
    - Rejected because persistence is not required by scope and adds unnecessary behavior coupling.
  - Move collapse state into form hook.
    - Rejected because collapse is a layout concern, not submission/state-validation logic.

## Decision 5: Use deterministic arrow semantics tied to expansion state

- Decision: Render down arrow when expanded and up arrow when collapsed from a single state source of truth.
- Rationale: This matches clarified UX requirements and prevents state/icon mismatch during rapid toggles.
- Alternatives considered:
  - Toggle icon direction using CSS rotation only.
    - Rejected because it obscures explicit state mapping and is easier to desynchronize.
  - Use text-only toggle without icon.
    - Rejected because the spec explicitly requires directional arrow cues.

## Decision 6: Validate behavior with focused mobile interaction tests and desktop regression assertions

- Decision: Extend existing messages-page tests for toggle semantics and form persistence, add keyboard-open scroll behavior assertions, and add desktop non-regression assertions for affected surfaces.
- Rationale: Existing tests already mock message hooks and viewport logic, providing the fastest path to stable automated coverage.
- Alternatives considered:
  - Rely on manual QA only.
    - Rejected because scroll/toggle regressions are high-risk and should be guarded automatically.
  - Add end-to-end test tooling for this feature only.
    - Rejected due scope and setup overhead for this incremental UI fix.
