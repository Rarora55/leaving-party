import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { submitRSVP } from '../../src/services/supabase/guestList.api';

const fromMock = vi.fn();
const invokeMock = vi.fn();
const mockIsSupabaseConfigured = vi.fn().mockReturnValue(true);
const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

vi.mock('../../src/services/supabase/client', () => ({
  getSupabaseErrorMessage: (error: unknown) =>
    error instanceof Error ? error.message : 'Unknown error',
  getSupabaseErrorDiagnostics: (error: unknown) => {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      return {
        category: 'permission',
        message: 'permission denied',
        code: (error as { code: string }).code,
        details: null,
        hint: null,
        status: 401,
      };
    }

    return {
      category: 'unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      code: null,
      details: null,
      hint: null,
      status: null,
    };
  },
  getSupabaseConfigurationIssue: () =>
    'Supabase is not configured for the browser client. VITE_SUPABASE_URL is missing. VITE_SUPABASE_ANON_KEY is missing. Define the values in .env.local in the Vite project root for local development or as build-time environment variables in production. Vite only exposes import.meta.env.VITE_* variables to browser code.',
  getSupabaseUserFacingUnavailableMessage: (featureName?: string) =>
    `${featureName ?? 'RSVP registration'} is temporarily unavailable. Please try again later.`,
  isSupabaseConfigured: () => mockIsSupabaseConfigured(),
  supabase: {
    from: (...args: unknown[]) => fromMock(...args),
    functions: {
      invoke: (...args: unknown[]) => invokeMock(...args),
    },
  },
}));

describe('guestList.api submitRSVP', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsSupabaseConfigured.mockReturnValue(true);
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('returns a user-friendly fallback error when Supabase is not configured', async () => {
    mockIsSupabaseConfigured.mockReturnValue(false);

    const result = await submitRSVP({ name: 'Ava' });

    expect(result.success).toBe(false);
    expect(result.error).toBe('RSVP registration is temporarily unavailable. Please try again later.');
    expect(fromMock).not.toHaveBeenCalled();
    expect(invokeMock).not.toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Supabase configuration missing during RSVP submission:',
      expect.stringContaining('VITE_SUPABASE_URL'),
    );
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Supabase configuration missing during RSVP submission:',
      expect.stringContaining('.env.local'),
    );
  });

  it('creates the RSVP row and triggers notification delivery when Supabase is configured', async () => {
    const insertedRow = {
      id: 'rsvp-1',
      name: 'Ava',
      confirmed_at: '2026-04-13T10:00:00.000Z',
      created_at: '2026-04-13T10:00:00.000Z',
      status: 'confirmed' as const,
      notification_status: 'pending' as const,
      notification_recipient: 'ramwill1991@gmail.com',
      notification_attempts: 0,
      notification_last_attempt_at: null,
      notification_sent_at: null,
      notification_error: null,
    };

    fromMock.mockReturnValueOnce({
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: insertedRow, error: null }),
        }),
      }),
    });

    invokeMock.mockResolvedValue({
      data: {
        success: true,
        notificationStatus: 'sent',
        attemptedAt: '2026-04-13T10:00:10.000Z',
        attemptCount: 1,
      },
      error: null,
    });

    const result = await submitRSVP({ name: ' Ava ' });

    expect(result.success).toBe(true);
    expect(result.data?.name).toBe('Ava');
    expect(result.data?.status).toBe('confirmed');
    expect(result.notification.status).toBe('sent');
    expect(fromMock).toHaveBeenCalledWith('guest_rsvps');
    expect(invokeMock).toHaveBeenCalledWith(
      'send-rsvp-notification',
      expect.objectContaining({
        body: {
          rsvpId: 'rsvp-1',
          guestName: 'Ava',
        },
      }),
    );
  });

  it('returns a safe user message and logs diagnostics when insert is blocked', async () => {
    fromMock.mockReturnValueOnce({
      insert: () => ({
        select: () => ({
          single: () =>
            Promise.resolve({
              data: null,
              error: { message: 'new row violates row-level security policy', code: '42501' },
            }),
        }),
      }),
    });

    const result = await submitRSVP({ name: 'Ava' });

    expect(result.success).toBe(false);
    expect(result.error).toBe('We could not save your RSVP right now. Please try again in a moment.');
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'RSVP insert failed:',
      expect.objectContaining({
        diagnostics: expect.objectContaining({
          category: 'permission',
          code: '42501',
        }),
      }),
    );
  });

  it('keeps the RSVP confirmed when notification delivery needs retry', async () => {
    const insertedRow = {
      id: 'rsvp-1',
      name: 'Ava',
      confirmed_at: '2026-04-13T10:00:00.000Z',
      created_at: '2026-04-13T10:00:00.000Z',
      status: 'confirmed' as const,
      notification_status: 'pending' as const,
      notification_recipient: 'ramwill1991@gmail.com',
      notification_attempts: 0,
      notification_last_attempt_at: null,
      notification_sent_at: null,
      notification_error: null,
    };

    const updatedRow = {
      ...insertedRow,
      notification_status: 'retry_required' as const,
      notification_attempts: 1,
      notification_last_attempt_at: '2026-04-13T10:00:10.000Z',
      notification_error: 'Provider timeout',
    };

    fromMock
      .mockReturnValueOnce({
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: insertedRow, error: null }),
          }),
        }),
      })
      .mockReturnValueOnce({
        update: () => ({
          eq: () => ({
            select: () => ({
              single: () => Promise.resolve({ data: updatedRow, error: null }),
            }),
          }),
        }),
      });

    invokeMock.mockResolvedValue({
      data: null,
      error: new Error('Provider timeout'),
    });

    const result = await submitRSVP({ name: 'Ava' });

    expect(result.success).toBe(true);
    expect(result.data?.status).toBe('confirmed');
    expect(result.notification.status).toBe('retry_required');
    expect(result.notification.error).toBe('Provider timeout');
  });
});
