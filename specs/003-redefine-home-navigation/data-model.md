# Data Model: Redefine Home and Navigation Experience

**Feature**: 003-redefine-home-navigation  
**Date**: 2026-04-10  
**Purpose**: Define the reusable scene, navigation, and motion data structures for
the redesigned Home route and shared overlay shell.

## Entity: HomeSceneConfig

- **Purpose**: Top-level definition for the Home scroll experience.
- **Fields**:
  - `initialSkyColor`: string literal `#BFE9FF`
  - `stickyScrollHeightVh`: number
  - `footerScrollHeightVh`: number
  - `title`: `TitleRevealConfig`
  - `footer`: `HomeFooterConfig`
  - `clouds`: `CloudLayerConfig[]`
  - `motion`: `HomeMotionConfig`
- **Validation**:
  - `initialSkyColor` must remain `#BFE9FF`
  - `clouds.length` must be greater than `0`
  - progress ranges must stay within `0..1`
- **Relationships**:
  - owns one title block
  - owns one footer block
  - owns many cloud layers

## Entity: CloudLayerConfig

- **Purpose**: Defines one cloud asset as an independent renderable layer.
- **Fields**:
  - `id`: string
  - `assetKey`: `"1"` through `"6"` or equivalent stable asset identifier
  - `assetSrc`: string
  - `depth`: `"far" | "mid" | "near"`
  - `baseXPercent`: number
  - `baseYPercent`: number
  - `width`: number
  - `opacity`: number
  - `zIndex`: number
  - `scrollTravelX`: number
  - `ambientDriftX`: number
  - `ambientDurationSeconds`: number
  - `ambientDelaySeconds`: number
- **Validation**:
  - `width` must be positive
  - `opacity` must stay between `0` and `1`
  - `depth` and `zIndex` must produce a stable visual order
  - `assetSrc` must point to an existing file from `Components/Clouds`
- **Relationships**:
  - belongs to one `HomeSceneConfig`

## Entity: TitleRevealConfig

- **Purpose**: Defines copy and reveal behavior for the title/date composition.
- **Fields**:
  - `title`: string literal `We Are Leaving`
  - `date`: string literal `9th of May, 2026`
  - `fontFamily`: string
  - `textColor`: string literal `#000000`
  - `titleSizeMobile`: number
  - `titleSizeDesktop`: number
  - `titleRevealRange`: `[number, number]`
  - `dateRevealRange`: `[number, number]`
- **Validation**:
  - both reveal ranges must start after `0`
  - date reveal must not start before title reveal
  - font stack must keep MaisonNeue, Helvetica, sans-serif order
- **Relationships**:
  - belongs to one `HomeSceneConfig`

## Entity: HomeFooterConfig

- **Purpose**: Controls the visual landing state at the end of the Home journey.
- **Fields**:
  - `eyebrow`: string
  - `headline`: string
  - `body`: string
  - `hint`: string
  - `revealRange`: `[number, number]`
- **Validation**:
  - copy must remain lightweight and directional
  - `revealRange` must overlap the end of the scene only
- **Relationships**:
  - belongs to one `HomeSceneConfig`

## Entity: HomeMotionConfig

- **Purpose**: Shared scene motion tuning.
- **Fields**:
  - `cloudTravelRange`: `[number, number]`
  - `footerRange`: `[number, number]`
  - `titleTranslateY`: number
  - `dateTranslateY`: number
  - `reducedMotionTranslateY`: number
  - `enableAmbientDrift`: boolean
- **Validation**:
  - `cloudTravelRange` must end before or at the footer range end
  - reduced-motion values must be less than or equal to full-motion values

## Entity: OverlayNavigationEntry

- **Purpose**: Defines one of the only three allowed overlay destinations.
- **Fields**:
  - `id`: `"home" | "rsvp" | "messages"`
  - `label`: `"Home" | "Are You Coming?" | "Drop a Message"`
  - `route`: `"/" | "/are-you-coming" | "/drop-a-message"`
  - `order`: number
- **Validation**:
  - exactly three entries must exist
  - labels and routes must stay unique
  - ordering must be stable and sequential

## Entity: NavigationOverlayState

- **Purpose**: Runtime UI state for the shared overlay shell.
- **Fields**:
  - `isOpen`: boolean
  - `scrollPositionBeforeOpen`: number
  - `activeRoute`: string
- **State transitions**:
  - `closed -> open`: save current scroll position and lock body scroll
  - `open -> closed without route change`: restore prior scroll position
  - `open -> route selected`: close overlay, unlock body scroll, allow router
    navigation, reset saved position for the next open cycle

## Derived State

- `sceneProgress`: normalized `0..1` value for the full Home composition
- `titleProgress`: derived from `TitleRevealConfig.titleRevealRange`
- `dateProgress`: derived from `TitleRevealConfig.dateRevealRange`
- `cloudProgress`: derived from `HomeMotionConfig.cloudTravelRange`
- `footerProgress`: derived from `HomeMotionConfig.footerRange`
- `isFooterReached`: boolean derived from `footerProgress >= 1`

## Render Order

1. Sky background layer
2. Cloud layers
3. Title/date reveal
4. Fixed navigation trigger
5. Full-screen overlay navigation when open
6. Footer landing state at the end of Home
