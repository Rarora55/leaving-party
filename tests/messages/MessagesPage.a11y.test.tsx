import { render, screen } from '@testing-library/react';
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

describe('MessagesPage accessibility states', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <MessagesPage />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();

    useGuestMessageFormMock.mockReturnValue({
      guestName: 'Alex1',
      message: 'Good luck 🎈',
      errors: {},
      isSubmitting: false,
      successMessage: null,
      setGuestName: vi.fn(),
      setMessage: vi.fn(),
      submit: vi.fn().mockResolvedValue(true),
    });

    useMessageWallMock.mockReturnValue({
      cards: createMessageCards(1),
      isLoading: false,
      error: null,
      isEmpty: false,
      reload: vi.fn(),
    });

    useStickyComposerViewportMock.mockReturnValue({
      composerBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0px)',
      keyboardInset: 0,
    });
  });

  it('announces validation errors inline and links them to fields', () => {
    useGuestMessageFormMock.mockReturnValue({
      guestName: '😀😀',
      message: '',
      errors: {
        guestName: 'Include at least one letter or number in your name.',
        message: 'Please enter a message.',
      },
      isSubmitting: false,
      successMessage: null,
      setGuestName: vi.fn(),
      setMessage: vi.fn(),
      submit: vi.fn().mockResolvedValue(false),
    });

    renderPage();

    const nameInput = screen.getByLabelText('Your name');
    const messageInput = screen.getByLabelText('Your message');

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    expect(nameInput).toHaveAttribute('aria-describedby', 'message-name-error');
    expect(messageInput).toHaveAttribute('aria-invalid', 'true');
    expect(messageInput).toHaveAttribute('aria-describedby', 'message-text-error');
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });

  it('keeps composer scrollable when the keyboard is open', () => {
    useStickyComposerViewportMock.mockReturnValue({
      composerBottom: 'calc(env(safe-area-inset-bottom, 0px) + 260px)',
      keyboardInset: 260,
    });

    renderPage();

    const formHeading = screen.getByRole('heading', { name: 'Leave a note' });
    expect(formHeading.closest('div')).toHaveClass('max-h-[75svh]');
  });
});
