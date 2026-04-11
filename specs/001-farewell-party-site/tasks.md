# Implementation Tasks: Farewell Party Website

**Feature Branch**: `001-farewell-party-site`  
**Date**: 2026-04-09  
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md) | **Data Model**: [data-model.md](data-model.md)

**Total Tasks**: 99 | **Phases**: 6 | **User Stories**: 3

---

## Phase 1: Setup & Initialization

**Goal**: Establish project structure, types, constants, and shared configuration.

**Tasks**:

- [ ] T001 Create shared type definitions in `src/shared/types/site.types.ts`
- [ ] T002 Create navigation constants in `src/shared/constants/navigation.constants.ts`
- [ ] T003 Create Home scene sections constants in `src/shared/constants/home.constants.ts`
- [ ] T004 Create shared events constants in `src/shared/constants/events.constants.ts`
- [ ] T005 Create storage constants in `src/shared/constants/storage.constants.ts`
- [ ] T006 Set up environment variables loader in `src/shared/config/env.ts`
- [ ] T007 Create Supabase client initialization in `src/services/supabase/client.ts`

---

## Phase 2: Foundational Components & Services

**Goal**: Build shared UI components and service layers that unblock all user stories.

**Shared Components**:

- [ ] T008 [P] Create Button component in `src/shared/components/Button/Button.tsx`
- [ ] T009 [P] Create Input component in `src/shared/components/Input/Input.tsx`
- [ ] T010 [P] Create TextArea component in `src/shared/components/TextArea/TextArea.tsx`
- [ ] T011 [P] Create PageContainer component in `src/shared/components/PageContainer/PageContainer.tsx`
- [ ] T012 [P] Create PixelCard component in `src/shared/components/PixelCard/PixelCard.tsx`

**API Service Layer**:

- [ ] T013 Create RSVP API service in `src/services/supabase/guestList.api.ts`
- [ ] T014 Create message API service in `src/services/supabase/guestMessages.api.ts`
- [ ] T015 Create localStorage service in `src/services/localStorage/siteStorage.ts`

**App-Level Wiring**:

- [ ] T016 Create AppProviders wrapper in `src/app/AppProviders.tsx`
- [ ] T017 Create AppShell with persistent navigation wrapper in `src/app/AppShell.tsx`
- [ ] T018 Create AppRouter with three main routes in `src/app/AppRouter.tsx`

**Navigation Overlay**:

- [ ] T019 Create Navigation Overlay custom hook in `src/features/components/useNavigationOverlay.ts`
- [ ] T020 Create PersistentNavigation overlay component in `src/features/components/PersistentNavigation.tsx`

---

## Phase 3: User Story 1 – Explore the Farewell Journey (P1)

**Goal**: Build the Home page with progressive scroll-triggered animation and persistent navigation control.

**Independent Test Criteria**:
- Guest can land on Home page and see opening scene
- Guest can scroll and progressively reveal scene sections
- Title trigger appears as distinct animation moment
- Final pixel-art composition area displays (placeholder ready for future artwork)
- Navigation overlay opens/closes from any scroll position
- Navigation overlay restores scroll position when closed
- Experience is responsive on mobile, tablet, desktop
- Reduced motion preference respected (all animations disabled, content accessible)

**Tasks**:

- [ ] T021 [US1] Create HomeSceneState type in `src/features/home/home.types.ts`
- [ ] T022 [US1] Create useHomeScrollAnimation hook in `src/features/home/hooks/useHomeScrollAnimation.ts`
- [ ] T023 [P] [US1] Create HomeHero component (opening scene) in `src/features/home/components/HomeHero.tsx`
- [ ] T024 [P] [US1] Create HomeScene component (individual scene wrapper) in `src/features/home/components/HomeScene.tsx`
- [ ] T025 [P] [US1] Create PaperTrigger component (title introduction) in `src/features/home/components/PaperTrigger.tsx`
- [ ] T026 [US1] Create HomePage with scroll reveal logic in `src/pages/HomePage/HomePage.tsx`
- [ ] T027 [P] [US1] Create responsive breakpoint styles in `src/styles/global.css` for Home layout
- [ ] T028 [US1] Implement scroll position recovery in `src/features/home/hooks/useHomeScrollAnimation.ts`
- [ ] T029 [US1] Implement reduced-motion support in Home scene animations (check `prefers-reduced-motion` in animation hooks)
- [ ] T030 [US1] Add keyboard-accessible navigation overlay integration in HomePage

---

## Phase 4: User Story 2 – Confirm Attendance (P2)

**Goal**: Build minimal RSVP form (name field only) with validation, submission, and success/error states.

**Independent Test Criteria**:
- Guest sees RSVP form with single name input field
- Guest can enter valid name and submit
- Validation rejects empty or oversized name input with clear error message
- Success message displays after successful submission
- Form value persists to localStorage if submission fails (recovery UX)
- RSVP submission is recorded in Supabase
- Form is accessible (labels, keyboard nav, focus states)
- Responsive on all viewport sizes
- Reduced motion doesn't prevent form interaction

**Tasks**:

- [ ] T031 [US2] Create RSVP types in `src/features/guest-list/guestList.types.ts`
- [ ] T032 [US2] Create form validation utilities in `src/features/guest-list/guestList.validation.ts` (ref: data-model.md validation rules: name required, 1-100 chars, non-whitespace)
- [ ] T033 [US2] Create useRSVPForm hook in `src/features/guest-list/hooks/useRSVPForm.ts`
- [ ] T034 [US2] Create GuestListForm component in `src/features/guest-list/GuestListForm.tsx`
- [ ] T035 [US2] Create GuestListPage in `src/pages/GuestListPage/GuestListPage.tsx`
- [ ] T036 [P] [US2] Update navigation constants to include `/are-you-coming` route
- [ ] T037 [US2] Add RSVP form to AppRouter in `src/app/AppRouter.tsx`
- [ ] T038 [US2] Integrate localStorage form value persistence in useRSVPForm hook
- [ ] T039 [US2] Ensure form validation feedback is accessible (aria-live message)
- [ ] T040 [US2] Test RSVP submission via Supabase API (manual QA)

---

## Phase 5: User Story 3 – Leave a Public Message (P3)

**Goal**: Build message submission form and playful message wall display with message cards.

**Independent Test Criteria**:
- Guest sees message submission form with name and message fields
- Guest can enter valid message content and submit
- Validation rejects empty, oversized, or in-progress message inputs with clear feedback
- Success message displays after successful submission
- Message appears in public wall as social-post-style card
- Multiple messages display in playful, non-rigid layout (not strict grid)
- Empty state shown when no messages exist
- Messages load from Supabase and display
- Message cards are accessible and keyboard navigable
- Reduced motion respected (no animations prevent access to messages)
- Responsive on all viewport sizes

**Tasks**:

- [ ] T041 [US3] Create message types in `src/features/guest-messages/guestMessages.types.ts`
- [ ] T042 [US3] Create message validation utilities in `src/features/guest-messages/guestMessages.validation.ts` (ref: data-model.md validation rules: guestName 1-100 chars, message 1-500 chars, both non-whitespace)
- [ ] T043 [US3] Create useGuestMessageForm hook in `src/features/guest-messages/hooks/useGuestMessageForm.ts`
- [ ] T044 [US3] Create useMessageWall hook (fetch & manage messages) in `src/features/guest-messages/hooks/useMessageWall.ts`
- [ ] T045 [P] [US3] Create GuestMessageForm component in `src/features/guest-messages/GuestMessageForm.tsx`
- [ ] T046 [P] [US3] Create GuestMessageCard component in `src/features/guest-messages/GuestMessageCard.tsx`
- [ ] T047 [P] [US3] Create GuestMessagesList component (playful grid layout) in `src/features/guest-messages/GuestMessagesList.tsx`
- [ ] T048 [US3] Create MessagesPage in `src/pages/MessagesPage/MessagesPage.tsx`
- [ ] T049 [P] [US3] Update navigation constants to include `/drop-a-message` route
- [ ] T050 [US3] Add Messages page to AppRouter in `src/app/AppRouter.tsx`
- [ ] T051 [US3] Implement empty state in GuestMessagesList when no messages exist
- [ ] T052 [US3] Implement loading state with skeleton cards in GuestMessagesList
- [ ] T053 [US3] Implement playful rotation and card styling in `src/shared/components/PixelCard/PixelCard.tsx`
- [ ] T054 [US3] Ensure message form submission persists failed values to localStorage
- [ ] T055 [US3] Test message submission and wall rendering via Supabase (manual QA)

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Accessibility review, performance optimization, reduced-motion testing, and deployment preparation.

**Accessibility & Reduced Motion**:

- [ ] T056 Verify all interactive elements have visible focus states
- [ ] T057 Test keyboard navigation on all pages (Tab, Shift+Tab, Escape for overlay)
- [ ] T058 Verify ARIA labels and roles on form inputs and overlay
- [ ] T059 Test reduced-motion support: verify `prefers-reduced-motion` query respected on all animation
- [ ] T060 Audit color contrast (minimum 4.5:1) across pixel-art palette
- [ ] T061 Verify semantic HTML structure (heading hierarchy, form structure, landmark regions)

**Responsive Design Verification**:

- [ ] T062 Test Home page on mobile (320px), tablet (768px), desktop (1024px+)
- [ ] T063 Test RSVP page responsiveness across breakpoints
- [ ] T064 Test Messages page + message wall layout responsiveness
- [ ] T065 Verify navigation overlay is usable on all viewport sizes
- [ ] T066 Test that content remains readable without horizontal scrolling on all sizes

**Performance & Optimization**:

- [ ] T067 Verify scroll performance: Home page scrolls smoothly (60 fps on modern devices)
- [ ] T068 Optimize images and assets via Vite config
- [ ] T069 Verify Framer Motion animation performance (no jank during scroll reveals)
- [ ] T070 Check bundle size and asset loading; ensure LCP < 2.5s (via Google Lighthouse on modern devices, 4G throttle)

**Manual QA Checklist**:

- [ ] T071 Verify Home page displays all scene sections in correct order
- [ ] T072 Verify title trigger appears as distinct animation moment
- [ ] T073 Verify final composition area is ready for future artwork
- [ ] T074 Verify navigation overlay opens from top-right icon on all pages
- [ ] T075 Verify navigation overlay closes on Escape key or outside click
- [ ] T076 Verify navigation overlay restores scroll position on Home when closed
- [ ] T077 Verify RSVP form validates empty input
- [ ] T078 Verify RSVP form validates oversized input (>100 chars)
- [ ] T079 Verify RSVP success message displays and clears after 3 seconds
- [ ] T080 Verify RSVP data persists in Supabase
- [ ] T081 Verify message form validates empty fields
- [ ] T082 Verify message form validates oversized message (>500 chars)
- [ ] T083 Verify message success message displays
- [ ] T084 Verify submitted messages appear in message wall immediately
- [ ] T085 Verify message cards display in playful, non-rigid layout
- [ ] T086 Verify empty state message displays when no messages exist
- [ ] T087 Verify loading state skeleton shows while fetching messages
- [ ] T088 Test all forms with failed submissions and retry flow
- [ ] T089 Test all forms on touchscreen devices (mobile interactions)
- [ ] T090 Verify localStorage recovery works for form values

**Usability Testing & Validation** (SC-004):

- [ ] T091 Recruit ≥8 participants for moderated usability testing (target: diverse demographics, device types, technical comfort levels)
- [ ] T092 Create usability test scenario script covering: Home scroll journey → RSVP submission → message submission. Define success criteria: participants identify Home as narrative farewell experience
- [ ] T093 Conduct moderated usability sessions with individual participants (~30–45 min each); record sessions; capture qualitative feedback on Home page emotional impact and form usability
- [ ] T094 Analyze usability test findings; compile report with participant quotes, quantified success rate (target: ≥75% identify Home as narrative journey), and design recommendations for v1.1

**Deployment Preparation**:

- [ ] T095 Set up environment variables for Supabase in `.env.local`
- [ ] T096 Build production bundle: `npm run build`
- [ ] T097 Preview production build locally: `npm run preview`
- [ ] T098 Configure Vercel deployment settings (build command, output directory, env vars)
- [ ] T099 Deploy to Vercel and verify all routes work in production

---

## Dependency Graph & Execution Strategy

### Phase Completion Order

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ├→ Phase 3 (US1: Home Page)
    ├→ Phase 4 (US2: RSVP)
    └→ Phase 5 (US3: Messages)
    ↓
Phase 6 (Polish & Testing)
```

### Parallel Execution Examples

**Phase 2 Parallelization**:
- Tasks T008–T012 (Shared components) can run in parallel (different files, no interdependencies)
- Task T013–T014 (API services) can run in parallel after T007 (Supabase client)
- Task T015 (localStorage service) can run in parallel with API services

**Phase 3 Parallelization** (Once Phase 2 complete):
- Tasks T023–T025 (HomeHero, HomeScene, PaperTrigger) can run in parallel
- Task T027 (responsive styles) can run in parallel with component development

**Phase 4 & 5 Parallelization** (Independent of each other):
- Phase 4 (RSVP) and Phase 5 (Messages) can run in parallel after Phase 2
- Within Phase 5: Tasks T045–T047 (form, card, list) can partially parallelize after types/validation

### Recommended MVP Scope

**Minimum Viable Product (for first release)**:
1. **Phase 1**: Setup (T001–T007) ✓ Required
2. **Phase 2**: Foundational (T008–T020) ✓ Required
3. **Phase 3**: US1 Home Page (T021–T030) ✓ Required (P1 – entry point identity)
4. **Phase 4**: US2 RSVP (T031–T040) ✓ Recommended (P2 – main guest interaction)
5. **Phase 5**: US3 Messages (T041–T055) ⚠ Optional (P3 – nice-to-have social feature)
6. **Phase 6**: Polish (T056–T095) ✓ Required (accessibility, QA, deployment)

**MVP Launch**: Phases 1, 2, 3, 4, 6 (Home + RSVP + Navigation + minimal polish)  
**v1.1 Release**: Add Phase 5 (Messages wall) + refinements

---

## Implementation Notes

### Content & Configuration Management

- **Navigation destinations** and **Home scene sections** are managed as data constants (not hardcoded JSX)
- See `src/shared/constants/navigation.constants.ts` and `src/shared/constants/home.constants.ts`
- This design enables future CMS integration without rewriting components

### Form Submission & Validation

- All form submissions include client-side validation (instant feedback)
- Failed form values persist to localStorage for recovery
- Success states display for 3 seconds then auto-clear
- All forms are keyboard-accessible with visible focus states and ARIA labels

### Scroll Position Recovery

- Home page scroll position saved to localStorage when navigation overlay opens
- Scroll position restored when overlay closes (via siteStorage.ts service)
- Allows users to return to their reading position mid-journey

### Reduced Motion Support

- All animation uses Framer Motion's conditional `useReducedMotion()` hook
- When `prefers-reduced-motion: reduce` is active, content displays instantly
- No animation prevents access to core functionality or navigation

### Responsive Design Strategy

- Mobile-first approach: design for 320px, then enhance for tablet (768px) and desktop (1024px+)
- Tailwind CSS breakpoints: `sm`, `md`, `lg`, `xl`
- Message wall grid: 1 column mobile, 2 columns tablet, 3 columns desktop

---

## Test Execution Examples

### Manual QA Checklist (Phase 3: US1 Testing)

```
✓ Open Home page in Chrome (latest)
✓ Scroll smoothly from top (opening scene should reveal progressively)
✓ Stop scroll at title trigger offset → title animation should trigger
✓ Continue scroll to bottom → final composition area should display
✓ Click top-right menu icon → full-screen overlay should open
✓ Press Escape key → overlay should close and scroll position should restore
✓ Repeat on Firefox, Safari, iOS Chrome, Android Chrome
✓ Disable animations in browser DevTools → verify content still accessible
✓ Reduce motion setting in OS → verify animations respect prefers-reduced-motion
✓ Test on 320px viewport (mobile) → content readable, no horizontal scroll
✓ Test on 768px viewport (tablet) → content readable, layout adjusts
✓ Test on 1024px+ viewport (desktop) → full experience as designed
```

### Manual QA Checklist (Phase 4: US2 Testing)

```
✓ Navigate to /are-you-coming
✓ Submit form with empty name → error message "Name is required"
✓ Submit form with 101+ character name → error message "Name too long"
✓ Submit form with valid name "Alice" → success message "Your RSVP is confirmed!"
✓ Check Supabase → verify record appears in guest_rsvps table
✓ Repeat form submission with different name "Bob" → verify both records exist
✓ Close browser tab in middle of form entry → reopen and verify name auto-filled from localStorage
✓ Test on mobile, tablet, desktop → form remains usable
✓ Test with keyboard only (Tab, Shift+Tab, Enter) → all interactions work
```

### Manual QA Checklist (Phase 5: US3 Testing)

```
✓ Navigate to /drop-a-message
✓ See empty state message "No messages yet"
✓ Submit form with name "Alice" and message "Thanks!" → success message
✓ Verify message appears in wall as card with guest name and message
✓ Submit another message from "Bob" → verify both cards appear in playful layout
✓ Check grid rotation and card styling → cards should slightly rotated (±1-3°)
✓ Check Supabase → verify records in guest_messages table with approved=true
✓ Remove browser localStorage and refresh → messages still load from database
✓ Test on mobile (1 column), tablet (2 columns), desktop (3 columns)
✓ Test with keyboard navigation → message cards accessible via Tab
```

---

## Reference Documents

- [Specification](spec.md) – User stories, acceptance criteria, requirements
- [Implementation Plan](plan.md) – Architecture, tech stack, project structure
- [Data Model](data-model.md) – Entity definitions, validation rules, relationships
- [Quickstart Guide](quickstart.md) – Developer setup, patterns, debugging tips
- [Contracts](contracts/) – TypeScript interface definitions for type-safe implementation
- [Research](research.md) – Technical decision justifications

---

**Status**: Ready to begin Phase 1 setup. Execute tasks in order by phase; parallelize within phase where indicated by [P] marker.
