# Research: Redefine Home and Navigation Experience

**Feature**: 003-redefine-home-navigation  
**Date**: 2026-04-10  
**Purpose**: Resolve implementation decisions for the redesigned Home scene and
overlay navigation using the current repository structure.

## Decision 1: Use a Sticky Scroll Scene for Home

- **Decision**: Build Home as a single sticky scroll composition driven by
  Motion's `useScroll` and normalized progress values.
- **Rationale**: The current `useHomeScrollAnimation` hook is built for discrete
  enter-on-view blocks. The approved spec requires one continuous visual journey
  where the title, clouds, and footer respond to the same scroll state.
- **Alternatives considered**: Reuse the current staged card layout. Rejected
  because it keeps the page feeling section-based instead of atmospheric and
  scroll-driven.

## Decision 2: Model Clouds as Deterministic Layer Config

- **Decision**: Represent each file in `Components/Clouds/` as its own typed cloud
  layer with explicit position, size, z-index, scroll travel, and ambient drift
  values stored in `src/shared/constants/home.constants.ts`.
- **Rationale**: The spec requires clouds to be separate assets, not embedded in
  the background. Deterministic config keeps the motion maintainable and avoids
  runtime randomness that would be harder to debug or tune.
- **Alternatives considered**: Draw clouds into one background image or generate
  random positions in code. Rejected because both approaches violate the layered
  asset requirement and reduce design control.

## Decision 3: Keep AppShell as the Global Navigation Host

- **Decision**: Rework `AppShell` and the existing overlay components instead of
  introducing a second navigation system.
- **Rationale**: The repo already routes everything through `AppShell` and uses a
  Radix dialog-based overlay. Replacing the sticky header with a fixed trigger is
  lower risk than adding a parallel shell or page-specific navigation logic.
- **Alternatives considered**: Create a dedicated Home-only navigation or mount a
  separate overlay from each page. Rejected because it fragments route behavior and
  duplicates shared navigation state.

## Decision 4: Simplify Navigation State Management

- **Decision**: Limit `useNavigationOverlay` to open/close/toggle state and scroll
  restoration, and let Radix/React Router handle focus and routing concerns.
- **Rationale**: The current hook persists overlay state to localStorage and uses
  `window.location` for Enter-key navigation. That is more complex than needed for a
  minimal editorial overlay and risks awkward behavior across routes.
- **Alternatives considered**: Keep localStorage persistence and custom arrow-key
  destination management. Rejected because the menu only has three links and should
  remain lightweight.

## Decision 5: Reduce Motion by Removing Ambient Drift, Not Structure

- **Decision**: Keep the scroll-based progression intact under reduced motion, but
  disable continuous cloud drift and minimize transform distances.
- **Rationale**: The spec explicitly requires reduced-motion friendliness while
  still preserving the Home structure. Removing the scene entirely would hide the
  narrative; simplifying the motion keeps the meaning.
- **Alternatives considered**: Disable all motion and immediately show the full
  composition. Rejected because it breaks the intended hidden-on-load title reveal
  and removes the sense of progression.

## Decision 6: Neutralize Legacy Starter CSS During Implementation

- **Decision**: Treat `src/index.css` as legacy starter styling and reduce it so the
  new full-bleed Home scene is governed by `src/styles/global.css` and feature-level
  classes.
- **Rationale**: The current `#root` width, border, and centered layout rules in
  `src/index.css` conflict with the approved full-screen Home experience.
- **Alternatives considered**: Override the starter CSS piecemeal inside the new
  components. Rejected because it would make the layout harder to reason about.
