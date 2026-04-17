# Tasks: The Half Mile Map Page

**Input**: Design documents from `/specs/004-half-mile-page/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/half-mile-map-contract.md](./contracts/half-mile-map-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Automated tests are included because the implementation plan explicitly requires Vitest + React Testing Library coverage for routing, hotspots, keyboard interactions, and external-link behavior.

**Organization**: Tasks are grouped by user story so each story can be implemented and verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on unfinished tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`) used only in user-story phases
- Every task includes at least one exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create baseline file scaffolding and test harness paths for the Half Mile feature.

- [X] T001 Create feature scaffolding files `src/pages/HalfMilePage/HalfMilePage.tsx`, `src/features/half-mile/components/HalfMileScene.tsx`, and `src/shared/constants/halfMile.constants.ts`
- [X] T002 [P] Create hotspot/card component placeholders in `src/features/half-mile/components/HalfMileHotspots.tsx` and `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T003 [P] Create Half Mile test folder and baseline files in `tests/half-mile/HalfMilePage.layout.test.tsx`, `tests/half-mile/HalfMilePage.hotspots.test.tsx`, and `tests/half-mile/HalfMilePage.a11y.test.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared typed models, route constants, and reusable config required by all user stories.

**CRITICAL**: No user-story work should begin until this phase is complete.

- [X] T004 Extend shared Half Mile typed entities in `src/shared/types/site.types.ts`
- [X] T005 [P] Add `THE_HALF_MILE_ROUTE` destination metadata and ordering in `src/shared/constants/navigation.constants.ts`
- [X] T006 [P] Register Half Mile route wiring in `src/app/AppRouter.tsx`
- [X] T007 Implement centralized Half Mile scene config (map asset, cloud seeds, brewery list, hotspot anchors, CTA metadata) in `src/shared/constants/halfMile.constants.ts`
- [X] T008 [P] Add a Half Mile test render utility for routed page assertions in `tests/half-mile/halfMileTestUtils.tsx`
- [X] T009 Implement deterministic-per-mount cloud placement helper with safe-zone bounds in `src/features/half-mile/components/halfMileCloud.utils.ts`

**Checkpoint**: Foundation complete; user stories can now begin.

---

## Phase 3: User Story 1 - Explore the Half Mile map scene (Priority: P1)

**Goal**: Deliver the new Half Mile page with centered full-width map layout, Home-sky continuity, and randomized decorative clouds.

**Independent Test**: Navigate to `The Half Mile` and verify centered full-width map rendering, visible top/bottom spacing, and Home-like sky/cloud atmosphere on mobile, tablet, and desktop.

### Tests for User Story 1

- [X] T010 [US1] Add route and base scene render coverage in `tests/half-mile/HalfMilePage.layout.test.tsx`
- [X] T011 [US1] Add map centering/full-width/spacing assertions in `tests/half-mile/HalfMilePage.layout.test.tsx`

### Implementation for User Story 1

- [X] T012 [US1] Implement page-level route composition for Half Mile in `src/pages/HalfMilePage/HalfMilePage.tsx`
- [X] T013 [US1] Implement Home-sky background and map frame layout in `src/features/half-mile/components/HalfMileScene.tsx`
- [X] T014 [US1] Implement randomized cloud rendering using bounded placement helper in `src/features/half-mile/components/HalfMileScene.tsx`
- [X] T015 [US1] Wire cloud and map configuration constants into scene rendering in `src/shared/constants/halfMile.constants.ts`
- [X] T016 [US1] Enforce non-interactive cloud layers and reduced-motion-safe visual behavior in `src/features/half-mile/components/HalfMileScene.tsx`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Discover brewery information through map hotspots (Priority: P2)

**Goal**: Deliver invisible interactive hotspots with accessible single-open brewery cards and correct external-link behavior.

**Independent Test**: Activate all five hotspots and verify correct brewery content, one-open-card behavior, keyboard activation, dismiss controls, and links opening in a new tab.

### Tests for User Story 2

- [X] T017 [P] [US2] Add hotspot-to-brewery mapping and single-open-card tests in `tests/half-mile/HalfMilePage.hotspots.test.tsx`
- [X] T018 [P] [US2] Add keyboard activation (`Enter`/`Space`) and `Esc` dismissal tests in `tests/half-mile/HalfMilePage.a11y.test.tsx`
- [X] T019 [P] [US2] Add external-link new-tab behavior assertions in `tests/half-mile/HalfMilePage.a11y.test.tsx`

### Implementation for User Story 2

- [X] T020 [P] [US2] Implement invisible map-relative hotspot controls in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T021 [P] [US2] Implement lightweight brewery popover card with close control in `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T022 [US2] Implement single active brewery card orchestration in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T023 [US2] Implement outside-click/tap dismissal and hotspot-switch replacement behavior in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T024 [US2] Implement keyboard focus visibility and `Enter`/`Space` hotspot open handling in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T025 [US2] Implement `Esc` close handling and focus-safe dismissal flow in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T026 [US2] Render secure new-tab brewery links in card content in `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T027 [US2] Integrate hotspot/card interaction layer into scene composition in `src/features/half-mile/components/HalfMileScene.tsx`

**Checkpoint**: User Stories 1 and 2 are independently functional with validated interaction behavior.

---

## Phase 5: User Story 3 - Return to main navigation flow quickly (Priority: P3)

**Goal**: Ensure users can reach The Half Mile from navbar and return Home through a fixed lower CTA across desktop and mobile.

**Independent Test**: Verify `The Half Mile` appears in navbar navigation and the fixed CTA returns users to Home on mobile/tablet/desktop.

### Tests for User Story 3

- [X] T028 [P] [US3] Add navbar destination rendering and route-navigation assertions in `tests/navigation/PersistentNavigation.contract.test.tsx`
- [X] T029 [P] [US3] Add fixed Home CTA navigation assertions in `tests/half-mile/HalfMilePage.layout.test.tsx`

### Implementation for User Story 3

- [X] T030 [US3] Add `The Half Mile` destination entry to shared nav configuration in `src/shared/constants/navigation.constants.ts`
- [X] T031 [US3] Implement fixed lower Home CTA rendering in `src/features/half-mile/components/HalfMileScene.tsx`
- [X] T032 [US3] Centralize Home CTA copy/route metadata in `src/shared/constants/halfMile.constants.ts`
- [X] T033 [US3] Align CTA-related type definitions with shared metadata in `src/shared/types/site.types.ts`

**Checkpoint**: All user stories are independently functional and navigable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and quality pass across stories.

- [X] T034 [P] Run responsive QA at `360x800`, `768x1024`, and `1440x900` and log results in `specs/004-half-mile-page/quickstart.md`
- [X] T035 Validate keyboard accessibility, focus visibility, and reduced-motion behavior and record outcomes in `specs/004-half-mile-page/quickstart.md`
- [X] T036 [P] Validate hotspot alignment accuracy and edge-position card readability and record outcomes in `specs/004-half-mile-page/quickstart.md`
- [X] T037 [P] Run `npm run lint` and `npm test` and log command outcomes in `specs/004-half-mile-page/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on US1 map scene foundation plus Phase 2.
- **Phase 5 (US3)**: Depends on Phase 2 and can proceed after US1 route/page composition.
- **Phase 6 (Polish)**: Depends on completion of all targeted user stories.

### User Story Dependencies

- **US1 (P1)**: Starts immediately after foundational completion.
- **US2 (P2)**: Depends on US1 scene/layout being in place for hotspot overlays.
- **US3 (P3)**: Depends on US1 route existence; otherwise independent of US2 interaction logic.

### Dependency Graph

- Setup -> Foundational -> US1 -> US2 -> Polish
- Setup -> Foundational -> US1 -> US3 -> Polish

### Within Each User Story

- Write story tests first and verify failing assertions before implementation.
- Complete shared models/config before interaction logic.
- Complete interaction logic before final validation and QA logging.
- Validate each story independently at its checkpoint before moving forward.

### Parallel Opportunities

- **US1**: T012 and T015 can run in parallel after T010-T011.
- **US2**: T017, T018, and T019 can run in parallel; T020 and T021 can run in parallel.
- **US3**: T028 and T029 can run in parallel; T032 and T033 can run in parallel.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 and Phase 2.
2. Deliver **US1** (Phase 3) to establish the new page route and core visual scene.
3. Validate US1 independently before adding interactive hotspots.

### Incremental Delivery

1. Add **US2** for brewery hotspot interactions and accessibility behaviors.
2. Add **US3** for discoverability and Home return flow.
3. Complete Phase 6 validation and record all QA outcomes.

### Team Parallelization Strategy

1. Engineer A: scene/layout path (`src/pages/HalfMilePage/HalfMilePage.tsx`, `src/features/half-mile/components/HalfMileScene.tsx`).
2. Engineer B: interaction path (`src/features/half-mile/components/HalfMileHotspots.tsx`, `src/features/half-mile/components/HalfMileBreweryCard.tsx`).
3. Engineer C: config/tests path (`src/shared/constants/halfMile.constants.ts`, `tests/half-mile/*.test.tsx`, `tests/navigation/PersistentNavigation.contract.test.tsx`).

