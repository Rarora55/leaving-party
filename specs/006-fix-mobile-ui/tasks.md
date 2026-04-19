# Tasks: Mobile Home and Message Usability Fixes

**Input**: Design documents from `/specs/006-fix-mobile-ui/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/mobile-message-usability-contract.md](./contracts/mobile-message-usability-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Automated tests are included for message-page behavior because the plan defines component/integration coverage there. Home-scene validation remains implementation + explicit manual QA evidence in quickstart.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on unfinished tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`) used only in user-story phases
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared implementation and evidence scaffolding.

- [X] T001 Create execution/evidence sections for mobile baseline comparison, 20-session log, and blocked-refresh log in `specs/006-fix-mobile-ui/quickstart.md`
- [X] T002 [P] Add explicit FR-003 and SC-003 validation checkpoints to `specs/006-fix-mobile-ui/contracts/mobile-message-usability-contract.md`
- [X] T003 [P] Add composer toggle label placeholders for expanded/collapsed states in `src/shared/constants/events.constants.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared wiring that all user stories depend on.

**CRITICAL**: No user-story work should begin until this phase is complete.

- [X] T004 Establish message-page orchestration entry points for keyboard + collapse state in `src/pages/MessagesPage/MessagesPages.tsx`
- [X] T005 [P] Establish form-level extension points for composer toggle/header rendering in `src/features/components/GuestMessageForm.tsx`
- [X] T006 [P] Extend keyboard/draft fixture coverage for message-page tests in `tests/messages/fixtures/messagePage.fixtures.ts`
- [X] T007 Document reduced-motion and responsive regression guardrails for implementation in `specs/006-fix-mobile-ui/quickstart.md`

**Checkpoint**: Foundation complete; user stories can now begin.

---

## Phase 3: User Story 1 - Improve Final Home Scene Legibility on Phones (Priority: P1)

**Goal**: Increase Home final-scene prominence by at least 20% on phones while preserving desktop composition and readability constraints.

**Independent Test**: Validate mobile baseline comparison shows at least +20% prominence and verify no horizontal overflow/pinch-zoom dependence; confirm desktop visual parity.

### Implementation for User Story 1

- [X] T008 [US1] Increase mobile footer frame-width token to satisfy +20% prominence in `src/shared/constants/home.constants.ts`
- [X] T009 [US1] Apply mobile-only frame sizing behavior while preserving tablet/desktop output in `src/features/home/components/HomeFooterScene.tsx`
- [X] T010 [US1] Verify footer interactivity and reduced-motion behavior remain stable after sizing changes in `src/features/home/components/HomeFooter.tsx`
- [ ] T011 [US1] Record US1 manual evidence for +20% prominence, no horizontal scrolling, and no pinch-zoom requirement in `specs/006-fix-mobile-ui/quickstart.md`

**Checkpoint**: User Story 1 is independently complete and testable.

---

## Phase 4: User Story 2 - Keep Message Page Scrollable While Typing on Phones (Priority: P1)

**Goal**: Preserve natural page-level vertical scrolling while typing in message inputs/textarea with keyboard open.

**Independent Test**: Focus each field on phone viewports, type continuously, and verify page scroll remains normal with no lock and no blocked-refresh interruption.

### Tests for User Story 2

- [X] T012 [P] [US2] Extend keyboard-open accessibility coverage for non-locking scroll behavior in `tests/messages/MessagesPage.a11y.test.tsx`
- [X] T013 [P] [US2] Add layout assertions for keyboard inset spacing and scroll continuity in `tests/messages/MessagesPage.layout.test.tsx`

### Implementation for User Story 2

- [X] T014 [US2] Refine visual viewport keyboard inset and event handling logic in `src/features/guest-messages/hooks/useStickyComposerViewport.ts`
- [X] T015 [US2] Remove nested keyboard-open scroll-trap behavior from `src/features/components/GuestMessageForm.tsx`
- [X] T016 [US2] Adjust wall/composer spacing orchestration to preserve natural vertical page movement in `src/pages/MessagesPage/MessagesPages.tsx`
- [ ] T017 [US2] Run and record the SC-002 20-session typing protocol plus SC-003 blocked-refresh checks in `specs/006-fix-mobile-ui/quickstart.md`

**Checkpoint**: User Story 2 is independently complete and testable.

---

## Phase 5: User Story 3 - Collapse and Expand the Message Card on Demand (Priority: P2)

**Goal**: Add a top toggle to collapse/expand the message card with required arrow semantics and preserved draft values.

**Independent Test**: Repeatedly toggle card state on mobile and confirm icon direction, state synchronization, and draft-value persistence.

### Tests for User Story 3

- [X] T018 [P] [US3] Add collapse/expand and draft persistence interaction tests in `tests/messages/MessagesPage.formFlow.test.tsx`
- [X] T019 [P] [US3] Extend toggle semantics and keyboard-operability assertions in `tests/messages/MessagesPage.a11y.test.tsx`

### Implementation for User Story 3

- [X] T020 [US3] Finalize expanded/collapsed toggle labels and aria copy in `src/shared/constants/events.constants.ts`
- [X] T021 [US3] Implement page-level `isComposerCollapsed` orchestration and toggle handling in `src/pages/MessagesPage/MessagesPages.tsx`
- [X] T022 [US3] Implement top-area toggle control with down/up arrow semantics in `src/features/components/GuestMessageForm.tsx`
- [X] T023 [US3] Implement collapsed composer presentation that preserves `guestName` and `message` values in `src/features/components/GuestMessageForm.tsx`
- [X] T024 [US3] Validate collapse-state synchronization during repeated toggles and viewport changes in `src/pages/MessagesPage/MessagesPages.tsx`

**Checkpoint**: All user stories are independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, quality gates, and artifact alignment.

- [X] T025 [P] Reconcile contract wording with final implementation outcomes in `specs/006-fix-mobile-ui/contracts/mobile-message-usability-contract.md`
- [ ] T026 Run responsive QA at `360x800`, `390x844`, `768x1024`, and `1440x900` and capture outcomes in `specs/006-fix-mobile-ui/quickstart.md`
- [X] T027 Validate keyboard focus states, toggle accessibility labeling, and reduced-motion behavior in `specs/006-fix-mobile-ui/quickstart.md`
- [X] T028 Tune scroll/animation smoothness on affected surfaces in `src/features/home/components/HomeFooterScene.tsx` and `src/pages/MessagesPage/MessagesPages.tsx`
- [X] T029 [P] Run `npm run lint` and `npm test` and record command results in `specs/006-fix-mobile-ui/quickstart.md`
- [X] T030 [P] Update post-implementation state/entity notes in `specs/006-fix-mobile-ui/data-model.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2.
- **Phase 5 (US3)**: Depends on Phase 2 and integrates with message-page behavior stabilized in US2.
- **Phase 6 (Polish)**: Depends on completion of selected user stories.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories after foundational phase.
- **US2 (P1)**: No strict dependency on US1 after foundational phase.
- **US3 (P2)**: Depends on message-page orchestration and scroll behavior from US2.

### Dependency Graph

- Setup -> Foundational -> US1 -> Polish
- Setup -> Foundational -> US2 -> US3 -> Polish
- Setup -> Foundational -> US2 -> Polish

### Within Each User Story

- Update tests (when present) before implementation tasks.
- Update shared constants before page/component composition.
- Complete behavior implementation before evidence logging.
- Validate independent story criteria before moving to lower-priority work.

### Parallel Opportunities

- **Setup**: T002 and T003 can run in parallel after T001.
- **Foundational**: T005 and T006 can run in parallel after T004.
- **US2**: T012 and T013 can run in parallel; T014 and T015 can run in parallel before T016.
- **US3**: T018 and T019 can run in parallel; T022 and T023 can run in parallel after T021.
- **Polish**: T025, T029, and T030 can run in parallel after T026/T027 begin.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 and Phase 2.
2. Deliver **US1** to meet the Home mobile-prominence requirement and desktop non-regression boundary.
3. Validate US1 independently before message-page interaction changes.

### Incremental Delivery

1. Deliver **US2** with explicit SC-002 and SC-003 evidence.
2. Deliver **US3** to add collapsible composer ergonomics on top of stable scroll behavior.
3. Complete Phase 6 for final cross-story validation and quality gates.

### Team Parallelization Strategy

1. Engineer A: Home scene sizing and non-regression (`src/shared/constants/home.constants.ts`, `src/features/home/components/*`).
2. Engineer B: Scroll continuity and viewport handling (`src/features/guest-messages/hooks/useStickyComposerViewport.ts`, `src/pages/MessagesPage/MessagesPages.tsx`, `tests/messages/*`).
3. Engineer C: Composer collapse/expand UX and copy/a11y (`src/features/components/GuestMessageForm.tsx`, `src/shared/constants/events.constants.ts`, `tests/messages/*`).
