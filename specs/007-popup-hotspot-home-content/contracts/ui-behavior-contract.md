# UI Behavior Contract: Popup Overlay + Marker + Home Copy

## Scope

This contract defines observable UI behavior for:
- Half Mile hotspot popup behavior
- Signature Brew star hotspot marker
- Home hero copy additions

## Route: `/the-half-mile`

### Contract HM-POP-001: Popup opening
- Trigger: Activate any brewery hotspot.
- Expected:
  - Popup card is visible above page content.
  - Dark overlay/backdrop is visible.
  - Background appears dimmed.

### Contract HM-POP-002: Popup closing methods
- Trigger: Activate any of the following while popup is open:
  - Top-right `X`
  - `Got it` button
  - `Escape` key
  - Click/tap on overlay outside popup card
- Expected:
  - Popup closes.
  - Overlay is removed.
  - Background returns to normal state.

### Contract HM-POP-003: Focus return
- Trigger: Close popup after opening from a hotspot.
- Expected:
  - Keyboard focus returns to the hotspot that opened the popup.

### Contract HM-MARK-001: Signature Brew marker
- Expected:
  - `star.png` appears on top of the Signature Brew red hotspot.
  - Marker remains centered and aligned across mobile/tablet/desktop widths.
  - Marker does not block hotspot interaction.

## Route: `/`

### Contract HOME-COPY-001: Time line
- Expected text appears after existing Home text:
  - `We'll be there at 5:00 PM`
- Styling requirement:
  - `5:00 PM` must be red.

### Contract HOME-COPY-002: Address line
- Expected text appears below the time line:
  - `Unit 15, Blackhorse Ln, London E17 5QJ`

## Non-functional checks

- Popup and controls remain usable without layout breakage on narrow viewports.
- Existing visual style, spacing rhythm, and responsive behavior are preserved.
