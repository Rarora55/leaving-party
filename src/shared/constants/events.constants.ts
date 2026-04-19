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
        'A quick yes is all it takes. Add your name and we will save your place in the send-off.',
} as const;

export const MESSAGE_PAGE_CONTENT = {
    wallTitle: 'The wall',
    wallLoading: 'Loading messages...',
    wallErrorFallback: 'The wall is taking a break. Please try again in a moment.',
    formTitle: 'We will buy a beer to the best comment',
    composerExpandedToggleLabel: 'Collapse card',
    composerCollapsedToggleLabel: 'Expand card',
    composerExpandedArrow: '↓',
    composerCollapsedArrow: '↑',
    nameLabel: 'Your name',
    messageLabel: 'Your message',
    namePlaceholder: 'Type your name',
    messagePlaceholder: 'We will miss you already...',
    submitLabel: 'Publish message',
    submittingLabel: 'Publishing...',
    successLabel: 'Your message is on the wall!',
} as const;

export const RSVP_PAGE_CONTENT = {
    eyebrow: '9th of May, 2026 - Blackhorse Road',
    title: 'Are You Coming?',
    intro: 'Unit 10, Uplands Business Park, Blackhorse Ln, London E17 5QJ',
    formTitle: 'Say your name!',
    formDescription: 'We really want to say goodbye to everyone, so we hope you can make it. Basically the plan is complete the mile of beers un blackhorse road, join us in any momento, we will be drunks anyway...',
    nameLabel: 'Who?',
    namePlaceholder: 'Type your name',
    submitLabel: 'Yeah!!',
    submittingLabel: 'Guapos...',
    latestTitle: 'The most guapos',
    latestDescription: 'Hello...',
    latestEmptyState: 'No confirmations yet. Be the first to say yes.',
    successMessage: "THANK YOU! We'll see you there.",
} as const;

export const RSVP_NOTIFICATION_CONFIG = {
    functionName: 'send-rsvp-notification',
    sourceLabel: 'We Are Leaving website RSVP',
    emailSubjectPrefix: 'New RSVP submission from website',
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
