import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { RSVPSubmissionResponse } from '../../src/shared/types/site.types';
import { useRSVPForm } from '../../src/features/guest-list/hooks/useRSVPForm';
import { RSVP_PAGE_CONTENT } from '../../src/shared/constants/events.constants';

const submitRSVPMock = vi.fn<(...args: unknown[]) => Promise<RSVPSubmissionResponse>>();
const clearRSVPFormDataMock = vi.fn();
const loadRSVPFormDataMock = vi.fn();
const saveRSVPFormDataMock = vi.fn();

vi.mock('../../src/services/supabase/guestList.api', () => ({
  submitRSVP: (request: unknown) => submitRSVPMock(request),
}));

vi.mock('../../src/services/localStorage/siteStorage', () => ({
  clearRSVPFormData: () => clearRSVPFormDataMock(),
  loadRSVPFormData: () => loadRSVPFormDataMock(),
  saveRSVPFormData: (state: unknown) => saveRSVPFormDataMock(state),
}));

describe('useRSVPForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    loadRSVPFormDataMock.mockReturnValue(null);
  });

  it('clears the draft and shows success after a successful submission', async () => {
    submitRSVPMock.mockResolvedValue({
      success: true,
      data: {
        id: 'rsvp-1',
        name: 'Ava',
        confirmedAt: '2026-04-13T10:00:00.000Z',
        createdAt: '2026-04-13T10:00:00.000Z',
        status: 'confirmed',
        notificationStatus: 'sent',
        notificationRecipient: 'ramwill1991@gmail.com',
        notificationAttempts: 1,
        notificationLastAttemptAt: '2026-04-13T10:00:00.000Z',
        notificationSentAt: '2026-04-13T10:00:00.000Z',
        notificationError: null,
      },
      notification: {
        status: 'sent',
        attemptedAt: '2026-04-13T10:00:00.000Z',
        attemptCount: 1,
      },
    });

    const { result } = renderHook(() => useRSVPForm());

    act(() => {
      result.current.setName(' Ava ');
    });

    await act(async () => {
      await result.current.submit();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.successMessage).toBe(RSVP_PAGE_CONTENT.successMessage);
      expect(result.current.name).toBe('');
    });

    expect(clearRSVPFormDataMock).toHaveBeenCalled();
    expect(saveRSVPFormDataMock).not.toHaveBeenCalled();
  });

  it('persists the draft when submission fails', async () => {
    submitRSVPMock.mockResolvedValue({
      success: false,
      error: 'Database offline.',
      notification: {
        status: 'pending',
      },
    });

    const { result } = renderHook(() => useRSVPForm());

    act(() => {
      result.current.setName('Nina');
    });

    await act(async () => {
      await result.current.submit();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Database offline.');
    });

    expect(saveRSVPFormDataMock).toHaveBeenCalled();
    expect(clearRSVPFormDataMock).not.toHaveBeenCalled();
  });
});
