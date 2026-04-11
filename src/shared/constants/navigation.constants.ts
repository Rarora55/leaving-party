import type { NavigationConfig, NavigationDestination, NavigationItem } from '../types/site.types';

export const HOME_ROUTE = '/' as const;
export const RSVP_ROUTE = '/are-you-coming' as const;
export const MESSAGES_ROUTE = '/drop-a-message' as const;

export const HOME_DESTINATION: NavigationDestination = {
  id: 'home',
  label: 'Home',
  route: HOME_ROUTE,
  order: 0,
};

export const RSVP_DESTINATION: NavigationDestination = {
  id: 'rsvp',
  label: 'Are You Coming?',
  route: RSVP_ROUTE,
  order: 1,
};

export const MESSAGES_DESTINATION: NavigationDestination = {
  id: 'messages',
  label: 'Drop a Message',
  route: MESSAGES_ROUTE,
  order: 2,
};

export const NAVIGATION_DESTINATIONS: readonly NavigationDestination[] = [
  HOME_DESTINATION,
  RSVP_DESTINATION,
  MESSAGES_DESTINATION,
];

export const NAVIGATION_CONFIG: NavigationConfig = {
  destinations: NAVIGATION_DESTINATIONS,
};

export const NAV_ITEMS: readonly NavigationItem[] = [
  {
    key: 'home',
    label: 'Home',
    description: 'Scroll through the farewell sky scene.',
    path: HOME_ROUTE,
  },
  {
    key: 'rsvp',
    label: 'Are You Coming?',
    description: 'Confirm attendance with a minimal RSVP form that stores your name on this device.',
    path: RSVP_ROUTE,
  },
  {
    key: 'messages',
    label: 'Drop a Message',
    description: 'Publish a short note and see it join the playful social-style message wall.',
    path: MESSAGES_ROUTE,
  },
] as const;

export const getDestinationById = (id: string): NavigationDestination | undefined => {
  return NAVIGATION_DESTINATIONS.find((dest) => dest.id === id);
};

export const getDestinationByRoute = (route: string): NavigationDestination | undefined => {
  return NAVIGATION_DESTINATIONS.find((dest) => dest.route === route);
};
