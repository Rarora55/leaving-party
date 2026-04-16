export type RSVPNotificationStatus = 'pending' | 'sent' | 'retry_required';

export interface RSVPRecordContract {
  id: string;
  name: string;
  status: 'confirmed';
  confirmedAt: string;
  createdAt: string;
  notificationStatus: RSVPNotificationStatus;
  notificationRecipient: string;
  notificationAttempts: number;
  notificationLastAttemptAt: string | null;
  notificationSentAt: string | null;
  notificationError: string | null;
}

export interface LatestConfirmationItemContract {
  id: string;
  name: string;
  confirmedAt: string;
}

export interface SubmitRSVPCommandContract {
  name: string;
}

export interface SubmitRSVPResultContract {
  success: boolean;
  data?: RSVPRecordContract;
  error?: string;
  notification: {
    status: RSVPNotificationStatus;
    message?: string;
  };
}

export interface FetchLatestConfirmedRSVPsContract {
  limit?: 3;
}

export interface FetchLatestConfirmedRSVPsResultContract {
  data: LatestConfirmationItemContract[];
}

export interface SendRsvpNotificationCommandContract {
  rsvpId: string;
  guestName: string;
  recipient: string;
}

export interface SendRsvpNotificationResultContract {
  success: boolean;
  notificationStatus: Extract<RSVPNotificationStatus, 'sent' | 'retry_required'>;
  attemptedAt: string;
  attemptCount: number;
  error?: string;
}

/**
 * Contract rules
 *
 * - `SubmitRSVPResultContract.success` reflects RSVP persistence, not email success.
 * - `notification.status = 'retry_required'` is still a successful RSVP confirmation path.
 * - Latest confirmations are a derived projection: confirmed names only, newest first, maximum 3.
 * - Duplicate names are valid because records are identified by `id`, not by `name`.
 */
