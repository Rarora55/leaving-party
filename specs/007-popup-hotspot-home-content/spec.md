# Feature Specification: Popup Overlay and Content Updates

**Feature Branch**: `[007-popup-hotspot-home-content]`  
**Created**: 2026-05-05  
**Status**: Draft  
**Input**: User description: "Implement a new popup component using the existing assets/components found in Components/Popup, add Signature Brew star marker on /the-half-mile, and update Home content lines."

## Clarifications

### Session 2026-05-05

- Q: What should happen to keyboard focus when the popup closes? → A: Return focus to the same hotspot button that opened the popup.
- Q: Should tapping/clicking the dark overlay close the popup? → A: Yes, overlay click/tap closes the popup.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View and Close Brewery Popup (Priority: P1)

As a visitor browsing the Half Mile map, I can open a brewery popup and close it clearly so I can view details without losing context.

**Why this priority**: Popup visibility and close controls are the highest-value interaction and directly affect core map usability.

**Independent Test**: Open any map hotspot and verify a centered popup card appears above a dimmed page, then close it using the top-right close control and the secondary action button.

**Acceptance Scenarios**:

1. **Given** the Half Mile map is visible, **When** a hotspot is activated, **Then** a popup card appears above the page with a subtle dark overlay.
2. **Given** the popup is open, **When** the visitor activates the top-right `X` control, **Then** the popup closes and the page returns to normal brightness.
3. **Given** the popup is open, **When** the visitor activates the `Got it` control, **Then** the popup closes and the page returns to normal brightness.

---

### User Story 2 - Keyboard and Mobile-safe Popup Access (Priority: P1)

As a keyboard or mobile user, I can operate the popup without layout breakage so the experience remains accessible and consistent.

**Why this priority**: Accessibility and responsive behavior are required for all visitors and prevent regressions in existing navigation.

**Independent Test**: Open popup using keyboard, close with keyboard controls, and verify the popup remains usable at mobile and desktop widths.

**Acceptance Scenarios**:

1. **Given** the popup is open, **When** the Escape key is pressed, **Then** the popup closes.
2. **Given** the popup is open on a small screen, **When** content is viewed, **Then** the popup remains readable and fully operable without clipping critical controls.

---

### User Story 3 - Signature Brew and Home Copy Enhancements (Priority: P2)

As a visitor, I can identify the Signature Brew hotspot with a star marker and view updated event time/address details on Home.

**Why this priority**: This improves wayfinding and communicates event details, but is secondary to core popup behavior.

**Independent Test**: Navigate to `/the-half-mile` and verify star marker alignment over Signature Brew hotspot; navigate to Home and verify the two new lines appear with `5:00 PM` styled red.

**Acceptance Scenarios**:

1. **Given** `/the-half-mile` is loaded, **When** the map is rendered, **Then** the star image appears centered on the Signature Brew red circle and stays aligned across responsive breakpoints.
2. **Given** Home is loaded, **When** the hero text appears, **Then** it includes `We'll be there at 5:00 PM` with the time in red and `Unit 15, Blackhorse Ln, London E17 5QJ` beneath it.

### Edge Cases

- When popup is open and focus shifts, close controls remain reachable and operable.
- When viewport width is narrow, popup controls remain visible without overlap.
- When hotspot visual states change, the Signature Brew star remains centered and does not block activation.

## Experience Constraints *(mandatory)*

### Visual and Narrative Continuity

- Preserve the existing farewell invitation visual style by using current Popup assets and existing card styling patterns.
- Affects the Half Mile interactive map layer and Home title text layer.
- Motion remains subtle; popup emphasis is provided by dimmed overlay rather than new aggressive animation.

### Accessibility and Responsiveness

- Popup must be operable on mobile, tablet, and desktop with readable text and accessible touch targets.
- Close controls must support pointer and keyboard usage.
- Popup dismissal must support both explicit controls and Escape key behavior.

### Content and Data Modeling

- New Home copy remains in presentational layer near existing title/subtitle content.
- Signature Brew marker uses existing project asset (`star.png`) and existing hotspot coordinates.
- No new persistent data model is required.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a popup card above current page content when a Half Mile brewery hotspot is activated.
- **FR-002**: System MUST display a subtle dark overlay while the popup is active and remove it after closing.
- **FR-003**: Users MUST be able to close the popup via a top-right `X` control.
- **FR-004**: Users MUST be able to close the popup via a `Got it` control inside the popup card.
- **FR-005**: System MUST support keyboard-friendly dismissal behavior, including Escape key support when popup is open.
- **FR-010**: System MUST return keyboard focus to the hotspot that opened the popup when the popup closes.
- **FR-011**: System MUST close the popup when users click or tap outside the popup card on the dark overlay.
- **FR-006**: System MUST place `star.png` over the Signature Brew hotspot on `/the-half-mile`, keeping it centered and responsive.
- **FR-007**: System MUST add Home text line `We'll be there at 5:00 PM` after existing text, with `5:00 PM` in red.
- **FR-008**: System MUST add Home text line `Unit 15, Blackhorse Ln, London E17 5QJ` below the new time line.
- **FR-009**: System MUST preserve existing spacing, visual style, and responsive behavior of affected screens.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of tested popup interactions can be dismissed via both `X` and `Got it` controls.
- **SC-002**: Popup overlay visibly darkens the underlying page during active state and fully clears on close in all tested routes.
- **SC-003**: Signature Brew star marker remains visually centered over the hotspot at mobile, tablet, and desktop viewport checks.
- **SC-004**: Home page displays both new content lines with red-highlighted `5:00 PM` and no layout overlap at tested viewport sizes.

## Assumptions

- Popup behavior is applied to current Half Mile brewery detail interaction.
- Existing Popup assets are approved for use as decorative content inside the popup card.
- No additional analytics or telemetry events are required for popup open/close actions.
- Existing typography and spacing scales remain the baseline for new text lines.
