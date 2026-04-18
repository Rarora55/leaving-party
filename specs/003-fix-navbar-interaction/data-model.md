# Data Model: 003-fix-navbar-interaction

## Scope

No backend schema changes are introduced. This feature defines UI/domain models for navigation overlay behavior, visual state, and interaction outcomes.

## Entities

## 1) NavigationDestination (shared config entity)

- Source: `src/shared/constants/navigation.constants.ts`
- Fields:
  - `id: string`
  - `label: string`
  - `route: string`
  - `order: number`
- Constraints:
  - Must include `Home`, `Drop a Message`, `MessageList` entries for this feature scope.
  - Render order is deterministic by `order`.
  - New destinations can be added without changing page-specific navigation logic.

## 2) NavigationOverlayState (interaction state entity)

- Source: `useNavigationOverlay` + `AppShell`
- Fields:
  - `isOpen: boolean`
  - `scrollPositionBeforeOpen: number`
  - `activeRoute: string`
- Constraints:
  - `isOpen = true` implies full-screen overlay is present and background is inert.
  - Closing without destination selection preserves `activeRoute`.
  - Close action restores stable viewport behavior without stuck body-lock side effects.

## 3) MenuTriggerVisualState (derived presentation entity)

- Source: `AppShell` trigger rendering derived from `isOpen`
- Fields:
  - `mode: 'closed' | 'open'`
  - `strokeColor: 'white' | 'black'`
  - `shape: 'single-line' | 'x-mark'`
- Constraints:
  - Closed mode always renders white single-line icon.
  - Open mode always renders black X icon.
  - Visual mode and overlay state cannot diverge.

## 4) OverlayInteractionOutcome (session entity)

- Source: Event handling inside overlay and links
- Fields:
  - `action: 'toggle' | 'escape' | 'non_link_space' | 'destination_select'`
  - `selectedRoute?: string`
  - `routeChanged: boolean`
- Constraints:
  - `action = destination_select` and `selectedRoute === activeRoute` => `routeChanged = false`, overlay closes.
  - `action = destination_select` and `selectedRoute !== activeRoute` => `routeChanged = true`, navigate then close.
  - `action = non_link_space` => `routeChanged = false`, overlay closes.

## 5) MotionPreferenceProfile (accessibility entity)

- Source: Browser reduced-motion preference and animation settings
- Fields:
  - `prefersReducedMotion: boolean`
  - `transitionMode: 'full' | 'minimal'`
- Constraints:
  - When `prefersReducedMotion = true`, overlay and trigger transitions use minimal/near-instant timing.
  - State changes remain visually clear in both modes.

## Relationships

- `NavigationDestination[]` drives rendered links inside the full-screen overlay.
- `NavigationOverlayState.isOpen` drives `MenuTriggerVisualState`.
- `OverlayInteractionOutcome` updates `NavigationOverlayState` and optionally route location.
- `MotionPreferenceProfile` modifies transition behavior for both overlay and trigger icon morph.

## State Transitions

## Overlay lifecycle

1. `closed` -> `opening` via trigger toggle.
2. `opening` -> `open` after transition settles (or near-instant in reduced-motion mode).
3. `open` -> `closing` via:
   - trigger toggle,
   - `Esc`,
   - non-link-space tap/click,
   - destination selection.
4. `closing` -> `closed` with:
   - route unchanged for same-route selection and non-navigation closes,
   - route changed for different-route selection.

## Accessibility/focus lifecycle

1. On open: focus enters overlay and remains trapped.
2. While open: tab sequence stays within menu controls.
3. On close: focus returns to menu trigger.
