/**
 * useGuestMessageForm Hook
 * Manages guest message form state, validation, submission, and localStorage persistence
 */

import { useEffect, useState } from 'react';
import { submitGuestMessage } from '../../../services/supabase/guestMessages.api';
import {
    clearMessageFormData,
    loadMessageFormData,
    saveMessageFormData,
} from '../../../services/localStorage/siteStorage';
import type { GuestMessageFormState } from '../../../shared/types/site.types';
import { dispatchCustomEvent, CUSTOM_EVENTS } from '../../../shared/constants/events.constants';
import {
    sanitizeMessageGuestName,
    sanitizeMessageText,
    validateMessageSubmission,
} from '../guestMessages.validation';

/**
 * Initial form state
 */
const initialFormState: GuestMessageFormState = {
    guestName: '',
    message: '',
    isValidating: false,
    errors: {},
    isSubmitting: false,
    isSuccess: false,
    successMessage: '',
};

/**
 * Success message display duration (ms)
 */
const SUCCESS_MESSAGE_DURATION = 3000;

/**
 * useGuestMessageForm Hook
 * Manages complete message form lifecycle including:
 * - Form state management
 * - Client-side validation
 * - Supabase API submission
 * - localStorage persistence for recovery
 * - Success/error message display
 */
export const useGuestMessageForm = () => {
    const [formState, setFormState] = useState<GuestMessageFormState>(initialFormState);
    const [successTimeout, setSuccessTimeout] = useState<number | null>(null);

    // Load persisted form data on mount
    useEffect(() => {
        const savedFormData = loadMessageFormData();
        if (savedFormData && (savedFormData.guestName || savedFormData.message)) {
            setFormState((prev) => ({
                ...prev,
                guestName: savedFormData.guestName,
                message: savedFormData.message,
            }));
        }
    }, []);

    /**
     * Update guest name field
     */
    const setGuestName = (name: string) => {
        setFormState((prev) => ({
            ...prev,
            guestName: name,
            errors: { ...prev.errors, guestName: undefined },
            isSuccess: false,
        }));
    };

    /**
     * Update message field
     */
    const setMessage = (message: string) => {
        setFormState((prev) => ({
            ...prev,
            message,
            errors: { ...prev.errors, message: undefined },
            isSuccess: false,
        }));
    };

    /**
     * Validate form input
     */
    const validate = (): boolean => {
        setFormState((prev) => ({
            ...prev,
            isValidating: true,
        }));

        const validation = validateMessageSubmission(formState.guestName, formState.message);

        if (!validation.valid) {
            setFormState((prev) => ({
                ...prev,
                errors: validation.errors,
                isValidating: false,
            }));

            dispatchCustomEvent(CUSTOM_EVENTS.FORM_VALIDATION_ERROR, {
                formType: 'message',
                error: Object.values(validation.errors).join(', '),
                timestamp: Date.now(),
            });

            return false;
        }

        setFormState((prev) => ({
            ...prev,
            errors: {},
            isValidating: false,
        }));

        return true;
    };

    /**
     * Submit message form
     */
    const submit = async (): Promise<boolean> => {
        // Validate first
        if (!validate()) {
            return false;
        }

        setFormState((prev) => ({
            ...prev,
            isSubmitting: true,
            errors: {},
        }));

        dispatchCustomEvent(CUSTOM_EVENTS.FORM_SUBMISSION_START, {
            formType: 'message',
            timestamp: Date.now(),
        });

        try {
            const sanitizedName = sanitizeMessageGuestName(formState.guestName);
            const sanitizedMessage = sanitizeMessageText(formState.message);

            const response = await submitGuestMessage({
                guestName: sanitizedName,
                message: sanitizedMessage,
            });

            if (response.success) {
                const successMsg = 'Your message is on the wall!';

                setFormState((prev) => ({
                    ...prev,
                    isSubmitting: false,
                    isSuccess: true,
                    successMessage: successMsg,
                    guestName: '', // Clear form on success
                    message: '',
                    errors: {},
                }));

                // Clear persisted form data
                clearMessageFormData();

                // Clear success message after timeout
                if (successTimeout) {
                    clearTimeout(successTimeout);
                }

                const timeout = setTimeout(() => {
                    setFormState((prev) => ({
                        ...prev,
                        isSuccess: false,
                        successMessage: '',
                    }));
                }, SUCCESS_MESSAGE_DURATION);

                setSuccessTimeout(timeout);

                dispatchCustomEvent(CUSTOM_EVENTS.MESSAGE_SUCCESS, {
                    timestamp: Date.now(),
                });

                return true;
            } else {
                // Submission failed
                const errorMsg = response.error || 'Failed to submit message. Please try again.';

                setFormState((prev) => ({
                    ...prev,
                    isSubmitting: false,
                    errors: { message: errorMsg },
                    isSuccess: false,
                }));

                // Save form data for recovery
                saveMessageFormData(formState);

                dispatchCustomEvent(CUSTOM_EVENTS.MESSAGE_ERROR, {
                    timestamp: Date.now(),
                });

                return false;
            }
        } catch (error) {
            const errorMsg = 'An unexpected error occurred. Please try again.';

            setFormState((prev) => ({
                ...prev,
                isSubmitting: false,
                errors: { message: errorMsg },
                isSuccess: false,
            }));

            // Save form data for recovery
            saveMessageFormData(formState);

            dispatchCustomEvent(CUSTOM_EVENTS.FORM_SUBMISSION_ERROR, {
                formType: 'message',
                error: errorMsg,
                timestamp: Date.now(),
            });

            return false;
        }
    };

    /**
     * Reset form to initial state
     */
    const reset = (): void => {
        setFormState(initialFormState);
        clearMessageFormData();
        if (successTimeout) {
            clearTimeout(successTimeout);
        }
    };

    /**
     * Clear all errors
     */
    const clearErrors = (): void => {
        setFormState((prev) => ({
            ...prev,
            errors: {},
        }));
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (successTimeout) {
                clearTimeout(successTimeout);
            }
        };
    }, [successTimeout]);

    return {
        // State
        formState,
        guestName: formState.guestName,
        message: formState.message,
        errors: formState.errors,
        isSubmitting: formState.isSubmitting,
        isSuccess: formState.isSuccess,
        successMessage: formState.successMessage,

        // Actions
        setGuestName,
        setMessage,
        submit,
        reset,
        validate,
        clearErrors,
    };
};
