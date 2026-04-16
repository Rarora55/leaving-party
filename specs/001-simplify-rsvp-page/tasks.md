# Tasks: Simplified RSVP Route

**Input**: Design documents from `/specs/001-simplify-rsvp-page/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/rsvp.contract.ts, quickstart.md

**Tests**: Automated tests are required for this feature because the spec explicitly calls
for validation, ordering, max-3 behavior, duplicate acceptance, and persistence vs
notification failure separation coverage.

**Organization**: Tasks are grouped by user story to enable incremental delivery and
independent verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: User story label for traceability
- Every task includes exact file paths so it can be executed directly

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the repo for reliable implementation and automated validation

- [X] T001 Configure reproducible frontend test and dependency scripts in `package.json` and `package-lock.json`
- [X] T002 Configure Vitest + `jsdom` execution for the Vite app in `vite.config.ts`
- [X] T003 [P] Create the shared test bootstrap for RTL and DOM matchers in `tests/setup.ts`
- [X] T004 [P] Add test type support and include patterns for the app in `tsconfig.app.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core contracts, config, and schema work required before user stories begin

**CRITICAL**: No user story work should start until this phase is complete

- [X] T005 Extend RSVP and notification domain types in `src/shared/types/site.types.ts` and `src/features/guest-list/guestList.types.ts`
- [X] T006 [P] Add managed RSVP copy and host notification configuration in `src/shared/constants/events.constants.ts`
- [X] T007 [P] Add reusable Home-aligned surface tokens for the RSVP route in `src/shared/constants/home.constants.ts`
- [X] T008 [P] Extend the typed `guest_rsvps` schema and function access in `src/services/supabase/client.ts`
- [X] T009 [P] Add RSVP notification metadata columns in `supabase/migrations/20260413190000_guest_rsvps_notifications.sql`
- [X] T010 Refocus RSVP local storage helpers on temporary draft recovery only in `src/services/localStorage/siteStorage.ts`

**Checkpoint**: Foundation ready - story work can now proceed in planned order

---

## Phase 3: User Story 1 - Confirm Attendance Quickly (Priority: P1)

**Goal**: Let a visitor submit a single-name RSVP with clear validation, confirmed persistence, immediate on-page success feedback, and host notification handling

**Independent Test**: Open the RSVP route, submit a valid guest name, and verify the page blocks empty names, confirms successful saves, shows the new name in the latest confirmations block, and records notification success or retry-required state without losing the RSVP

### Tests for User Story 1

> **NOTE**: Write these tests first and verify they fail before implementing the story

- [X] T011 [P] [US1] Add trim and empty-name validation coverage in `tests/guest-list/guestList.validation.test.ts`
- [X] T012 [P] [US1] Add form-hook coverage for successful submission and draft recovery handling in `tests/guest-list/useRSVPForm.test.ts`
- [X] T013 [P] [US1] Add service coverage for RSVP persistence and notification failure separation in `tests/guest-list/guestList.api.test.ts`

### Implementation for User Story 1

- [X] T014 [US1] Update trim-aware validation rules and guest-facing messages in `src/features/guest-list/guestList.validation.ts`
- [X] T015 [US1] Implement RSVP persistence and notification result mapping in `src/services/supabase/guestList.api.ts`
- [X] T016 [P] [US1] Implement secure RSVP email delivery and notification-state updates in `supabase/functions/send-rsvp-notification/index.ts`
- [X] T017 [US1] Refactor submission state, success messaging, and draft persistence in `src/features/guest-list/hooks/useRSVPForm.ts`
- [X] T018 [P] [US1] Rebuild the single-input RSVP card UI in `src/features/guest-list/GuestListForm.tsx`
- [X] T019 [P] [US1] Create the minimal latest-confirmations card shell in `src/features/guest-list/components/LatestConfirmations.tsx`
- [X] T020 [US1] Wire submission success and immediate confirmation-list updates into `src/pages/GuestListPage/GuestListPage.tsx`

**Checkpoint**: User Story 1 delivers the MVP RSVP confirmation flow and can be validated on its own

---

## Phase 4: User Story 2 - See Recent Confirmations (Priority: P2)

**Goal**: Show the authoritative latest three confirmed names, newest first, with proper empty and loading states

**Independent Test**: Seed more than three confirmed RSVPs and verify the route loads only the newest three confirmed names, preserves newest-first order, accepts duplicate names, and shows a calm empty state when there are no confirmations

### Tests for User Story 2

- [X] T021 [P] [US2] Add latest-confirmations query coverage for newest-first, max-3, and duplicate-name behavior in `tests/guest-list/latestConfirmations.api.test.ts`
- [X] T022 [P] [US2] Add route-level coverage for loading, empty, and refreshed latest-confirmations states in `tests/guest-list/GuestListPage.latestConfirmations.test.tsx`

### Implementation for User Story 2

- [X] T023 [US2] Add authoritative latest-confirmations querying limited to confirmed rows in `src/services/supabase/guestList.api.ts`
- [X] T024 [P] [US2] Implement latest-confirmations loading and refresh orchestration in `src/features/guest-list/hooks/useLatestConfirmations.ts`
- [X] T025 [P] [US2] Expand the confirmations card for loading, empty, duplicate, and max-3 display states in `src/features/guest-list/components/LatestConfirmations.tsx`
- [X] T026 [US2] Replace device-local confirmation history with authoritative fetch and post-submit revalidation in `src/pages/GuestListPage/GuestListPage.tsx`
- [X] T027 [US2] Remove route-level dependence on legacy confirmation history helpers in `src/services/localStorage/siteStorage.ts`

**Checkpoint**: User Stories 1 and 2 now work together while keeping recent confirmations independently testable

---

## Phase 5: User Story 3 - Preserve Home Page Atmosphere (Priority: P3)

**Goal**: Make the RSVP route feel visually continuous with Home while keeping only the two required primary blocks

**Independent Test**: Compare Home and RSVP on mobile and desktop and verify the RSVP page keeps the same atmosphere, spacing rhythm, and polished pixel-art tone while removing the legacy cards, counters, badges, and summary modules

### Tests for User Story 3

- [X] T028 [P] [US3] Add route-structure coverage for the two-block RSVP layout and removed legacy modules in `tests/guest-list/GuestListPage.layout.test.tsx`
- [X] T029 [P] [US3] Add accessibility and announced-feedback coverage for the RSVP route in `tests/guest-list/GuestListPage.a11y.test.tsx`

### Implementation for User Story 3

- [X] T030 [US3] Apply the Home-matched backdrop, spacing rhythm, and typography shell in `src/pages/GuestListPage/GuestListPage.tsx`
- [X] T031 [P] [US3] Align the RSVP form card with the Home pixel-art tone in `src/features/guest-list/GuestListForm.tsx`
- [X] T032 [P] [US3] Align the latest-confirmations card styling and empty-state tone in `src/features/guest-list/components/LatestConfirmations.tsx`
- [X] T033 [US3] Add reduced-motion, focus, and semantic feedback refinements in `src/pages/GuestListPage/GuestListPage.tsx` and `src/features/guest-list/GuestListForm.tsx`

**Checkpoint**: All three user stories are now functional and visually cohesive

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, operational readiness, and cross-story cleanup

- [X] T034 [P] Validate notification retry follow-up guidance against `supabase/functions/send-rsvp-notification/index.ts` and `specs/001-simplify-rsvp-page/quickstart.md`
- [ ] T035 Run responsive QA across mobile, tablet, and desktop for `src/pages/GuestListPage/GuestListPage.tsx`
- [X] T036 Validate keyboard access, focus states, aria-live feedback, and reduced-motion behavior in `src/features/guest-list/GuestListForm.tsx` and `src/features/guest-list/components/LatestConfirmations.tsx`
- [X] T037 Tune submit/list refresh behavior and remove excess motion in `src/pages/GuestListPage/GuestListPage.tsx` and `src/services/supabase/guestList.api.ts`
- [X] T038 Run lint and automated coverage from `package.json` against `tests/guest-list/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all story work
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion and builds on the RSVP route shell introduced in US1
- **User Story 3 (Phase 5)**: Depends on Foundational completion and should be applied after US1/US2 route behavior is stable
- **Polish (Phase 6)**: Depends on all targeted user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependencies after Foundational - this is the MVP
- **US2 (P2)**: Reuses the confirmation-list shell from US1 but remains independently verifiable through seeded data and refresh scenarios
- **US3 (P3)**: Reuses the route and card composition from US1/US2 and focuses on visual continuity, accessibility, and reduced-motion polish

### Within Each User Story

- Tests must be written and fail before implementation
- Validation/types/config before service integration
- Service integration before hook orchestration
- Hook orchestration before page composition
- Route composition before final accessibility and motion refinements

### Parallel Opportunities

- **Setup**: T003 and T004 can run in parallel after T001/T002 are scoped
- **Foundational**: T006, T007, T008, and T009 can run in parallel after T005 is understood
- **US1**: T011, T012, and T013 can run together; T016, T018, and T019 can run in parallel once T015 is defined
- **US2**: T021 and T022 can run together; T024 and T025 can run in parallel after T023 defines the fetch contract
- **US3**: T028 and T029 can run together; T031 and T032 can run in parallel after T030 establishes the route shell
- **Polish**: T034 can run in parallel with T035 and T036

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2
2. Deliver Phase 3 (US1) as the first usable increment
3. Validate the single-field RSVP flow, notification separation, and immediate success behavior before expanding scope

### Incremental Delivery

1. Add Phase 4 (US2) to replace local confirmation history with the authoritative latest-3 feed
2. Add Phase 5 (US3) to match Home visually and finalize accessibility/motion details
3. Finish Phase 6 polish, manual QA, and automated verification

### Suggested Team Split

1. Engineer A: backend/service path (`src/services/supabase/guestList.api.ts`, `src/services/supabase/client.ts`, `supabase/functions/send-rsvp-notification/index.ts`, migration)
2. Engineer B: guest-list hooks and page composition (`src/features/guest-list/hooks/*`, `src/pages/GuestListPage/GuestListPage.tsx`)
3. Engineer C: component styling and tests (`src/features/guest-list/*`, `tests/guest-list/*`)

---

## Notes

- [P] tasks touch different files and are safe to parallelize
- User story labels map directly to the spec for traceability
- `localStorage` remains only for failed-submit draft recovery; it is not the source of truth for confirmations
- Notification delivery must remain server-side so provider secrets are never exposed in the browser
- Stop at each checkpoint and verify the independent test before moving to the next story
