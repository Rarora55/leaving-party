import type { MessageStyleVariant } from '../types/site.types';

// ============================================================================
// Legacy Storage Keys and Configurations
// ============================================================================

export const RSVP_STORAGE_KEY = 'we-are-leaving:rsvps';
export const MESSAGE_STORAGE_KEY = 'we-are-leaving:messages';

export const MESSAGE_VARIANTS: readonly MessageStyleVariant[] = [
  'sun',
  'mint',
  'sky',
  'peach',
  'lilac',
] as const;

export const MESSAGE_CARD_STYLES: Record<
  MessageStyleVariant,
  { badge: string; cardClassName: string }
> = {
  sun: {
    badge: 'sun',
    cardClassName: 'bg-[#fff1bf]',
  },
  mint: {
    badge: 'mint',
    cardClassName: 'bg-[#dff7ef]',
  },
  sky: {
    badge: 'sky',
    cardClassName: 'bg-[#d8f0ff]',
  },
  peach: {
    badge: 'peach',
    cardClassName: 'bg-[#ffe2d5]',
  },
  lilac: {
    badge: 'lilac',
    cardClassName: 'bg-[#ede3ff]',
  },
};

// ============================================================================
// Contract-Compliant Storage Configuration
// ============================================================================

/**
 * localStorage key namespace to avoid collisions
 */
const STORAGE_PREFIX = 'farewell_' as const;

/**
 * All localStorage keys used by the application
 */
export const STORAGE_KEYS = {
  // Navigation overlay state
  NAVIGATION_OVERLAY_STATE: `${STORAGE_PREFIX}navigation_overlay_state`,
  NAVIGATION_SCROLL_POSITION: `${STORAGE_PREFIX}navigation_scroll_position`,

  // Home page state
  HOME_SCROLL_POSITION: `${STORAGE_PREFIX}home_scroll_position`,
  HOME_SCENE_STATE: `${STORAGE_PREFIX}home_scene_state`,

  // Form data (failed submissions for recovery)
  RSVP_FORM_DATA: `${STORAGE_PREFIX}rsvp_form_data`,
  MESSAGE_FORM_DATA: `${STORAGE_PREFIX}message_form_data`,

  // User preferences
  REDUCED_MOTION_PREFERENCE: `${STORAGE_PREFIX}reduced_motion_preference`,
  THEME_PREFERENCE: `${STORAGE_PREFIX}theme_preference`,

  // Feature flags (for A/B testing or feature rollout)
  FEATURE_FLAGS: `${STORAGE_PREFIX}feature_flags`,

  // Last visited route
  LAST_ROUTE: `${STORAGE_PREFIX}last_route`,
} as const;

/**
 * Storage retention policies (in milliseconds)
 */
export const STORAGE_RETENTION = {
  SESSION: 0, // Clear on session end (browser close)
  TEMPORARY_FORM: 1000 * 60 * 60 * 24, // 24 hours for form recovery
  PREFERENCES: 1000 * 60 * 60 * 24 * 365, // 1 year for preferences
  CACHE: 1000 * 60 * 60 * 24 * 7, // 7 days for cached data
} as const;

/**
 * Storage size limits (in bytes)
 */
export const STORAGE_LIMITS = {
  TOTAL: 5 * 1024 * 1024, // 5 MB total localStorage limit (browser dependent)
  PER_KEY: 1024 * 100, // 100 KB soft limit per key (for safety)
} as const;

/**
 * Helper interface for storing data with expiration
 */
export interface StorageItem<T> {
  value: T;
  expiresAt?: number; // Timestamp in milliseconds
  version?: number; // For data schema versioning
}

/**
 * Helper function to get storage size
 */
export const getStorageSize = (): number => {
  let size = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      size += localStorage[key].length + key.length;
    }
  }
  return size;
};

/**
 * Helper function to clear prefix-based storage
 * (clears all keys starting with STORAGE_PREFIX)
 */
export const clearPrefixedStorage = () => {
  const keysToRemove: string[] = [];
  for (const key in localStorage) {
    if (key.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

/**
 * Helper function to check if a stored item has expired
 */
export const isStorageItemExpired = <T>(item: StorageItem<T> | null): boolean => {
  if (!item || !item.expiresAt) {
    return false;
  }
  return Date.now() > item.expiresAt;
};
