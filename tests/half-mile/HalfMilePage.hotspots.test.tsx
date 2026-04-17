import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { renderHalfMilePageOnly } from './halfMileTestUtils';

afterEach(() => {
  cleanup();
});

describe('HalfMilePage hotspots', () => {
  it('maps all brewery hotspots and keeps only one card open at a time', async () => {
    const user = userEvent.setup();
    renderHalfMilePageOnly();

    const exaleHotspot = screen.getByTestId('hotspot-exale');
    const signatureHotspot = screen.getByTestId('hotspot-signature-brew');

    await user.click(exaleHotspot);
    expect(screen.getByLabelText('Exale details')).toBeInTheDocument();
    expect(screen.getAllByTestId('half-mile-brewery-card')).toHaveLength(1);

    await user.click(signatureHotspot);
    expect(screen.queryByLabelText('Exale details')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Signature Brew details')).toBeInTheDocument();
    expect(screen.getAllByTestId('half-mile-brewery-card')).toHaveLength(1);
  });

  it('shows correct brewery website URLs from hotspot cards', async () => {
    const user = userEvent.setup();
    renderHalfMilePageOnly();

    await user.click(screen.getByTestId('hotspot-pretty-decent-beer-co'));
    const card = screen.getByLabelText('Pretty Decent Beer Co details');

    expect(within(card).getByRole('link', { name: 'Visit website' })).toHaveAttribute(
      'href',
      'https://prettydecentbeer.co/',
    );
  });

  it('closes open card via outside click and explicit close control', async () => {
    const user = userEvent.setup();
    renderHalfMilePageOnly();

    await user.click(screen.getByTestId('hotspot-40ft-brewery'));
    expect(screen.getByLabelText('40FT Brewery details')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Close 40FT Brewery details'));
    expect(screen.queryByLabelText('40FT Brewery details')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('hotspot-hackney-church-brew-co'));
    expect(screen.getByLabelText('Hackney Church Brew Co details')).toBeInTheDocument();

    await user.click(screen.getByTestId('half-mile-scene'));
    expect(screen.queryByLabelText('Hackney Church Brew Co details')).not.toBeInTheDocument();
  });
});
