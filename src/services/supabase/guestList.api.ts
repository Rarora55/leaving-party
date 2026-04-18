import { RSVP_NOTIFICATION_CONFIG } from '../../shared/constants/events.constants';
import type {
  LatestConfirmationItem,
  RSVPNotificationState,
  RSVPSubmission,
  RSVPSubmissionRequest,
  RSVPSubmissionResponse,
} from '../../shared/types/site.types';
import {
  getSupabaseConfigurationIssue,
  getSupabaseErrorDiagnostics,
  getSupabaseErrorMessage,
  getSupabaseUserFacingUnavailableMessage,
  isSupabaseConfigured,
  supabase,
} from './client';
import { logErrorOnce, logWarnOnce } from '../../shared/utils/logOnce';
import type { Database } from './client';

type GuestRsvpRow = Database['public']['Tables']['guest_rsvps']['Row'];

const MAX_RSVP_NAME_LENGTH = 100;
const latestConfirmationsInFlightByLimit = new Map<number, Promise<LatestConfirmationItem[]>>();
const DEFAULT_NOTIFICATION_STATE: RSVPNotificationState = {
  status: 'pending',
};

function mapRSVPSubmission(row: GuestRsvpRow): RSVPSubmission {
  return {
    id: row.id,
    name: row.name,
    confirmedAt: row.confirmed_at,
    createdAt: row.created_at,
    status: row.status,
    notificationStatus: row.notification_status,
    notificationRecipient: row.notification_recipient,
    notificationAttempts: row.notification_attempts,
    notificationLastAttemptAt: row.notification_last_attempt_at,
    notificationSentAt: row.notification_sent_at,
    notificationError: row.notification_error,
  };
}

function mapLatestConfirmation(row: GuestRsvpRow): LatestConfirmationItem {
  return {
    id: row.id,
    name: row.name,
    confirmedAt: row.confirmed_at,
    createdAt: row.created_at,
  };
}

function getRetryRequiredMessage(error?: string | null) {
  if (!error) {
    return 'Your RSVP is confirmed, but the host notification will need a retry.';
  }

  return `Your RSVP is confirmed, but host notification needs a retry: ${error}`;
}

function getSafeRsvpPersistenceErrorMessage() {
  return 'We could not save your RSVP right now. Please try again in a moment.';
}

function getSafeRsvpErrorMessageForCategory(
  category: ReturnType<typeof getSupabaseErrorDiagnostics>['category'],
) {
  if (category === 'permission' || category === 'schema' || category === 'configuration') {
    return getSafeRsvpPersistenceErrorMessage();
  }

  if (category === 'network') {
    return 'A network issue prevented saving your RSVP. Please try again.';
  }

  return getSafeRsvpPersistenceErrorMessage();
}

async function markNotificationRetryRequired(rsvpId: string, errorMessage: string) {
  if (!supabase) {
    return {
      status: 'retry_required' as const,
      message: getRetryRequiredMessage(errorMessage),
      attemptedAt: new Date().toISOString(),
      attemptCount: 1,
      error: errorMessage,
    };
  }

  const attemptedAt = new Date().toISOString();
  const { data, error } = await supabase
    .from('guest_rsvps')
    .update({
      notification_status: 'retry_required',
      notification_attempts: 1,
      notification_last_attempt_at: attemptedAt,
      notification_error: errorMessage,
    })
    .eq('id', rsvpId)
    .select()
    .single();

  if (error) {
    return {
      status: 'retry_required' as const,
      message: getRetryRequiredMessage(errorMessage),
      attemptedAt,
      attemptCount: 1,
      error: errorMessage,
    };
  }

  return {
    status: 'retry_required' as const,
    message: getRetryRequiredMessage(data.notification_error),
    attemptedAt: data.notification_last_attempt_at,
    attemptCount: data.notification_attempts,
    error: data.notification_error,
  };
}

async function invokeRSVPNotification(
  rsvpId: string,
  guestName: string,
): Promise<RSVPNotificationState> {
  if (!supabase) {
    return markNotificationRetryRequired(
      rsvpId,
      getSupabaseUserFacingUnavailableMessage('Host notification'),
    );
  }

  const { data, error } = await supabase.functions.invoke<{
    success: boolean;
    notificationStatus: 'sent' | 'retry_required';
    attemptedAt: string;
    attemptCount: number;
    error?: string;
  }>(RSVP_NOTIFICATION_CONFIG.functionName, {
    body: {
      rsvpId,
      guestName,
    },
  });

  if (error) {
    return markNotificationRetryRequired(rsvpId, getSupabaseErrorMessage(error));
  }

  if (!data?.success) {
    return markNotificationRetryRequired(
      rsvpId,
      data?.error || 'Notification delivery failed before completion.',
    );
  }

  return {
    status: data.notificationStatus,
    attemptedAt: data.attemptedAt,
    attemptCount: data.attemptCount,
    error: data.error ?? null,
  };
}

export async function submitRSVP(
  request: RSVPSubmissionRequest,
): Promise<RSVPSubmissionResponse> {
  try {
    if (!isSupabaseConfigured()) {
      logErrorOnce(
        'rsvp-submit-config-missing',
        'Supabase configuration missing during RSVP submission:',
        getSupabaseConfigurationIssue() ?? 'Unknown Supabase configuration issue.',
      );

      return {
        success: false,
        error: getSupabaseUserFacingUnavailableMessage('RSVP registration'),
        notification: DEFAULT_NOTIFICATION_STATE,
      };
    }

    const trimmedName = request.name.trim();
    if (!trimmedName || trimmedName.length > MAX_RSVP_NAME_LENGTH) {
      return {
        success: false,
        error: 'Please enter a valid name (1-100 characters).',
        notification: DEFAULT_NOTIFICATION_STATE,
      };
    }

    if (!supabase) {
      logErrorOnce('rsvp-submit-client-null', 'Supabase client could not initialize during RSVP submission:', {
        issue: getSupabaseConfigurationIssue() ?? 'Unknown Supabase configuration issue.',
      });

      return {
        success: false,
        error: getSupabaseUserFacingUnavailableMessage('RSVP registration'),
        notification: DEFAULT_NOTIFICATION_STATE,
      };
    }

    const { data, error } = await supabase
      .from('guest_rsvps')
      .insert({
        name: trimmedName,
        confirmed_at: new Date().toISOString(),
        status: 'confirmed',
        notification_status: 'pending',
        notification_attempts: 0,
        notification_error: null,
      })
      .select()
      .single();

    if (error) {
      const diagnostics = getSupabaseErrorDiagnostics(error);
      logErrorOnce('rsvp-insert-failed', 'RSVP insert failed:', {
        diagnostics,
        table: 'guest_rsvps',
        payloadShape: {
          name: 'string',
          confirmed_at: 'timestamptz',
          status: 'confirmed',
          notification_status: 'pending',
          notification_attempts: 0,
          notification_error: null,
        },
      });

      return {
        success: false,
        error: getSafeRsvpErrorMessageForCategory(diagnostics.category),
        notification: DEFAULT_NOTIFICATION_STATE,
      };
    }

    const notification = await invokeRSVPNotification(data.id, trimmedName);
    const submission = mapRSVPSubmission({
      ...data,
      notification_status: notification.status,
      notification_attempts: notification.attemptCount ?? data.notification_attempts,
      notification_last_attempt_at:
        notification.attemptedAt ?? data.notification_last_attempt_at,
      notification_error:
        notification.status === 'sent' ? null : notification.error ?? data.notification_error,
      notification_sent_at:
        notification.status === 'sent'
          ? notification.attemptedAt ?? data.notification_sent_at
          : data.notification_sent_at,
    });

    return {
      success: true,
      data: submission,
      notification,
    };
  } catch (error) {
    const diagnostics = getSupabaseErrorDiagnostics(error);
    logErrorOnce('rsvp-submit-unexpected', 'Unexpected RSVP submission failure:', diagnostics);
    return {
      success: false,
      error: getSafeRsvpErrorMessageForCategory(diagnostics.category),
      notification: DEFAULT_NOTIFICATION_STATE,
    };
  }
}

export async function fetchLatestConfirmedRSVPs(
  limit = 3,
): Promise<LatestConfirmationItem[]> {
  const pendingRequest = latestConfirmationsInFlightByLimit.get(limit);
  if (pendingRequest) {
    return pendingRequest;
  }

  const requestPromise = (async () => {
    try {
      if (!isSupabaseConfigured()) {
        logWarnOnce(
          'latest-rsvps-config-missing',
          'Supabase configuration missing when fetching latest RSVPs:',
          getSupabaseConfigurationIssue() ?? 'Unknown Supabase configuration issue.',
        );

        return [];
      }

      if (!supabase) {
        logWarnOnce('latest-rsvps-client-null', 'Supabase client could not initialize when fetching latest RSVPs:', {
          issue: getSupabaseConfigurationIssue() ?? 'Unknown Supabase configuration issue.',
        });

        return [];
      }

      const { data, error } = await supabase
        .from('guest_rsvps')
        .select('*')
        .eq('status', 'confirmed')
        .order('confirmed_at', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        logErrorOnce('latest-rsvps-query-failed', 'Error fetching latest RSVPs:', error);
        return [];
      }

      return (data || []).map(mapLatestConfirmation);
    } catch (error) {
      logErrorOnce('latest-rsvps-unexpected', 'Unexpected error fetching latest RSVPs:', error);
      return [];
    } finally {
      latestConfirmationsInFlightByLimit.delete(limit);
    }
  })();

  latestConfirmationsInFlightByLimit.set(limit, requestPromise);
  return requestPromise;
}
