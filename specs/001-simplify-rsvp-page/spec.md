# Feature Specification: Simplified RSVP Route

**Feature Branch**: `[001-simplify-rsvp-page]`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Redesign the 'Are You Coming?' route to simplify it and align it with the visual language of the Home page. Keep only two main blocks: 1. A RSVP box with a single input field for the guest name and a submit action. 2. A 'Latest confirmations' section showing only the last 3 confirmed names. Remove the hosts card, device counter, date badge, and any extra stats or secondary cards. The page background and overall styling must match the Home route aesthetic exactly: same visual tone, spacing logic, typography feel, and pixel-art/polished atmosphere. When a user submits their name, the confirmation must be saved correctly, appear in the latest confirmations list, and trigger an automatic email notification sent to ramwill1991@gmail.com. The email should contain the new confirmed name and clearly indicate it is a new RSVP submission from the website. The 'Latest confirmations' list must always display only the 3 most recent submissions, with the newest first. Preserve a clean, minimal layout and keep the interaction simple and clear. Clarify in the spec: expected submission flow, validation for empty names, how the email delivery is handled, data persistence approach, and the exact behavior of the 'last 3 confirmations' list."

## Clarifications

### Session 2026-04-13

- Q: What Supabase environment variables must be available for the RSVP route? → A: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be set at build time for Vite so the browser Supabase client can initialize and persist RSVP submissions.
- Q: Which email service will deliver RSVP notifications to the host inbox? → A: SendGrid via SMTP relay called from the Supabase Edge Function `send-rsvp-notification`.
- Q: Should the RSVP submission endpoint enforce rate limiting to prevent abuse or spam submissions? → A: Implement CAPTCHA or email verification for each submission to prevent bots and casual spam while maintaining a simple, intentional user experience.
- Q: How should the system handle concurrent submissions of the same name? → A: Accept each submission separately (per FR-015); apply per-session client-side deduplication only (5-10 second window) to prevent accidental double-submissions from the same device without enforcing cross-session uniqueness.
- Q: What is the expected volume of RSVP submissions over the lifetime of this farewell event? → A: Fewer than 100 total confirmations (very small, intimate event), so optimize for simplicity and reliability over high-throughput scaling.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Confirm Attendance Quickly (Priority: P1)

A visitor opens the RSVP route, enters their name, and confirms attendance through a single-field flow that feels as simple and intentional as the Home experience.

**Why this priority**: The route exists primarily to capture confirmations. If this path is not fast, clear, and trustworthy, the page fails its core purpose.

**Independent Test**: Open the RSVP route, submit a valid guest name, and verify that the visitor receives a clear confirmation state, the RSVP is recorded, the name appears in the latest confirmations block, and a host notification is triggered.

**Acceptance Scenarios**:

1. **Given** the RSVP page is loaded and the name field is empty, **When** the visitor submits without entering a name, **Then** the page blocks submission and shows a clear inline validation message explaining that a name is required.
2. **Given** the RSVP page is loaded and the visitor enters a valid name, **When** they submit, **Then** the system saves the RSVP, shows a success state, places the new name at the top of the latest confirmations list, and triggers an email notification to the host inbox.

---

### User Story 2 - See Recent Confirmations (Priority: P2)

A visitor can glance at the page and immediately see the three most recent confirmed names without scanning through extra cards, counts, or decorative statistics.

**Why this priority**: The recent confirmations block reinforces social proof and freshness, but only if it stays concise and chronologically correct.

**Independent Test**: Seed the system with more than three confirmed RSVPs and verify that the page always shows exactly the newest three names in descending submission order.

**Acceptance Scenarios**:

1. **Given** there are four or more confirmed RSVPs, **When** the page loads or refreshes after a new submission, **Then** the list shows only the three most recent confirmed names with the newest entry first.
2. **Given** there are no confirmed RSVPs yet, **When** the page loads, **Then** the latest confirmations block shows a calm empty state instead of placeholder statistics or unrelated metadata.

---

### User Story 3 - Preserve Home Page Atmosphere (Priority: P3)

A visitor moving from Home to the RSVP route experiences the RSVP page as part of the same invitation world, with the same visual tone, spacing rhythm, and polished pixel-art atmosphere.

**Why this priority**: The redesign is not only about simplification; it must also remove the stylistic disconnect between the Home route and the RSVP route.

**Independent Test**: Compare Home and RSVP on mobile and desktop and verify that the RSVP route keeps the same visual family while presenting only the two required blocks.

**Acceptance Scenarios**:

1. **Given** the visitor navigates from Home to the RSVP route, **When** the RSVP page renders, **Then** the background, typography mood, spacing cadence, and overall atmosphere feel visually continuous with Home.
2. **Given** the RSVP page is displayed on any supported screen size, **When** the content is reviewed, **Then** only the RSVP block and the Latest confirmations block appear as the main content areas.

### Edge Cases

- A visitor enters only spaces or other trim-to-empty input.
- Two visitors submit the same displayed name; each submission is treated as a separate chronological confirmation.
- RSVP persistence succeeds but host notification delivery does not complete immediately.
- Fewer than three confirmations exist; the list shows only the available confirmed names in newest-first order.

## Experience Constraints *(mandatory)*

### Visual and Narrative Continuity

- The RSVP route MUST feel like a direct extension of the Home route, using the same calm, polished, pixel-art farewell atmosphere rather than a separate utility-page aesthetic.
- The redesign affects the guest confirmation flow only and must not introduce extra informational panels, counters, badges, or secondary cards that compete with the two primary blocks.
- Any motion on the RSVP route should be subtle and supportive, reinforcing continuity with Home without adding visual noise or slowing the confirmation task.

### Accessibility and Responsiveness

- The route must remain easy to complete on mobile, tablet, and desktop, with a readable single-field form, clear spacing between the two blocks, and touch targets sized for handheld use.
- Display text, feedback states, and field labels must remain legible against the Home-matched backdrop and preserve clear contrast in default, focus, error, and success states.
- The RSVP input and submit action must be keyboard accessible, validation and success feedback must be announced appropriately for assistive technology, and any decorative motion must respect reduced-motion preferences.

### Content and Data Modeling

- The route title, helper copy, validation copy, success copy, empty-state copy, and latest-confirmations labels must live in managed content/config so the simplified experience stays consistent with the rest of the invitation.
- Confirmed RSVP records must be stored in a shared authoritative RSVP data source so the latest confirmations block reflects the same recent names for every visitor, not just the current device.
- Temporary in-progress form input may be retained locally for recovery after a failed submission, but confirmed RSVP history must come from the shared record of successful confirmations.
- The host notification recipient and message framing must remain configurable so the same flow can be maintained if operational ownership changes later.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The "Are You Coming?" route MUST present only two primary content blocks: a single-field RSVP submission block and a Latest confirmations block.
- **FR-002**: The route MUST remove the hosts card, device counter, date badge, totals, and any other secondary cards, stats, or summary modules from the main experience.
- **FR-003**: The route MUST visually align with the Home route's background atmosphere, typography feel, spacing logic, and polished pixel-art presentation so both pages read as one cohesive invitation.
- **FR-004**: Users MUST be able to submit an RSVP by entering a guest name in a single input field and activating one submit action.
- **FR-005**: The system MUST trim leading and trailing whitespace from the entered name before validation and submission.
- **FR-006**: The system MUST reject empty or whitespace-only names, prevent submission, and show a clear inline validation message that a name is required.
- **FR-007**: After a valid submission, the system MUST save the RSVP in the shared authoritative RSVP record before presenting the submission as confirmed.
- **FR-008**: After the RSVP is saved successfully, the system MUST show a clear success state and update the Latest confirmations block so the new name appears immediately in the current session if it belongs in the newest three entries.
- **FR-009**: The Latest confirmations block MUST always display only confirmed RSVP names, limited to a maximum of three entries, ordered newest first by successful submission time.
- **FR-010**: When fewer than three confirmed RSVPs exist, the Latest confirmations block MUST show only the available confirmed names in newest-first order without filling the remaining slots with placeholder names.
- **FR-011**: When no confirmed RSVPs exist, the Latest confirmations block MUST show a minimal empty state that matches the route aesthetic and does not introduce extra statistics or unrelated content.
- **FR-012**: Each successful RSVP submission MUST trigger an automatic email notification to `ramwill1991@gmail.com`.
- **FR-013**: The host notification email MUST clearly identify itself as a new RSVP submission from the website and include the newly confirmed guest name in the message body.
- **FR-014**: If RSVP persistence succeeds but email delivery cannot be completed immediately, the system MUST keep the RSVP confirmed and retain enough notification state for retry or operational follow-up rather than losing the submission.
- **FR-015**: Duplicate displayed names MAY be accepted as separate RSVP submissions unless future business rules explicitly add deduplication.
- **FR-016**: The simplified route MUST keep interaction copy and feedback concise so the page remains clean, minimal, and easy to understand within a few seconds of arrival.

### Key Entities *(include if feature involves data)*

- **RSVP Submission**: A confirmed attendance record containing the submitted guest name, the successful submission timestamp, confirmation status, and notification status for host alerting.
- **Latest Confirmations Feed**: A derived view of the shared RSVP record that exposes only the three most recent confirmed names in newest-first order.
- **RSVP Notification**: A host-facing alert generated from a successful RSVP submission that identifies the website as the source, includes the guest name, and tracks whether delivery completed.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability review, a first-time visitor can complete the RSVP flow from route load to confirmed state in under 30 seconds using only one required field.
- **SC-002**: In acceptance testing, 100% of successful RSVP submissions appear in the latest confirmations view immediately after success in the submitting session and remain present on refresh according to newest-first ordering.
- **SC-003**: In test scenarios with 0, 1, 2, 3, and more than 3 confirmed RSVPs, the Latest confirmations block always shows no more than three names and preserves correct newest-first order.
- **SC-004**: For successful RSVP submissions, the host inbox receives a website RSVP notification with the submitted guest name for at least 99% of submissions, and notification failures do not result in lost confirmations.

## Assumptions

- The Home route remains the canonical visual reference for the RSVP redesign.
- The product scope for this change is limited to the RSVP route and the submission-side notification behavior; it does not change the public messages experience.
- A shared RSVP system of record already exists or will remain available for confirmed submissions, replacing device-local history as the source of truth for the latest confirmations list.
- The web app requires the Vite build-time environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in development and production so the Supabase client can initialize and persist RSVP submissions.
- Only empty-name validation is required for this feature revision; duplicate names are allowed and treated as separate RSVP events.
- Expected data volume is fewer than 100 total RSVP confirmations over the event lifetime, so the design optimizes for simplicity and reliability rather than high-throughput scaling.
- Email notifications will be sent via SendGrid integrated with the Supabase Edge Function `send-rsvp-notification`.
- Abuse prevention will be handled via CAPTCHA or email verification on the submission form, not rate limiting at the API level.
