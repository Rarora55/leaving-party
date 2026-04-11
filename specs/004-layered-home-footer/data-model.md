# Data Model: Layered Home Footer Scene

**Feature**: 004-layered-home-footer  
**Date**: 2026-04-11  
**Purpose**: Define the reusable configuration and runtime structures for the layered
Home footer ending, including title/date exit timing, short-height tuning, and the
footer-local RSVP CTA.

## Entity: HomeFooterSceneConfig

- **Purpose**: Top-level definition for the new final Home footer scene.
- **Fields**:
  - `revealRange`: `[number, number]`
  - `titleFadeOutRange`: `[number, number]`
  - `minHeight`: string or breakpoint-aware height token
  - `bottomInset`: string or breakpoint-aware bottom spacing token
  - `compactHeightMax`: number
  - `compactHeightLayerScale`: number
  - `frameHeightMobile`: string
  - `frameHeightTablet`: string
  - `frameHeightDesktop`: string
  - `frameHeightCompact`: string
  - `cta`: `HomeFooterSceneCTA`
  - `layers`: `HomeFooterSceneLayer[]`
- **Validation**:
  - `revealRange` must stay within `0..1`
  - `revealRange` must resolve in the final sticky Home state only
  - `titleFadeOutRange` must end before the footer reaches its final settled state
  - `layers.length` must equal `3`
  - `compactHeightLayerScale` must keep all three layers visible together on short
    screens
- **Relationships**:
  - owns exactly three ordered `HomeFooterSceneLayer` entries
  - owns exactly one `HomeFooterSceneCTA`

## Entity: HomeFooterSceneCTA

- **Purpose**: Defines the footer-local action displayed inside the final footer scene.
- **Fields**:
  - `id`: `"rsvp"`
  - `label`: `"Are You Coming?"`
  - `route`: `"/are-you-coming"`
  - `ariaLabel`: string
  - `placement`: `"above-front-layer" | "front-safe-zone"`
  - `bottomOffsetMobile`: number
  - `bottomOffsetTablet`: number
  - `bottomOffsetDesktop`: number
  - `maxWidth`: string
- **Validation**:
  - `route` must resolve to the existing RSVP destination
  - CTA must remain visible in the final sticky viewport state
  - placement must not obscure the stepped layer read
  - compact-height mode must also compress CTA offsets so the action stays inside the
    reduced footer frame
- **Relationships**:
  - belongs to one `HomeFooterSceneConfig`

## Entity: HomeFooterSceneLayer

- **Purpose**: Defines one road-layer asset within the footer composition.
- **Fields**:
  - `id`: `"1Landscape-front" | "2Landscape-Road" | "3Landscape-mountains"`
  - `label`: string
  - `assetSrc`: string
  - `depth`: `"front" | "mid" | "far"`
  - `zIndex`: number
  - `bottomOffsetMobile`: number
  - `bottomOffsetTablet`: number
  - `bottomOffsetDesktop`: number
  - `heightMobile`: string
  - `heightTablet`: string
  - `heightDesktop`: string
  - `objectPosition`: string
- **Validation**:
  - `assetSrc` must map to an existing file in `Components/RoadLayers`
  - ids must remain in the exact accepted order
  - `zIndex` values must be unique
  - `depth` and `zIndex` must agree on front/mid/far order
  - bottom offsets must be stepped so deeper layers sit higher
  - height tokens must support full-width rendering without horizontal overflow
- **Relationships**:
  - belongs to one `HomeFooterSceneConfig`

## Entity: LayerDepthOrder

- **Purpose**: Encodes the required front-to-back relationship for the footer scene.
- **Fields**:
  - `frontLayerId`: `"1Landscape-front"`
  - `midLayerId`: `"2Landscape-Road"`
  - `farLayerId`: `"3Landscape-mountains"`
- **Validation**:
  - order must remain immutable unless the feature spec changes
  - front layer renders above middle; middle renders above far

## Entity: LayerOffsetRule

- **Purpose**: Encodes the stepped vertical relationship between the three layers.
- **Fields**:
  - `frontBaselineOffset`: number
  - `midBaselineOffset`: number
  - `farBaselineOffset`: number
  - `breakpoint`: `"mobile" | "tablet" | "desktop" | "compact-height"`
- **Validation**:
  - `midBaselineOffset > frontBaselineOffset`
  - `farBaselineOffset > midBaselineOffset`
  - differences must remain small enough that all layers stay visible together

## Entity: FooterSceneRenderState

- **Purpose**: Runtime values used to render the footer scene during the Home scroll
  ending.
- **Fields**:
  - `footerProgress`: number
  - `titleOpacity`: number
  - `dateOpacity`: number
  - `isReducedMotion`: boolean
  - `isCompactHeightMode`: boolean
  - `isFinalViewportSettled`: boolean
  - `visibleLayers`: `HomeFooterSceneLayer[]`
  - `ctaRoute`: `"/are-you-coming"`
- **Validation**:
  - `footerProgress` must remain within `0..1`
  - `titleOpacity` and `dateOpacity` must reach `0` before `isFinalViewportSettled`
    becomes `true`
  - `visibleLayers` must preserve configured order even if an asset fails
  - `ctaRoute` must remain available whenever the final footer state is visible

## Derived State

- `footerProgress`: normalized from the existing Home scene scroll driver
- `titleOpacity`: derived from `titleFadeOutRange`
- `dateOpacity`: derived from `titleFadeOutRange`
- `isFooterVisible`: `footerProgress > 0`
- `isFinalViewportSettled`: footer has reached its final sticky-state presentation
- `isCompactHeightMode`: viewport height is less than or equal to
  `compactHeightMax`
- `motionMode`: `"full" | "reduced"`
- `renderedLayerOrder`: mountains -> road -> front in DOM, with z-index confirming the
  visual stack
- `ctaOffsetScale`: equals `compactHeightLayerScale` during compact-height mode,
  otherwise `1`

## Asset Mapping

1. `1Landscape-front` -> `Components/RoadLayers/1landscape-front.png`
2. `2Landscape-Road` -> `Components/RoadLayers/2landscape-road.png`
3. `3Landscape-mountains` -> `Components/RoadLayers/3landscape-mountains.png`
4. Visual reference -> `Components/RoadLayers/Sample2.png`

## Render Constraints

1. All three layers render together in the same footer scene.
2. The scene is bottom-aligned within the final sticky Home viewport state.
3. No extra trailing scroll is required to reveal the full composition.
4. Each layer spans the available scene width.
5. Title and date fade out before the footer reaches its final visible state.
6. The footer-local CTA remains visible in the final state and routes to
   `/are-you-coming`.
7. No legacy footer card or legacy footer link cluster remains in the rendered Home
   ending.
8. Compact-height mode compresses both layer depth offsets and CTA offsets together.
