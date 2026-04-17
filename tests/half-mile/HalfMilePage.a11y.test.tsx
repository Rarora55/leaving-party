import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { renderHalfMilePageOnly } from './halfMileTestUtils';

afterEach(() => {
  cleanup();
});

describe('HalfMilePage accessibility and keyboard behavior', () => {
  it('supports keyboard focus and Enter/Space activation for hotspots', async () => {
    const user = userEvent.setup();
    renderHalfMilePageOnly();

    const hotspot = screen.getByTestId('hotspot-exale');

    hotspot.focus();
    expect(hotspot).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(screen.getByLabelText('Exale details')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByLabelText('Exale details')).not.toBeInTheDocument();

    hotspot.focus();
    await user.keyboard('{Space}');
    expect(screen.getByLabelText('Exale details')).toBeInTheDocument();
  });

  it('closes the active brewery card on Escape key press', async () => {
    const user = userEvent.setup();
    renderHalfMilePageOnly();

    await user.click(screen.getByTestId('hotspot-signature-brew'));
    expect(screen.getByLabelText('Signature Brew details')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByLabelText('Signature Brew details')).not.toBeInTheDocument();
  });

  it('uses secure new-tab link attributes for brewery links', async () => {
    const user = userEvent.setup();
    renderHalfMilePageOnly();

    await user.click(screen.getByTestId('hotspot-hackney-church-brew-co'));
    const link = screen.getByRole('link', { name: 'Visit website' });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
