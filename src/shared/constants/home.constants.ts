import cloud1 from '../../../Components/Clouds/1.png';
import cloud2 from '../../../Components/Clouds/2.png';
import cloud3 from '../../../Components/Clouds/3.png';
import cloud4 from '../../../Components/Clouds/4.png';
import cloud5 from '../../../Components/Clouds/5.png';
import cloud6 from '../../../Components/Clouds/6.png';
import frontLayer from '../../../Components/RoadLayers/1landscape-front.png';
import roadLayer from '../../../Components/RoadLayers/2landscape-road.png';
import mountainLayer from '../../../Components/RoadLayers/3landscape-mountains.png';
import fnmCharacters from '../../../Components/Characters/FnM.png';
import vanCharacter from '../../../Components/Characters/Van.png';
import { RSVP_ROUTE } from './navigation.constants';
import type { HomeFooterLayerDepth, HomeSceneConfig } from '../types/site.types';

export const HOME_SURFACE_TOKENS = {
  skyColor: '#BFE9FF',
  pageGlow:
    'linear-gradient(180deg, rgba(191, 233, 255, 0.92) 0%, rgba(241, 248, 255, 0.82) 22%, rgba(255, 248, 224, 0.94) 70%, rgba(239, 230, 206, 1) 100%)',
  horizonGlow:
    'radial-gradient(circle at 50% 78%, rgba(255, 242, 196, 0.6), rgba(255, 242, 196, 0) 38%)',
  mistGlow:
    'radial-gradient(circle at top left, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0) 28%)',
  cardClassName: 'bg-[rgba(255,250,240,0.82)] backdrop-blur-md',
  outlineClassName: 'border border-white/45 shadow-[0_24px_60px_rgba(29,39,64,0.12)]',
} as const;

export const HOME_NAVIGATION_OVERLAY_TOKENS = {
  backgroundColor: HOME_SURFACE_TOKENS.skyColor,
  backgroundImage: [HOME_SURFACE_TOKENS.mistGlow, HOME_SURFACE_TOKENS.pageGlow].join(','),
  horizonGlow: HOME_SURFACE_TOKENS.horizonGlow,
  topHighlight:
    'radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 45%)',
} as const;

const HOME_FOOTER_LAYER_HEIGHTS: Record<
  HomeFooterLayerDepth,
  {
    mobile: string;
    tablet: string;
    desktop: string;
  }
> = {
  far: {
    mobile: 'clamp(10rem, 24vw, 12.5rem)',
    tablet: 'clamp(11.5rem, 20vw, 15rem)',
    desktop: 'clamp(14rem, 16vw, 18rem)',
  },
  front: {
    mobile: 'clamp(13rem, 38vw, 18rem)',
    tablet: 'clamp(15rem, 28vw, 21rem)',
    desktop: 'clamp(18rem, 22vw, 24rem)',
  },
  mid: {
    mobile: 'clamp(11.5rem, 31vw, 15rem)',
    tablet: 'clamp(13rem, 24vw, 18rem)',
    desktop: 'clamp(15.5rem, 19vw, 21rem)',
  },
};

const HOME_FOOTER_LAYER_OFFSETS: Record<
  HomeFooterLayerDepth,
  {
    mobile: number;
    tablet: number;
    desktop: number;
  }
> = {
  far: {
    mobile: 54,
    tablet: 78,
    desktop: 118,
  },
  front: {
    mobile: 0,
    tablet: 0,
    desktop: 0,
  },
  mid: {
    mobile: 28,
    tablet: 42,
    desktop: 68,
  },
};

const HOME_FOOTER_FRAME_WIDTHS = {
  compact: '100%',
  desktop: '100%',
  mobile: '172%',
  tablet: '128%',
} as const;

export const HOME_FOOTER_LAYER_DOM_RENDER_ORDER = [
  '3Landscape-mountains',
  '2Landscape-Road',
  '1Landscape-front',
] as const;

export const HOME_SCENE_CONFIG: HomeSceneConfig = {
  initialSkyColor: '#BFE9FF',
  stickyScrollHeightVh: 200,
  footerScrollHeightVh: 100,
  title: {
    title: 'We Are Leaving',
    date: '9th of May, 2026',
    subtitle: "Let's do the mile of beers together!",
    fontFamily: '"MaisonNeue", Helvetica, sans-serif',
    textColor: '#000000',
    subtitleColor: '#6b7280',
    titleSizeMobile: 48,
    titleSizeDesktop: 84,
    dateSizeMobile: 18,
    dateSizeDesktop: 24,
    subtitleSizeMobile: 14,
    subtitleSizeDesktop: 18,
    dateSpacingPx: 20,
    subtitleSpacingPx: 12,
    titleRevealRange: [0.06, 0.28],
    dateRevealRange: [0.12, 0.34],
  },
  footer: {
    revealRange: [0.62, 0.96],
    titleFadeOutRange: [0.96, 1.08],
    minHeight: 'min-h-[48svh] sm:min-h-[54svh] lg:min-h-[58svh]',
    bottomInset: 'pb-[max(env(safe-area-inset-bottom),0px)]',
    compactHeightMax: 640,
    compactHeightLayerScale: 0.84,
    frameWidthMobile: HOME_FOOTER_FRAME_WIDTHS.mobile,
    frameWidthTablet: HOME_FOOTER_FRAME_WIDTHS.tablet,
    frameWidthDesktop: HOME_FOOTER_FRAME_WIDTHS.desktop,
    frameWidthCompact: HOME_FOOTER_FRAME_WIDTHS.compact,
    cta: {
      id: 'rsvp',
      label: 'Are You Coming?',
      route: RSVP_ROUTE,
      ariaLabel: 'Open the RSVP page for the farewell party',
      placement: 'front-safe-zone',
      bottomOffsetMobile: 18,
      bottomOffsetTablet: 24,
      bottomOffsetDesktop: 28,
      maxWidth: 'min(100%, 18rem)',
    },
    characters: [
      {
        id: 'fnm',
        label: 'Farewell party characters',
        assetSrc: fnmCharacters,
        leftPercent: 12,
        bottomPercent: 1,
        widthPercent: 16.5,
        zIndex: 25,
      },
      {
        id: 'van',
        label: 'Camper van',
        assetSrc: vanCharacter,
        leftPercent: 32,
        bottomPercent: -15,
        widthPercent: 22.5,
        zIndex: 15,
      },
    ],
    layers: [
      {
        id: '1Landscape-front',
        label: 'Foreground greenery and road edge',
        assetSrc: frontLayer,
        depth: 'front',
        zIndex: 30,
        bottomOffsetMobile: HOME_FOOTER_LAYER_OFFSETS.front.mobile,
        bottomOffsetTablet: HOME_FOOTER_LAYER_OFFSETS.front.tablet,
        bottomOffsetDesktop: HOME_FOOTER_LAYER_OFFSETS.front.desktop,
        heightMobile: HOME_FOOTER_LAYER_HEIGHTS.front.mobile,
        heightTablet: HOME_FOOTER_LAYER_HEIGHTS.front.tablet,
        heightDesktop: HOME_FOOTER_LAYER_HEIGHTS.front.desktop,
        objectPosition: 'center bottom',
      },
      {
        id: '2Landscape-Road',
        label: 'Middle road horizon',
        assetSrc: roadLayer,
        depth: 'mid',
        zIndex: 20,
        bottomOffsetMobile: HOME_FOOTER_LAYER_OFFSETS.mid.mobile,
        bottomOffsetTablet: HOME_FOOTER_LAYER_OFFSETS.mid.tablet,
        bottomOffsetDesktop: HOME_FOOTER_LAYER_OFFSETS.mid.desktop,
        heightMobile: HOME_FOOTER_LAYER_HEIGHTS.mid.mobile,
        heightTablet: HOME_FOOTER_LAYER_HEIGHTS.mid.tablet,
        heightDesktop: HOME_FOOTER_LAYER_HEIGHTS.mid.desktop,
        objectPosition: 'center bottom',
      },
      {
        id: '3Landscape-mountains',
        label: 'Mountain backdrop',
        assetSrc: mountainLayer,
        depth: 'far',
        zIndex: 10,
        bottomOffsetMobile: HOME_FOOTER_LAYER_OFFSETS.far.mobile,
        bottomOffsetTablet: HOME_FOOTER_LAYER_OFFSETS.far.tablet,
        bottomOffsetDesktop: HOME_FOOTER_LAYER_OFFSETS.far.desktop,
        heightMobile: HOME_FOOTER_LAYER_HEIGHTS.far.mobile,
        heightTablet: HOME_FOOTER_LAYER_HEIGHTS.far.tablet,
        heightDesktop: HOME_FOOTER_LAYER_HEIGHTS.far.desktop,
        objectPosition: 'center bottom',
      },
    ],
  },
  clouds: [
    {
      id: 'cloud-1',
      assetKey: '1',
      assetSrc: cloud1,
      depth: 'far',
      baseXPercent: 8,
      baseYPercent: 17,
      width: 'clamp(150px, 20vw, 280px)',
      opacity: 0.58,
      zIndex: 4,
      scrollTravelX: 110,
      ambientDriftX: 18,
      ambientDurationSeconds: 28,
      ambientDelaySeconds: -4,
    },
    {
      id: 'cloud-2',
      assetKey: '2',
      assetSrc: cloud2,
      depth: 'mid',
      baseXPercent: 68,
      baseYPercent: 12,
      width: 'clamp(160px, 24vw, 330px)',
      opacity: 0.8,
      zIndex: 7,
      scrollTravelX: -150,
      ambientDriftX: 22,
      ambientDurationSeconds: 31,
      ambientDelaySeconds: -9,
    },
    {
      id: 'cloud-3',
      assetKey: '3',
      assetSrc: cloud3,
      depth: 'near',
      baseXPercent: 14,
      baseYPercent: 48,
      width: 'clamp(210px, 28vw, 420px)',
      opacity: 0.9,
      zIndex: 10,
      scrollTravelX: 190,
      ambientDriftX: 28,
      ambientDurationSeconds: 24,
      ambientDelaySeconds: -6,
    },
    {
      id: 'cloud-4',
      assetKey: '4',
      assetSrc: cloud4,
      depth: 'far',
      baseXPercent: 76,
      baseYPercent: 42,
      width: 'clamp(140px, 18vw, 260px)',
      opacity: 0.52,
      zIndex: 5,
      scrollTravelX: -95,
      ambientDriftX: 14,
      ambientDurationSeconds: 34,
      ambientDelaySeconds: -12,
    },
    {
      id: 'cloud-5',
      assetKey: '5',
      assetSrc: cloud5,
      depth: 'mid',
      baseXPercent: 54,
      baseYPercent: 64,
      width: 'clamp(120px, 16vw, 210px)',
      opacity: 0.76,
      zIndex: 8,
      scrollTravelX: 120,
      ambientDriftX: 16,
      ambientDurationSeconds: 26,
      ambientDelaySeconds: -2,
    },
    {
      id: 'cloud-6',
      assetKey: '6',
      assetSrc: cloud6,
      depth: 'near',
      baseXPercent: 2,
      baseYPercent: 70,
      width: 'clamp(180px, 22vw, 340px)',
      opacity: 0.84,
      zIndex: 9,
      scrollTravelX: 165,
      ambientDriftX: 20,
      ambientDurationSeconds: 23,
      ambientDelaySeconds: -7,
    },
  ],
  motion: {
    cloudTravelRange: [0, 0.82],
    titleTranslateY: 42,
    dateTranslateY: 26,
    footerEnterY: 34,
    footerReducedEnterY: 10,
    reducedMotionTranslateY: 8,
    enableAmbientDrift: true,
  },
};
