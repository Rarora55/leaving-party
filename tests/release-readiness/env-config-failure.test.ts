import { describe, expect, it, vi } from 'vitest';
import {
  getSupabaseConfigurationIssue,
  getSupabaseUserFacingUnavailableMessage,
  isEnvironmentConfigured,
} from '../../src/shared/config/env';

const mockIsSupabaseConfigured = vi.fn(() => false);
const mockSupabaseFrom = vi.fn();
const mockSupabaseChannel = vi.fn();

vi.mock('../../src/services/supabase/client', () => ({
  getSupabaseConfigurationIssue: () =>
    'Supabase is not configured for the browser client. VITE_SUPABASE_URL is missing.',
  isSupabaseConfigured: () => mockIsSupabaseConfigured(),
  getSupabaseErrorMessage: (error: unknown) =>
    error instanceof Error ? error.message : 'Unknown error',
  supabase: {
    from: (...args: unknown[]) => mockSupabaseFrom(...args),
    channel: (...args: unknown[]) => mockSupabaseChannel(...args),
    removeChannel: vi.fn(),
  },
}));

const { fetchGuestMessages, submitGuestMessage } = await import(
  '../../src/services/supabase/guestMessages.api'
);

describe('environment configuration failure state coverage', () => {
  it('keeps env configuration state and issue message in sync', () => {
    const issue = getSupabaseConfigurationIssue();
    const configured = isEnvironmentConfigured();

    if (configured) {
      expect(issue).toBeNull();
    } else {
      expect(issue).toBeTypeOf('string');
      expect(issue).toContain('Supabase');
    }
  });

  it('returns a concise user-facing unavailable message', () => {
    expect(getSupabaseUserFacingUnavailableMessage('RSVP registration')).toBe(
      'RSVP registration is temporarily unavailable. Please try again later.',
    );
  });
});

describe('guest message service fallback behavior when configuration is missing', () => {
  it('returns a safe error for message submission without calling Supabase', async () => {
    mockIsSupabaseConfigured.mockReturnValue(false);
    const response = await submitGuestMessage({
      guestName: 'Ava',
      message: 'Congrats and good luck!',
    });

    expect(response.success).toBe(false);
    expect(response.error).toBe(
      'Sorry, message posting is temporarily unavailable. Please try again later.',
    );
    expect(mockSupabaseFrom).not.toHaveBeenCalled();
  });

  it('returns an empty message list when configuration is missing', async () => {
    mockIsSupabaseConfigured.mockReturnValue(false);
    const response = await fetchGuestMessages();

    expect(response).toEqual([]);
    expect(mockSupabaseFrom).not.toHaveBeenCalled();
  });
});
