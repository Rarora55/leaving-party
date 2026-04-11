/**
 * Guest Messages API Service
 * Handles all guest message submission and retrieval operations via Supabase
 */

import { supabase, isSupabaseConfigured, getSupabaseErrorMessage } from './client';
import type {
    GuestMessageSubmission,
    GuestMessageSubmissionRequest,
    GuestMessageSubmissionResponse,
} from '../../shared/types/site.types';

/**
 * Submit a guest message to the database
 * @param request - Message submission request with guest name and message text
 * @returns GuestMessageSubmissionResponse with success status and submitted data
 */
export const submitGuestMessage = async (
    request: GuestMessageSubmissionRequest,
): Promise<GuestMessageSubmissionResponse> => {
    try {
        // Check if Supabase is properly configured
        if (!isSupabaseConfigured()) {
            return {
                success: false,
                error: 'Supabase is not configured. Please set environment variables.',
            };
        }

        // Trim and validate guest name
        const trimmedName = request.guestName.trim();
        if (!trimmedName || trimmedName.length < 1 || trimmedName.length > 100) {
            return {
                success: false,
                error: 'Please enter a valid name (1-100 characters).',
            };
        }

        // Trim and validate message
        const trimmedMessage = request.message.trim();
        if (!trimmedMessage || trimmedMessage.length < 1 || trimmedMessage.length > 500) {
            return {
                success: false,
                error: 'Please enter a valid message (1-500 characters).',
            };
        }

        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }

        const client = supabase as NonNullable<typeof supabase>;

        // Insert message record into the guest_messages table
        const { data, error } = await client
            .from('guest_messages')
            .insert({
                guest_name: trimmedName,
                message: trimmedMessage,
                approved: true, // Auto-approve for now (no moderation queue)
            })
            .select()
            .single();

        if (error) {
            console.error('Message submission error:', error);
            return {
                success: false,
                error: getSupabaseErrorMessage(error),
            };
        }

        // Map the database response to our type
        const submission: GuestMessageSubmission = {
            id: data.id,
            guestName: data.guest_name,
            message: data.message,
            approved: data.approved,
            createdAt: data.created_at,
        };

        return {
            success: true,
            data: submission,
        };
    } catch (error) {
        console.error('Unexpected error during message submission:', error);
        return {
            success: false,
            error: 'An unexpected error occurred. Please try again.',
        };
    }
};

/**
 * Fetch all approved guest messages from the database
 * @returns Array of approved guest messages
 */
export const fetchGuestMessages = async (): Promise<GuestMessageSubmission[]> => {
    try {
        if (!isSupabaseConfigured()) {
            console.warn('Supabase is not configured. Cannot fetch messages.');
            return [];
        }

        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }

        const client = supabase as NonNullable<typeof supabase>;

        const { data, error } = await client
            .from('guest_messages')
            .select('*')
            .eq('approved', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching messages:', error);
            return [];
        }

        return (data || []).map((row) => ({
            id: row.id,
            guestName: row.guest_name,
            message: row.message,
            approved: row.approved,
            createdAt: row.created_at,
        }));
    } catch (error) {
        console.error('Unexpected error fetching messages:', error);
        return [];
    }
};

/**
 * Get count of total approved messages
 * @returns Number of approved messages
 */
export const getMessageCount = async (): Promise<number> => {
    try {
        if (!isSupabaseConfigured()) {
            return 0;
        }

        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }

        const client = supabase as NonNullable<typeof supabase>;

        const { count, error } = await client
            .from('guest_messages')
            .select('*', { count: 'exact', head: true })
            .eq('approved', true);

        if (error) {
            console.error('Error fetching message count:', error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error('Unexpected error fetching message count:', error);
        return 0;
    }
};

/**
 * Subscribe to real-time updates for new approved messages
 * @param callback - Function to call when new messages arrive
 * @returns Function to unsubscribe from updates
 */
export const subscribeToMessages = (
    callback: (message: GuestMessageSubmission) => void,
): (() => void) => {
    if (!isSupabaseConfigured()) {
        return () => { };
    }

    if (!supabase) {
        console.error('Supabase client not initialized');
        return () => { };
    }

    const channel = supabase
        .channel('guest_messages')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'guest_messages',
                filter: 'approved=eq.true',
            },
            (payload) => {
                const message: GuestMessageSubmission = {
                    id: payload.new.id,
                    guestName: payload.new.guest_name,
                    message: payload.new.message,
                    approved: payload.new.approved,
                    createdAt: payload.new.created_at,
                };
                callback(message);
            },
        )
        .subscribe();

    // Return unsubscribe function
    return () => {
        supabase?.removeChannel(channel);
    };
};
