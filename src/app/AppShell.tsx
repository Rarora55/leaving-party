import * as Dialog from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { PersistentNavigation } from '../features/components/PersistentNavigation';
import { useNavigationOverlay } from '../features/components/useNavigationOverlay';
import { cn } from '../shared/utils/cn';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { pathname } = useLocation();
  const { isOpen, openOverlay, closeOverlay, toggleOverlay } = useNavigationOverlay();

  useEffect(() => {
    if (isOpen) {
      closeOverlay({ restoreScroll: false });
    }
  }, [closeOverlay, isOpen, pathname]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => (open ? openOverlay() : closeOverlay())}>
      <div className="relative min-h-svh overflow-x-clip bg-paper text-ink">{children}</div>

      <button
        type="button"
        onClick={toggleOverlay}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={cn(
          'fixed right-4 top-4 z-[70] inline-flex items-center gap-3 rounded-full border border-black/10',
          'bg-white/76 px-4 py-2 text-[0.68rem] uppercase tracking-[0.34em] text-ink shadow-[var(--shadow-air)] backdrop-blur-md transition duration-200 ease-out',
          'hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        )}
      >
        <span className="font-display">{isOpen ? 'Close' : 'Menu'}</span>
        <span className="h-px w-5 bg-current" aria-hidden="true" />
      </button>

      <PersistentNavigation
        currentPath={pathname}
        onNavigate={() => closeOverlay({ restoreScroll: false })}
      />
    </Dialog.Root>
  );
}
