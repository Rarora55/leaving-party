import { cleanup, render, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppRouter } from '../../src/app/AppRouter';
import indexHtml from '../../index.html?raw';

function MockShell({ children }: PropsWithChildren) {
  return <div data-testid="mock-shell">{children}</div>;
}

vi.mock('../../src/app/AppShell', () => ({
  AppShell: MockShell,
}));

vi.mock('../../src/pages/HomePage/HomePage', () => ({
  HomePage: () => <h1>Home Page</h1>,
}));

vi.mock('../../src/pages/HalfMilePage/HalfMilePage', () => ({
  HalfMilePage: () => <h1>The Half Mile Page</h1>,
}));

vi.mock('../../src/pages/GuestListPage/GuestListPage', () => ({
  GuestListPage: () => <h1>RSVP Page</h1>,
}));

vi.mock('../../src/pages/MessagesPage/MessagesPages', () => ({
  MessagesPage: () => <h1>Messages Page</h1>,
}));

afterEach(() => {
  cleanup();
});

describe('route fallback and metadata smoke coverage', () => {
  it('redirects unknown routes to Home route', async () => {
    window.history.pushState({}, '', '/unknown-route');
    render(<AppRouter />);

    expect(await screen.findByRole('heading', { name: 'Home Page' })).toBeInTheDocument();
  });

  it('loads The Half Mile route as expected', async () => {
    window.history.pushState({}, '', '/the-half-mile');
    render(<AppRouter />);

    expect(await screen.findByRole('heading', { name: 'The Half Mile Page' })).toBeInTheDocument();
  });

  it('includes essential metadata baseline in index.html', () => {
    expect(indexHtml).toContain('<meta name="viewport" content="width=device-width, initial-scale=1.0" />');
    expect(indexHtml).toMatch(/<meta\s+name="description"/);
    expect(indexHtml).toMatch(/<meta\s+name="theme-color"/);
    expect(indexHtml).toContain('<title>We Are Leaving | Farewell Party</title>');
  });
});
