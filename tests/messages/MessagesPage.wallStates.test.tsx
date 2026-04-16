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

describe('MessagesPage wall states', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <MessagesPage />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();

    useGuestMessageFormMock.mockReturnValue({
      guestName: '',
      message: '',
      errors: {},
      isSubmitting: false,
      successMessage: null,
      setGuestName: vi.fn(),
      setMessage: vi.fn(),
      submit: vi.fn().mockResolvedValue(true),
    });

    useStickyComposerViewportMock.mockReturnValue({
      composerBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0px)',
      keyboardInset: 0,
    });
  });

  it('shows the Empty wall state only when there are no messages', () => {
    useMessageWallMock.mockReturnValue({
      cards: [],
      isLoading: false,
      error: null,
      isEmpty: true,
      reload: vi.fn(),
    });

    renderPage();

    expect(screen.getByText('No notes yet. Leave the first one.')).toBeInTheDocument();
  });

  it('shows existing messages instead of the empty state when cards are available', () => {
    const cards = createMessageCards(2);
    useMessageWallMock.mockReturnValue({
      cards,
      isLoading: false,
      error: null,
      isEmpty: false,
      reload: vi.fn(),
    });

    renderPage();

    expect(screen.getByText(cards[0].guestName)).toBeInTheDocument();
    expect(screen.getByText(cards[1].guestName)).toBeInTheDocument();
    expect(screen.queryByText('No notes yet. Leave the first one.')).not.toBeInTheDocument();
  });
});
