# Tasks: Popup Overlay and Content Updates

**Input**: Design documents from `/specs/007-popup-hotspot-home-content/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated tests were not explicitly requested in the feature specification. Manual validation tasks from quickstart are included and mandatory.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

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

**Purpose**: Align feature files and assets for popup, hotspot, and home-copy updates

- [X] T001 Confirm and align popup assets usage in `Components/Popup/Popup.png` and `Components/Popup/star.png`
- [X] T002 Confirm target components and route surfaces in `src/features/half-mile/components/HalfMileBreweryCard.tsx`, `src/features/half-mile/components/HalfMileHotspots.tsx`, and `src/features/home/components/HomeTitleReveal.tsx`
- [X] T003 [P] Validate existing style token dependencies in `src/shared/constants/home.constants.ts` for popup card continuity

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared interaction constraints for popup behavior before story-specific work

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Define popup interaction state contract (open/close/focus return) in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T005 [P] Define modal semantics and close control requirements in `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T006 [P] Define responsive and pointer-safety constraints for hotspot marker rendering in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T007 Capture manual QA checkpoints from `specs/007-popup-hotspot-home-content/quickstart.md` for execution after implementation

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View and Close Brewery Popup (Priority: P1)

**Goal**: Show a popup card over the current page with dimmed overlay and multiple close actions

**Independent Test**: On `/the-half-mile`, open a brewery popup and close it via `X`, `Got it`, overlay click/tap, and `Escape`, verifying background dim restoration

### Implementation for User Story 1

- [X] T008 [US1] Implement centered popup card container with dark overlay backdrop in `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T009 [US1] Implement top-right `X` close control and `Got it` close button in `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T010 [US1] Implement overlay click/tap outside-card dismissal handling in `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T011 [US1] Implement `Escape` dismissal and popup open/close orchestration in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T012 [US1] Ensure popup-open state visually dims background and popup-close restores normal state in `src/features/half-mile/components/HalfMileBreweryCard.tsx`

**Checkpoint**: User Story 1 is functional and independently testable on `/the-half-mile`

---

## Phase 4: User Story 2 - Keyboard and Mobile-safe Popup Access (Priority: P1)

**Goal**: Ensure popup interaction remains keyboard-friendly and stable across mobile/tablet/desktop layouts

**Independent Test**: Open and close popup with keyboard-only flow, verify focus returns to source hotspot, and confirm controls/layout remain usable at narrow widths

### Implementation for User Story 2

- [X] T013 [US2] Implement focus restoration to the triggering hotspot on popup close in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T014 [US2] Ensure popup dialog semantics and keyboard-reachable controls in `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T015 [US2] Refine responsive popup sizing/spacing for mobile-safe layout in `src/features/half-mile/components/HalfMileBreweryCard.tsx`
- [X] T016 [US2] Validate reduced-motion-safe behavior by preserving existing motion patterns without introducing mandatory new animation in `src/features/half-mile/components/HalfMileBreweryCard.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently with accessibility/responsive expectations met

---

## Phase 5: User Story 3 - Signature Brew Marker and Home Copy Enhancements (Priority: P2)

**Goal**: Add a centered `star.png` marker on Signature Brew hotspot and append Home details text with red-highlighted time

**Independent Test**: Verify centered star marker on Signature Brew across breakpoints and confirm new Home lines appear with red `5:00 PM`

### Implementation for User Story 3

- [X] T017 [US3] Render `star.png` inside the Signature Brew hotspot button in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T018 [US3] Implement responsive marker sizing/alignment and pointer-event passthrough in `src/features/half-mile/components/HalfMileHotspots.tsx`
- [X] T019 [US3] Append `We'll be there at 5:00 PM` with red-highlighted time in `src/features/home/components/HomeTitleReveal.tsx`
- [X] T020 [US3] Append `Unit 15, Blackhorse Ln, London E17 5QJ` below the new time line in `src/features/home/components/HomeTitleReveal.tsx`
- [X] T021 [US3] Verify new Home lines reuse existing reveal opacity/position behavior in `src/features/home/components/HomeTitleReveal.tsx`

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cross-story quality checks

- [X] T022 [P] Run type safety validation with `npx tsc --noEmit` from repository root
- [ ] T023 Run responsive QA across mobile, tablet, and desktop for `/the-half-mile` and `/` using `specs/007-popup-hotspot-home-content/quickstart.md`
- [ ] T024 Validate keyboard access, focus return, overlay dismissal, and readability against `specs/007-popup-hotspot-home-content/contracts/ui-behavior-contract.md`
- [ ] T025 Run full manual quickstart validation checklist in `specs/007-popup-hotspot-home-content/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on completion of all targeted user stories

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on other stories
- **User Story 2 (P1)**: Can start after Foundational; validates and extends popup interaction from US1
- **User Story 3 (P2)**: Can start after Foundational - independent from popup close logic except shared route surface

### Within Each User Story

- Core interaction implementation before responsive/accessibility refinement
- Accessibility/focus handling before final story checkpoint
- Story-specific validation before moving to polish

### Parallel Opportunities

- `T003` can run in parallel with `T001-T002`
- `T005` and `T006` can run in parallel after `T004`
- `T022` can run in parallel with manual QA tasks in Phase 6
- With multiple contributors, US3 tasks (`T017-T021`) can proceed while US2 hardening tasks are underway after foundational completion

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 and Phase 2
2. Deliver US1 (Phase 3) as MVP: popup opens, dims page, and closes through all required controls
3. Validate US1 independently on `/the-half-mile`

### Incremental Delivery

1. Add US2 accessibility/responsive hardening
2. Add US3 marker + home copy enhancements
3. Run polish phase and full quickstart verification

### Team Parallelization Option

1. Engineer A: US1 + US2 popup behavior/accessibility
2. Engineer B: US3 hotspot marker + Home copy updates
3. Rejoin for Phase 6 validation

---

## Notes

- [P] tasks target different files or non-blocking validations
- Each user story remains independently verifiable with explicit test criteria
- No new dependencies are introduced
- Keep edits constrained to files listed in plan/spec unless new blockers emerge

