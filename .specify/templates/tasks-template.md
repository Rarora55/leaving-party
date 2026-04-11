---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Automated tests are OPTIONAL unless the
feature specification asks for them, but accessibility, responsive, and performance
validation tasks are mandatory when the affected surface changes.

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Application wiring**: `src/app/`
- **Feature modules**: `src/features/`
- **Route composition**: `src/pages/`
- **Shared primitives and utilities**: `src/shared/`
- **Data/service integrations**: `src/services/`
- **Styling and visual system**: `src/styles/`
- Add `tests/` only when the plan introduces automated test coverage

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create or align the affected feature structure per implementation plan
- [ ] T002 Configure required route, styling, motion, or service wiring for this feature
- [ ] T003 [P] Define shared constants, config, or typed content models required by the feature

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Establish shared component or layout primitives required across stories
- [ ] T005 [P] Implement service adapters or data access boundaries for content and state
- [ ] T006 [P] Define accessibility, responsive, and reduced-motion constraints for affected flows
- [ ] T007 Create typed entities or view models that all stories depend on
- [ ] T008 Prepare asset-loading and performance constraints for scrolling or animation-heavy views
- [ ] T009 Setup environment configuration or deployment constraints if the feature needs them

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested)

> **NOTE**: Write these tests FIRST and ensure they FAIL before implementation

- [ ] T010 [P] [US1] Add automated coverage for [user journey] in [test file]
- [ ] T011 [P] [US1] Add integration or interaction coverage for [critical flow] in [test file]

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create or extend typed content/state models in [file]
- [ ] T013 [P] [US1] Build reusable UI primitives in [file]
- [ ] T014 [US1] Implement feature logic and service integration in [file]
- [ ] T015 [US1] Compose the route or page experience in [file]
- [ ] T016 [US1] Add responsive, accessibility, and reduced-motion handling
- [ ] T017 [US1] Validate asset, animation, or scroll performance for this story

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested)

- [ ] T018 [P] [US2] Add automated coverage for [user journey] in [test file]
- [ ] T019 [P] [US2] Add integration or interaction coverage for [critical flow] in [test file]

### Implementation for User Story 2

- [ ] T020 [P] [US2] Extend content models or shared state in [file]
- [ ] T021 [US2] Implement feature logic or service updates in [file]
- [ ] T022 [US2] Implement the route, section, or component experience in [file]
- [ ] T023 [US2] Reuse or extend User Story 1 components without duplicating UI or content logic

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested)

- [ ] T024 [P] [US3] Add automated coverage for [user journey] in [test file]
- [ ] T025 [P] [US3] Add integration or interaction coverage for [critical flow] in [test file]

### Implementation for User Story 3

- [ ] T026 [P] [US3] Extend content models, constants, or adapters in [file]
- [ ] T027 [US3] Implement feature logic or orchestration in [file]
- [ ] T028 [US3] Implement the route, section, or component experience in [file]

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Update shared documentation or content references
- [ ] TXXX Run responsive QA across mobile, tablet, and desktop breakpoints
- [ ] TXXX Validate keyboard access, focus states, readability, and reduced-motion behavior
- [ ] TXXX Tune scroll, animation, and asset performance across affected stories
- [ ] TXXX [P] Add or update automated coverage if requested by the spec
- [ ] TXXX Run quickstart.md or equivalent manual validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - may integrate with US1 but should remain independently testable
- **User Story 3 (P3)**: Can start after Foundational - may integrate with US1 or US2 but should remain independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models and config before services and page composition
- Services before route integration
- Core implementation before polish validation
- Story complete before moving to the next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Foundational tasks marked [P] can run in parallel within Phase 2
- Once Foundational completes, user stories can proceed in parallel if capacity allows
- Tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to a specific user story for traceability
- Each user story should be independently completable and testable
- Accessibility, responsive behavior, and motion/performance validation are mandatory
  when the story changes the user experience
- Verify tests fail before implementing when automated coverage is included
- Commit after each task or logical group
- Stop at checkpoints to validate story independence
- Avoid vague tasks, same-file conflicts, and cross-story dependencies that break independence
