/**
 * Guest Messages Validation Utilities
 * Provides validation functions for message form input
 */

/**
 * Validation error messages
 */
export const MESSAGE_VALIDATION_MESSAGES = {
    nameRequired: 'Please enter your name.',
    nameInvalid: 'Please enter a valid name (1-100 characters, non-whitespace).',
    nameTooShort: 'Name must be at least 1 character long.',
    nameTooLong: 'Name must be no more than 100 characters.',
    messageRequired: 'Please enter a message.',
    messageInvalid: 'Please enter a valid message (1-500 characters, non-whitespace).',
    messageTooShort: 'Message must be at least 1 character long.',
    messageTooLong: 'Message must be no more than 500 characters.',
} as const;

/**
 * Validation rules for message submission
 */
export const MESSAGE_VALIDATION_RULES = {
    guestName: {
        minLength: 1,
        maxLength: 100,
        pattern: /\S/, // Must contain at least one non-whitespace character
    },
    message: {
        minLength: 1,
        maxLength: 500,
        pattern: /\S/, // Must contain at least one non-whitespace character
    },
} as const;

/**
 * Validate message guest name
 * @param name - The guest name to validate
 * @returns { valid: boolean; error?: string }
 */
export const validateMessageGuestName = (name: string): { valid: boolean; error?: string } => {
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length === 0) {
        return {
            valid: false,
            error: MESSAGE_VALIDATION_MESSAGES.nameRequired,
        };
    }

    const { minLength, maxLength } = MESSAGE_VALIDATION_RULES.guestName;
    if (trimmedName.length < minLength) {
        return {
            valid: false,
            error: MESSAGE_VALIDATION_MESSAGES.nameTooShort,
        };
    }

    if (trimmedName.length > maxLength) {
        return {
            valid: false,
            error: MESSAGE_VALIDATION_MESSAGES.nameTooLong,
        };
    }

    if (!MESSAGE_VALIDATION_RULES.guestName.pattern.test(trimmedName)) {
        return {
            valid: false,
            error: MESSAGE_VALIDATION_MESSAGES.nameInvalid,
        };
    }

    return { valid: true };
};

/**
 * Validate message text
 * @param message - The message to validate
 * @returns { valid: boolean; error?: string }
 */
export const validateMessageText = (message: string): { valid: boolean; error?: string } => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || trimmedMessage.length === 0) {
        return {
            valid: false,
            error: MESSAGE_VALIDATION_MESSAGES.messageRequired,
        };
    }

    const { minLength, maxLength } = MESSAGE_VALIDATION_RULES.message;
    if (trimmedMessage.length < minLength) {
        return {
            valid: false,
            error: MESSAGE_VALIDATION_MESSAGES.messageTooShort,
        };
    }

    if (trimmedMessage.length > maxLength) {
        return {
            valid: false,
            error: MESSAGE_VALIDATION_MESSAGES.messageTooLong,
        };
    }

    if (!MESSAGE_VALIDATION_RULES.message.pattern.test(trimmedMessage)) {
        return {
            valid: false,
            error: MESSAGE_VALIDATION_MESSAGES.messageInvalid,
        };
    }

    return { valid: true };
};

/**
 * Validate complete message submission
 * @param guestName - Guest name
 * @param message - Message text
 * @returns { valid: boolean; errors: { guestName?: string; message?: string } }
 */
export const validateMessageSubmission = (
    guestName: string,
    message: string,
): { valid: boolean; errors: { guestName?: string; message?: string } } => {
    const errors: { guestName?: string; message?: string } = {};

    const nameValidation = validateMessageGuestName(guestName);
    if (!nameValidation.valid) {
        errors.guestName = nameValidation.error;
    }

    const messageValidation = validateMessageText(message);
    if (!messageValidation.valid) {
        errors.message = messageValidation.error;
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Sanitize guest name input
 * @param name - Raw input name
 * @returns Sanitized name
 */
export const sanitizeMessageGuestName = (name: string): string => {
    return name.trim();
};

/**
 * Sanitize message text input
 * @param message - Raw input message
 * @returns Sanitized message
 */
export const sanitizeMessageText = (message: string): string => {
    return message.trim();
};
