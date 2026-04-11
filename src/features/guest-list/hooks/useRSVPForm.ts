/**
 * useRSVPForm Hook
 * Manages RSVP form state, validation, submission, and localStorage persistence
 */

import { useEffect, useState } from 'react';
import { submitRSVP } from '../../../services/supabase/guestList.api';
import {
    clearRSVPFormData,
    loadRSVPFormData,
    saveRSVPFormData,
} from '../../../services/localStorage/siteStorage';
import type { RSVPFormState } from '../../../shared/types/site.types';
import { dispatchCustomEvent, CUSTOM_EVENTS } from '../../../shared/constants/events.constants';
import { validateRSVPName, sanitizeRSVPName } from '../guestList.validation';

/**
 * Initial form state
 */
const initialFormState: RSVPFormState = {
    name: '',
    isValidating: false,
    error: null,
    isSubmitting: false,
    isSuccess: false,
    successMessage: '',
};

/**
 * Success message display duration (ms)
 */
const SUCCESS_MESSAGE_DURATION = 3000;

/**
 * useRSVPForm Hook
 * Manages complete RSVP form lifecycle including:
 * - Form state management
 * - Client-side validation
 * - Supabase API submission
 * - localStorage persistence for recovery
 * - Success/error message display
 */
export const useRSVPForm = () => {
    const [formState, setFormState] = useState<RSVPFormState>(initialFormState);
    const [successTimeout, setSuccessTimeout] = useState<number | null>(null);

    // Load persisted form data on mount
    useEffect(() => {
        const savedFormData = loadRSVPFormData();
        if (savedFormData && savedFormData.name) {
            setFormState((prev) => ({
                ...prev,
                name: savedFormData.name,
            }));
        }
    }, []);

    /**
     * Update form name field
     */
    const setName = (name: string) => {
        setFormState((prev) => ({
            ...prev,
            name,
            error: null, // Clear error when user types
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

        const validation = validateRSVPName(formState.name);

        if (!validation.valid) {
            setFormState((prev) => ({
                ...prev,
                error: validation.error || 'Validation failed',
                isValidating: false,
            }));

            dispatchCustomEvent(CUSTOM_EVENTS.FORM_VALIDATION_ERROR, {
                formType: 'rsvp',
                error: validation.error,
                timestamp: Date.now(),
            });

            return false;
        }

        setFormState((prev) => ({
            ...prev,
            error: null,
            isValidating: false,
        }));

        return true;
    };

    /**
     * Submit RSVP form
     */
    const submit = async (): Promise<boolean> => {
        // Validate first
        if (!validate()) {
            return false;
        }

        setFormState((prev) => ({
            ...prev,
            isSubmitting: true,
            error: null,
        }));

        dispatchCustomEvent(CUSTOM_EVENTS.FORM_SUBMISSION_START, {
            formType: 'rsvp',
            timestamp: Date.now(),
        });

        try {
            const sanitizedName = sanitizeRSVPName(formState.name);
            const response = await submitRSVP({ name: sanitizedName });

            if (response.success) {
                const successMsg = `Your RSVP is confirmed! We'll see you soon.`;

                setFormState((prev) => ({
                    ...prev,
                    isSubmitting: false,
                    isSuccess: true,
                    successMessage: successMsg,
                    name: '', // Clear form on success
                    error: null,
                }));

                // Clear persisted form data
                clearRSVPFormData();

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

                dispatchCustomEvent(CUSTOM_EVENTS.RSVP_SUCCESS, {
                    timestamp: Date.now(),
                });

                return true;
            } else {
                // Submission failed
                const errorMsg = response.error || 'Failed to submit RSVP. Please try again.';

                setFormState((prev) => ({
                    ...prev,
                    isSubmitting: false,
                    error: errorMsg,
                    isSuccess: false,
                }));

                // Save form data for recovery
                saveRSVPFormData(formState);

                dispatchCustomEvent(CUSTOM_EVENTS.RSVP_ERROR, {
                    timestamp: Date.now(),
                });

                return false;
            }
        } catch (error) {
            const errorMsg = 'An unexpected error occurred. Please try again.';

            setFormState((prev) => ({
                ...prev,
                isSubmitting: false,
                error: errorMsg,
                isSuccess: false,
            }));

            // Save form data for recovery
            saveRSVPFormData(formState);

            dispatchCustomEvent(CUSTOM_EVENTS.FORM_SUBMISSION_ERROR, {
                formType: 'rsvp',
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
        clearRSVPFormData();
        if (successTimeout) {
            clearTimeout(successTimeout);
        }
    };

    /**
     * Clear error message
     */
    const clearError = (): void => {
        setFormState((prev) => ({
            ...prev,
            error: null,
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
        name: formState.name,
        error: formState.error,
        isSubmitting: formState.isSubmitting,
        isSuccess: formState.isSuccess,
        successMessage: formState.successMessage,

        // Actions
        setName,
        submit,
        reset,
        validate,
        clearError,
    };
};
