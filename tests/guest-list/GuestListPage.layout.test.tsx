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

describe('GuestListPage layout', () => {
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
    useRSVPFormMock.mockReturnValue({
      name: '',
      setName: vi.fn(),
      error: null,
      isSubmitting: false,
      successMessage: null,
      notificationMessage: null,
      submit: vi.fn(),
    });
  });

  it('renders only the RSVP and latest confirmations blocks and removes legacy modules', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: 'Are You Coming?' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Say your name!' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Who was the last one?' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open the guest messages page' })).toBeInTheDocument();
    expect(screen.queryByText('Hosts')).not.toBeInTheDocument();
    expect(screen.queryByText('Confirmed on this device')).not.toBeInTheDocument();
  });
});
