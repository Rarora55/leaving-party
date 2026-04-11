# Tasks: Layered Home Footer Scene

**Input**: Design documents from `/specs/004-layered-home-footer/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Automated tests are not included because the feature specification and plan
only require manual validation. Accessibility, responsive, reduced-motion, short-
height, CTA-routing, and scroll-performance validation remain mandatory.

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. [US1], [US2], [US3])
- Include exact file paths in descriptions

## Path Conventions

- **Application wiring**: `src/app/`
- **Feature modules**: `src/features/`
- **Route composition**: `src/pages/`
- **Shared primitives and utilities**: `src/shared/`
- **Styling and visual system**: `src/styles/`
- **Feature docs and contracts**: `specs/004-layered-home-footer/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align the typed footer-scene surface, route target, and implementation
entry points before refactoring the Home ending.

- [X] T001 Align footer scene types and CTA config scaffolding in `src/shared/types/site.types.ts`
- [X] T002 Define the footer scene config entry point, road-layer asset imports, and RSVP CTA placeholders in `src/shared/constants/home.constants.ts`
- [X] T003 [P] Confirm the footer CTA target remains the existing RSVP destination in `src/shared/constants/navigation.constants.ts` and `src/app/AppRouter.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Refine footer progress and final sticky-state timing in `src/features/home/useHomeSceneProgress.ts`
- [X] T005 [P] Add shared footer layout, title-fade, compact-height, and CTA metadata in `src/shared/constants/home.constants.ts` and `src/shared/types/site.types.ts`
- [X] T006 [P] Prepare an accessible interactive footer wrapper in `src/features/home/components/HomeFooter.tsx`
- [X] T007 [P] Prepare reusable layer rendering, exact-order hooks, and asset-failure fallback in `src/features/home/components/HomeFooterLayer.tsx` and `src/features/home/components/HomeFooterScene.tsx`
- [X] T008 Define the corrected manual validation coverage for sticky-state, CTA, short-height, and sample-reference review in `specs/004-layered-home-footer/quickstart.md`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Reach a New Layered Ending Scene (Priority: P1)

**Goal**: Replace the legacy Home footer with a layered ending that fully resolves in
the final sticky viewport, fades the title/date out before footer settle, and exposes
a footer-local RSVP CTA.

**Independent Test**: Visit `/`, scroll to the final Home sticky viewport state, and
confirm the old footer is gone, the full layered footer is already visible without
extra trailing scroll, the title/date have faded out before final footer settle, and
the footer-local CTA routes to `/are-you-coming`.

### Implementation for User Story 1

- [X] T009 [P] [US1] Implement the final footer scene container and local CTA safe zone in `src/features/home/components/HomeFooterScene.tsx`
- [X] T010 [P] [US1] Refactor the footer wrapper to render an interactive footer scene instead of a decorative-only scene in `src/features/home/components/HomeFooter.tsx`
- [X] T011 [US1] Update title/date exit timing so the layered footer becomes the sole final destination in `src/features/home/components/HomeTitleReveal.tsx`
- [X] T012 [US1] Integrate the final sticky footer reveal, title/date handoff, and CTA entry point in `src/features/home/components/HomeScene.tsx`
- [X] T013 [US1] Validate footer replacement, sticky-state completeness, and CTA navigation in `specs/004-layered-home-footer/quickstart.md`

**Checkpoint**: User Story 1 should now deliver the new final Home scene and remove
the previous footer layout

---

## Phase 4: User Story 2 - Perceive Clear Depth Between Footer Layers (Priority: P1)

**Goal**: Preserve the exact front-to-back layer order and stepped vertical depth so
the footer reads like the approved sample rather than a flat image stack.

**Independent Test**: Inspect the footer scene and confirm that `1Landscape-front`,
`2Landscape-Road`, and `3Landscape-mountains` are visible together, render in the
accepted order, and sit at distinct stepped heights matching the `Sample2.png`
composition.

### Implementation for User Story 2

- [X] T014 [P] [US2] Encode the exact layer order, depth roles, stepped offsets, and `Sample2.png` reference notes in `src/shared/constants/home.constants.ts`
- [X] T015 [US2] Implement mountains-road-front DOM render order and z-index layering in `src/features/home/components/HomeFooterScene.tsx`
- [X] T016 [US2] Implement stepped bottom offsets and full-width pixel-art rendering without flattening the scene in `src/features/home/components/HomeFooterLayer.tsx`
- [X] T017 [US2] Sync depth-order, offset, and reference guarantees in `specs/004-layered-home-footer/contracts/home-footer-scene.contract.ts` and `specs/004-layered-home-footer/data-model.md`
- [X] T018 [US2] Validate depth order and visual-reference alignment in `specs/004-layered-home-footer/quickstart.md`

**Checkpoint**: User Stories 1 and 2 should now render a readable layered footer with
clear depth cues

---

## Phase 5: User Story 3 - Experience the Footer Cleanly Across Screen Sizes (Priority: P2)

**Goal**: Keep the layered footer full-width, bottom-grounded, visible on short
screens, and understandable in reduced-motion mode across supported viewport sizes.

**Independent Test**: Review the footer on mobile, tablet, desktop, and short-height
viewports and confirm the three layers remain visible together, grounded to the
bottom, free of horizontal scrolling, and still understandable with reduced motion.

### Implementation for User Story 3

- [X] T019 [P] [US3] Add breakpoint and compact-height sizing rules for the three layers and CTA placement in `src/shared/constants/home.constants.ts` and `src/shared/types/site.types.ts`
- [X] T020 [US3] Apply responsive full-width, bottom-grounded, no-trailing-scroll layout tuning in `src/features/home/components/HomeScene.tsx` and `src/features/home/components/HomeFooterScene.tsx`
- [X] T021 [US3] Apply reduced-motion and short-height handoff behavior in `src/features/home/components/HomeFooter.tsx` and `src/features/home/components/HomeTitleReveal.tsx`
- [X] T022 [US3] Validate mobile, tablet, desktop, short-height, reduced-motion, and CTA visibility scenarios in `specs/004-layered-home-footer/quickstart.md`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final synchronization and manual QA across the full Home ending

- [X] T023 [P] Sync final implementation notes, risk notes, and validation assumptions in `specs/004-layered-home-footer/plan.md`, `specs/004-layered-home-footer/research.md`, and `specs/004-layered-home-footer/data-model.md`
- [ ] T024 Run the full manual validation checklist in `specs/004-layered-home-footer/quickstart.md` against `src/features/home/components/HomeScene.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion and reuses the scene shell from User Story 1
- **User Story 3 (Phase 5)**: Depends on Foundational completion and tunes the scene delivered by User Stories 1 and 2
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - this is the MVP
- **User Story 2 (P1)**: Can start after Foundational but is safest after User Story 1 establishes the scene container
- **User Story 3 (P2)**: Can start after Foundational once the layered footer exists, then tunes responsiveness and reduced motion

### Within Each User Story

- Shared config and type updates before component composition
- Footer scene and layer rendering before final Home scene integration
- Core implementation before story-specific manual validation
- Story-specific validation before moving to the next priority

### Parallel Opportunities

- `T003` can run in parallel with `T001` and `T002`
- `T005`, `T006`, and `T007` can run in parallel once Phase 2 starts
- `T009` and `T010` can run in parallel during User Story 1
- `T014` and `T017` can run in parallel during User Story 2
- `T019` can run in parallel with the beginning of User Story 3 integration work
- `T023` can run in parallel with final manual validation

---

## Implementation Strategy

### MVP First

- Complete Phase 1 and Phase 2
- Deliver Phase 3 for User Story 1
- Validate that the old footer is gone, the layered ending fully resolves in the final
  sticky viewport, and the footer-local CTA reaches `/are-you-coming`

### Incremental Delivery

- Add Phase 4 to lock the exact layer order and stepped depth against `Sample2.png`
- Add Phase 5 to harden responsive, short-height, and reduced-motion behavior
- Finish with Phase 6 documentation sync and full manual QA

### Parallel Execution Examples

- Foundation example: Developer A handles `T005`, Developer B handles `T006`, and Developer C handles `T007`
- User Story 1 example: one developer handles `T009` and `T010` while another handles `T011` and `T012`
- User Story 2 example: one developer handles `T014` while another handles `T015` and `T016`
- User Story 3 example: one developer handles `T019` while another handles `T020` and `T021`

---

## Notes

- All tasks use the required checklist format with task IDs and exact file paths
- No automated test tasks are included because the feature plan specifies manual validation only
- Accessibility, responsive behavior, reduced motion, short-height visibility, CTA discoverability, and scroll performance remain mandatory acceptance concerns
- Avoid reintroducing legacy footer copy, legacy footer link clusters, or panel styling beyond the required local RSVP CTA
- Suggested MVP scope: Phase 1, Phase 2, and Phase 3 (User Story 1)
