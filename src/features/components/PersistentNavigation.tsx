import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { NAVIGATION_DESTINATIONS } from '../../shared/constants/navigation.constants';
import { cn } from '../../shared/utils/cn';

export interface PersistentNavigationProps {
  currentPath: string;
  onNavigate: () => void;
}

export function PersistentNavigation({
  currentPath,
  onNavigate,
}: PersistentNavigationProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(255,252,245,0.52)] backdrop-blur-md" />
      <Dialog.Content
        className="fixed inset-0 z-[60] flex min-h-svh flex-col justify-between bg-[rgba(247,241,229,0.96)] px-6 pb-8 pt-24 text-ink outline-none sm:px-8 lg:px-12"
        role="navigation"
        aria-label="Site navigation"
      >
        <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

        <div className="flex items-start justify-between gap-6">
          <div className="max-w-sm">
            <p className="font-display text-[0.68rem] uppercase tracking-[0.42em] text-ink/45">
              Editorial navigation
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-6 text-ink/58">
              Move lightly between the farewell scene, the RSVP, and the message wall.
            </p>
          </div>
        </div>

        <nav className="my-12 flex-1">
          <ul className="space-y-4 sm:space-y-6">
            {NAVIGATION_DESTINATIONS.map((destination) => {
              const isActive = destination.route === currentPath;

              return (
                <li key={destination.id}>
                  <Link
                    to={destination.route}
                    onClick={onNavigate}
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
                    <span className="mt-2 block font-display text-[0.65rem] uppercase tracking-[0.36em] text-ink/45">
                      {isActive ? 'Current route' : 'Open section'}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md font-body text-sm leading-6 text-ink/55">
            The trigger in the top-right remains available everywhere. Press Escape to close at any time.
          </p>
          <p className="font-display text-[0.64rem] uppercase tracking-[0.34em] text-ink/35">
            We Are Leaving
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
