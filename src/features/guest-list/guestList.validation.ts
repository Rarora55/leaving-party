/**
 * Guest List (RSVP) Validation Utilities
 * Provides validation functions for RSVP form input
 */

/**
 * Validation error messages
 */
export const RSVP_VALIDATION_MESSAGES = {
    nameRequired: 'Please enter your name to confirm attendance.',
    nameInvalid: 'Please enter a valid name (1-100 characters, non-whitespace).',
    nameTooShort: 'Name must be at least 1 character long.',
    nameTooLong: 'Name must be no more than 100 characters.',
    nameInvalidChars: 'Name contains invalid characters.',
} as const;

/**
 * Validation rules for RSVP submission
 */
export const RSVP_VALIDATION_RULES = {
    name: {
        minLength: 1,
        maxLength: 100,
        pattern: /\S/, // Must contain at least one non-whitespace character
    },
} as const;

/**
 * Validate RSVP name input
 * @param name - The name to validate
 * @returns { valid: boolean; error?: string }
 */
export const validateRSVPName = (name: string): { valid: boolean; error?: string } => {
    const trimmedName = name.trim();

    // Check if empty or only whitespace
    if (!trimmedName || trimmedName.length === 0) {
        return {
            valid: false,
            error: RSVP_VALIDATION_MESSAGES.nameRequired,
        };
    }

    // Check length constraints
    const { minLength, maxLength } = RSVP_VALIDATION_RULES.name;
    if (trimmedName.length < minLength) {
        return {
            valid: false,
            error: RSVP_VALIDATION_MESSAGES.nameTooShort,
        };
    }

    if (trimmedName.length > maxLength) {
        return {
            valid: false,
            error: RSVP_VALIDATION_MESSAGES.nameTooLong,
        };
    }

    // Check pattern (must contain non-whitespace)
    if (!RSVP_VALIDATION_RULES.name.pattern.test(trimmedName)) {
        return {
            valid: false,
            error: RSVP_VALIDATION_MESSAGES.nameInvalid,
        };
    }

    return { valid: true };
};

/**
 * Sanitize input name (trim and normalize)
 * @param name - Raw input name
 * @returns Sanitized name
 */
export const sanitizeRSVPName = (name: string): string => {
    return name.trim();
};
