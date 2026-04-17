import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { renderHalfMileShell } from './halfMileTestUtils';

afterEach(() => {
  cleanup();
});

describe('HalfMilePage layout', () => {
  it('renders the Half Mile scene route with map image and frame', () => {
    renderHalfMileShell();

    expect(screen.getByTestId('location-display')).toHaveTextContent('/the-half-mile');
    expect(screen.getByTestId('half-mile-scene')).toBeInTheDocument();
    expect(screen.getByTestId('half-mile-map-frame')).toBeInTheDocument();
    expect(screen.getByTestId('half-mile-map-image')).toBeInTheDocument();
  });

  it('keeps map image full-width with preserved vertical breathing space classes', () => {
    renderHalfMileShell();

    const image = screen.getByTestId('half-mile-map-image');
    const scene = screen.getByTestId('half-mile-scene');

    expect(image).toHaveClass('w-full');
    expect(image).toHaveClass('h-auto');
    expect(scene).toHaveClass('min-h-svh');
  });

  it('navigates back to Home when fixed CTA is activated', async () => {
    const user = userEvent.setup();
    renderHalfMileShell();

    await user.click(screen.getByTestId('half-mile-home-cta'));

    expect(screen.getByTestId('location-display')).toHaveTextContent('/');
    expect(screen.getByRole('heading', { name: 'Home Page' })).toBeInTheDocument();
  });
});
