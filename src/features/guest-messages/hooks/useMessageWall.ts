/**
 * useMessageWall Hook
 * Manages message wall state, fetching, and real-time updates
 */

import { useEffect, useState } from 'react';
import { fetchGuestMessages, subscribeToMessages } from '../../../services/supabase/guestMessages.api';
import type { MessageWallState, GuestMessageSubmission } from '../../../shared/types/site.types';
import { dispatchCustomEvent, CUSTOM_EVENTS } from '../../../shared/constants/events.constants';

/**
 * Generate random rotation for message cards (±1-3 degrees)
 */
const getRandomRotation = (): number => {
    const minRotation = -3;
    const maxRotation = 3;
    return Math.random() * (maxRotation - minRotation) + minRotation;
};

const getRandomMessageCardColor = (): string => {
    const backgroundColors = [
        'bg-[#fef3c7]',
        'bg-[#ddefe7]',
        'bg-[#d7ebff]',
        'bg-[#ffe4ec]',
        'bg-[#f0e7ff]',
    ];
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
};

/**
 * Initial message wall state
 */
const initialState: MessageWallState = {
    cards: [],
    isLoading: false,
    error: null,
    isEmpty: true,
};

/**
 * useMessageWall Hook
 * Manages the message wall display including:
 * - Fetching approved messages from Supabase
 * - Real-time subscription to new messages
 * - Error handling and loading states
 * - Message card display properties (rotation, color)
 */
export const useMessageWall = () => {
    const [wallState, setWallState] = useState<MessageWallState>(initialState);

    // Fetch messages on mount
    useEffect(() => {
        const loadMessages = async () => {
            setWallState((prev) => ({
                ...prev,
                isLoading: true,
                error: null,
            }));

            try {
                const messages = await fetchGuestMessages();

                const cards = messages.map((message) => ({
                    ...message,
                    displayRotation: getRandomRotation(),
                    displayColor: getRandomMessageCardColor(),
                }));

                setWallState({
                    cards,
                    isLoading: false,
                    error: null,
                    isEmpty: cards.length === 0,
                });

                dispatchCustomEvent(CUSTOM_EVENTS.MESSAGES_LOADED, {
                    timestamp: Date.now(),
                });
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : 'Failed to load messages';

                setWallState({
                    cards: [],
                    isLoading: false,
                    error: errorMsg,
                    isEmpty: true,
                });

                dispatchCustomEvent(CUSTOM_EVENTS.MESSAGES_ERROR, {
                    timestamp: Date.now(),
                });
            }
        };

        loadMessages();
    }, []);

    // Subscribe to real-time message updates
    useEffect(() => {
        const unsubscribe = subscribeToMessages((newMessage: GuestMessageSubmission) => {
            setWallState((prev) => {
                // Add new message to the beginning of the array
                const newCard = {
                    ...newMessage,
                    displayRotation: getRandomRotation(),
                    displayColor: getRandomMessageCardColor(),
                };

                return {
                    ...prev,
                    cards: [newCard, ...prev.cards],
                    isEmpty: false,
                };
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    /**
     * Reload messages manually
     */
    const reload = async () => {
        setWallState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const messages = await fetchGuestMessages();

            const cards = messages.map((message) => ({
                ...message,
                displayRotation: getRandomRotation(),
                displayColor: getRandomMessageCardColor(),
            }));

            setWallState({
                cards,
                isLoading: false,
                error: null,
                isEmpty: cards.length === 0,
            });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Failed to reload messages';

            setWallState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMsg,
            }));
        }
    };

    /**
     * Clear all messages (for testing)
     */
    const clear = () => {
        setWallState(initialState);
    };

    return {
        // State
        wallState,
        cards: wallState.cards,
        isLoading: wallState.isLoading,
        error: wallState.error,
        isEmpty: wallState.isEmpty,

        // Actions
        reload,
        clear,
    };
};
