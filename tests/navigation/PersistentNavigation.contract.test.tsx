import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  mockReducedMotion,
  renderNavigationShell,
  renderPersistentNavigation,
} from './navigationTestUtils';

afterEach(() => {
  cleanup();
});

describe('PersistentNavigation contract', () => {
  it('renders Home, The Half Mile, Are you coming, and Drop a Message with active-route semantics', () => {
    renderPersistentNavigation({ currentPath: '/messages' });

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'The Half Mile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Are you coming?' })).toBeInTheDocument();

    const messageListLink = screen.getByRole('link', { name: 'Drop a Message' });
    expect(messageListLink).toBeInTheDocument();
    expect(messageListLink).toHaveAttribute('aria-current', 'page');
  });

  it('uses reduced-motion overlay mode when user preference is enabled', () => {
    const restore = mockReducedMotion(true);

    renderPersistentNavigation({ currentPath: '/' });

    const navigation = screen.getByRole('navigation', { name: 'Site navigation' });
    expect(navigation).toHaveAttribute('data-motion-mode', 'reduced');

    restore();
  });

  it('closes without route change when user clicks non-link menu space', async () => {
    const user = userEvent.setup();
    renderNavigationShell({ initialRoute: '/drop-a-message' });

    const openButton = screen.getByRole('button', { name: 'Open navigation menu' });
    await user.click(openButton);

    const menuSurface = screen.getByTestId('navigation-surface');
    await user.click(menuSurface);

    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument();
    expect(screen.getByTestId('location-display')).toHaveTextContent('/drop-a-message');
  });

  it('closes overlay and keeps current route when active destination is selected', async () => {
    const user = userEvent.setup();
    renderNavigationShell({ initialRoute: '/messages' });

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    await user.click(screen.getByRole('link', { name: 'Drop a Message' }));

    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument();
    expect(screen.getByTestId('location-display')).toHaveTextContent('/messages');
  });

  it('calls close callback when non-link menu space is selected in standalone overlay', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderPersistentNavigation({ currentPath: '/', onClose });

    await user.click(screen.getByTestId('navigation-surface'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('routes The Half Mile destination through shared navigation config', () => {
    renderPersistentNavigation({ currentPath: '/' });

    expect(screen.getByRole('link', { name: 'The Half Mile' })).toHaveAttribute(
      'href',
      '/the-half-mile',
    );
  });
});
