import { useState } from 'react';
import { GuestListForm } from '../../features/guest-list/GuestListForm';
import { PixelCard } from '../../shared/components/PixelCard/PixelCard';
import { EVENT_INFO, SITE_COPY } from '../../shared/constants/events.constants';
import type { RsvpEntry } from '../../shared/types/site.types';
import { appendRsvp, readRsvps } from '../../services/localStorage/siteStorage';
import { useRSVPForm } from '../../features/guest-list/hooks/useRSVPForm';

export function GuestListPage() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>(() => readRsvps());
  const {
    name,
    setName,
    error,
    isSubmitting,
    successMessage,
    submit,
  } = useRSVPForm();

  const handleSubmit = async () => {
    const pendingName = name.trim();
    const result = await submit();

    if (result && pendingName) {
      try {
        const entry = appendRsvp(pendingName);
        setRsvps((current) => [entry, ...current]);
      } catch {
        // Ignore local storage failure; form state is already handled by hook
      }
    }

    return result;
  };

  return (
    <main className="pb-14">
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-6 pt-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-28">
        <div className="space-y-5">
          <span className="inline-flex rounded-full border border-ink/10 bg-white/70 px-4 py-2 font-display text-[0.68rem] uppercase tracking-[0.34em] text-ink/60">
            {EVENT_INFO.dateLabel}
          </span>
          <div className="space-y-3">
            <h1 className="font-display text-4xl uppercase tracking-[0.1em] text-ink sm:text-5xl">
              Are You Coming?
            </h1>
            <p className="max-w-2xl font-body text-lg leading-8 text-ink/75">
              {SITE_COPY.rsvpIntro}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <PixelCard className="bg-[#fff6d7]">
              <p className="font-display text-[0.64rem] uppercase tracking-[0.34em] text-ink/55">
                Hosts
              </p>
              <p className="mt-3 font-body text-2xl text-ink">{EVENT_INFO.hosts.join(' + ')}</p>
            </PixelCard>
            <PixelCard className="bg-[#d8f2ff]">
              <p className="font-display text-[0.64rem] uppercase tracking-[0.34em] text-ink/55">
                Confirmed on this device
              </p>
              <p className="mt-3 font-body text-4xl text-ink">{rsvps.length}</p>
            </PixelCard>
          </div>
        </div>

        <GuestListForm
          name={name}
          onNameChange={setName}
          onSubmit={handleSubmit}
          errorMessage={error}
          successMessage={successMessage}
          isSubmitting={isSubmitting}
        />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <PixelCard className="bg-white/70">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                Latest confirmations
              </h2>
              <p className="mt-2 font-body text-sm text-ink/65">
                Local-only for now. Duplicate names are allowed.
              </p>
            </div>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-ink/45">
              {rsvps.length} saved
            </span>
          </div>

          {rsvps.length > 0 ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rsvps.slice(0, 6).map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-[1.3rem] border border-ink/10 bg-paper px-4 py-4 font-body text-base text-ink shadow-card"
                >
                  <p className="font-medium">{entry.name}</p>
                  <p className="mt-1 text-sm text-ink/55">
                    Confirmed at{' '}
                    {new Date(entry.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 rounded-[1.3rem] border border-dashed border-ink/15 bg-paper/80 px-5 py-10 text-center font-body text-base text-ink/60">
              No local RSVPs yet. Be the first one to say yes.
            </p>
          )}
        </PixelCard>
      </section>
    </main>
  );
}
