# Tasks: Fullscreen Navbar Interaction

**Input**: Design documents from `/specs/003-fix-navbar-interaction/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/navigation-overlay-contract.md](./contracts/navigation-overlay-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Automated tests are included because the implementation plan defines explicit Vitest + RTL coverage for overlay behavior, keyboard accessibility, route outcomes, and extensibility regressions.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on unfinished tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`) used only in user-story phases
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare feature scaffolding and shared test harness for navigation overlay work.

- [X] T001 Create navigation test folder scaffold in `tests/navigation/.gitkeep`
- [X] T002 [P] Add shared navigation render/test utilities in `tests/navigation/navigationTestUtils.tsx`
- [X] T003 [P] Align execution checklist placeholders for this feature in `specs/003-fix-navbar-interaction/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared contracts and reusable primitives required by all user stories.

**CRITICAL**: No user-story implementation should begin until this phase is complete.

- [X] T004 Relax brittle navigation literal unions to extensible typed shapes in `src/shared/types/site.types.ts`
- [X] T005 [P] Normalize required destination definitions (`Home`, `Drop a Message`, `MessageList`) and ordering in `src/shared/constants/navigation.constants.ts`
- [X] T006 [P] Extract or align Home-sky overlay style tokens for reuse in `src/shared/constants/home.constants.ts`
- [X] T007 Implement shared overlay state semantics (open/close source of truth + scroll lock lifecycle) in `src/features/components/useNavigationOverlay.ts`
- [X] T008 [P] Add base contract test suite scaffold for navigation overlay behaviors in `tests/navigation/PersistentNavigation.contract.test.tsx`
- [X] T009 [P] Add app-shell integration test scaffold for route + trigger flows in `tests/navigation/AppShell.navigation.test.tsx`

**Checkpoint**: Foundation complete; user stories can now proceed.

---

## Phase 3: User Story 1 - Open and close full-screen navigation (Priority: P1)

**Goal**: Deliver intentional full-screen open/close behavior with correct trigger morph, background lock, and accessible keyboard interactions.

**Independent Test**: Open and close menu from each route and verify full-screen coverage, white-line/black-X trigger states, `Esc` close, focus trap/return, reduced-motion behavior, and no unintended route changes.

### Tests for User Story 1

- [X] T010 [P] [US1] Add trigger visual-state and full-screen overlay assertions in `tests/navigation/AppShell.navigation.test.tsx`
- [X] T011 [P] [US1] Add keyboard interaction assertions (`Esc`, focus trap, focus return) in `tests/navigation/PersistentNavigation.contract.test.tsx`
- [X] T012 [P] [US1] Add reduced-motion transition behavior assertions in `tests/navigation/PersistentNavigation.contract.test.tsx`

### Implementation for User Story 1

- [X] T013 [US1] Implement white-line (closed) and black-X (open) trigger morph states in `src/app/AppShell.tsx`
- [X] T014 [US1] Implement full-screen Home-sky-aligned overlay container and motion states in `src/features/components/PersistentNavigation.tsx`
- [X] T015 [US1] Enforce inert background behavior while open (scroll + interaction lock) in `src/features/components/useNavigationOverlay.ts`
- [X] T016 [US1] Implement reduced-motion near-instant transition branch for trigger and overlay in `src/app/AppShell.tsx`
- [X] T017 [US1] Validate and tune rapid-toggle stability for open/close state transitions in `src/features/components/PersistentNavigation.tsx`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Navigate clearly from menu links (Priority: P2)

**Goal**: Ensure required destinations are clear, active state is visible, and selection behavior is correct for same-route and different-route cases.

**Independent Test**: Open menu, verify Home/Drop a Message/MessageList are visible and selectable, confirm same-route selection closes without navigation, different-route selection navigates + closes, and non-link-space tap/click closes.

### Tests for User Story 2

- [X] T018 [P] [US2] Add destination rendering and active-route indicator assertions in `tests/navigation/PersistentNavigation.contract.test.tsx`
- [X] T019 [P] [US2] Add same-route close-only versus different-route navigate-and-close assertions in `tests/navigation/AppShell.navigation.test.tsx`
- [X] T020 [P] [US2] Add non-link-space close-without-navigation assertions in `tests/navigation/PersistentNavigation.contract.test.tsx`

### Implementation for User Story 2

- [X] T021 [US2] Render required destination list from shared config in `src/features/components/PersistentNavigation.tsx`
- [X] T022 [US2] Implement active-route styling and semantics for current destination in `src/features/components/PersistentNavigation.tsx`
- [X] T023 [US2] Implement same-route selection close-only behavior in `src/features/components/PersistentNavigation.tsx`
- [X] T024 [US2] Implement different-route selection navigate-and-close behavior in `src/features/components/PersistentNavigation.tsx`
- [X] T025 [US2] Implement non-link-space click/tap close handling in `src/features/components/PersistentNavigation.tsx`

**Checkpoint**: User Stories 1 and 2 are independently functional with correct navigation outcomes.

---

## Phase 5: User Story 3 - Extend navigation without rewrites (Priority: P3)

**Goal**: Keep navbar structure easy to extend by centralizing navigation metadata and removing page-hardcoded assumptions.

**Independent Test**: Add one destination entry in shared navigation config and verify it appears in open menu without adding page-specific conditional logic.

### Tests for User Story 3

- [X] T026 [P] [US3] Add extensibility regression test for appended destination rendering from shared config in `tests/navigation/PersistentNavigation.contract.test.tsx`
- [X] T027 [P] [US3] Add integration assertion that router uses shared destination constants for message navigation route in `tests/navigation/AppShell.navigation.test.tsx`

### Implementation for User Story 3

- [X] T028 [US3] Consolidate navigation metadata to a single source of truth in `src/shared/constants/navigation.constants.ts`
- [X] T029 [US3] Update navigation-related type definitions for future destination additions in `src/shared/types/site.types.ts`
- [X] T030 [US3] Align route wiring to centralized destination constants in `src/app/AppRouter.tsx`
- [X] T031 [US3] Remove remaining route-hardcoded navigation assumptions in `src/features/components/PersistentNavigation.tsx`

**Checkpoint**: All user stories are independently functional and navigation extensibility is verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-story QA, accessibility verification, and performance validation.

- [X] T032 [P] Run responsive QA for `360x800`, `768x1024`, and `1440x900` and log results in `specs/003-fix-navbar-interaction/quickstart.md`
- [X] T033 Validate keyboard-only flow, focus visibility, screen-reader semantics, and reduced-motion behavior in `specs/003-fix-navbar-interaction/quickstart.md`
- [X] T034 Tune overlay animation and repaint performance under rapid toggles in `src/features/components/PersistentNavigation.tsx`
- [X] T035 [P] Run `npm run lint` and `npm test` and record outcomes in `specs/003-fix-navbar-interaction/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2 and reuses foundational test harness.
- **Phase 5 (US3)**: Depends on Phase 2 and should merge after US2 destination behavior is stable.
- **Phase 6 (Polish)**: Depends on completion of selected user stories.

### User Story Dependencies

- **US1 (P1)**: No user-story dependency after foundational phase.
- **US2 (P2)**: Depends on US1 overlay shell being stable for consistent interaction assertions.
- **US3 (P3)**: Depends on US2 destination rendering behavior to verify extensibility against a stable menu contract.

### Dependency Graph

- Setup -> Foundational -> US1 -> US2 -> US3 -> Polish
- Setup -> Foundational -> US1 -> Polish
- Setup -> Foundational -> US2 -> Polish

### Within Each User Story

- Write and run story tests first; confirm they fail before implementation changes.
- Update shared models/constants before component orchestration.
- Complete interaction logic before final visual/performance tuning.
- Validate each story independently before moving to next priority.

### Parallel Opportunities

- **US1**: `T010`, `T011`, `T012` can run in parallel; `T014` and `T015` can run in parallel after `T013`.
- **US2**: `T018`, `T019`, `T020` can run in parallel; `T022` and `T025` can run in parallel after `T021`.
- **US3**: `T026` and `T027` can run in parallel; `T029` and `T030` can run in parallel after `T028`.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phases 1-2.
2. Deliver **US1 only** (Phase 3) to secure core full-screen overlay behavior.
3. Validate US1 independently before expanding scope.

### Incremental Delivery

1. Add **US2** for required destination rendering and route-selection behavior.
2. Add **US3** for data-driven extensibility and removal of hardcoded assumptions.
3. Finish Phase 6 for full QA/performance signoff.

### Team Parallelization Strategy

1. Engineer A: overlay/trigger behavior (`AppShell.tsx`, `useNavigationOverlay.ts`).
2. Engineer B: destination rendering and extensibility (`PersistentNavigation.tsx`, `navigation.constants.ts`, `site.types.ts`, `AppRouter.tsx`).
3. Engineer C: automated coverage and validation logging (`tests/navigation/*.test.tsx`, `quickstart.md`).
