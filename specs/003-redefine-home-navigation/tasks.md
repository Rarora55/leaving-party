# Tasks: Redefine Home and Navigation Experience

**Input**: Design documents from `/specs/003-redefine-home-navigation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Automated tests are not included for this feature. Manual validation,
responsive review, accessibility review, and motion/performance checks are required.

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

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align the repo structure and shared models for the redesigned Home and
navigation system.

- [X] T001 Create the new Home scene module files `src/features/home/components/HomeSkyLayer.tsx`, `src/features/home/components/HomeCloudField.tsx`, `src/features/home/components/HomeTitleReveal.tsx`, `src/features/home/components/HomeFooter.tsx`, and `src/features/home/useHomeSceneProgress.ts`
- [X] T002 Update the shared Home scene and overlay state types in `src/shared/types/site.types.ts`
- [X] T003 [P] Centralize scene copy, motion ranges, cloud metadata placeholders, and the three-route navigation config in `src/shared/constants/home.constants.ts` and `src/shared/constants/navigation.constants.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prepare the shared shell, overlay state, and global layout baseline
required before any user story work can land cleanly.

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Establish the full-bleed app baseline by removing legacy root layout constraints in `src/index.css` and aligning global shell styles in `src/styles/global.css`
- [X] T005 [P] Refactor shared overlay state to keep only dialog open/close, scroll restoration, and route-safe cleanup in `src/features/components/useNavigationOverlay.ts`
- [X] T006 [P] Rework the shared shell to host a fixed top-right trigger instead of a sticky header bar in `src/app/AppShell.tsx`

**Checkpoint**: Foundation ready - Home scene work and overlay implementation can now proceed.

---

## Phase 3: User Story 1 - Arrive Into a Scroll-Driven Farewell Scene (Priority: P1)

**Goal**: Deliver the new Home opening state as a full-viewport scroll-driven scene
with a solid sky layer and hidden-on-load title/date reveal.

**Independent Test**: Open Home on a new visit and verify the initial viewport shows
only the solid sky-blue field with no automatic intro timeline, then confirm the
title/date appear progressively only after scrolling begins.

### Implementation for User Story 1

- [X] T007 [P] [US1] Replace the legacy staged Home route wiring with the new scene entry in `src/pages/HomePage/HomePage.tsx`
- [X] T008 [P] [US1] Implement normalized sticky-scroll progress and reveal range derivation in `src/features/home/useHomeSceneProgress.ts`
- [X] T009 [P] [US1] Build the solid `#BFE9FF` base layer component in `src/features/home/components/HomeSkyLayer.tsx`
- [X] T010 [US1] Rebuild the Home scene container as a scroll-driven sticky viewport in `src/features/home/components/HomeScene.tsx`
- [X] T011 [US1] Implement the hidden-on-load title/date reveal with MaisonNeue, Helvetica, sans-serif styling in `src/features/home/components/HomeTitleReveal.tsx`
- [X] T012 [US1] Remove timed intro composition usage from `src/features/home/components/HomeHero.tsx` and `src/pages/HomePage/HomePage.tsx`
- [ ] T013 [US1] Run the Home opening-state manual validation steps in `specs/003-redefine-home-navigation/quickstart.md`

**Checkpoint**: User Story 1 should now present the new opening Home state without any automatic intro behavior.

---

## Phase 4: User Story 2 - Scroll Through Layered Clouds and Title Reveal (Priority: P1)

**Goal**: Add layered clouds, progressive title/date behavior, and a footer landing
state that respond smoothly to scroll.

**Independent Test**: Scroll from the first viewport through the Home flow and verify
the title and date progressively reveal while cloud assets move horizontally in a
soft, organic way until the footer is reached.

### Implementation for User Story 2

- [X] T014 [P] [US2] Import `Components/Clouds/*.png` and define deterministic cloud layer metadata plus footer copy in `src/shared/constants/home.constants.ts`
- [X] T015 [P] [US2] Implement separate layered cloud asset rendering in `src/features/home/components/HomeCloudField.tsx`
- [X] T016 [P] [US2] Implement the Home footer landing state with light directional content in `src/features/home/components/HomeFooter.tsx`
- [X] T017 [US2] Connect cloud scroll travel, ambient drift, title progression, and footer arrival inside `src/features/home/components/HomeScene.tsx`
- [X] T018 [US2] Add reduced-motion behavior for cloud drift, title translation, and footer settling in `src/features/home/useHomeSceneProgress.ts` and `src/features/home/components/HomeCloudField.tsx`
- [ ] T019 [US2] Run the scroll-motion and footer-resolution manual validation steps in `specs/003-redefine-home-navigation/quickstart.md`

**Checkpoint**: User Story 2 should now provide the atmospheric cloud motion and footer resolution described in the spec.

---

## Phase 5: User Story 4 - Navigate Through a Minimal Overlay Menu (Priority: P1)

**Goal**: Replace the heavy navbar approach with a minimal fixed trigger and a
full-screen overlay menu that works consistently across all three main routes.

**Independent Test**: From any main page, open the fixed top-right trigger and verify
the overlay menu presents Home, Are You Coming?, and Drop a Message as large clear
links with a simple open and close interaction.

### Implementation for User Story 4

- [X] T020 [P] [US4] Reduce overlay destinations to the three approved routes in `src/shared/constants/navigation.constants.ts`
- [X] T021 [P] [US4] Rebuild the full-screen editorial overlay menu with large clear links in `src/features/components/PersistentNavigation.tsx`
- [X] T022 [US4] Replace the current shared header UI with a minimal fixed top-right trigger and dialog wiring in `src/app/AppShell.tsx`
- [X] T023 [US4] Align overlay close behavior and route transitions in `src/app/AppRouter.tsx` and `src/features/components/useNavigationOverlay.ts`
- [X] T024 [US4] Verify overlay consistency on `src/pages/HomePage/HomePage.tsx`, `src/pages/GuestListPage/GuestListPage.tsx`, and `src/pages/MessagesPage/MessagesPages.tsx`
- [ ] T025 [US4] Run the overlay navigation manual validation steps in `specs/003-redefine-home-navigation/quickstart.md`

**Checkpoint**: User Story 4 should now expose the new trigger and overlay navigation on every main route.

---

## Phase 6: User Story 3 - Experience a Layered Visual Composition (Priority: P2)

**Goal**: Refine the visual composition so the sky, clouds, title, and footer read
as distinct but cohesive layers throughout the Home journey.

**Independent Test**: Inspect the Home experience visually while scrolling and verify
the sky acts as the base layer, the clouds read as separate overlays, and the footer
feels like a deliberate final destination in the composition.

### Implementation for User Story 3

- [X] T026 [P] [US3] Remove obsolete staged Home scene constants and types from `src/shared/constants/home.constants.ts` and `src/shared/types/site.types.ts`
- [X] T027 [P] [US3] Tune layer spacing, text balance, and z-order composition in `src/features/home/components/HomeTitleReveal.tsx` and `src/features/home/components/HomeCloudField.tsx`
- [X] T028 [US3] Finalize missing-asset fallbacks and footer-as-destination composition in `src/features/home/components/HomeScene.tsx` and `src/features/home/components/HomeFooter.tsx`
- [ ] T029 [US3] Run the layered-composition manual validation steps in `specs/003-redefine-home-navigation/quickstart.md`

**Checkpoint**: All Home layers should now read as a deliberate composition rather than a mixed background.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finish cleanup, shared validation, and performance tuning that affect
multiple user stories.

- [X] T030 [P] Remove unused legacy Home and navigation code paths in `src/features/home/components/HomeHero.tsx`, `src/features/home/useHomeScrollAnimation.ts`, and `src/features/components/PersistentNavigation.tsx`
- [ ] T031 Run responsive QA across `/`, `/are-you-coming`, and `/drop-a-message` using `specs/003-redefine-home-navigation/quickstart.md`
- [ ] T032 Validate keyboard access, focus states, readability, and reduced-motion behavior in `src/app/AppShell.tsx`, `src/features/components/PersistentNavigation.tsx`, and `src/features/home/components/HomeScene.tsx`
- [X] T033 Tune scroll, animation, and asset performance in `src/features/home/components/HomeScene.tsx` and `src/features/home/components/HomeCloudField.tsx`
- [ ] T034 Run the full manual validation pass from `specs/003-redefine-home-navigation/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on User Story 1 because it extends the new Home scene shell and scroll state
- **User Story 4 (Phase 5)**: Depends on Foundational completion and can run independently of the Home-scene stories
- **User Story 3 (Phase 6)**: Depends on User Stories 1 and 2 because it refines the final Home composition
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts the new Home architecture and is the MVP entry point
- **User Story 2 (P1)**: Builds on US1's scene shell, scroll progress, and title reveal
- **User Story 4 (P1)**: Independent after Foundational and can be delivered in parallel with US1/US2
- **User Story 3 (P2)**: Depends on the Home layers existing first, so it follows US1 and US2

### Within Each User Story

- Shared constants and types before component composition
- Scroll state before motion-driven rendering
- Core implementation before story-level manual validation
- Reduced-motion and responsive behavior must be included before marking a story complete

### Parallel Opportunities

- `T003` can run in parallel with `T002` after `T001`
- `T005` and `T006` can run in parallel in the foundational phase
- `T007`, `T008`, and `T009` can run in parallel for US1 before `T010`
- `T014`, `T015`, and `T016` can run in parallel for US2 before `T017`
- `T020` and `T021` can run in parallel for US4 before `T022`
- `T026` and `T027` can run in parallel for US3 before `T028`
- `T030` can run in parallel with the broader QA tasks in Phase 7 once feature work is stable

---

## Implementation Strategy

### MVP First

- Complete Phase 1 and Phase 2
- Deliver **User Story 1** to replace the timed intro with the new scroll-driven opening Home state
- Deliver **User Story 4** immediately after if sitewide navigation coherence is required in the same release

### Incremental Delivery

1. Land the shared shell and layout baseline
2. Deliver the new Home opening state (US1)
3. Layer in cloud motion and footer resolution (US2)
4. Deliver the minimal overlay navigation across routes (US4)
5. Finish composition refinement and cleanup (US3 + Polish)

### Validation Strategy

- Use `specs/003-redefine-home-navigation/quickstart.md` as the source of truth for all manual checks
- Validate each user story at its checkpoint before moving to the next dependent phase
- Re-run full responsive, accessibility, and reduced-motion review in Phase 7

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] labels map tasks back to the approved user stories
- Each user story remains independently testable through manual validation
- No automated test tasks are included because the plan and quickstart define manual validation only
- Keep route labels, scene copy, and motion tokens centralized rather than hardcoded inside page components
