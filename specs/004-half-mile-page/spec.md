# Feature Specification: The Half Mile Map Page

**Feature Branch**: `[004-half-mile-page]`  
**Created**: 2026-04-17  
**Status**: Draft  
**Input**: User description: "Create a new page called `The Half Mile`.

Requirements:
- Display the map image from `Components/BlackhorseMap/`.
- Center the map on the page.
- The image must scale to the full available screen width while keeping some top and bottom margin.
- Use the same sky background style as the Home page.
- Add randomly positioned clouds using the assets from `Components/Clouds`.

Interactions:
- Add a CTA button fixed near the bottom section of the page that navigates back to `Home`.
- Add invisible circular interactive hotspots positioned on top of these breweries on the map:
  - Exale â€” https://www.exale.uk/
  - Signature Brew â€” https://www.signaturebrew.co.uk/password
  - Hackney Church Brew Co â€” https://hackneychurchbrew.co/
  - Pretty Decent Beer Co â€” https://prettydecentbeer.co/
  - 40FT Brewery â€” https://40ftbrewery.com/

Hotspot behavior:
- Each hotspot must sit over the correct brewery location on the map.
- Hotspots should be invisible but clickable/tappable.
- When a hotspot is pressed, show a small card/popover with the brewery name and website link.
- The card should be lightweight, readable, and consistent with the site art direction.
- Only one brewery card should be open at a time.
- The interaction must work well on both desktop and mobile.

Navigation:
- Add `The Half Mile` to the navbar.

Design constraints:
- Keep visual consistency with the existing pixel-art style and Home page atmosphere.
- Preserve responsive behavior across screen sizes.
- Do not alter the map artwork itself; only overlay the interactive hotspots."

## Clarifications

### Session 2026-04-17

- Q: When users activate brewery website links from hotspot cards, should those external pages open in the same tab or a new tab? -> A: Open in a new tab.
- Q: How should users dismiss an open brewery card? -> A: Support both outside tap/click and close button.
- Q: How should invisible brewery hotspots support keyboard users? -> A: Hotspots are keyboard-focusable with visible focus state; Enter/Space opens card; Esc closes open card.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explore the Half Mile map scene (Priority: P1)

As a guest, I can open a dedicated "The Half Mile" page that presents the map in a centered, full-width layout with the same sky atmosphere as Home so the new experience feels like part of the same invitation world.

**Why this priority**: The core value is introducing the map scene itself; without this, the feature does not exist from a user perspective.

**Independent Test**: Navigate to "The Half Mile" and verify the map appears centered, uses full available width, keeps visible top and bottom breathing space, and maintains the shared sky-and-cloud atmosphere.

**Acceptance Scenarios**:

1. **Given** a user opens "The Half Mile," **When** the page loads, **Then** the map artwork is displayed centered in the viewport and scales to full available width without changing the artwork content.
2. **Given** the page is viewed on mobile, tablet, or desktop, **When** layout is rendered, **Then** top and bottom spacing around the map remains present and the page remains readable and visually coherent.
3. **Given** the page background is visible, **When** the user views the scene, **Then** the visual background and cloud treatment match the Home atmosphere and pixel-art direction.

---

### User Story 2 - Discover brewery information through map hotspots (Priority: P2)

As a guest, I can tap or click invisible map hotspots over brewery locations to see a lightweight brewery card with a direct website link.

**Why this priority**: The interactive hotspots are the key user interaction that turns the map from static art into useful navigable content.

**Independent Test**: Activate each hotspot and confirm the correct brewery name and website link appear in a readable card, with only one card open at any time.

**Acceptance Scenarios**:

1. **Given** the user sees the map, **When** they tap or click a brewery location hotspot, **Then** a single brewery card appears with the matching brewery name and website link.
2. **Given** one brewery card is open, **When** the user activates a different hotspot, **Then** the prior card closes and only the newly selected brewery card remains open.
3. **Given** the user activates each listed brewery hotspot, **When** the card opens, **Then** the card content maps correctly to Exale, Signature Brew, Hackney Church Brew Co, Pretty Decent Beer Co, or 40FT Brewery.
4. **Given** a brewery card is open, **When** the user activates its website link, **Then** the brewery website opens in a new browser tab and the Half Mile page remains open in the current tab.
5. **Given** a brewery card is open, **When** the user taps or clicks outside the card or activates its close control, **Then** the card closes and the user remains on The Half Mile page.
6. **Given** hotspot focus is on a keyboard-focusable marker, **When** the user presses Enter or Space, **Then** the associated brewery card opens and pressing Esc closes the currently open card.

---

### User Story 3 - Return to main navigation flow quickly (Priority: P3)

As a guest, I can reach "The Half Mile" from the navbar and use a persistent page CTA near the lower section to return Home quickly.

**Why this priority**: This ensures the new page is discoverable and does not become a dead end in the site flow.

**Independent Test**: Confirm navbar includes "The Half Mile" and that the bottom-fixed CTA returns users to Home from both desktop and mobile viewports.

**Acceptance Scenarios**:

1. **Given** the global navbar is opened, **When** the user selects "The Half Mile," **Then** the app navigates to the new page.
2. **Given** the user is on "The Half Mile," **When** they activate the bottom CTA, **Then** the app navigates to Home.

### Edge Cases

- If a user taps near two hotspots on a small screen, the closest intended hotspot should activate and only one card should appear.
- If a hotspot is opened near screen edges, the brewery card should remain fully readable within the viewport.
- If a user repeatedly taps the same hotspot, the page should not create duplicate stacked cards.
- If cloud positions vary on each visit, they should not block the CTA or prevent hotspot interaction.
- If the map loads in very wide or very narrow viewports, hotspot locations should still align with their corresponding brewery positions.
- If a user dismisses a card, no other card should open unless a hotspot is actively selected.

## Experience Constraints *(mandatory)*

### Visual and Narrative Continuity

- The page must preserve the established pixel-art farewell invitation identity, using the same sky mood and atmosphere as Home.
- This feature extends the shared exploration layer of the site while leaving RSVP and public messaging flows unchanged.
- Motion, if present, should support gentle scene liveliness (for example, cloud placement/atmosphere) without distracting from map exploration.

### Accessibility and Responsiveness

- The map scene, hotspots, cards, and return CTA must be usable across mobile, tablet, and desktop layouts.
- Interactive targets must remain large enough for touch usage and readable against the sky background.
- Hotspot interactions and CTA navigation must be keyboard reachable, with visible focus indication and predictable activation behavior.
- The open brewery card should remain readable and dismissible by outside tap/click, explicit close control, or hotspot switch, without trapping users.
- Keyboard users must be able to focus each invisible hotspot, perceive focus state, open a card with Enter/Space, and close the active card with Esc.

### Content and Data Modeling

- Brewery definitions (name, website, map anchor location) should be modeled as structured repeatable content rather than scattered inline values.
- Navigation entry metadata for "The Half Mile" should live alongside existing shared navigation definitions.
- Reusable copy for CTA label and brewery card text should remain centralized for future wording updates.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a new page titled "The Half Mile."
- **FR-002**: The system MUST render the existing Half Mile map artwork on that page without altering the artwork itself.
- **FR-003**: The map MUST be centered in the page layout and scale to the full available viewport width while preserving visible top and bottom page margin.
- **FR-004**: The page MUST use the same sky-style background treatment as the Home page.
- **FR-005**: The page MUST display decorative cloud elements in varied/randomized positions using the existing cloud asset set.
- **FR-006**: The system MUST expose a CTA near the lower fixed page area that navigates users back to Home.
- **FR-007**: The global navbar MUST include a "The Half Mile" destination that routes to this page.
- **FR-008**: The map MUST include five invisible circular interactive hotspots aligned to the correct locations for Exale, Signature Brew, Hackney Church Brew Co, Pretty Decent Beer Co, and 40FT Brewery.
- **FR-009**: Hotspots MUST be clickable and tappable while remaining visually hidden in the default state.
- **FR-010**: Activating a hotspot MUST open a lightweight brewery card that shows the corresponding brewery name and a link to its website.
- **FR-011**: The brewery websites surfaced by hotspot cards MUST be:
  - Exale: `https://www.exale.uk/`
  - Signature Brew: `https://www.signaturebrew.co.uk/password`
  - Hackney Church Brew Co: `https://hackneychurchbrew.co/`
  - Pretty Decent Beer Co: `https://prettydecentbeer.co/`
  - 40FT Brewery: `https://40ftbrewery.com/`
- **FR-012**: At most one brewery card MUST be open at a time.
- **FR-013**: Opening a new brewery card MUST close any previously open brewery card.
- **FR-014**: The hotspot and card interaction model MUST remain usable and legible on both desktop and mobile viewports.
- **FR-015**: Brewery website links opened from hotspot cards MUST open in a new browser tab.
- **FR-016**: An open brewery card MUST close when users tap or click outside the card.
- **FR-017**: Each brewery card MUST provide an explicit close control that closes the card without navigation.
- **FR-018**: Brewery hotspots MUST be keyboard-focusable and expose a visible focus state while remaining visually hidden by default.
- **FR-019**: Pressing Enter or Space on a focused hotspot MUST open its associated brewery card.
- **FR-020**: Pressing Esc while a brewery card is open MUST close the currently open brewery card.

### Key Entities *(include if feature involves data)*

- **Half Mile Brewery**: Represents one brewery point on the map, including display name, website URL, and map anchor position.
- **Map Hotspot**: Represents an invisible circular interactive area linked to exactly one brewery.
- **Active Brewery Card State**: Represents which single brewery card is currently open, or none.
- **Half Mile Navigation Entry**: Represents the global navigation destination metadata for accessing the page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In responsive acceptance testing (mobile, tablet, desktop), 100% of page loads show the map centered and full-width with non-zero top and bottom visual margin.
- **SC-002**: In interaction testing, 100% of the five brewery hotspots open the correct brewery name and website link.
- **SC-003**: In state-behavior testing, 100% of hotspot-switch interactions keep only one brewery card open at a time.
- **SC-004**: In navigation testing, users can reach "The Half Mile" from the navbar and return Home via the page CTA in one activation each.
- **SC-005**: In usability checks on desktop and mobile, at least 90% of participants can open a brewery card and identify where to return Home without guidance.

## Assumptions

- The existing Half Mile map and cloud image assets are available and approved for reuse.
- The five brewery links are intentionally external destinations and should be exposed as provided.
- The scope is limited to one new page, one navbar addition, and map-overlay interactions; no RSVP/message data flows are changed.
- The siteâ€™s existing Home sky visual language is the source-of-truth style reference for this page background.
