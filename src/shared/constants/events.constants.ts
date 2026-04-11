/**
 * Events Constants and Helper Functions
 * Defines custom events, event configuration, and event dispatch utilities
 */

// ============================================================================
// Event Information (Existing Configuration)
// ============================================================================

export const EVENT_INFO = {
    title: 'We Are Leaving',
    hosts: ['Amparo', 'Ruben'],
    dateLabel: '09 May 2026',
    location: 'Blackhorse Road',
} as const;

export const SITE_COPY = {
    homeIntro:
        'A farewell invitation told as a scrolling pixel-art journey, with room for one last ride.',
    rsvpIntro:
        'Keep it simple: add your name, save it locally, and mark yourself in for the send-off.',
    messageIntro:
        'Leave a short note for the wall. Each message lands instantly on this playful local-first board.',
} as const;

// ============================================================================
// Custom Events (Contract-Compliant)
// ============================================================================

/**
 * Custom event names for application communication
 */
export const CUSTOM_EVENTS = {
    // Navigation events
    NAVIGATION_OPEN: 'farewell:navigation-open',
    NAVIGATION_CLOSE: 'farewell:navigation-close',
    NAVIGATION_DESTINATION_CHANGED: 'farewell:navigation-destination-changed',

    // Scroll events
    SCROLL_POSITION_CHANGED: 'farewell:scroll-position-changed',
    SCROLL_ANIMATION_TRIGGERED: 'farewell:scroll-animation-triggered',
    SCROLL_SECTION_COMPLETED: 'farewell:scroll-section-completed',

    // Form events
    FORM_SUBMISSION_START: 'farewell:form-submission-start',
    FORM_SUBMISSION_SUCCESS: 'farewell:form-submission-success',
    FORM_SUBMISSION_ERROR: 'farewell:form-submission-error',
    FORM_VALIDATION_ERROR: 'farewell:form-validation-error',
    FORM_VALUE_CLEARED: 'farewell:form-value-cleared',

    // RSVP events
    RSVP_SUBMITTED: 'farewell:rsvp-submitted',
    RSVP_SUCCESS: 'farewell:rsvp-success',
    RSVP_ERROR: 'farewell:rsvp-error',

    // Message events
    MESSAGE_SUBMITTED: 'farewell:message-submitted',
    MESSAGE_SUCCESS: 'farewell:message-success',
    MESSAGE_ERROR: 'farewell:message-error',
    MESSAGES_LOADED: 'farewell:messages-loaded',
    MESSAGES_ERROR: 'farewell:messages-error',

    // Accessibility events
    REDUCED_MOTION_CHANGED: 'farewell:reduced-motion-changed',
    FOCUS_CHANGED: 'farewell:focus-changed',
} as const;

// ============================================================================
// Event Detail Types
// ============================================================================

export interface NavigationEventDetail {
    destination?: string;
    route?: string;
    timestamp: number;
}

export interface ScrollEventDetail {
    position: number;
    sectionId?: string;
    timestamp: number;
}

export interface FormEventDetail {
    formType: 'rsvp' | 'message';
    error?: string;
    timestamp: number;
}

export interface ReducedMotionEventDetail {
    prefersReducedMotion: boolean;
    timestamp: number;
}

// ============================================================================
// Event Dispatch and Listener Helper Functions
// ============================================================================

/**
 * Helper function to dispatch custom events
 */
export const dispatchCustomEvent = <T>(eventName: string, detail: T) => {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
};

/**
 * Helper function to listen for custom events
 */
export const onCustomEvent = <T>(
    eventName: string,
    callback: (detail: T) => void,
): (() => void) => {
    const handler = (event: Event) => {
        if (event instanceof CustomEvent) {
            callback(event.detail as T);
        }
    };
    window.addEventListener(eventName, handler);

    // Return cleanup function
    return () => {
        window.removeEventListener(eventName, handler);
    };
};
