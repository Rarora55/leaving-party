/* eslint-disable react-refresh/only-export-components */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppShell } from '../../src/app/AppShell';
import { PersistentNavigation } from '../../src/features/components/PersistentNavigation';

interface RenderNavigationShellOptions {
  initialRoute?: string;
  includeOutsideButton?: boolean;
}

interface RenderPersistentNavigationOptions {
  currentPath?: string;
  onClose?: () => void;
}

function LocationDisplay() {
  const { pathname } = useLocation();
  return <output data-testid="location-display">{pathname}</output>;
}

export function renderNavigationShell(options: RenderNavigationShellOptions = {}) {
  const { initialRoute = '/', includeOutsideButton = true } = options;

  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppShell>
        {includeOutsideButton ? <button data-testid="outside-focus">Outside Focus</button> : null}
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/the-half-mile" element={<h1>The Half Mile Page</h1>} />
          <Route path="/drop-a-message" element={<h1>Drop a Message Page</h1>} />
          <Route path="/messages" element={<h1>MessageList Page</h1>} />
          <Route path="/are-you-coming" element={<h1>RSVP Page</h1>} />
        </Routes>
        <LocationDisplay />
      </AppShell>
    </MemoryRouter>,
  );
}

export function renderPersistentNavigation(
  options: RenderPersistentNavigationOptions = {},
) {
  const { currentPath = '/', onClose = () => {} } = options;

  return render(
    <MemoryRouter initialEntries={[currentPath]}>
      <Dialog.Root open onOpenChange={() => {}}>
        <PersistentNavigation currentPath={currentPath} onClose={onClose} />
      </Dialog.Root>
    </MemoryRouter>,
  );
}

export function mockReducedMotion(enabled: boolean) {
  const originalMatchMedia = window.matchMedia;

  const matchMediaMock = (query: string): MediaQueryList => ({
    matches: enabled && query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: matchMediaMock,
  });

  return () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
  };
}

export function renderWithElement(element: ReactElement) {
  return render(element);
}
