import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GuestListPage } from '../../src/pages/GuestListPage/GuestListPage';

const useLatestConfirmationsMock = vi.fn();
const useRSVPFormMock = vi.fn();

vi.mock('../../src/features/guest-list/hooks/useLatestConfirmations', () => ({
  useLatestConfirmations: () => useLatestConfirmationsMock(),
}));

vi.mock('../../src/features/guest-list/hooks/useRSVPForm', () => ({
  useRSVPForm: () => useRSVPFormMock(),
}));

describe('GuestListPage latest confirmations', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <GuestListPage />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a calm empty state when there are no confirmations', () => {
    useLatestConfirmationsMock.mockReturnValue({
      items: [],
      isLoading: false,
      error: null,
      refresh: vi.fn(),
      prependConfirmation: vi.fn(),
    });
    useRSVPFormMock.mockReturnValue({
      name: '',
      setName: vi.fn(),
      error: null,
      isSubmitting: false,
      successMessage: null,
      notificationMessage: null,
      submit: vi.fn(),
    });

    renderPage();

    expect(screen.getByText('No confirmations yet. Be the first to say yes.')).toBeInTheDocument();
  });

  it('prepends the new confirmation and refreshes after a successful submission', async () => {
    const refreshMock = vi.fn();
    const prependConfirmationMock = vi.fn();
    const submitMock = vi.fn().mockResolvedValue({
      success: true,
      data: {
        id: 'rsvp-1',
        name: 'Ava',
        confirmedAt: '2026-04-13T10:00:00.000Z',
        createdAt: '2026-04-13T10:00:00.000Z',
      },
    });
    const setNameMock = vi.fn();

    useLatestConfirmationsMock.mockReturnValue({
      items: [{ id: 'rsvp-0', name: 'Noa', confirmedAt: '2026-04-13T09:00:00.000Z', createdAt: '2026-04-13T09:00:00.000Z' }],
      isLoading: false,
      error: null,
      refresh: refreshMock,
      prependConfirmation: prependConfirmationMock,
    });
    useRSVPFormMock.mockReturnValue({
      name: 'Ava',
      setName: setNameMock,
      error: null,
      isSubmitting: false,
      successMessage: null,
      notificationMessage: null,
      submit: submitMock,
    });

    renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'Yeah!!' }));

    expect(prependConfirmationMock).toHaveBeenCalledWith({
      id: 'rsvp-1',
      name: 'Ava',
      confirmedAt: '2026-04-13T10:00:00.000Z',
      createdAt: '2026-04-13T10:00:00.000Z',
    });
    expect(refreshMock).toHaveBeenCalled();
  });
});
