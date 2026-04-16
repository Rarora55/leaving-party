# Feature Specification: Minimal Message Page Layout

**Feature Branch**: `[002-simplify-message-page]`  
**Created**: 2026-04-15  
**Status**: Draft  
**Input**: User description: "Update MessagePage to keep only Empty Wall and Leave a note, remove extra messaging copy, show Empty Wall first and Leave a note at the bottom, preserve Home page background art direction, and make name/message inputs emoji-friendly."

## Clarifications

### Session 2026-04-15

- Q: What message length rule should apply for the simplified page? â†’ A: Keep existing max length; block submit only when exceeded, with a short inline error.
- Q: How should Empty Wall behave when messages exist? â†’ A: Show existing posted messages; show empty state only when there are no messages.
- Q: What does "Leave a note at the bottom" mean for layout behavior? -> A: Leave a note is fixed/sticky to the viewport bottom while scrolling.
- Q: How should emoji-only input be validated? -> A: Allow emoji-only Message, but require at least one letter/number in Name.
- Q: Should Message be required? -> A: Message is required; trim whitespace and block empty submissions with inline error.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Post a Simple Note (Priority: P1)

A visitor can leave a short note using a minimal form that feels playful and easy to complete.

**Why this priority**: Leaving a note is the core interaction of the page. If this is unclear or cluttered, the page fails its purpose.

**Independent Test**: Open the page, fill in Name and Message with text and emojis, submit, and verify the note appears without visual or text corruption.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the visitor sees the content, **Then** only two primary sections are present: Empty Wall and Leave a note.
2. **Given** the visitor enters a Name containing letters/numbers with optional emojis and a Message containing emojis, **When** they submit, **Then** emoji characters are preserved and displayed as entered.
3. **Given** the visitor exceeds the existing message length limit, **When** they submit, **Then** submission is blocked and a short inline error is shown without persistent character-limit guidance text.
4. **Given** the visitor enters a Name with only emojis and no letters/numbers, **When** they submit, **Then** submission is blocked with a concise inline validation error.
5. **Given** the visitor enters an empty or whitespace-only Message, **When** they submit, **Then** submission is blocked with a concise inline validation error.

---

### User Story 2 - Read the Wall Before Writing (Priority: P2)

A visitor sees the Empty Wall section first so they can read existing messages before deciding to write one.

**Why this priority**: The requested content hierarchy puts social context first and composition second.

**Independent Test**: Load the page on mobile and desktop and confirm Empty Wall appears above Leave a note, with Leave a note anchored as the bottom section.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** a visitor scrolls from top to bottom, **Then** the Empty Wall section appears first and the Leave a note section appears after it.
2. **Given** the page is fully rendered, **When** all major sections are enumerated, **Then** no third primary section is present.
3. **Given** one or more posted messages exist, **When** the Empty Wall section renders, **Then** those messages are shown instead of an empty placeholder state.
4. **Given** the visitor scrolls through the wall, **When** the page moves vertically, **Then** the Leave a note section remains fixed at the viewport bottom.

---

### User Story 3 - Keep Pixel-Art Continuity (Priority: P3)

A visitor navigating from Home to MessagePage experiences the same background mood and pixel-art identity.

**Why this priority**: Visual continuity across routes is required for a cohesive invitation experience.

**Independent Test**: Compare Home and MessagePage during navigation and verify shared visual tone, atmosphere, and playful personality.

**Acceptance Scenarios**:

1. **Given** a visitor navigates from Home to MessagePage, **When** the page appears, **Then** the background art direction and overall visual language feel consistent with Home.
2. **Given** MessagePage is viewed on supported breakpoints, **When** the interface is reviewed, **Then** the design remains minimal, clear, and aligned with the existing pixel-art style.

### Edge Cases

- Name contains only emojis and no letters/numbers; submission is rejected with inline validation.
- Message contains a mix of emoji and multilingual characters.
- No prior messages exist; Empty Wall still appears as the first main section.
- Very long notes still follow existing validation and submission rules while preserving accepted emoji characters.
- Message exceeds the existing maximum length; submission remains blocked until message length is reduced.
- Posted messages exist; Empty Wall presents current messages while remaining the first section.
- On small screens with an open keyboard, the sticky Leave a note section stays usable and does not hide required input controls.
- Message contains only whitespace; submission is rejected with inline validation.

## Experience Constraints *(mandatory)*

### Visual and Narrative Continuity

- MessagePage MUST keep the same background art direction and pixel-art atmosphere as Home.
- The redesign affects the public messages flow only and must not add new informational panels or helper blocks.
- Motion, if present, should support a calm playful tone without adding clutter.

### Accessibility and Responsiveness

- The two-section layout must remain clear on mobile, tablet, and desktop, with Empty Wall first and Leave a note anchored at the viewport bottom during scrolling.
- Name and Message fields must stay readable and usable for keyboard and touch input.
- Removed informational copy must not reduce form clarity for assistive technologies.

### Content and Data Modeling

- MessagePage copy must be reduced to only content required for Empty Wall and Leave a note.
- Messaging-related instructional text such as "Drop a message", "message saved here", and the pink character-limit note must not be displayed.
- Existing message records and submission behavior remain in scope as-is, with this feature focused on presentation and text hierarchy.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST expose only two primary content sections: Empty Wall and Leave a note.
- **FR-002**: The page MUST remove extra informational messaging copy related to posting, including "Drop a message", "message saved here", and the pink character-limit note.
- **FR-003**: The Empty Wall section MUST appear before Leave a note in the vertical layout order.
- **FR-004**: Leave a note MUST be the bottom primary section on the page and MUST remain fixed to the viewport bottom while the user scrolls.
- **FR-005**: MessagePage MUST preserve the same background art direction and visual style family used on Home.
- **FR-006**: The Name input MUST allow emoji characters but MUST require at least one letter or number for a valid submission.
- **FR-007**: The Message input MUST accept emojis as valid user-entered characters.
- **FR-008**: Emoji characters entered into Name and Message MUST remain unchanged through submission and display flow.
- **FR-009**: The redesigned page MUST remain minimal and clear, with no additional messaging guidance blocks beyond the two required sections.
- **FR-010**: Existing message posting behavior and wall rendering behavior MUST continue to work after the layout and copy simplification.
- **FR-011**: The existing maximum message length MUST remain enforced, and when exceeded, the page MUST show only a concise inline error near the message input without displaying persistent character-limit instructional text.
- **FR-012**: The Empty Wall section MUST display existing posted messages when available and MUST show an empty-state presentation only when no messages are available.
- **FR-013**: The sticky Leave a note section MUST remain usable on supported mobile and desktop viewports, including when the on-screen keyboard is open.
- **FR-014**: A Name containing only emojis (with no letters or numbers) MUST be rejected with a concise inline validation message.
- **FR-015**: Message MUST be required; whitespace-only Message input MUST be rejected after trimming with a concise inline validation message.

### Key Entities *(include if feature involves data)*

- **Wall Message**: A public note shown in Empty Wall, containing author name, message body, and display timestamp.
- **Message Draft Input**: Visitor-entered Name and Message content, including emoji characters, before and during submission.
- **Message Page Section**: A primary visual block on MessagePage, limited to Empty Wall and Leave a note for this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In visual QA, 100% of reviewed MessagePage states show exactly two primary sections.
- **SC-002**: In layout QA across supported breakpoints, Empty Wall appears above Leave a note in 100% of scenarios.
- **SC-003**: In content QA, targeted extra informational strings are absent from MessagePage in 100% of tested states.
- **SC-004**: In functional QA, at least 20 emoji-containing submissions preserve emoji characters without corruption from input through display.
- **SC-005**: In functional QA, Empty Wall correctly renders populated and empty states in 100% of tested scenarios while staying as the first primary section.
- **SC-006**: In layout QA, the Leave a note section remains fixed to the viewport bottom in 100% of tested scroll scenarios across supported breakpoints.
- **SC-007**: In validation QA, Name inputs containing only emojis are rejected in 100% of tested cases, while emoji-only Message inputs remain accepted when other required fields are valid.
- **SC-008**: In validation QA, empty or whitespace-only Message submissions are rejected in 100% of tested cases with inline error feedback.

## Assumptions

- Home remains the visual reference route for MessagePage background and atmosphere.
- Existing message submission and storage behavior already supports current character handling and only requires UI alignment checks for emoji friendliness.
- The feature scope is limited to MessagePage layout, copy reduction, and input behavior compatibility; no new moderation or backend workflow is introduced.
- "Primary section" refers to top-level content blocks visible in the main page flow, not to buttons or minor inline elements inside those blocks.
