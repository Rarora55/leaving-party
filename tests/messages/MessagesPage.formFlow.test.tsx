import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MessagesPage } from '../../src/pages/MessagesPage/MessagesPages';
import { createMessageCards } from './fixtures/messagePage.fixtures';

const useGuestMessageFormMock = vi.fn();
const useMessageWallMock = vi.fn();
const useStickyComposerViewportMock = vi.fn();

vi.mock('../../src/features/guest-messages/hooks/useGuestMessageForm', () => ({
  useGuestMessageForm: () => useGuestMessageFormMock(),
}));

vi.mock('../../src/features/guest-messages/hooks/useMessageWall', () => ({
  useMessageWall: () => useMessageWallMock(),
}));

vi.mock('../../src/features/guest-messages/hooks/useStickyComposerViewport', () => ({
  useStickyComposerViewport: () => useStickyComposerViewportMock(),
}));

describe('MessagesPage form flow', () => {
  const submitMock = vi.fn<() => Promise<boolean>>();
  const reloadMock = vi.fn();

  const renderPage = () =>
    render(
      <MemoryRouter>
        <MessagesPage />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();

    submitMock.mockResolvedValue(true);
    reloadMock.mockResolvedValue(undefined);

    useGuestMessageFormMock.mockReturnValue({
      guestName: 'Alex1',
      message: 'Good luck 🎈',
      errors: {},
      isSubmitting: false,
      successMessage: null,
      setGuestName: vi.fn(),
      setMessage: vi.fn(),
      submit: submitMock,
    });

    useMessageWallMock.mockReturnValue({
      cards: createMessageCards(1),
      isLoading: false,
      error: null,
      isEmpty: false,
      reload: reloadMock,
    });

    useStickyComposerViewportMock.mockReturnValue({
      composerBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0px)',
      keyboardInset: 0,
    });
  });

  it('refreshes the wall after a successful submit', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Publish message' }));

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledTimes(1);
      expect(reloadMock).toHaveBeenCalledTimes(1);
    });
  });

  it('does not refresh the wall when submit fails', async () => {
    submitMock.mockResolvedValue(false);
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Publish message' }));

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledTimes(1);
    });
    expect(reloadMock).not.toHaveBeenCalled();
  });

  it('shows concise inline validation errors', () => {
    useGuestMessageFormMock.mockReturnValue({
      guestName: '😀😀',
      message: '   ',
      errors: {
        guestName: 'Include at least one letter or number in your name.',
        message: 'Please enter a message.',
      },
      isSubmitting: false,
      successMessage: null,
      setGuestName: vi.fn(),
      setMessage: vi.fn(),
      submit: submitMock,
    });

    renderPage();

    expect(screen.getByText('Include at least one letter or number in your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a message.')).toBeInTheDocument();
  });

  it('renders success feedback as a polite status message', () => {
    useGuestMessageFormMock.mockReturnValue({
      guestName: '',
      message: '',
      errors: {},
      isSubmitting: false,
      successMessage: 'Your message is on the wall!',
      setGuestName: vi.fn(),
      setMessage: vi.fn(),
      submit: submitMock,
    });

    renderPage();

    expect(screen.getByRole('status')).toHaveTextContent('Your message is on the wall!');
  });
});
