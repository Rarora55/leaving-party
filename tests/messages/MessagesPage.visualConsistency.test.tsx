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

describe('MessagesPage visual consistency', () => {
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
      message: 'See you soon 🎉',
      errors: {},
      isSubmitting: false,
      successMessage: null,
      setGuestName: vi.fn(),
      setMessage: vi.fn(),
      submit: vi.fn().mockResolvedValue(true),
    });

    useMessageWallMock.mockReturnValue({
      cards: createMessageCards(2),
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

  it('keeps the layered background and note-card styling for Home continuity', () => {
    const { container } = renderPage();

    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-svh');

    const decorativeLayers = container.querySelectorAll('div[aria-hidden="true"]');
    expect(decorativeLayers.length).toBeGreaterThanOrEqual(2);

    expect(screen.getAllByText('Note').length).toBeGreaterThan(0);
  });
});
