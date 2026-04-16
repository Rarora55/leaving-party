import { RSVP_PAGE_CONTENT } from '../../../shared/constants/events.constants';
import { PixelCard } from '../../../shared/components/PixelCard/PixelCard';
import type { LatestConfirmationItem } from '../../../shared/types/site.types';

interface LatestConfirmationsProps {
  items: LatestConfirmationItem[];
  isLoading: boolean;
  errorMessage: string | null;
}

export function LatestConfirmations({
  items,
  isLoading,
  errorMessage,
}: LatestConfirmationsProps) {
  return (
    <PixelCard className="border-white/45 bg-[rgba(255,250,240,0.76)] shadow-[0_28px_60px_rgba(29,39,64,0.12)] backdrop-blur-md">
      <div className="space-y-3">
        <div className="space-y-2">
          <h2 className="font-display text-[0.82rem] uppercase tracking-[0.3em] text-ink/62">
            {RSVP_PAGE_CONTENT.latestTitle}
          </h2>
          <p className="font-body text-sm leading-6 text-ink/68">
            {RSVP_PAGE_CONTENT.latestDescription}
          </p>
        </div>

        {isLoading ? (
          <div aria-live="polite" className="grid gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-16 animate-pulse rounded-[1.2rem] border border-white/50 bg-white/55"
              />
            ))}
          </div>
        ) : null}

        {!isLoading && errorMessage ? (
          <p className="rounded-[1rem] border border-[#d95763]/20 bg-[#ffe8ea] px-4 py-3 font-body text-sm text-[#842434]">
            {errorMessage}
          </p>
        ) : null}

        {!isLoading && !errorMessage && items.length === 0 ? (
          <p className="rounded-[1.2rem] border border-dashed border-ink/12 bg-white/60 px-5 py-8 text-center font-body text-base text-ink/62">
            {RSVP_PAGE_CONTENT.latestEmptyState}
          </p>
        ) : null}

        {!isLoading && !errorMessage && items.length > 0 ? (
          <ol className="grid gap-3 sm:grid-cols-3" aria-live="polite">
            {items.map((item) => (
              <li
                key={`${item.id}-${item.confirmedAt}`}
                className="rounded-[1.2rem] border border-white/50 bg-white/72 px-4 py-4 text-left shadow-[0_18px_36px_rgba(29,39,64,0.08)]"
              >
                <p className="font-body text-lg text-ink">{item.name}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </PixelCard>
  );
}
