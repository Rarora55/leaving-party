// Home scene contract for feature 003-redefine-home-navigation.
// Defines the reusable scene configuration and derived scroll state expected by the implementation.

export type CloudDepth = 'far' | 'mid' | 'near';
export type HomeMotionMode = 'full' | 'reduced';

export interface HomeCloudLayer {
  id: string;
  assetKey: '1' | '2' | '3' | '4' | '5' | '6';
  assetSrc: string;
  depth: CloudDepth;
  baseXPercent: number;
  baseYPercent: number;
  width: number;
  opacity: number;
  zIndex: number;
  scrollTravelX: number;
  ambientDriftX: number;
  ambientDurationSeconds: number;
  ambientDelaySeconds: number;
}

export interface HomeTitleRevealConfig {
  title: 'We Are Leaving';
  date: '9th of May, 2026';
  fontFamily: 'MaisonNeue, Helvetica, sans-serif';
  textColor: '#000000';
  titleSizeMobile: number;
  titleSizeDesktop: number;
  titleRevealRange: readonly [number, number];
  dateRevealRange: readonly [number, number];
}

export interface HomeFooterConfig {
  eyebrow: string;
  headline: string;
  body: string;
  hint: string;
  revealRange: readonly [number, number];
}

export interface HomeMotionConfig {
  cloudTravelRange: readonly [number, number];
  footerRange: readonly [number, number];
  titleTranslateY: number;
  dateTranslateY: number;
  reducedMotionTranslateY: number;
  enableAmbientDrift: boolean;
}

export interface HomeSceneConfig {
  initialSkyColor: '#BFE9FF';
  stickyScrollHeightVh: number;
  footerScrollHeightVh: number;
  title: HomeTitleRevealConfig;
  footer: HomeFooterConfig;
  clouds: HomeCloudLayer[];
  motion: HomeMotionConfig;
}

export interface HomeSceneState {
  sceneProgress: number;
  titleProgress: number;
  dateProgress: number;
  cloudProgress: number;
  footerProgress: number;
  isFooterReached: boolean;
  motionMode: HomeMotionMode;
}

export const HomeSceneValidation = {
  skyColor: '#BFE9FF',
  title: 'We Are Leaving',
  date: '9th of May, 2026',
  cloudCount: { min: 1, max: 6 },
  progressRange: { min: 0, max: 1 },
  titleRevealMustStartAfterLoad: true,
  footerMustEndScene: true,
  assetsSource: 'Components/Clouds',
} as const;
