# UI Contract: Fullscreen Navigation Overlay

## Contract Scope

- Shared shell navigation overlay in:
  - `src/app/AppShell.tsx`
  - `src/features/components/PersistentNavigation.tsx`
  - `src/features/components/useNavigationOverlay.ts`
  - `src/shared/constants/navigation.constants.ts`
  - `src/shared/types/site.types.ts`

## 1) Overlay Rendering Contract

- Overlay MUST cover full viewport (`inset-0`) on mobile, tablet, and desktop.
- Overlay background MUST match Home sky visual language (color + atmospheric treatment), not a flat unrelated style.
- While open, background page interaction and scrolling MUST be blocked.

## 2) Destination Contract

- Open menu MUST render these destinations as selectable items:
  - `Home`
  - `Drop a Message`
  - `MessageList`
- Destination list MUST be rendered from shared configuration (no route-specific hardcoded JSX).
- Current route item MUST be visually marked as active.

## 3) Selection Behavior Contract

- Selecting a destination different from current route:
  - navigates to destination,
  - closes overlay.
- Selecting current route:
  - closes overlay,
  - does not navigate or reset route context.
- Clicking/tapping non-link space in open overlay:
  - closes overlay,
  - does not navigate.

## 4) Trigger Contract

- Closed state:
  - trigger icon is a single white line.
- Open state:
  - trigger icon is a black X.
- Pressing trigger toggles open/close without forced navigation.
- Closing via trigger preserves current route unless a destination was selected.

## 5) Accessibility Contract

- Open overlay traps keyboard focus.
- `Esc` closes overlay.
- Focus returns to trigger after close.
- Menu control and navigation semantics are screen-reader accessible (`aria-*`, role semantics).

## 6) Motion Contract

- Open/close interactions must feel intentional in normal motion mode.
- In reduced-motion mode:
  - overlay transitions are minimal/near-instant,
  - trigger icon transition is minimal/near-instant,
  - state changes remain visually understandable.

## 7) Extensibility Contract

- Adding one new destination in shared navigation config MUST make it render in overlay without introducing page-specific conditional logic.
- Navigation types should allow adding new labels/routes without brittle string-literal churn across components.
