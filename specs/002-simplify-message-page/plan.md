# Implementation Plan: Minimal Message Page Layout

**Branch**: `[002-simplify-message-page]` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-simplify-message-page/spec.md`

## Summary

Simplify `MessagePage` to exactly two primary sections with a minimal flow: `Empty Wall` first and `Leave a note` docked to the bottom of the viewport. Preserve the existing pixel-art atmosphere aligned with Home, remove legacy helper copy and persistent character counter text, keep the current message length cap, and tighten validation so Name allows emoji but must contain at least one letter or number while Message is required after trimming. Scope is frontend-only with no backend/schema changes.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2  
**Primary Dependencies**: React 19, React Router 7, Tailwind CSS 4, Motion 12, `@supabase/supabase-js` (existing only)  
**Storage**: Existing Supabase `guest_messages` reads/writes via `guestMessages.api.ts`; existing localStorage draft recovery via `siteStorage`; no storage changes  
**Testing**: Vitest 4 + React Testing Library + `@testing-library/user-event`; targeted manual responsive + mobile keyboard + accessibility QA  
**Target Platform**: Responsive web (mobile-first, tablet, desktop)  
**Project Type**: Frontend web application  
**Performance Goals**: Maintain smooth scrolling and interaction responsiveness while keeping the sticky composer lightweight  
**Constraints**: No backend changes, keep two-section IA only, preserve Home artistic direction and pixel-art consistency, retain existing message max length without persistent counter UI, keep dependency set unchanged  
**Scale/Scope**: `/drop-a-message` route and related message feature modules only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Pre-Design Gate: PASS

- Stack remains within the canonical frontend stack and existing dependencies only.
- File changes stay within page composition, feature components/hooks/validation, shared constants, and tests.
- Pixel-art continuity is preserved by reusing existing visual tokens and Home-aligned background treatment rather than introducing a new visual system.
- No new decorative motion is introduced; reduced-motion behavior remains unaffected.
- Reusable validation and content constants remain in feature/shared modules; no duplicated page-local logic.
- Future CMS/admin viability is preserved because message data services remain isolated in existing service modules.
- No new dependency is required.
- Sticky behavior is implemented with CSS + browser viewport APIs only, with explicit mobile keyboard usability checks.

Post-Design Gate (after Phase 1): PASS  
Design artifacts maintain stack compliance, modular boundaries, responsive accessibility coverage, and zero backend impact.

## Project Structure

### Documentation (this feature)

```text
specs/002-simplify-message-page/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- message-page-ui-contract.md
`-- tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
src/
|-- pages/MessagesPage/
|   `-- MessagesPages.tsx
|-- features/components/
|   |-- GuestMessageForm.tsx
|   `-- GuestMessagesList.tsx
|-- features/guest-messages/
|   |-- guestMessages.validation.ts
|   `-- hooks/useGuestMessageForm.ts
|-- shared/constants/
|   `-- events.constants.ts
`-- services/supabase/
    `-- guestMessages.api.ts   # Validation parity only, no schema changes

tests/
`-- messages/
    |-- guestMessages.validation.test.ts
    |-- MessagesPage.layout.test.tsx
    |-- MessagesPage.formFlow.test.tsx
    `-- MessagesPage.a11y.test.tsx
```

**Structure Decision**: Keep route composition in `src/pages/MessagesPage`, presentational sections in `src/features/components`, and input rules in `src/features/guest-messages/guestMessages.validation.ts`. Keep API/service boundaries unchanged and limit backend-touching changes to optional client-side validation parity only.

## Phased Technical Plan

### Phase 0: Research and Decision Freeze

- Confirm sticky bottom strategies that remain usable when virtual keyboards resize viewport on iOS/Android.
- Confirm Unicode-safe validation approach for emoji-friendly Name/Message with letter-or-number requirement for Name.
- Confirm minimal copy strategy that removes forbidden strings while retaining accessibility cues through labels and inline errors.
- Output: `research.md`.

### Phase 1: Design and Contracts

- Define UI/domain entities and validation/state transitions for two-section message experience.
- Define route/component/interaction contract for:
  - section count and ordering,
  - sticky composer behavior,
  - empty-state versus populated-wall rendering,
  - concise inline validation behavior.
- Provide implementation + QA execution guide in `quickstart.md`.
- Output: `data-model.md`, `contracts/message-page-ui-contract.md`, `quickstart.md`.

### Phase 2: Implementation Planning

- Layout simplification:
  - Remove hero/stats/helper blocks from `MessagesPages.tsx`.
  - Render only `Empty Wall` section and sticky `Leave a note` section.
- Sticky bottom composer:
  - Keep form fixed to viewport bottom.
  - Add safe-area/visual viewport handling so fields and submit remain usable with mobile keyboard open.
  - Add bottom spacing/padding in wall section to prevent overlap with sticky composer.
- Validation updates:
  - Name: allow emoji but require at least one Unicode letter/number.
  - Message: required after trim; reject whitespace-only.
  - Keep existing max length and show concise inline error only when exceeded.
  - Remove persistent character counter UI.
- Copy/style cleanup:
  - Remove targeted strings: `Drop a message`, `message(s) saved here`, pink character-limit note.
  - Align page background/art direction to Home palette/tone without cloning Home scene complexity.
- Testing rollout:
  - Add unit tests for new validation edges.
  - Add integration tests for two-section structure, submit/reload path, and inline errors.
  - Add responsive and accessibility checks for sticky usability + ARIA semantics.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Sticky composer overlaps wall content on short viewports | Users cannot read last messages or reach submit controls | Reserve dynamic bottom space equal to composer height; verify on mobile portrait + landscape |
| Mobile keyboard pushes or obscures fixed form controls | Form becomes unusable during typing | Use `visualViewport`-aware offset handling plus `env(safe-area-inset-bottom)` fallback; test iOS Safari and Android Chrome behaviors |
| Unicode regex edge cases for emoji + multilingual names | False rejects/accepts in Name validation | Use Unicode property escapes for letter/number presence and cover tests with emoji-only, accented, CJK, and alphanumeric inputs |
| Removing helper copy reduces perceived clarity | More validation mistakes | Keep explicit labels, concise placeholders, and inline error messages tied via `aria-describedby` |
| Max-length handling inconsistency between UI and API | Confusing error feedback | Keep shared max (500) in validation and ensure API fallback error remains concise and aligned |

## Acceptance Criteria (Implementation-Level)

- Exactly two top-level message-page sections are rendered: `Empty Wall` then `Leave a note`.
- `Leave a note` remains docked to viewport bottom while scrolling and remains usable when mobile keyboard is open.
- Removed copy is absent from rendered UI (`Drop a message`, `message saved here`, pink character-limit guidance).
- Existing messages appear in Empty Wall; empty state appears only when message list is empty.
- Name accepts emoji but rejects values without any letter/number.
- Message accepts emoji and rejects trimmed empty/whitespace-only input.
- Existing maximum message length remains enforced with concise inline error and no persistent counter.
- Visual style remains consistent with Home background mood/pixel-art direction.

## Testing Strategy

Unit:
- `guestMessages.validation` tests for emoji-rich valid names, emoji-only invalid names, whitespace-only message rejection, and max-length boundaries.

Integration (RTL):
- `MessagesPage` renders only two primary sections in required order.
- Wall list toggles correctly between empty and populated states.
- Form submit success refreshes wall data and clears draft.
- Inline errors show for name-without-alnum, whitespace-only message, and over-limit message.

Responsive UI:
- Manual QA at mobile (`360x800`), tablet (`768x1024`), desktop (`1440x900`).
- Verify sticky form visibility/usability during scroll and when virtual keyboard opens.
- Verify safe-area handling on notched/mobile devices.

Accessibility:
- Preserve semantic heading/label structure for two sections.
- Errors announced through `role="alert"` and associated `aria-describedby`.
- Keyboard navigation reaches all controls even with sticky composer.
- Color/contrast check for simplified wall + form states against existing palette.

## File-by-File Change List

- `src/pages/MessagesPage/MessagesPages.tsx`
  - Reduce layout to two primary sections and enforce section order.
  - Add sticky-composer-aware spacing and remove extra copy/stat cards.
- `src/features/components/GuestMessageForm.tsx`
  - Keep only essential heading/form controls.
  - Remove persistent character counter and extra helper text.
  - Ensure concise inline validation feedback remains.
- `src/features/components/GuestMessagesList.tsx`
  - Keep Empty Wall as first display section behavior; ensure empty state appears only when list empty.
- `src/features/guest-messages/guestMessages.validation.ts`
  - Update name validation to require at least one Unicode letter/number while allowing emoji.
  - Keep message required/trim rules and max-length enforcement with concise errors.
- `src/features/guest-messages/hooks/useGuestMessageForm.ts`
  - Ensure validation messages map cleanly to concise inline errors and draft persistence behavior remains stable.
- `src/shared/constants/events.constants.ts` (if needed)
  - Remove or replace obsolete message-intro copy usage paths.
- `tests/messages/guestMessages.validation.test.ts`
  - Add new validation coverage for emoji + letter/number and message trimming rules.
- `tests/messages/MessagesPage.layout.test.tsx`
  - Assert only two primary sections and required order.
- `tests/messages/MessagesPage.formFlow.test.tsx`
  - Assert submit success path and inline error behavior.
- `tests/messages/MessagesPage.a11y.test.tsx`
  - Assert label/error semantics and keyboard-friendly sticky form access.

## Complexity Tracking

No constitution violations expected; section intentionally left without entries.
