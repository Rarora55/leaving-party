import { render, screen } from '@testing-library/react';
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

describe('GuestListPage accessibility states', () => {
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
      refresh: vi.fn(),
      prependConfirmation: vi.fn(),
    });
  });

  it('announces the validation error inline', () => {
    useRSVPFormMock.mockReturnValue({
      name: '',
      setName: vi.fn(),
      error: 'Please enter your name to confirm attendance.',
      isSubmitting: false,
      successMessage: null,
      notificationMessage: null,
      submit: vi.fn(),
    });

    renderPage();

    const input = screen.getByLabelText('Who?');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter your name');
  });

  it('renders success feedback as a polite status message', () => {
    useRSVPFormMock.mockReturnValue({
      name: '',
      setName: vi.fn(),
      error: null,
      isSubmitting: false,
      successMessage: "Your RSVP is confirmed. We'll see you soon.",
      notificationMessage: null,
      submit: vi.fn(),
    });

    renderPage();

    expect(screen.getByRole('status')).toHaveTextContent("Your RSVP is confirmed. We'll see you soon.");
  });
});
