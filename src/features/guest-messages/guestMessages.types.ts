/**
 * Guest Messages Types
 * Type definitions for guest message submission and display
 */

import type {
    GuestMessageFormState,
    GuestMessageSubmission,
} from '../../shared/types/site.types';

export type { GuestMessageFormState, GuestMessageSubmission };

/**
 * Interface extending GuestMessageSubmission for internal use
 */
export interface GuestMessageWithDisplayProps extends GuestMessageSubmission {
    displayRotation?: number;
    displayColor?: string;
}
