# Quickstart: Validate Popup Overlay and Content Updates

## Prerequisites
- Node dependencies installed
- Project root: `Leaving-Party`

## 1. Type check
```bash
npx tsc --noEmit
```
Expected: command exits successfully with no TypeScript errors.

## 2. Run app locally
```bash
npm run dev
```

## 3. Validate `/the-half-mile`
- Open `/the-half-mile`.
- Activate any brewery hotspot and verify popup + dark overlay appear.
- Close popup via:
  - `X`
  - `Got it`
  - `Escape`
  - click/tap outside popup on overlay
- Verify background returns to normal after close.
- Re-open popup and verify focus returns to source hotspot on close (keyboard navigation).
- Confirm Signature Brew hotspot shows centered `star.png` aligned with red circle on mobile and desktop widths.

## 4. Validate Home page
- Open `/`.
- Confirm new line appears after existing text:
  - `We'll be there at 5:00 PM`
- Confirm `5:00 PM` is red.
- Confirm second line appears beneath:
  - `Unit 15, Blackhorse Ln, London E17 5QJ`
- Verify no overlap/clipping at narrow/mobile widths.

## 5. Regression sanity
- Confirm Half Mile map interaction still works for all hotspots.
- Confirm no visual regressions in existing Home title/date/subtitle reveal motion.
