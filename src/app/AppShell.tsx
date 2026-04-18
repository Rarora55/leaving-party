import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { PersistentNavigation } from '../features/components/PersistentNavigation';
import { HOME_SURFACE_TOKENS } from '../shared/constants/home.constants';
import { THE_HALF_MILE_ROUTE } from '../shared/constants/navigation.constants';
import { useNavigationOverlay } from '../features/components/useNavigationOverlay';
import { cn } from '../shared/utils/cn';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { pathname } = useLocation();
  const { isOpen, openOverlay, closeOverlay } = useNavigationOverlay();
  const isHalfMileRoute = pathname === THE_HALF_MILE_ROUTE;
  const prefersReducedMotion =
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionMode = prefersReducedMotion ? 'reduced' : 'full';
  const transitionDurationClass = prefersReducedMotion ? 'duration-75' : 'duration-200';

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => (open ? openOverlay() : closeOverlay({ restoreScroll: false }))}
    >
      <div
        className={cn('relative min-h-svh overflow-x-clip text-ink', isHalfMileRoute ? '' : 'bg-paper')}
        style={isHalfMileRoute
          ? {
            backgroundColor: HOME_SURFACE_TOKENS.skyColor,
            backgroundImage: [HOME_SURFACE_TOKENS.mistGlow, HOME_SURFACE_TOKENS.pageGlow].join(','),
          }
          : undefined}
      >
        {children}
      </div>

      {!isOpen ? (
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-expanded={false}
            aria-haspopup="dialog"
            aria-label="Open navigation menu"
            data-menu-state="closed"
            data-motion-mode={motionMode}
            className={cn(
              'fixed right-4 top-4 z-[70] inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/45 bg-[rgba(28,45,70,0.42)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.34em] text-white shadow-[var(--shadow-air)] backdrop-blur-md transition ease-out hover:cursor-pointer hover:bg-[rgba(28,45,70,0.52)]',
              transitionDurationClass,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            )}
          >
            <span className="font-display">Menu</span>
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                data-testid="menu-line-primary"
                className={cn(
                  'absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 rounded bg-white transition-transform transition-colors ease-out',
                  transitionDurationClass,
                )}
              />
              <span
                data-testid="menu-line-secondary"
                className={cn(
                  'absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 rounded bg-white opacity-0 transition-all ease-out',
                  transitionDurationClass,
                )}
              />
            </span>
          </button>
        </Dialog.Trigger>
      ) : null}

      <PersistentNavigation
        currentPath={pathname}
        onClose={() => closeOverlay({ restoreScroll: false })}
      />
    </Dialog.Root>
  );
}
