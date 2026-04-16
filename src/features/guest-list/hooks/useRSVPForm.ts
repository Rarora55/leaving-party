import { useEffect, useState } from 'react';
import { submitRSVP } from '../../../services/supabase/guestList.api';
import {
  clearRSVPFormData,
  loadRSVPFormData,
  saveRSVPFormData,
} from '../../../services/localStorage/siteStorage';
import {
  CUSTOM_EVENTS,
  RSVP_PAGE_CONTENT,
  dispatchCustomEvent,
} from '../../../shared/constants/events.constants';
import type { RSVPFormState, RSVPSubmissionResponse } from '../../../shared/types/site.types';
import { sanitizeRSVPName, validateRSVPName } from '../guestList.validation';

const SUCCESS_MESSAGE_DURATION = 3000;

const initialFormState: RSVPFormState = {
  name: '',
  isValidating: false,
  error: null,
  isSubmitting: false,
  isSuccess: false,
  successMessage: '',
  notificationMessage: null,
};

export const useRSVPForm = () => {
  const [formState, setFormState] = useState<RSVPFormState>(() => {
    const savedFormData = loadRSVPFormData();

    if (!savedFormData?.name) {
      return initialFormState;
    }

    return {
      ...initialFormState,
      name: savedFormData.name,
    };
  });
  const [successTimeout, setSuccessTimeout] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (successTimeout) {
        clearTimeout(successTimeout);
      }
    };
  }, [successTimeout]);

  const setName = (name: string) => {
    setFormState((current) => ({
      ...current,
      name,
      error: null,
      isSuccess: false,
      successMessage: '',
      notificationMessage: null,
    }));
  };

  const validate = () => {
    setFormState((current) => ({
      ...current,
      isValidating: true,
    }));

    const validation = validateRSVPName(formState.name);

    if (!validation.valid) {
      setFormState((current) => ({
        ...current,
        isValidating: false,
        error: validation.error || 'Validation failed.',
      }));

      dispatchCustomEvent(CUSTOM_EVENTS.FORM_VALIDATION_ERROR, {
        formType: 'rsvp',
        error: validation.error,
        timestamp: Date.now(),
      });

      return false;
    }

    setFormState((current) => ({
      ...current,
      isValidating: false,
      error: null,
    }));

    return true;
  };

  const submit = async (): Promise<RSVPSubmissionResponse> => {
    if (!validate()) {
      return {
        success: false,
        error: formState.error || 'Please enter your name to confirm attendance.',
        notification: {
          status: 'pending',
        },
      };
    }

    setFormState((current) => ({
      ...current,
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

      if (!response.success) {
        const errorMessage = response.error || 'Failed to submit RSVP. Please try again.';

        setFormState((current) => ({
          ...current,
          isSubmitting: false,
          isSuccess: false,
          error: errorMessage,
        }));

        saveRSVPFormData({
          ...formState,
          name: sanitizedName,
          error: errorMessage,
          isSubmitting: false,
          isSuccess: false,
          notificationMessage: null,
        });

        dispatchCustomEvent(CUSTOM_EVENTS.RSVP_ERROR, {
          timestamp: Date.now(),
        });

        return response;
      }

      if (successTimeout) {
        clearTimeout(successTimeout);
      }

      const timeout = window.setTimeout(() => {
        setFormState((current) => ({
          ...current,
          isSuccess: false,
          successMessage: '',
          notificationMessage: null,
        }));
      }, SUCCESS_MESSAGE_DURATION);

      setSuccessTimeout(timeout);
      clearRSVPFormData();

      setFormState((current) => ({
        ...current,
        name: '',
        isSubmitting: false,
        isSuccess: true,
        error: null,
        successMessage: RSVP_PAGE_CONTENT.successMessage,
        notificationMessage:
          response.notification.status === 'retry_required'
            ? response.notification.message || null
            : null,
      }));

      dispatchCustomEvent(CUSTOM_EVENTS.RSVP_SUCCESS, {
        timestamp: Date.now(),
      });

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';

      setFormState((current) => ({
        ...current,
        isSubmitting: false,
        isSuccess: false,
        error: errorMessage,
      }));

      saveRSVPFormData({
        ...formState,
        error: errorMessage,
        isSubmitting: false,
        isSuccess: false,
        notificationMessage: null,
      });

      dispatchCustomEvent(CUSTOM_EVENTS.FORM_SUBMISSION_ERROR, {
        formType: 'rsvp',
        error: errorMessage,
        timestamp: Date.now(),
      });

      return {
        success: false,
        error: errorMessage,
        notification: {
          status: 'pending',
        },
      };
    }
  };

  return {
    name: formState.name,
    error: formState.error,
    isSubmitting: formState.isSubmitting,
    isSuccess: formState.isSuccess,
    successMessage: formState.successMessage,
    notificationMessage: formState.notificationMessage,
    setName,
    submit,
    validate,
  };
};
