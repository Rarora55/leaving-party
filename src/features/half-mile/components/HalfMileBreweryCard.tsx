import { HOME_SURFACE_TOKENS } from '../../../shared/constants/home.constants';
import type { HalfMileBrewery, HalfMileCardPlacement } from '../../../shared/types/site.types';
import { cn } from '../../../shared/utils/cn';

interface HalfMileBreweryCardProps {
  brewery: HalfMileBrewery;
  onClose: () => void;
}

const placementClassName: Record<HalfMileCardPlacement, string> = {
  top: '-translate-x-1/2 -translate-y-[calc(100%+0.8rem)]',
  right: 'translate-x-4 -translate-y-1/2',
  bottom: '-translate-x-1/2 translate-y-4',
  left: '-translate-y-1/2 -translate-x-[calc(100%+0.8rem)]',
};

export function HalfMileBreweryCard({
  brewery,
  onClose,
}: HalfMileBreweryCardProps) {
  return (
    <article
      data-testid="half-mile-brewery-card"
      data-half-mile-card="true"
      aria-label={`${brewery.name} details`}
      className={cn(
        'absolute z-40 w-[min(18rem,72vw)] rounded-2xl p-3 text-ink',
        HOME_SURFACE_TOKENS.cardClassName,
        HOME_SURFACE_TOKENS.outlineClassName,
        placementClassName[brewery.cardPlacement],
      )}
      style={{
        left: `${brewery.hotspot.xPercent}%`,
        top: `${brewery.hotspot.yPercent}%`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-wide">{brewery.name}</h2>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-ink/20 bg-white/80 px-2 text-xs font-semibold transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          aria-label={`Close ${brewery.name} details`}
        >
          Close
        </button>
      </div>

      <a
        href={brewery.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center rounded-full border border-ink/20 bg-white/78 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
      >
        Visit website
      </a>
    </article>
  );
}
