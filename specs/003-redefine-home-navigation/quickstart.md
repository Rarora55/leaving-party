# Quickstart: Redefine Home and Navigation Experience

**Feature**: 003-redefine-home-navigation  
**Date**: 2026-04-10  
**Purpose**: Run the app locally and manually validate the planned Home and
navigation redesign.

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.
3. Open the local Vite URL in a browser.

## Manual Validation

### Home Opening State

1. Visit `/`.
2. Confirm the first viewport is fully covered by a solid sky layer using
   `#BFE9FF`.
3. Confirm the title and date are not visible before any scroll input.
4. Confirm no automatic intro animation plays on load.

### Scroll-Driven Home Journey

1. Scroll slowly from the opening state.
2. Confirm `We Are Leaving` appears progressively only after scrolling starts.
3. Confirm `9th of May, 2026` follows as a separate delayed reveal under the title.
4. Confirm clouds appear as independent layers above the sky, not embedded into the
   background.
5. Confirm cloud movement combines scroll-linked horizontal travel with subtle
   ambient drift.
6. Continue to the end and confirm the footer reads as the visual landing state with
   light directional content.

### Overlay Navigation

1. Open the fixed trigger in the top-right corner on `/`.
2. Confirm the overlay is full-screen and lightweight.
3. Confirm the only interactive entries are `Home`, `Are You Coming?`, and
   `Drop a Message`.
4. Close the overlay and confirm the current scroll position is preserved on Home.
5. Repeat the overlay check on `/are-you-coming` and `/drop-a-message`.

### Reduced Motion

1. Enable `prefers-reduced-motion: reduce` in browser devtools or OS settings.
2. Reload `/`.
3. Confirm the title/date still reveal through scroll.
4. Confirm ambient cloud drift is removed or significantly simplified.
5. Confirm the footer and overlay remain readable and usable.

### Responsive Review

1. Check mobile, tablet, and desktop widths.
2. Confirm the fixed trigger does not overlap the centered title/date.
3. Confirm overlay links remain readable with generous spacing.
4. Confirm no horizontal scrolling appears.

## Notes

- This planning cycle intentionally defines manual validation only.
- No automated test work is included in this feature plan.
