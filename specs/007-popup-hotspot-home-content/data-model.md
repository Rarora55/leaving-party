# Data Model: Popup Overlay and Content Updates

## Entity: BreweryHotspotInteraction

Represents transient interaction state for Half Mile map hotspot-driven popup behavior.

Fields:
- `activeBreweryId` (string | null): currently selected brewery hotspot.
- `isPopupOpen` (boolean): derived state; true when `activeBreweryId` is not null.
- `lastTriggerElement` (HTMLElement reference, ephemeral): focus return target when popup closes.

Validation / Rules:
- `activeBreweryId` must match one of configured Half Mile brewery IDs when non-null.
- Closing the popup always sets `activeBreweryId` to null.
- On close, focus is restored to `lastTriggerElement` when available.

State transitions:
- `idle` -> `popup_open`: user activates hotspot.
- `popup_open` -> `idle`: user closes via `X`, `Got it`, `Escape`, or overlay click/tap.

## Entity: PopupPresentation

Represents visual and accessibility constraints for popup rendering.

Fields:
- `overlayVisible` (boolean): controls darkened backdrop state.
- `cardRole` (string): dialog semantics for assistive technologies.
- `dismissActions` (set): `x_button`, `got_it_button`, `escape_key`, `overlay_click`.

Validation / Rules:
- Overlay must be visible only while popup is open.
- Popup card must remain within viewport on mobile and desktop.
- Dismiss controls must be keyboard reachable.

## Entity: SignatureBrewMarker

Represents visual marker decoration for the Signature Brew hotspot.

Fields:
- `breweryId` (constant): `signature-brew`.
- `asset` (image path): `Components/Popup/star.png`.
- `alignment` (centered): anchored at hotspot center.
- `size` (responsive clamp): scales by viewport.

Validation / Rules:
- Marker must stay centered over hotspot across breakpoints.
- Marker must not intercept pointer events.

## Entity: HomeAnnouncementCopy

Represents newly added Home informational lines.

Fields:
- `arrivalLine` (string): `We'll be there at 5:00 PM`.
- `highlightToken` (string): `5:00 PM`.
- `addressLine` (string): `Unit 15, Blackhorse Ln, London E17 5QJ`.

Validation / Rules:
- `highlightToken` must render with red styling.
- Both lines must follow existing Home hero text flow and stay readable on small viewports.
