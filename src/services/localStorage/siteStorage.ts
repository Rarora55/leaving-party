/**
 * Site Storage Service
 * Manages localStorage for localStorage-based persistent and ephemeral state
 */

import {
  MESSAGE_STORAGE_KEY,
  MESSAGE_VARIANTS,
  STORAGE_KEYS,
  STORAGE_RETENTION,
  isStorageItemExpired,
} from '../../shared/constants/storage.constants';
import type { StorageItem } from '../../shared/constants/storage.constants';
import type {
  GuestMessageEntry,
  MessageStyleVariant,
  NavigationOverlayState,
  HomeSceneState,
  RSVPFormState,
  GuestMessageFormState,
} from '../../shared/types/site.types';

function isBrowser() {
  return typeof window !== 'undefined';
}

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readCollection<T>(key: string): T[] {
  if (!isBrowser()) {
    return [];
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? (parsedValue as T[]) : [];
  } catch {
    return [];
  }
}

function writeCollection<T>(key: string, value: T[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readMessageList(): GuestMessageEntry[] {
  return readCollection<GuestMessageEntry>(MESSAGE_STORAGE_KEY);
}

export function writeMessageList(list: GuestMessageEntry[]) {
  writeCollection(MESSAGE_STORAGE_KEY, list);
}

export function addMessageEntry(name: string, message: string): GuestMessageEntry {
  const entry: GuestMessageEntry = {
    id: createId(),
    name,
    message,
    createdAt: new Date().toISOString(),
    styleVariant: MESSAGE_VARIANTS[Math.floor(Math.random() * MESSAGE_VARIANTS.length)],
  };

  const list = readMessageList();
  list.push(entry);
  writeMessageList(list);

  return entry;
}

// ============================================================================
// New Contract-Compliant Storage Functions
// ============================================================================

/**
 * Save navigation overlay state
 */
export const saveNavigationOverlayState = (state: NavigationOverlayState): void => {
  if (!isBrowser()) return;
  const item: StorageItem<NavigationOverlayState> = {
    value: state,
    version: 1,
  };
  localStorage.setItem(STORAGE_KEYS.NAVIGATION_OVERLAY_STATE, JSON.stringify(item));
};

/**
 * Load navigation overlay state
 */
export const loadNavigationOverlayState = (): NavigationOverlayState | null => {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.NAVIGATION_OVERLAY_STATE);
  if (!raw) return null;
  try {
    const item = JSON.parse(raw) as StorageItem<NavigationOverlayState>;
    if (isStorageItemExpired(item)) {
      localStorage.removeItem(STORAGE_KEYS.NAVIGATION_OVERLAY_STATE);
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
};

/**
 * Save scroll position for navigation recovery
 */
export const saveScrollPosition = (position: number): void => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.HOME_SCROLL_POSITION, JSON.stringify(position));
};

/**
 * Load scroll position for navigation recovery
 */
export const loadScrollPosition = (): number => {
  if (!isBrowser()) return 0;
  const raw = localStorage.getItem(STORAGE_KEYS.HOME_SCROLL_POSITION);
  try {
    return raw ? JSON.parse(raw) : 0;
  } catch {
    return 0;
  }
};

/**
 * Save home scene state
 */
export const saveHomeSceneState = (state: HomeSceneState): void => {
  if (!isBrowser()) return;
  const item: StorageItem<HomeSceneState> = {
    value: state,
    version: 1,
  };
  localStorage.setItem(STORAGE_KEYS.HOME_SCENE_STATE, JSON.stringify(item));
};

/**
 * Load home scene state
 */
export const loadHomeSceneState = (): HomeSceneState | null => {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.HOME_SCENE_STATE);
  if (!raw) return null;
  try {
    const item = JSON.parse(raw) as StorageItem<HomeSceneState>;
    return item.value;
  } catch {
    return null;
  }
};

/**
 * Save RSVP form data (for recovery on failed submission)
 */
export const saveRSVPFormData = (data: RSVPFormState): void => {
  if (!isBrowser()) return;
  const item: StorageItem<RSVPFormState> = {
    value: data,
    expiresAt: Date.now() + STORAGE_RETENTION.TEMPORARY_FORM,
    version: 1,
  };
  localStorage.setItem(STORAGE_KEYS.RSVP_FORM_DATA, JSON.stringify(item));
};

/**
 * Load RSVP form data
 */
export const loadRSVPFormData = (): RSVPFormState | null => {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.RSVP_FORM_DATA);
  if (!raw) return null;
  try {
    const item = JSON.parse(raw) as StorageItem<RSVPFormState>;
    if (isStorageItemExpired(item)) {
      localStorage.removeItem(STORAGE_KEYS.RSVP_FORM_DATA);
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
};

/**
 * Clear RSVP form data
 */
export const clearRSVPFormData = (): void => {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.RSVP_FORM_DATA);
};

/**
 * Save message form data (for recovery on failed submission)
 */
export const saveMessageFormData = (data: GuestMessageFormState): void => {
  if (!isBrowser()) return;
  const item: StorageItem<GuestMessageFormState> = {
    value: data,
    expiresAt: Date.now() + STORAGE_RETENTION.TEMPORARY_FORM,
    version: 1,
  };
  localStorage.setItem(STORAGE_KEYS.MESSAGE_FORM_DATA, JSON.stringify(item));
};

/**
 * Load message form data
 */
export const loadMessageFormData = (): GuestMessageFormState | null => {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.MESSAGE_FORM_DATA);
  if (!raw) return null;
  try {
    const item = JSON.parse(raw) as StorageItem<GuestMessageFormState>;
    if (isStorageItemExpired(item)) {
      localStorage.removeItem(STORAGE_KEYS.MESSAGE_FORM_DATA);
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
};

/**
 * Clear message form data
 */
export const clearMessageFormData = (): void => {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.MESSAGE_FORM_DATA);
};

/**
 * Save user's reduced motion preference
 */
export const saveReducedMotionPreference = (prefersReducedMotion: boolean): void => {
  if (!isBrowser()) return;
  const item: StorageItem<boolean> = {
    value: prefersReducedMotion,
    version: 1,
  };
  localStorage.setItem(STORAGE_KEYS.REDUCED_MOTION_PREFERENCE, JSON.stringify(item));
};

/**
 * Load reduced motion preference
 */
export const loadReducedMotionPreference = (): boolean => {
  if (!isBrowser()) return false;
  const raw = localStorage.getItem(STORAGE_KEYS.REDUCED_MOTION_PREFERENCE);
  try {
    return raw ? (JSON.parse(raw) as StorageItem<boolean>).value : false;
  } catch {
    return false;
  }
};

/**
 * Save last visited route
 */
export const saveLastRoute = (route: string): void => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.LAST_ROUTE, JSON.stringify(route));
};

/**
 * Load last visited route
 */
export const loadLastRoute = (): string | null => {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.LAST_ROUTE);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};


function selectMessageVariant(index: number): MessageStyleVariant {
  return MESSAGE_VARIANTS[index % MESSAGE_VARIANTS.length];
}

export function readGuestMessages() {
  return readCollection<GuestMessageEntry>(MESSAGE_STORAGE_KEY);
}

export function appendGuestMessage(name: string, message: string) {
  const currentEntries = readGuestMessages();
  const nextEntry: GuestMessageEntry = {
    id: createId(),
    name,
    message,
    createdAt: new Date().toISOString(),
    styleVariant: selectMessageVariant(currentEntries.length),
  };

  writeCollection(MESSAGE_STORAGE_KEY, [nextEntry, ...currentEntries]);
  return nextEntry;
}
