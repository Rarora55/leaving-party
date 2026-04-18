import * as Dialog from '@radix-ui/react-dialog';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { HOME_NAVIGATION_OVERLAY_TOKENS } from '../../shared/constants/home.constants';
import { NAVIGATION_DESTINATIONS } from '../../shared/constants/navigation.constants';
import { cn } from '../../shared/utils/cn';

export interface PersistentNavigationProps {
  currentPath: string;
  onClose: () => void;
}

export function PersistentNavigation({
  currentPath,
  onClose,
}: PersistentNavigationProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionMode = prefersReducedMotion ? 'reduced' : 'full';
  const transitionDurationClass = prefersReducedMotion ? 'duration-75' : 'duration-300';

  const handleDestinationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    isActive: boolean,
  ) => {
    event.stopPropagation();

    if (isActive) {
      event.preventDefault();
    }

    onClose();
  };

  const handleSurfaceClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('[data-navigation-link="true"]')) {
      return;
    }
    if (target.closest('[data-navigation-action="close"]')) {
      return;
    }

    onClose();
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          'fixed inset-0 z-50 bg-black/12 backdrop-blur-sm transition-opacity ease-out',
          transitionDurationClass,
          'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
        )}
      />
      <Dialog.Content
        data-testid="navigation-surface"
        data-motion-mode={motionMode}
        onClick={handleSurfaceClick}
        className={cn(
          'fixed inset-0 z-[60] flex min-h-svh flex-col justify-between px-6 pb-8 pt-24 text-ink outline-none transition ease-out sm:px-8 lg:px-12',
          transitionDurationClass,
          'data-[state=closed]:translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100',
        )}
        role="navigation"
        aria-label="Site navigation"
        style={{
          backgroundColor: HOME_NAVIGATION_OVERLAY_TOKENS.backgroundColor,
          backgroundImage: HOME_NAVIGATION_OVERLAY_TOKENS.backgroundImage,
        }}
      >
        <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
        <Dialog.Description className="sr-only">
          Fullscreen navigation menu for the farewell site.
        </Dialog.Description>

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ backgroundImage: HOME_NAVIGATION_OVERLAY_TOKENS.topHighlight }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[36svh]"
          aria-hidden="true"
          style={{ backgroundImage: HOME_NAVIGATION_OVERLAY_TOKENS.horizonGlow }}
        />
        <Dialog.Close asChild>
          <button
            type="button"
            data-navigation-action="close"
            aria-label="Close navigation menu"
            className={cn(
              'fixed right-4 top-4 z-[70] inline-flex cursor-pointer items-center gap-3 rounded-full border border-black/20 bg-[rgba(255,255,255,0.92)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.34em] text-black shadow-[var(--shadow-air)] backdrop-blur-md transition ease-out hover:cursor-pointer',
              transitionDurationClass,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            )}
          >
            <span className="font-display">Close</span>
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={cn(
                  'absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 rounded rotate-45 bg-black transition-transform transition-colors ease-out',
                  transitionDurationClass,
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 rounded -rotate-45 bg-black opacity-100 transition-all ease-out',
                  transitionDurationClass,
                )}
              />
            </span>
          </button>
        </Dialog.Close>

        <nav className="relative z-10 my-auto py-10">
          <ul className="space-y-4 sm:space-y-6">
            {NAVIGATION_DESTINATIONS.map((destination) => {
              const isActive = destination.route === currentPath;

              return (
                <li key={destination.id}>
                  <Link
                    to={destination.route}
                    data-navigation-link="true"
                    aria-label={destination.label}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => handleDestinationClick(event, isActive)}
                    className={cn(
                      'group block rounded-[2rem] border border-transparent px-4 py-4 transition duration-200 ease-out sm:px-6',
                      isActive
                        ? 'border-ink/12 bg-white/42'
                        : 'hover:border-ink/10 hover:bg-white/32',
                    )}
                    >
                    <span className="editorial-title block text-[clamp(2.25rem,7vw,5rem)] leading-[0.9] tracking-[-0.05em] text-ink">
                      {destination.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
