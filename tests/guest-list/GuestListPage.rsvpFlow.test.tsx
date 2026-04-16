import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GuestListPage } from '../../src/pages/GuestListPage/GuestListPage';

const useRSVPFormMock = vi.fn();
const useLatestConfirmationsMock = vi.fn();
const refreshMock = vi.fn().mockResolvedValue(undefined);
const prependConfirmationMock = vi.fn();
const submitMock = vi.fn();

vi.mock('../../src/features/guest-list/hooks/useRSVPForm', () => ({
  useRSVPForm: () => useRSVPFormMock(),
}));

vi.mock('../../src/features/guest-list/hooks/useLatestConfirmations', () => ({
  useLatestConfirmations: () => useLatestConfirmationsMock(),
}));

describe('GuestListPage RSVP flow', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <GuestListPage />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
    useLatestConfirmationsMock.mockReturnValue({
      items: [],
      isLoading: false,
      error: null,
      refresh: refreshMock,
      prependConfirmation: prependConfirmationMock,
    });

    submitMock.mockResolvedValue({
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
      },
    });

    useRSVPFormMock.mockReturnValue({
      name: 'Ava',
      setName: vi.fn(),
      error: null,
      isSubmitting: false,
      isSuccess: false,
      successMessage: '',
      notificationMessage: null,
      submit: submitMock,
      validate: vi.fn(),
    });
  });

  it('persists RSVP success into latest confirmations UI state', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'Yeah!!' }));

    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(prependConfirmationMock).toHaveBeenCalledWith({
      id: 'rsvp-1',
      name: 'Ava',
      confirmedAt: '2026-04-13T10:00:00.000Z',
      createdAt: '2026-04-13T10:00:00.000Z',
    });
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
