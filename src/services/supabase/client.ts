import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
    ENV,
    getSupabaseConfigurationIssue as getSupabaseConfigurationIssueFromEnv,
    getSupabaseUserFacingUnavailableMessage,
    isEnvironmentConfigured,
} from '../../shared/config/env';
import { logWarnOnce } from '../../shared/utils/logOnce';
import type { RSVPNotificationStatus, RSVPStatus } from '../../shared/types/site.types';

/**
 * Type definition for Supabase database schema
 * This will be extended as we define database tables
 */
export interface Database {
    public: {
        Tables: {
            guest_rsvps: {
                Row: {
                    id: string;
                    name: string;
                    confirmed_at: string;
                    created_at: string;
                    status: RSVPStatus;
                    notification_status: RSVPNotificationStatus;
                    notification_recipient: string;
                    notification_attempts: number;
                    notification_last_attempt_at: string | null;
                    notification_sent_at: string | null;
                    notification_error: string | null;
                };
                Insert: {
                    id?: string;
                    name: string;
                    created_at?: string;
                    confirmed_at?: string;
                    status?: RSVPStatus;
                    notification_status?: RSVPNotificationStatus;
                    notification_recipient?: string;
                    notification_attempts?: number;
                    notification_last_attempt_at?: string | null;
                    notification_sent_at?: string | null;
                    notification_error?: string | null;
                };
                Update: {
                    id?: string;
                    name?: string;
                    created_at?: string;
                    confirmed_at?: string;
                    status?: RSVPStatus;
                    notification_status?: RSVPNotificationStatus;
                    notification_recipient?: string;
                    notification_attempts?: number;
                    notification_last_attempt_at?: string | null;
                    notification_sent_at?: string | null;
                    notification_error?: string | null;
                };
                Relationships: [];
            };
            guest_messages: {
                Row: {
                    id: string;
                    guest_name: string;
                    message: string;
                    approved: boolean;
                    created_at: string;
                };
                Insert: {
                    guest_name: string;
                    message: string;
                    approved?: boolean;
                };
                Update: {
                    guest_name?: string;
                    message?: string;
                    approved?: boolean;
                };
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: {
            send_rsvp_notification: {
                Args: {
                    rsvp_id: string;
                    guest_name?: string;
                };
                Returns: {
                    success: boolean;
                    notificationStatus: RSVPNotificationStatus;
                    attemptedAt: string;
                    attemptCount: number;
                    error?: string;
                };
            };
        };
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
}

const SUPABASE_IS_CONFIGURED = isEnvironmentConfigured();
const SUPABASE_CONFIGURATION_ISSUE = getSupabaseConfigurationIssueFromEnv();

if (!SUPABASE_IS_CONFIGURED) {
    logWarnOnce(
        'supabase-client-disabled',
        'Supabase client disabled due to invalid browser environment configuration:',
        SUPABASE_CONFIGURATION_ISSUE ?? 'Unknown Supabase configuration issue.',
    );
}

/**
 * Initialize and export Supabase client
 * If environment variables are missing, we avoid creating the client so
 * the app can still render without Supabase features.
 */
export const supabase: SupabaseClient<Database> | null = SUPABASE_IS_CONFIGURED
    ? createClient(
        ENV.supabaseUrl,
        ENV.supabaseAnonKey,
        {
            auth: {
                persistSession: false, // We don't use auth for this site
                autoRefreshToken: false,
            },
            db: {
                schema: 'public',
            },
        },
    )
    : null;

/**
 * Helper function to check if Supabase is properly configured
 */
export const isSupabaseConfigured = (): boolean => {
    return SUPABASE_IS_CONFIGURED;
};

export const getSupabaseConfigurationIssue = (): string | null => {
    return SUPABASE_CONFIGURATION_ISSUE;
};

export { getSupabaseUserFacingUnavailableMessage };

/**
 * Helper function to handle Supabase errors
 */
export const getSupabaseErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'object' && error !== null && 'message' in error) {
        return (error as Record<string, unknown>).message as string;
    }
    return 'An unexpected error occurred';
};

type SupabaseErrorLike = {
    message?: string;
    code?: string;
    details?: string;
    hint?: string;
    status?: number;
};

export type SupabaseErrorCategory =
    | 'permission'
    | 'schema'
    | 'network'
    | 'configuration'
    | 'unknown';

export interface SupabaseErrorDiagnostics {
    category: SupabaseErrorCategory;
    message: string;
    code: string | null;
    details: string | null;
    hint: string | null;
    status: number | null;
}

function toSupabaseErrorLike(error: unknown): SupabaseErrorLike {
    if (typeof error === 'object' && error !== null) {
        return error as SupabaseErrorLike;
    }

    if (error instanceof Error) {
        return { message: error.message };
    }

    return {};
}

function classifySupabaseError(errorLike: SupabaseErrorLike): SupabaseErrorCategory {
    const code = errorLike.code?.toUpperCase();
    const message = (errorLike.message || '').toLowerCase();
    const details = (errorLike.details || '').toLowerCase();
    const hint = (errorLike.hint || '').toLowerCase();
    const combined = `${message} ${details} ${hint}`;

    if (code === '42501' || combined.includes('row-level security') || combined.includes('permission denied')) {
        return 'permission';
    }

    if (code === '42P01' || combined.includes('does not exist') || combined.includes('relation')) {
        return 'schema';
    }

    if (code === 'PGRST301' || combined.includes('jwt') || combined.includes('apikey')) {
        return 'configuration';
    }

    if (
        combined.includes('failed to fetch') ||
        combined.includes('network') ||
        combined.includes('timeout') ||
        combined.includes('fetch')
    ) {
        return 'network';
    }

    return 'unknown';
}

export const getSupabaseErrorDiagnostics = (error: unknown): SupabaseErrorDiagnostics => {
    const errorLike = toSupabaseErrorLike(error);

    return {
        category: classifySupabaseError(errorLike),
        message: getSupabaseErrorMessage(error),
        code: errorLike.code ?? null,
        details: errorLike.details ?? null,
        hint: errorLike.hint ?? null,
        status: errorLike.status ?? null,
    };
};
