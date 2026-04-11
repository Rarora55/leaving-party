// Navigation Contract
// Defines the shape and rules for navigation destinations and their API contracts

/**
 * NavigationDestination
 * A labeled destination available from the full-screen navigation overlay
 */
export interface NavigationDestination {
    id: string; // "home" | "rsvp" | "messages"
    label: string; // Display text: "Home", "Are You Coming?", "Drop a Message"
    route: string; // URL path: "/", "/are-you-coming", "/drop-a-message"
    description?: string; // Optional extended copy for menu
    order: number; // Display order (lower first)
    icon?: string; // Optional icon identifier
}

/**
 * NavigationConfig
 * Complete navigation structure for the application
 */
export interface NavigationConfig {
    destinations: NavigationDestination[];
}

/**
 * NavigationOverlayState
 * Current state of the navigation overlay UI
 */
export interface NavigationOverlayState {
    isOpen: boolean;
    scrollPositionBeforeOpen: number; // Saved scroll Y for recovery
    focusedDestinationIndex?: number; // Current keyboard nav index
}

// Validation Rules (enforced in implementation)
export const NavigationValidation = {
    destination: {
        id: { pattern: /^[a-z0-9-]+$/, required: true },
        label: { minLength: 1, maxLength: 50, required: true },
        route: { pattern: /^\//, required: true },
        order: { min: 0, required: true },
    },
} as const;

// API Contract Example
/**
 * GET /api/navigation/destinations
 * Returns all available navigation destinations
 * @returns NavigationConfig
 */
export interface GetNavigationDestinationsResponse {
    destinations: NavigationDestination[];
}
