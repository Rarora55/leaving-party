import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchLatestConfirmedRSVPs } from '../../src/services/supabase/guestList.api';

const fromMock = vi.fn();

vi.mock('../../src/services/supabase/client', () => ({
  getSupabaseErrorMessage: (error: unknown) =>
    error instanceof Error ? error.message : 'Unknown error',
  isSupabaseConfigured: () => true,
  supabase: {
    from: (...args: unknown[]) => fromMock(...args),
    functions: {
      invoke: vi.fn(),
    },
  },
}));

describe('guestList.api fetchLatestConfirmedRSVPs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('requests confirmed rows newest-first with a max of three and preserves duplicate names', async () => {
    const limitMock = vi.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          name: 'Ava',
          confirmed_at: '2026-04-13T10:02:00.000Z',
          created_at: '2026-04-13T10:02:00.000Z',
          status: 'confirmed',
          notification_status: 'sent',
          notification_recipient: 'ramwill1991@gmail.com',
          notification_attempts: 1,
          notification_last_attempt_at: '2026-04-13T10:02:00.000Z',
          notification_sent_at: '2026-04-13T10:02:00.000Z',
          notification_error: null,
        },
        {
          id: '2',
          name: 'Ava',
          confirmed_at: '2026-04-13T10:01:00.000Z',
          created_at: '2026-04-13T10:01:00.000Z',
          status: 'confirmed',
          notification_status: 'sent',
          notification_recipient: 'ramwill1991@gmail.com',
          notification_attempts: 1,
          notification_last_attempt_at: '2026-04-13T10:01:00.000Z',
          notification_sent_at: '2026-04-13T10:01:00.000Z',
          notification_error: null,
        },
      ],
      error: null,
    });
    const secondOrderMock = vi.fn(() => ({ limit: limitMock }));
    const firstOrderMock = vi.fn(() => ({ order: secondOrderMock }));
    const eqMock = vi.fn(() => ({ order: firstOrderMock }));

    fromMock.mockReturnValue({
      select: () => ({
        eq: eqMock,
      }),
    });

    const result = await fetchLatestConfirmedRSVPs(3);

    expect(eqMock).toHaveBeenCalledWith('status', 'confirmed');
    expect(firstOrderMock).toHaveBeenCalledWith('confirmed_at', { ascending: false });
    expect(secondOrderMock).toHaveBeenCalledWith('created_at', { ascending: false });
    expect(limitMock).toHaveBeenCalledWith(3);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Ava');
    expect(result[1].name).toBe('Ava');
  });
});
