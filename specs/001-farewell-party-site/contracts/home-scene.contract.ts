// Home Scene Section Contract
// Defines the shape and rules for Home page scrolling scene sections

/**
 * HomeSceneSection
 * A defined stage of the scrolling Home page experience
 */
export interface HomeSceneSection {
    id: string; // "opening" | "characters" | "boxes" | "van" | "title" | "closing"
    title: string; // Internal name for reference
    navLabel?: string; // Optional display label if this section has UI control
    triggerOffset: number; // Scroll position (px from top) where animation begins
    duration: number; // Animation duration (ms)
    content?: string; // Optional narrative or descriptive text
    isTitleTrigger: boolean; // True if this is the title introduction moment
    isFinalComposition: boolean; // True if this is the closing pixel-art area
    assets: string[]; // List of image asset filenames to load
    order: number; // Sequence order (lower first, should match scroll order)
}

/**
 * HomeSceneConfig
 * Complete configuration for Home page scene sections
 */
export interface HomeSceneConfig {
    sections: HomeSceneSection[];
    totalScrollHeight?: number; // For layout planning (computed)
}

/**
 * HomeSceneState
 * Current state of Home page scroll animation
 */
export interface HomeSceneState {
    currentScrollPosition: number; // Current Y offset
    activeSectionId?: string; // Currently visible section
    completedSectionIds: string[]; // Sections that have animated
    isNavigationOpen: boolean; // Used to restore scroll position on close
}

// Validation Rules (enforced in implementation)
export const HomeSceneValidation = {
    section: {
        id: { pattern: /^[a-z0-9-]+$/, required: true },
        title: { minLength: 1, maxLength: 100, required: true },
        triggerOffset: { min: 0, required: true, type: "number" },
        duration: { min: 1, required: true, type: "number" },
        order: { min: 0, required: true, type: "number" },
        isTitleTrigger: { required: true, type: "boolean", maxOccurrences: 1 }, // Only one can be true
        isFinalComposition: { required: true, type: "boolean", maxOccurrences: 1 }, // Only one can be true
        assets: { required: true, type: "array" },
    },
} as const;

// Constraints
export const HomeSceneConstraints = {
    maxSections: 10,
    minTriggerGap: 100, // Minimum pixels between section triggers
    minDuration: 200, // Minimum animation duration
    maxDuration: 2000, // Maximum animation duration
} as const;

// API Contract Example
/**
 * GET /api/home/scene-sections
 * Returns all Home page scene sections in scroll order
 * @returns HomeSceneConfig
 */
export interface GetHomeSceneSectionsResponse {
    sections: HomeSceneSection[];
}
