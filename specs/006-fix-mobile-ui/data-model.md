# Data Model: 006-fix-mobile-ui

## Scope

No backend schema, API, or storage contract changes are introduced. This feature defines and updates UI/state models for mobile home scene prominence, mobile typing-scroll behavior, and message composer collapse/expand behavior.

## Entities

## 1) HomeFooterMobileSizingConfig (visual configuration entity)

- Source: `src/shared/constants/home.constants.ts`
- Fields:
  - `frameWidthMobile: string`
  - `frameWidthTablet: string`
  - `frameWidthDesktop: string`
  - `frameWidthCompact: string`
  - `compactHeightMax: number`
  - `compactHeightLayerScale: number`
- Constraints:
  - Mobile setting must produce at least +20% visible prominence versus current mobile baseline.
  - Tablet and desktop settings remain unchanged from baseline.
  - Compact-height mode must remain readable and avoid clipping of core scene elements.

## 2) HomeFinalSceneViewportState (derived layout entity)

- Source: `HomeFooter` + `HomeFooterScene` render logic
- Fields:
  - `isCompactHeightMode: boolean`
  - `isInteractive: boolean`
  - `activeFrameWidth: 'mobile' | 'tablet' | 'desktop' | 'compact'`
- Constraints:
  - Interactive state handoff remains unchanged from current scroll-progress behavior.
  - Scene scaling choice is deterministic by viewport/compact mode and does not affect desktop composition.

## 3) MessageComposerViewportState (viewport/keyboard entity)

- Source: `src/features/guest-messages/hooks/useStickyComposerViewport.ts`
- Fields:
  - `keyboardInset: number`
  - `composerBottom: string`
- Constraints:
  - Keyboard inset is non-negative.
  - Keyboard-open handling must not force scroll lock behavior during text input.
  - Computed bottom offset must keep composer visible above keyboard while allowing page scroll.

## 4) MessageComposerExpansionState (interaction entity)

- Source: `src/pages/MessagesPage/MessagesPages.tsx` (page-level UI state)
- Fields:
  - `isCollapsed: boolean`
  - `toggleIconDirection: 'up' | 'down'` (derived from state)
  - `isKeyboardOpen: boolean` (derived from viewport state)
- Constraints:
  - Expanded state maps to down arrow.
  - Collapsed state maps to up arrow.
  - State must remain synchronized under repeated toggle actions.

## 5) GuestMessageFormDraftState (existing form-state entity)

- Source: `src/features/guest-messages/hooks/useGuestMessageForm.ts`
- Fields:
  - `guestName: string`
  - `message: string`
  - `errors: { guestName?: string; message?: string }`
  - `isSubmitting: boolean`
  - `successMessage: string | null`
- Constraints:
  - Collapse/expand actions must not clear or rewrite `guestName` or `message`.
  - Validation and submission semantics remain unchanged.

## 6) ComposerToggleContentConfig (content entity)

- Source: shared content/constants (for toggle label and assistive copy)
- Fields:
  - `collapseLabel: string`
  - `expandLabel: string`
  - `ariaLabelCollapsed: string`
  - `ariaLabelExpanded: string`
- Constraints:
  - Labels remain centralized in existing content/config patterns.
  - Assistive text clearly communicates current action.

## Relationships

- `HomeFooterMobileSizingConfig` drives `HomeFinalSceneViewportState.activeFrameWidth`.
- `MessageComposerViewportState.isKeyboardOpen` influences composer presentation but must not alter page-scroll eligibility.
- `MessageComposerExpansionState` only controls composer visibility mode and toggle icon; it does not own input data.
- `GuestMessageFormDraftState` persists across `MessageComposerExpansionState` transitions.
- `ComposerToggleContentConfig` provides user-facing and accessibility copy for the toggle control.

## State Transitions

## Composer expansion lifecycle

1. Initial: `isCollapsed = false` (expanded).
2. Toggle pressed in expanded state:
   - `isCollapsed` becomes `true`.
   - Icon changes to up arrow.
3. Toggle pressed in collapsed state:
   - `isCollapsed` becomes `false`.
   - Icon changes to down arrow.
4. At all transitions:
   - `guestName` and `message` remain unchanged.

## Typing + scrolling lifecycle

1. Input or textarea gains focus, keyboard opens (`keyboardInset > 0`).
2. Composer repositions above keyboard via `composerBottom`.
3. User drags vertically while focused.
4. Page-level scroll remains available; no scroll-lock behavior is introduced.

## Home scene sizing lifecycle

1. Phone viewport selects mobile sizing path.
2. Final scene renders with mobile prominence target (+20% vs baseline).
3. Viewport changes to tablet/desktop select unchanged baseline sizing values.

## Validation Rules

- Mobile home final scene must satisfy the +20% prominence threshold in QA comparisons.
- Desktop and tablet home sizing outputs must match baseline configuration values.
- Toggle icon direction must always match expansion state.
- Collapse/expand interactions must never erase unsent form values.
- Keyboard-open typing scenarios must preserve natural vertical page scrolling.

## Implementation Notes (2026-04-19)

- Home mobile prominence is implemented via `frameWidthMobile` change from `172%` to `208%` in `src/shared/constants/home.constants.ts`.
- Home footer containers now enforce horizontal clipping in:
  - `src/features/home/components/HomeFooter.tsx`
  - `src/features/home/components/HomeFooterScene.tsx`
- Message composer expansion state (`isComposerCollapsed`) is page-orchestrated in `src/pages/MessagesPage/MessagesPages.tsx`.
- Toggle semantics are content-driven through `MESSAGE_PAGE_CONTENT` in `src/shared/constants/events.constants.ts` with:
  - expanded -> down arrow (`↓`),
  - collapsed -> up arrow (`↑`).
- Keyboard inset handling is stabilized in `src/features/guest-messages/hooks/useStickyComposerViewport.ts` using `requestAnimationFrame` and a minimum inset threshold.
- Automated behavior coverage is implemented in:
  - `tests/messages/MessagesPage.layout.test.tsx`
  - `tests/messages/MessagesPage.a11y.test.tsx`
  - `tests/messages/MessagesPage.formFlow.test.tsx`
