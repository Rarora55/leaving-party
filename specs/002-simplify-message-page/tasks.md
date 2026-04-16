# Tasks: Minimal Message Page Layout

**Input**: Design documents from `/specs/002-simplify-message-page/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/message-page-ui-contract.md](./contracts/message-page-ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Automated tests are included because the specification and plan explicitly require unit, integration, responsive UI, and accessibility verification.

**Organization**: Tasks are grouped by user story so each story can be implemented and verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on unfinished tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`) used only in user-story phases
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare test and feature scaffolding for message-page simplification.

- [X] T001 Align feature execution notes and QA assumptions in `specs/002-simplify-message-page/quickstart.md`
- [X] T002 Create message-page test directory scaffold in `tests/messages/.gitkeep`
- [X] T003 [P] Add shared message-page test fixture builders in `tests/messages/fixtures/messagePage.fixtures.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared constraints and utilities required across all stories.

**CRITICAL**: No user-story implementation should begin until this phase is complete.

- [X] T004 Define concise validation/error constants and shared limits in `src/features/guest-messages/guestMessages.validation.ts`
- [X] T005 [P] Add Unicode letter/number detection helper for name validation in `src/features/guest-messages/guestMessages.validation.ts`
- [X] T006 [P] Add sticky composer viewport + safe-area utility hook in `src/features/guest-messages/hooks/useStickyComposerViewport.ts`
- [X] T007 Wire sticky composer layout tokens for global reuse in `src/styles/global.css`
- [X] T008 [P] Align shared message copy constants and remove obsolete intro usage paths in `src/shared/constants/events.constants.ts`
- [X] T009 Keep API-side message validation parity with frontend limits in `src/services/supabase/guestMessages.api.ts`

**Checkpoint**: Foundation complete; user stories can now proceed.

---

## Phase 3: User Story 1 - Post a Simple Note (Priority: P1)

**Goal**: Let visitors submit emoji-friendly notes with strict but concise inline validation.

**Independent Test**: Submit with valid Name/Message (including emojis) and verify success; confirm inline errors for emoji-only Name, whitespace-only Message, and over-limit Message.

### Tests for User Story 1

- [X] T010 [P] [US1] Add validation unit coverage for emoji and trimmed-required rules in `tests/messages/guestMessages.validation.test.ts`
- [X] T011 [P] [US1] Add form interaction coverage for inline errors and success flow in `tests/messages/MessagesPage.formFlow.test.tsx`

### Implementation for User Story 1

- [X] T012 [US1] Implement letter-or-number Name validation while preserving emoji support in `src/features/guest-messages/guestMessages.validation.ts`
- [X] T013 [US1] Update form submission hook to map concise inline errors and preserve draft behavior in `src/features/guest-messages/hooks/useGuestMessageForm.ts`
- [X] T014 [US1] Simplify composer UI by removing helper copy and persistent counter in `src/features/components/GuestMessageForm.tsx`
- [X] T015 [US1] Keep message length enforcement and trimmed payload handling in `src/services/supabase/guestMessages.api.ts`
- [X] T016 [US1] Ensure message form section remains fully usable with submit/status feedback in `src/pages/MessagesPage/MessagesPages.tsx`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Read the Wall Before Writing (Priority: P2)

**Goal**: Make Empty Wall the first section and keep Leave a note sticky at viewport bottom while scrolling.

**Independent Test**: Load page with and without messages and verify Empty Wall appears first; confirm sticky composer remains usable while scrolling and with mobile keyboard open.

### Tests for User Story 2

- [X] T017 [P] [US2] Add layout-order coverage for two-section-only structure in `tests/messages/MessagesPage.layout.test.tsx`
- [X] T018 [P] [US2] Add empty-versus-populated wall rendering coverage in `tests/messages/MessagesPage.wallStates.test.tsx`

### Implementation for User Story 2

- [X] T019 [US2] Refactor route composition to only Empty Wall and Leave a note sections in `src/pages/MessagesPage/MessagesPages.tsx`
- [X] T020 [US2] Enforce Empty Wall empty-state-only rendering contract in `src/features/components/GuestMessagesList.tsx`
- [X] T021 [US2] Implement sticky bottom composer container with reserved wall bottom spacing in `src/pages/MessagesPage/MessagesPages.tsx`
- [X] T022 [US2] Implement keyboard-open viewport offset behavior for sticky composer in `src/features/guest-messages/hooks/useStickyComposerViewport.ts`
- [X] T023 [US2] Connect sticky viewport offsets to form container layout in `src/features/components/GuestMessageForm.tsx`

**Checkpoint**: User Stories 1 and 2 work independently with required section order and sticky behavior.

---

## Phase 5: User Story 3 - Keep Pixel-Art Continuity (Priority: P3)

**Goal**: Preserve Home-aligned artistic direction and pixel-art consistency on MessagePage without adding clutter.

**Independent Test**: Compare Home and MessagePage visual tone across breakpoints; verify minimal structure remains clear and accessible.

### Tests for User Story 3

- [X] T024 [P] [US3] Add accessibility-state assertions for simplified message page semantics in `tests/messages/MessagesPage.a11y.test.tsx`
- [X] T025 [P] [US3] Add visual-consistency smoke checks for Home-aligned styling tokens in `tests/messages/MessagesPage.visualConsistency.test.tsx`

### Implementation for User Story 3

- [X] T026 [US3] Align MessagePage background and section surfaces to Home artistic direction in `src/pages/MessagesPage/MessagesPages.tsx`
- [X] T027 [US3] Tune message form and wall visual treatments for pixel-art consistency in `src/features/components/GuestMessageForm.tsx`
- [X] T028 [US3] Tune wall card presentation consistency with simplified page aesthetic in `src/features/components/GuestMessageCard.tsx`

**Checkpoint**: All stories are independently functional with visual continuity preserved.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cross-story hardening.

- [X] T029 [P] Remove remaining forbidden legacy strings from message route UI in `src/pages/MessagesPage/MessagesPages.tsx`
- [X] T030 Validate keyboard flow, focus, and inline error announcements in `tests/messages/MessagesPage.a11y.test.tsx`
- [X] T031 Run responsive QA checklist for mobile/tablet/desktop and keyboard-open scenarios in `specs/002-simplify-message-page/checklists/requirements.md`
- [X] T032 Run `npm run lint` and `npm test` and record outcomes in `specs/002-simplify-message-page/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2; can run in parallel with US1 when ownership is coordinated.
- **Phase 5 (US3)**: Depends on Phase 2; can run after baseline layout exists from US1/US2.
- **Phase 6 (Polish)**: Depends on completion of selected user stories.

### User Story Dependencies

- **US1 (P1)**: No user-story dependency after foundational phase.
- **US2 (P2)**: No hard dependency on US1, but shares `MessagesPages.tsx` and should sequence merges carefully.
- **US3 (P3)**: Depends on finalized two-section layout from US1/US2 for stable visual tuning.

### Dependency Graph

- Setup -> Foundational -> US1 -> Polish
- Setup -> Foundational -> US2 -> Polish
- Setup -> Foundational -> US3 -> Polish

### Within Each User Story

- Tests should be written first and fail before implementation.
- Validation/model updates precede hook/service wiring.
- Hook/service wiring precedes page composition refinement.
- Story-specific verification completes before moving that story to done.

### Parallel Opportunities

- **US1**: Run `T010` and `T011` in parallel; run `T012` and `T014` in parallel after foundational tasks.
- **US2**: Run `T017` and `T018` in parallel; run `T020` and `T022` in parallel before integrating via `T019/T021/T023`.
- **US3**: Run `T024` and `T025` in parallel; run `T027` and `T028` in parallel after `T026` baseline styling.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phases 1-2.
2. Deliver **US1 only** (Phase 3) for a functional minimal composer with emoji-safe validation.
3. Validate independently, then proceed.

### Incremental Delivery

1. Add **US2** for wall-first hierarchy and sticky bottom usability.
2. Add **US3** for Home-aligned visual continuity.
3. Finish Phase 6 polish and full QA.

### Team Parallelization Strategy

1. One engineer owns validation/hook work (`guestMessages.validation.ts`, `useGuestMessageForm.ts`, `guestMessages.api.ts`).
2. One engineer owns layout/sticky work (`MessagesPages.tsx`, `useStickyComposerViewport.ts`, `GuestMessageForm.tsx`).
3. One engineer owns test coverage in `tests/messages/` and coordinates merge order.
