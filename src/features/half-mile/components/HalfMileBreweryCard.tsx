import { useEffect, useRef } from 'react';
import popupAsset from '../../../../Components/PopUP/Popup.png';
import { HOME_SURFACE_TOKENS } from '../../../shared/constants/home.constants';
import type { HalfMileBrewery } from '../../../shared/types/site.types';
import { cn } from '../../../shared/utils/cn';

interface HalfMileBreweryCardProps {
  brewery: HalfMileBrewery;
  onClose: () => void;
}

export function HalfMileBreweryCard({
  brewery,
  onClose,
}: HalfMileBreweryCardProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px]"
      data-half-mile-card="true"
      role="presentation"
      onClick={onClose}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-label={`${brewery.name} details`}
        data-testid="half-mile-brewery-card"
        className={cn(
          'relative w-full max-w-[35rem] rounded-2xl p-4 text-ink sm:p-5',
          HOME_SURFACE_TOKENS.cardClassName,
          HOME_SURFACE_TOKENS.outlineClassName,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/35 bg-transparent text-base font-semibold leading-none shadow-md transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          aria-label={`Close ${brewery.name} details`}
        >
          X
        </button>
        <div className="relative mb-3">
          <img
            src={popupAsset}
            alt=""
            aria-hidden="true"
            className="h-auto w-full rounded-xl object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute bottom-[8%] right-[14%] rounded-md border-2 border-dashed border-ink/35 bg-transparent px-5 py-3 text-base font-semibold text-transparent transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          >
            Got it
          </button>
        </div>
        <h2 className="pr-10 text-base font-semibold tracking-wide">{brewery.name}</h2>

        <a
          href={brewery.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center rounded-md border-2 border-dashed border-ink/35 bg-white/78 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
        >
          Visit website
        </a>
      </article>
    </div>
  );
}




