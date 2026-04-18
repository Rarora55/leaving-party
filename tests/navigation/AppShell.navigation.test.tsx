import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { mockReducedMotion, renderNavigationShell } from './navigationTestUtils';

afterEach(() => {
  cleanup();
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
});

describe('AppShell navigation overlay integration', () => {
  it('opens fullscreen navigation and toggles trigger visual state', async () => {
    const user = userEvent.setup();
    renderNavigationShell();

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(trigger).toHaveAttribute('data-menu-state', 'closed');

    await user.click(trigger);

    const closeTrigger = screen.getByRole('button', {
      name: 'Close navigation menu',
      hidden: true,
    });
    expect(closeTrigger).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Site navigation' })).toHaveClass('fixed');
    expect(screen.getByRole('navigation', { name: 'Site navigation' })).toHaveClass('inset-0');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and returns focus to menu trigger', async () => {
    const user = userEvent.setup();
    renderNavigationShell({ initialRoute: '/drop-a-message' });

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' });
    await user.click(trigger);
    await user.keyboard('{Escape}');

    const reopenedTrigger = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(reopenedTrigger).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('navigates and closes when selecting a different destination', async () => {
    const user = userEvent.setup();
    renderNavigationShell({ initialRoute: '/messages' });

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    await user.click(screen.getByRole('link', { name: 'Home' }));

    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument();
    expect(screen.getByTestId('location-display')).toHaveTextContent('/');
  });

  it('uses reduced-motion trigger mode when preference is enabled', async () => {
    const restore = mockReducedMotion(true);
    const user = userEvent.setup();

    renderNavigationShell();
    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));

    expect(screen.getByTestId('navigation-surface')).toHaveAttribute(
      'data-motion-mode',
      'reduced',
    );

    restore();
  });
});
