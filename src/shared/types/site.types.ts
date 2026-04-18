export type NavigationId = string;
export type NavigationRoute = '/' | `/${string}`;
export type MessageStyleVariant = 'lilac' | 'mint' | 'peach' | 'sky' | 'sun';
export type CloudDepth = 'far' | 'mid' | 'near';
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

export interface NavigationItem {
  key: NavigationId;
  label: string;
  description: string;
  path: NavigationRoute;
}

export interface NavigationDestination {
  id: NavigationId;
  label: string;
  route: NavigationRoute;
  order: number;
}

export interface NavigationConfig {
  destinations: readonly NavigationDestination[];
}

export interface NavigationOverlayState {
  isOpen: boolean;
  scrollPositionBeforeOpen: number;
  activeRoute?: string;
  focusedDestinationIndex?: number;
}

export type HalfMileBreweryId =
  | 'east-london-brewing-co'
  | 'exale'
  | 'signature-brew'
  | 'hackney-church-brew-co'
  | 'pretty-decent-beer-co'
  | '40ft-brewery';

export type HalfMileCardPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface HalfMileHotspotAnchor {
  xPercent: number;
  yPercent: number;
  radiusPxMobile: number;
  radiusPxDesktop: number;
}

export interface HalfMileBrewery {
  id: HalfMileBreweryId;
  name: string;
  websiteUrl: string;
  hotspot: HalfMileHotspotAnchor;
  cardPlacement: HalfMileCardPlacement;
}

export interface HalfMileCloudSeed {
  id: string;
  assetSrc: string;
  width: string;
  opacity: number;
  minXPercent: number;
  maxXPercent: number;
  minYPercent: number;
  maxYPercent: number;
  zIndex: number;
}

export interface HalfMileCloudPlacement {
  id: string;
  assetSrc: string;
  width: string;
  opacity: number;
  xPercent: number;
  yPercent: number;
  zIndex: number;
}

export interface HalfMileSceneCTA {
  id: 'home';
  label: 'Back Home';
  route: NavigationRoute;
  ariaLabel: string;
  bottomOffsetMobile: number;
  bottomOffsetDesktop: number;
  maxWidth: string;
}

export interface HalfMileSceneConfig {
  mapAssetSrc: string;
  mapAlt: string;
  mapTopMargin: string;
  mapBottomMargin: string;
  clouds: readonly HalfMileCloudSeed[];
  breweries: readonly HalfMileBrewery[];
  cta: HalfMileSceneCTA;
}

export interface HomeCloudLayer {
  id: string;
  assetKey: '1' | '2' | '3' | '4' | '5' | '6';
  assetSrc: string;
  depth: CloudDepth;
  baseXPercent: number;
  baseYPercent: number;
  width: string;
  opacity: number;
  zIndex: number;
  scrollTravelX: number;
  ambientDriftX: number;
  ambientDurationSeconds: number;
  ambientDelaySeconds: number;
}

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

export interface HomeFooterSceneCharacter {
  id: string;
  label: string;
  assetSrc: string;
  leftPercent: number;
  bottomPercent: number;
  widthPercent: number;
  zIndex: number;
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

export interface HomeTitleRevealConfig {
  title: 'We Are Leaving';
  date: '9th of May, 2026';
  subtitle: string;
  fontFamily: string;
  textColor: string;
  subtitleColor: string;
  titleSizeMobile: number;
  titleSizeDesktop: number;
  dateSizeMobile: number;
  dateSizeDesktop: number;
  subtitleSizeMobile: number;
  subtitleSizeDesktop: number;
  dateSpacingPx: number;
  subtitleSpacingPx: number;
  titleRevealRange: readonly [number, number];
  dateRevealRange: readonly [number, number];
}

export interface HomeFooterSceneConfig {
  revealRange: readonly [number, number];
  titleFadeOutRange: readonly [number, number];
  minHeight: string;
  bottomInset: string;
  compactHeightMax: number;
  compactHeightLayerScale: number;
  frameWidthMobile: string;
  frameWidthTablet: string;
  frameWidthDesktop: string;
  frameWidthCompact: string;
  cta: HomeFooterSceneCTA;
  characters: readonly HomeFooterSceneCharacter[];
  layers: readonly [
    HomeFooterSceneLayer,
    HomeFooterSceneLayer,
    HomeFooterSceneLayer,
  ];
}

export interface HomeMotionConfig {
  cloudTravelRange: readonly [number, number];
  titleTranslateY: number;
  dateTranslateY: number;
  footerEnterY: number;
  footerReducedEnterY: number;
  reducedMotionTranslateY: number;
  enableAmbientDrift: boolean;
}

export interface HomeSceneConfig {
  initialSkyColor: '#BFE9FF';
  stickyScrollHeightVh: number;
  footerScrollHeightVh: number;
  title: HomeTitleRevealConfig;
  footer: HomeFooterSceneConfig;
  clouds: readonly HomeCloudLayer[];
  motion: HomeMotionConfig;
}

export interface HomeSceneState {
  sceneProgress: number;
  titleProgress: number;
  dateProgress: number;
  cloudProgress: number;
  footerProgress: number;
  isFooterReached: boolean;
  isNavigationOpen: boolean;
}

export interface RsvpEntry {
  id: string;
  name: string;
  createdAt: string;
}

export type RSVPStatus = 'confirmed' | 'pending';
export type RSVPNotificationStatus = 'pending' | 'sent' | 'retry_required';

export interface GuestMessageEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  styleVariant: MessageStyleVariant;
}

export interface RSVPSubmission {
  id: string;
  name: string;
  confirmedAt: string;
  createdAt: string;
  status: RSVPStatus;
  notificationStatus: RSVPNotificationStatus;
  notificationRecipient: string;
  notificationAttempts: number;
  notificationLastAttemptAt: string | null;
  notificationSentAt: string | null;
  notificationError: string | null;
}

export interface LatestConfirmationItem {
  id: string;
  name: string;
  confirmedAt: string;
  createdAt: string;
}

export interface RSVPNotificationState {
  status: RSVPNotificationStatus;
  message?: string;
  attemptedAt?: string | null;
  attemptCount?: number;
  error?: string | null;
}

export interface RSVPFormInput {
  name: string;
}

export interface RSVPFormState {
  name: string;
  isValidating: boolean;
  error: string | null;
  isSubmitting: boolean;
  isSuccess: boolean;
  successMessage: string;
  notificationMessage: string | null;
}

export interface RSVPSubmissionRequest {
  name: string;
}

export interface RSVPSubmissionResponse {
  success: boolean;
  data?: RSVPSubmission;
  error?: string;
  notification: RSVPNotificationState;
}

export interface LatestConfirmationsState {
  items: LatestConfirmationItem[];
  isLoading: boolean;
  error: string | null;
}

export interface GuestMessageSubmission {
  id: string;
  guestName: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

export interface MessageCard {
  id: string;
  guestName: string;
  message: string;
  displayRotation: number;
  displayColor?: string;
  createdAt: string;
  displayOrder?: number;
}

export interface GuestMessageFormInput {
  guestName: string;
  message: string;
}

export interface GuestMessageFormState {
  guestName: string;
  message: string;
  isValidating: boolean;
  errors: {
    guestName?: string;
    message?: string;
  };
  isSubmitting: boolean;
  isSuccess: boolean;
  successMessage: string;
}

export interface GuestMessageSubmissionRequest {
  guestName: string;
  message: string;
}

export interface GuestMessageSubmissionResponse {
  success: boolean;
  data?: GuestMessageSubmission;
  error?: string;
}

export interface MessageWallState {
  cards: MessageCard[];
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}
