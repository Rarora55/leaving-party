# UI Contract: Mobile Home and Message Usability

## Contract Scope

- Home final-scene surface:
  - `src/shared/constants/home.constants.ts`
  - `src/features/home/components/HomeFooter.tsx`
  - `src/features/home/components/HomeFooterScene.tsx`
- Drop a Message surface:
  - `src/pages/MessagesPage/MessagesPages.tsx`
  - `src/features/components/GuestMessageForm.tsx`
  - `src/features/guest-messages/hooks/useStickyComposerViewport.ts`
  - `src/shared/constants/events.constants.ts` (if toggle labels are added/updated)

## 1) Mobile Home Scene Prominence Contract

- On phone viewports, the final Home scene MUST render at least 20% larger than the current mobile baseline.
- The increased prominence MUST preserve readability of characters, van, and landscape without requiring pinch-zoom.
- Home final scene MUST avoid horizontal overflow-driven page scrolling during normal mobile use.
- Tablet and desktop Home final-scene composition MUST remain unchanged from current baseline.

## 2) Typing Scroll Continuity Contract (Drop a Message)

- While focused in message input or textarea on phone viewports, users MUST retain normal vertical page scrolling.
- Typing interactions MUST NOT introduce scroll lock behavior.
- Keyboard-open positioning logic MUST keep composer visible without blocking natural page movement.
- Blocked-scroll behavior that causes unintended refresh interruptions MUST remain absent.

## 3) Collapsible Composer Contract

- The message composer MUST include a top-area toggle control.
- Toggle semantics are mandatory:
  - expanded composer: down arrow,
  - collapsed composer: up arrow.
- Pressing toggle in expanded state MUST collapse composer.
- Pressing toggle in collapsed state MUST expand composer.

## 4) Form State Preservation Contract

- Collapse/expand transitions MUST preserve in-progress `guestName` and `message` values.
- Existing validation and submission behavior MUST remain unchanged.

## 5) Accessibility Contract

- Toggle control MUST be keyboard operable and have clear accessible labeling.
- Focus behavior MUST remain visible and logical in expanded and collapsed states.
- Any collapse/expand motion MUST remain understandable and reduced-motion-safe.

## 6) Responsive and Regression Boundary Contract

- Mobile is the primary behavior target for this feature.
- Desktop and non-target layouts MUST not incur unintended visual or interaction regressions.
- Existing message wall rendering, route behavior, and external integrations MUST remain intact.

## 7) Validation Checkpoints

- FR-003 checkpoint: confirm Home final scene remains readable without horizontal scrolling and without pinch-zoom dependency.
- SC-003 checkpoint: confirm blocked-scroll refresh interruptions are not reproduced in typing-and-scroll validation runs.
- SC-002 checkpoint: execute and record a 20-session typing-scroll protocol across representative phone viewport configurations.

## 8) Implementation Anchors

- Home scene sizing and overflow control: `src/shared/constants/home.constants.ts`, `src/features/home/components/HomeFooter.tsx`, `src/features/home/components/HomeFooterScene.tsx`
- Message scroll continuity and keyboard inset behavior: `src/features/guest-messages/hooks/useStickyComposerViewport.ts`, `src/pages/MessagesPage/MessagesPages.tsx`
- Collapse/expand toggle semantics and draft persistence: `src/features/components/GuestMessageForm.tsx`, `src/shared/constants/events.constants.ts`
- Automated message-page validations: `tests/messages/MessagesPage.layout.test.tsx`, `tests/messages/MessagesPage.a11y.test.tsx`, `tests/messages/MessagesPage.formFlow.test.tsx`
