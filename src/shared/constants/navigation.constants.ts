import type { NavigationConfig, NavigationDestination, NavigationItem } from '../types/site.types';

export const HOME_ROUTE = '/' as const;
export const THE_HALF_MILE_ROUTE = '/the-half-mile' as const;
export const RSVP_ROUTE = '/are-you-coming' as const;
export const MESSAGES_ROUTE = '/drop-a-message' as const;
export const MESSAGE_LIST_ROUTE = '/messages' as const;

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
  order: 4,
};

export const THE_HALF_MILE_DESTINATION: NavigationDestination = {
  id: 'half-mile',
  label: 'The Half Mile',
  route: THE_HALF_MILE_ROUTE,
  order: 1,
};

export const DROP_MESSAGE_DESTINATION: NavigationDestination = {
  id: 'drop-message',
  label: 'Drop a Message',
  route: MESSAGES_ROUTE,
  order: 1,
};

export const MESSAGE_LIST_DESTINATION: NavigationDestination = {
  id: 'message-list',
  label: 'MessageList',
  route: MESSAGE_LIST_ROUTE,
  order: 2,
};

export const MENU_RSVP_DESTINATION: NavigationDestination = {
  id: 'menu-rsvp',
  label: 'Are you coming?',
  route: RSVP_ROUTE,
  order: 2,
};

export const MENU_DROP_MESSAGE_DESTINATION: NavigationDestination = {
  id: 'menu-drop-message',
  label: 'Drop a Message',
  route: MESSAGE_LIST_ROUTE,
  order: 3,
};

export const MESSAGES_DESTINATION = DROP_MESSAGE_DESTINATION;

export const NAVIGATION_DESTINATIONS: readonly NavigationDestination[] = [
  HOME_DESTINATION,
  THE_HALF_MILE_DESTINATION,
  MENU_RSVP_DESTINATION,
  MENU_DROP_MESSAGE_DESTINATION,
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
    key: 'half-mile',
    label: 'The Half Mile',
    description: 'Explore the Blackhorse map with brewery hotspots.',
    path: THE_HALF_MILE_ROUTE,
  },
  {
    key: 'drop-message',
    label: 'Drop a Message',
    description: 'Publish a short note and see it join the playful social-style message wall.',
    path: MESSAGES_ROUTE,
  },
  {
    key: 'message-list',
    label: 'MessageList',
    description: 'Open the message list view of the public farewell wall.',
    path: MESSAGE_LIST_ROUTE,
  },
] as const;

export const getDestinationById = (id: string): NavigationDestination | undefined => {
  return NAVIGATION_DESTINATIONS.find((dest) => dest.id === id);
};

export const getDestinationByRoute = (route: string): NavigationDestination | undefined => {
  return NAVIGATION_DESTINATIONS.find((dest) => dest.route === route);
};
