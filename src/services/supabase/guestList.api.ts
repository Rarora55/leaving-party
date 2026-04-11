/**
 * RSVP (Guest List) API Service
 * Handles all RSVP submission and retrieval operations via Supabase
 */

import { supabase, isSupabaseConfigured, getSupabaseErrorMessage } from './client';
import type { RSVPSubmission, RSVPSubmissionRequest, RSVPSubmissionResponse } from '../../shared/types/site.types';

/**
 * Submit an RSVP to the database
 * @param request - RSVP submission request with guest name
 * @returns RSVPSubmissionResponse with success status and submitted data
 */
export const submitRSVP = async (request: RSVPSubmissionRequest): Promise<RSVPSubmissionResponse> => {
    try {
        // Check if Supabase is properly configured
        if (!isSupabaseConfigured()) {
            return {
                success: false,
                error: 'Supabase is not configured. Please set environment variables.',
            };
        }

        // Trim the name and validate
        const trimmedName = request.name.trim();
        if (!trimmedName || trimmedName.length < 1 || trimmedName.length > 100) {
            return {
                success: false,
                error: 'Please enter a valid name (1-100 characters).',
            };
        }

        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }

        // Insert RSVP record into the guest_rsvps table
        const { data, error } = await supabase
            .from('guest_rsvps')
            .insert({
                name: trimmedName,
                confirmed_at: new Date().toISOString(),
                status: 'confirmed',
            })
            .select()
            .single();

        if (error) {
            console.error('RSVP submission error:', error);
            return {
                success: false,
                error: getSupabaseErrorMessage(error),
            };
        }

        // Map the database response to our type
        const submission: RSVPSubmission = {
            id: data.id,
            name: data.name,
            confirmedAt: data.confirmed_at,
            createdAt: data.created_at,
            status: data.status,
        };

        return {
            success: true,
            data: submission,
        };
    } catch (error) {
        console.error('Unexpected error during RSVP submission:', error);
        return {
            success: false,
            error: 'An unexpected error occurred. Please try again.',
        };
    }
};

/**
 * Fetch all RSVPs from the database (read-only for display purposes)
 * @returns Array of RSVP submissions
 */
export const fetchRSVPs = async (): Promise<RSVPSubmission[]> => {
    try {
        if (!isSupabaseConfigured()) {
            console.warn('Supabase is not configured. Cannot fetch RSVPs.');
            return [];
        }

        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }

        const client = supabase as NonNullable<typeof supabase>;

        const { data, error } = await client
            .from('guest_rsvps')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching RSVPs:', error);
            return [];
        }

        return (data || []).map((row) => ({
            id: row.id,
            name: row.name,
            confirmedAt: row.confirmed_at,
            createdAt: row.created_at,
            status: row.status,
        }));
    } catch (error) {
        console.error('Unexpected error fetching RSVPs:', error);
        return [];
    }
};

/**
 * Get count of total RSVPs
 * @returns Number of confirmed RSVPs
 */
export const getRSVPCount = async (): Promise<number> => {
    try {
        if (!isSupabaseConfigured()) {
            return 0;
        }

        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }

        const client = supabase as NonNullable<typeof supabase>;

        const { count, error } = await client
            .from('guest_rsvps')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Error fetching RSVP count:', error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error('Unexpected error fetching RSVP count:', error);
        return 0;
    }
};
