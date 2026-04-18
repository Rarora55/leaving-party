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

describe('MessagesPage layout', () => {
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
      message: 'We will miss you 🎉',
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

  it('renders exactly two primary sections in the required order', () => {
    renderPage();

    const regions = screen.getAllByRole('region');
    expect(regions).toHaveLength(2);
    expect(regions[0]).toHaveAccessibleName('The wall');
    expect(regions[1]).toHaveAccessibleName('We will buy a beer to the best comment');
  });

  it('removes legacy message page copy and helper modules', () => {
    renderPage();

    expect(screen.queryByText('Drop a Message')).not.toBeInTheDocument();
    expect(screen.queryByText('Messages saved here')).not.toBeInTheDocument();
    expect(screen.queryByText('Character limit')).not.toBeInTheDocument();
  });
});
