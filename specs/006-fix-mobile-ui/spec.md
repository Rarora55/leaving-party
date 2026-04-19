# Feature Specification: Mobile Home and Message Usability Fixes

**Feature Branch**: `006-fix-mobile-ui`  
**Created**: 2026-04-19  
**Status**: Draft  
**Input**: User description: "On mobile phones, increase prominence of the home page final scene, ensure the Drop a Message page remains scrollable while typing, and add a collapsible message card with directional arrow toggle."

## Clarifications

### Session 2026-04-19

- Q: What numeric target defines "increase visual size/prominence" for the final mobile home scene? → A: Increase final scene visible size by at least 20% on phone viewports versus the current mobile baseline.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Improve Final Home Scene Legibility on Phones (Priority: P1)

As a mobile visitor, I want the final home scene to appear larger and more visually prominent so I can clearly read and appreciate the farewell artwork without effort.

**Why this priority**: The home finale is a core emotional moment of the invitation experience. If it appears too small on phones, the most important visual story beat is weakened.

**Independent Test**: Open the home page on representative phone sizes and verify the final scene occupies a clearly larger, readable area while desktop presentation remains unchanged.

**Acceptance Scenarios**:

1. **Given** a visitor using a phone viewport, **When** they reach the final home scene, **Then** the characters, van, and landscape appear at least 20% larger than the current mobile baseline and remain clearly readable without pinch-zoom.
2. **Given** a visitor using desktop viewport sizes, **When** they reach the final home scene, **Then** the scene appears unchanged from the current desktop baseline.

---

### User Story 2 - Keep Message Page Scrollable While Typing on Phones (Priority: P1)

As a mobile guest composing a message, I want to keep scrolling naturally while the keyboard is open so I can move through the page without friction.

**Why this priority**: If scrolling is blocked while typing, message submission becomes frustrating and users can abandon the form.

**Independent Test**: On phones, focus each message field and verify normal vertical page scrolling continues during typing, including with long content and open keyboard.

**Acceptance Scenarios**:

1. **Given** a phone user focused in a message input or textarea, **When** they drag the page vertically, **Then** the page scrolls normally without being locked.
2. **Given** a phone user typing in the message form, **When** they continue scrolling through the page, **Then** no blocked-scroll side effect causes an unintended refresh interruption.

---

### User Story 3 - Collapse and Expand the Message Card on Demand (Priority: P2)

As a mobile user on the message page, I want to collapse or expand the message card from a top toggle so I can manage screen space while composing.

**Why this priority**: A collapsible card improves mobile ergonomics on small screens, especially with the keyboard open.

**Independent Test**: Verify the message card toggle collapses and expands the card reliably, displays the correct arrow direction for each state, and preserves in-progress form content.

**Acceptance Scenarios**:

1. **Given** the message card is expanded, **When** the user presses the top toggle button, **Then** the card collapses and the button shows an up arrow.
2. **Given** the message card is collapsed, **When** the user presses the top toggle button, **Then** the card expands and the button shows a down arrow.
3. **Given** the user has already entered form text, **When** they collapse and re-expand the card, **Then** entered values remain available.

---

### Edge Cases

- The user rotates a phone between portrait and landscape while the message card is collapsed.
- The textarea contains long multi-line content and the keyboard remains open while the user scrolls.
- The user repeatedly toggles collapse and expand quickly; card state and arrow direction remain synchronized.
- Validation or error feedback is already visible when the card is collapsed and then expanded again.

## Experience Constraints *(mandatory)*

### Visual and Narrative Continuity

- The update MUST preserve the existing farewell invitation visual identity and tone.
- The feature affects two surfaces only: home page final scene presentation and the Drop a Message page interaction layer.
- Any motion or transition used by card collapse/expand MUST feel consistent with current site pacing and not introduce a new art direction.

### Accessibility and Responsiveness

- Mobile phones are the primary target for behavior changes in this feature.
- Tablet and desktop behavior should remain functionally and visually unchanged except for minimal shared logic needed to keep consistency.
- Interactive controls, including the card toggle, MUST remain discoverable and reachable with touch and keyboard interaction.
- Focus behavior, screen-reader naming, and reduced-motion preferences MUST continue to support accessible use.

### Content and Data Modeling

- Any new card-state labels or toggle copy MUST be centrally defined in existing shared content/config patterns.
- No new persisted domain data is introduced; this feature only affects presentation and interaction behavior.
- Existing message submission content model remains unchanged.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST increase the visible size/prominence of the home page final scene by at least 20% for phone viewports compared with the current mobile baseline.
- **FR-002**: The final scene change MUST not alter desktop baseline layout or composition.
- **FR-003**: On phones, the final scene MUST remain readable without requiring horizontal scrolling or pinch-zoom.
- **FR-004**: On phones, the Drop a Message page MUST allow normal vertical page scrolling while any message input field has focus.
- **FR-005**: Typing into message inputs or textarea on phones MUST NOT lock page scrolling.
- **FR-006**: Phone typing and scrolling interactions MUST avoid blocked-scroll behavior that can trigger unintended refresh interruptions.
- **FR-007**: The message card MUST include a top-area toggle control for collapse/expand behavior.
- **FR-008**: The toggle control MUST show a down arrow when the card is expanded and an up arrow when the card is collapsed.
- **FR-009**: Pressing the toggle MUST collapse an expanded card and expand a collapsed card.
- **FR-010**: Collapsing and expanding the card MUST preserve any in-progress field values and user-entered text.
- **FR-011**: Card toggle behavior MUST prioritize mobile usability and remain stable during repeated toggling and viewport changes.
- **FR-012**: The feature MUST maintain existing visual style consistency across affected pages.

### Key Entities *(include if feature involves data)*

- **Home Finale Scene Presentation State**: Represents viewport-specific visual prominence of the final home scene while preserving shared art composition.
- **Message Composition Interaction State**: Represents form-focus and scroll behavior expectations during active text entry.
- **Message Card Expansion State**: Represents whether the card is expanded or collapsed, including matching arrow-direction indicator and continuity of in-progress form content.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In mobile QA across representative phone widths, 100% of test runs show the final home scene at least 20% larger than the current mobile baseline while remaining readable without zoom.
- **SC-002**: In at least 20 phone-based typing sessions, users retain normal vertical scrolling while focused in inputs/textarea in 100% of sessions.
- **SC-003**: In mobile QA, unintended refresh interruptions caused by blocked scrolling occur in 0 validated typing-and-scroll test runs.
- **SC-004**: Message card collapse/expand toggle passes 100% of validation runs for state change, arrow direction, and content preservation.
- **SC-005**: Desktop regression review confirms no unintended layout or style changes on unaffected desktop surfaces.

## Assumptions

- "Phone view" follows the project's existing mobile breakpoint definition.
- The current desktop layout and visual composition are approved baselines and should remain unchanged.
- The message card collapse state does not need long-term persistence between separate visits.
- Existing message submission flow, storage behavior, and backend integrations remain in scope as-is.
