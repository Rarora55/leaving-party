// Navigation overlay contract for feature 003-redefine-home-navigation.
// Defines the shared fixed trigger and full-screen overlay menu behavior.

export type OverlayRoute = '/' | '/are-you-coming' | '/drop-a-message';
export type OverlayEntryId = 'home' | 'rsvp' | 'messages';

export interface OverlayNavigationEntry {
  id: OverlayEntryId;
  label: 'Home' | 'Are You Coming?' | 'Drop a Message';
  route: OverlayRoute;
  order: number;
}

export interface OverlayNavigationConfig {
  triggerPosition: 'top-right';
  isFullscreen: true;
  entries: readonly OverlayNavigationEntry[];
}

export interface NavigationOverlayState {
  isOpen: boolean;
  activeRoute: string;
  scrollPositionBeforeOpen: number;
}

export const OverlayNavigationValidation = {
  allowedEntryCount: 3,
  allowedLabels: ['Home', 'Are You Coming?', 'Drop a Message'],
  allowedRoutes: ['/', '/are-you-coming', '/drop-a-message'],
  triggerPosition: 'top-right',
  fullscreen: true,
  preserveScrollOnClose: true,
} as const;
