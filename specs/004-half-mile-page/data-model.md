# Data Model: 004-half-mile-page

## Scope

No backend schema changes are introduced. This feature adds UI/domain models for route metadata, map hotspot interactions, decorative cloud placement, and CTA behavior.

## Entities

## 1) HalfMileNavigationDestination (shared config entity)

- Source: `src/shared/constants/navigation.constants.ts`
- Fields:
  - `id: string`
  - `label: string`
  - `route: string`
  - `order: number`
- Constraints:
  - Includes one destination labeled `The Half Mile`.
  - Appears in shared navigation list used by persistent menu rendering.
  - Route remains unique among navigation destinations.

## 2) HalfMileSceneConfig (page config entity)

- Source: `src/shared/constants/halfMile.constants.ts` (new)
- Fields:
  - `backgroundTokens` (references Home sky style tokens)
  - `mapAssetSrc: string`
  - `mapAltText: string`
  - `mapTopMargin: string`
  - `mapBottomMargin: string`
  - `homeCta` (label, route, aria label, bottom offsets)
  - `clouds: HalfMileCloudPlacementSeed[]`
  - `breweries: HalfMileBrewery[]`
- Constraints:
  - Map asset is reused as-is (no artwork modifications).
  - Scene is fully data-driven from constants, not inline JSX literals.

## 3) HalfMileCloudPlacementSeed (decorative entity)

- Source: `halfMile.constants.ts`
- Fields:
  - `id: string`
  - `assetSrc: string`
  - `width: string`
  - `opacity: number`
  - `minXPercent: number`
  - `maxXPercent: number`
  - `minYPercent: number`
  - `maxYPercent: number`
  - `zIndex: number`
- Constraints:
  - Generated positions stay within allowed bounds.
  - Cloud layer is non-interactive (`pointer-events` disabled).
  - Placement does not obstruct hotspot or CTA interaction zones.

## 4) HalfMileBrewery (interactive content entity)

- Source: `halfMile.constants.ts`
- Fields:
  - `id: 'exale' | 'signature-brew' | 'hackney-church-brew-co' | 'pretty-decent-beer-co' | '40ft-brewery'`
  - `name: string`
  - `websiteUrl: string`
  - `hotspot: HalfMileHotspotAnchor`
- Constraints:
  - Exactly five breweries in current scope.
  - `websiteUrl` matches clarified spec links.
  - IDs are unique and stable for state targeting/testing.

## 5) HalfMileHotspotAnchor (layout entity)

- Source: `halfMile.constants.ts`
- Fields:
  - `xPercent: number`
  - `yPercent: number`
  - `radiusPxMobile: number`
  - `radiusPxDesktop: number`
- Constraints:
  - Anchors are normalized to map dimensions.
  - Hotspots remain invisible in default state but interactive for pointer and keyboard users.
  - Effective touch target remains usable on mobile.

## 6) ActiveBreweryCardState (interaction state entity)

- Source: `HalfMileHotspots` state
- Fields:
  - `activeBreweryId: string | null`
  - `openedVia: 'pointer' | 'keyboard' | null`
- Constraints:
  - At most one active brewery id at a time.
  - Opening a brewery always replaces prior active id.
  - Dismissal sets state to `null`.

## 7) BreweryCardPresentationState (derived UI entity)

- Source: `HalfMileBreweryCard` props + page state
- Fields:
  - `isOpen: boolean`
  - `anchorBreweryId: string`
  - `isEdgeAdjusted: boolean`
- Constraints:
  - Card remains readable within viewport bounds.
  - Card can be dismissed by close button, outside click/tap, hotspot switch, or `Esc`.
  - Website link opens in new tab.

## Relationships

- `HalfMileSceneConfig.breweries[]` defines both hotspot overlays and brewery-card content.
- `ActiveBreweryCardState.activeBreweryId` determines which `HalfMileBrewery` card is rendered.
- `HalfMileHotspotAnchor` is interpreted in the map overlay coordinate system.
- `HalfMileNavigationDestination` is consumed by existing persistent navigation rendering.

## State Transitions

## Card lifecycle

1. `activeBreweryId = null` (initial state).
2. Hotspot activation (`click`, `tap`, `Enter`, `Space`) sets `activeBreweryId = selectedId`.
3. Selecting another hotspot updates `activeBreweryId` to the new id (single-open enforcement).
4. Dismissal (`outside click`, close button, `Esc`) resets `activeBreweryId = null`.

## Keyboard interaction lifecycle

1. User tabs to hotspot (focus indicator visible).
2. `Enter` or `Space` opens associated brewery card.
3. `Esc` closes open card and preserves page context.

## Validation Rules

- Brewery ids, names, and links are all required.
- Hotspot coordinates must be within `0-100` for both x and y percent axes.
- Cloud randomization ranges must produce in-bounds placement values.
- CTA config must point to Home route.
