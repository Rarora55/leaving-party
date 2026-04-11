/**
 * Supabase Client Initialization
 * Provides a configured Supabase client for API calls and real-time features
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { ENV } from '../../shared/config/env';

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
                    status: 'confirmed' | 'pending';
                };
                Insert: {
                    name: string;
                    confirmed_at?: string;
                    status?: 'confirmed' | 'pending';
                };
                Update: {
                    name?: string;
                    confirmed_at?: string;
                    status?: 'confirmed' | 'pending';
                };
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
            };
        };
        Views: {};
        Functions: {};
        Enums: {};
        CompositeTypes: {};
    };
}

const SUPABASE_IS_CONFIGURED = !!ENV.supabaseUrl && !!ENV.supabaseAnonKey;

/**
 * Initialize and export Supabase client
 * If environment variables are missing, we avoid creating the client so
 * the app can still render without Supabase features.
 */
export const supabase: SupabaseClient | null = SUPABASE_IS_CONFIGURED
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
