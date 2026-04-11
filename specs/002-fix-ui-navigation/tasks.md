# Tasks: Fix UI and Navigation Issues

**Input**: Design documents from `/specs/002-fix-ui-navigation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Accessibility, responsive, and performance validation tasks are mandatory for UI changes.

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

**Purpose**: Project initialization and basic structure

None required - project structure exists.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

None required - existing infrastructure suffices.

---

## Phase 3: US1 - View Full Viewport Home Screen

**Goal**: Home screen covers full viewport height and width.

**Independent Test**: Load home page, verify content fills entire browser window without scrollbars.

- [X] T001 [US1] Update HomePage component to use full viewport height in src/pages/HomePage/HomePage.tsx
- [X] T002 [US1] Ensure HomeScene component supports full height in src/features/home/components/HomeScene.tsx
- [X] T003 [US1] Test responsive behavior on resize in browser

---

## Phase 4: US2 - Experience Intro Title Animation

**Goal**: Intro title fades in smoothly on page load.

**Independent Test**: Load home page, observe title fade-in within 2 seconds.

- [X] T004 [US2] Add fade-in animation to title in HomeHero component using Framer Motion in src/features/home/components/HomeHero.tsx
- [X] T005 [US2] Implement reduced-motion support for animation in src/features/home/components/HomeHero.tsx
- [X] T006 [US2] Test animation performance and timing in browser

---

## Phase 5: US3 - Clean Title Display

**Goal**: Remove extra title "BlackHorseRoadWeAreLeaving" for clean branding.

**Independent Test**: Check home page title for absence of extra text.

- [ ] T007 [US3] Locate and remove "BlackHorseRoadWeAreLeaving" from HomeHero component in src/features/home/components/HomeHero.tsx

---

## Phase 6: US4 - Functional Full-Screen Navigation

**Goal**: Full-screen navbar with cross icon opens correctly and allows navigation.

**Independent Test**: Trigger navbar, verify full screen, cross closes, links navigate.

- [X] T008 [US4] Update PersistentNavigation component for full-screen overlay in src/features/components/PersistentNavigation.tsx
- [X] T009 [US4] Replace burger menu icon with cross icon in src/features/components/PersistentNavigation.tsx
- [X] T010 [US4] Implement navbar toggle logic and navigation links in src/features/components/PersistentNavigation.tsx
- [X] T011 [US4] Add keyboard and screen-reader support for navbar in src/features/components/PersistentNavigation.tsx

---

## Phase 7: US5 - Properly Implemented Pages

**Goal**: Guest List and Messages pages are fully functional with UI and forms.

**Independent Test**: Navigate to each page, verify complete content and functionality.

- [X] T012 [US5] Complete GuestListPage with form and list in src/pages/GuestListPage/GuestListPage.tsx
- [X] T013 [US5] Complete MessagesPage with wall and form in src/pages/MessagesPage/MessagesPages.tsx
- [X] T014 [US5] Ensure pages integrate with existing services in src/services/

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Quality assurance, performance, and accessibility validation

- [X] T015 Validate responsive behavior across mobile, tablet, desktop
- [X] T016 Test accessibility: keyboard navigation, screen readers, focus states
- [X] T017 Verify performance: smooth animations, no layout shifts
- [X] T018 Run manual QA checklist from quickstart.md

---

## Dependencies

User stories can be implemented in parallel except:
- US4 (navigation) should be after US1-3 for consistent UI
- US5 (pages) can be parallel to others

**Story Completion Order**:
1. US1 (full viewport) - Foundation for home experience
2. US2 + US3 (animation + clean title) - Parallel with US1
3. US4 (navigation) - Depends on home being stable
4. US5 (pages) - Independent

## Parallel Execution Examples

**Per Story**:
- US1: T001, T002, T003 (sequential)
- US2: T004, T005, T006 (sequential)
- US3: T007 (single)
- US4: T008-T011 (sequential)
- US5: T012-T014 (sequential)

## Implementation Strategy

**MVP Scope**: US1 (full viewport home) - delivers core immersive experience.

**Incremental Delivery**: Add US2/US3 for polished home, then US4 for navigation, finally US5 for complete site.

**Risk Mitigation**: Test each story independently before integration.