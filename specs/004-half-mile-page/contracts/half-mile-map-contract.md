# UI Contract: The Half Mile Map Experience

## Contract Scope

- Route and app wiring:
  - `src/app/AppRouter.tsx`
  - `src/shared/constants/navigation.constants.ts`
- Page and feature surface:
  - `src/pages/HalfMilePage/HalfMilePage.tsx` (new)
  - `src/features/half-mile/components/*` (new)
  - `src/shared/constants/halfMile.constants.ts` (new)
  - `src/shared/types/site.types.ts`

## 1) Route and Navigation Contract

- `The Half Mile` route MUST be registered and reachable via persistent navbar.
- Navbar destination label MUST be `The Half Mile`.
- Selecting the lower CTA on The Half Mile page MUST navigate to Home.

## 2) Map Layout Contract

- Map artwork MUST render centered and scale to full available width of its container.
- Map scene MUST preserve visible top and bottom spacing.
- Artwork asset MUST not be modified; interactions are overlay-only.

## 3) Visual Continuity Contract

- Page background MUST reuse Home sky visual language (color and atmospheric layers).
- Clouds MUST use existing cloud assets and remain decorative.
- Clouds MUST not intercept pointer/keyboard interaction intended for hotspots or CTA.

## 4) Hotspot Geometry Contract

- Exactly five invisible circular hotspots MUST be rendered.
- Each hotspot MUST map to the correct brewery location on the map.
- Hotspot positions MUST scale with map size and remain aligned on mobile/tablet/desktop.

## 5) Brewery Card Contract

- Activating a hotspot MUST open a lightweight card showing:
  - brewery name,
  - website link.
- At most one brewery card MAY be open at any time.
- Opening a new hotspot MUST close the previously open card.
- Card MUST close on:
  - outside click/tap,
  - explicit close control,
  - `Esc`,
  - hotspot switch.

## 6) Keyboard and Accessibility Contract

- Hotspots MUST be keyboard-focusable.
- Focused hotspot MUST expose a visible focus indication.
- `Enter` and `Space` on a focused hotspot MUST open its card.
- `Esc` MUST close the currently open card without route change.
- Interactive targets MUST remain usable on touch devices and pointer devices.

## 7) External Link Contract

- Brewery links MUST open in a new browser tab.
- Links MUST keep The Half Mile page open in the current tab.
- Link markup MUST use safe external-link attributes.

## 8) Responsive Behavior Contract

- Contracted behavior MUST hold at minimum mobile, tablet, and desktop breakpoints.
- Card positioning MUST remain readable near viewport edges.
- CTA and hotspot interactivity MUST remain available at all supported widths.
