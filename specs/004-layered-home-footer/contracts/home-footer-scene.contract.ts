// Home footer scene contract for feature 004-layered-home-footer.
// Defines the reusable layered footer configuration, title/date exit timing,
// short-height behavior, and RSVP CTA guarantees.

export type HomeFooterLayerId =
  | '1Landscape-front'
  | '2Landscape-Road'
  | '3Landscape-mountains';

export type HomeFooterLayerDepth = 'front' | 'mid' | 'far';
export type HomeFooterMotionMode = 'full' | 'reduced';
export type HomeFooterSceneCtaId = 'rsvp';
export type HomeFooterSceneCtaPlacement =
  | 'above-front-layer'
  | 'front-safe-zone';

export interface HomeFooterSceneLayer {
  id: HomeFooterLayerId;
  label: string;
  assetSrc: string;
  depth: HomeFooterLayerDepth;
  zIndex: number;
  bottomOffsetMobile: number;
  bottomOffsetTablet: number;
  bottomOffsetDesktop: number;
  heightMobile: string;
  heightTablet: string;
  heightDesktop: string;
  objectPosition: string;
}

export interface HomeFooterSceneCTA {
  id: HomeFooterSceneCtaId;
  label: 'Are You Coming?';
  route: '/are-you-coming';
  ariaLabel: string;
  placement: HomeFooterSceneCtaPlacement;
  bottomOffsetMobile: number;
  bottomOffsetTablet: number;
  bottomOffsetDesktop: number;
  maxWidth: string;
}

export interface HomeFooterSceneConfig {
  revealRange: readonly [number, number];
  titleFadeOutRange: readonly [number, number];
  minHeight: string;
  bottomInset: string;
  compactHeightMax: number;
  compactHeightLayerScale: number;
  frameHeightMobile: string;
  frameHeightTablet: string;
  frameHeightDesktop: string;
  frameHeightCompact: string;
  cta: HomeFooterSceneCTA;
  layers: readonly [
    HomeFooterSceneLayer,
    HomeFooterSceneLayer,
    HomeFooterSceneLayer,
  ];
}

export interface HomeFooterSceneState {
  footerProgress: number;
  titleOpacity: number;
  dateOpacity: number;
  motionMode: HomeFooterMotionMode;
  isVisible: boolean;
  isCompactHeightMode: boolean;
  isFinalViewportSettled: boolean;
  renderedLayers: readonly HomeFooterSceneLayer[];
  ctaRoute: '/are-you-coming';
}

export const HomeFooterSceneValidation = {
  requiredLayerCount: 3,
  assetSource: 'Components/RoadLayers',
  referenceAssetPath: 'Components/RoadLayers/Sample2.png',
  domRenderOrder: [
    '3Landscape-mountains',
    '2Landscape-Road',
    '1Landscape-front',
  ] as const,
  requiredOrder: [
    '1Landscape-front',
    '2Landscape-Road',
    '3Landscape-mountains',
  ] as const,
  requiredDepths: {
    '1Landscape-front': 'front',
    '2Landscape-Road': 'mid',
    '3Landscape-mountains': 'far',
  } as const,
  footerMustReplaceLegacyLayout: true,
  footerMustBeFullyVisibleInFinalStickyViewport: true,
  footerMustNotRequireTrailingScroll: true,
  footerMustStayBottomAligned: true,
  layersMustSpanFullWidth: true,
  brokenAssetFallbackKeepsSceneVisible: true,
  titleAndDateMustFadeBeforeFooterSettles: true,
  shortHeightsMustKeepAllLayersVisible: true,
  footerMustExposeLocalCta: true,
  footerCtaRoute: '/are-you-coming',
  compactHeightAlsoScalesCtaOffsets: true,
  verticalStepRule: {
    midHigherThanFront: true,
    farHigherThanMid: true,
  },
  progressRange: { min: 0, max: 1 },
} as const;
