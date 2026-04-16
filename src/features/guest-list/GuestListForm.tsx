import type { FormEvent } from 'react';
import { RSVP_PAGE_CONTENT } from '../../shared/constants/events.constants';
import { Button } from '../../shared/components/Button/Button';
import { Input } from '../../shared/components/Input/Input';
import { PixelCard } from '../../shared/components/PixelCard/PixelCard';

interface GuestListFormProps {
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: () => Promise<void>;
  errorMessage: string | null;
  successMessage: string | null;
  notificationMessage: string | null;
  isSubmitting: boolean;
}

export function GuestListForm({
  name,
  onNameChange,
  onSubmit,
  errorMessage,
  successMessage,
  notificationMessage,
  isSubmitting,
}: GuestListFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <PixelCard className="border-white/50 bg-[rgba(255,250,240,0.82)] shadow-[0_28px_60px_rgba(29,39,64,0.12)] backdrop-blur-md">
      <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <h2 className="editorial-title text-[clamp(2rem,4vw,2.8rem)] uppercase tracking-[0.12em] text-ink">
            {RSVP_PAGE_CONTENT.formTitle}
          </h2>
          <p className="max-w-xl font-body text-base leading-7 text-ink/72">
            {RSVP_PAGE_CONTENT.formDescription}
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="guest-name"
            className="font-display text-[0.7rem] uppercase tracking-[0.3em] text-ink/58"
          >
            {RSVP_PAGE_CONTENT.nameLabel}
          </label>
          <Input
            id="guest-name"
            name="guest-name"
            placeholder={RSVP_PAGE_CONTENT.namePlaceholder}
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={[
              errorMessage ? 'rsvp-error' : null,
              successMessage ? 'rsvp-success' : null,
              notificationMessage ? 'rsvp-notification' : null,
            ]
              .filter(Boolean)
              .join(' ') || undefined}
          />
        </div>

        {errorMessage ? (
          <p
            id="rsvp-error"
            className="rounded-[1rem] border border-[#d95763]/25 bg-[#ffe8ea] px-4 py-3 font-body text-sm text-[#842434]"
            role="alert"
            aria-live="assertive"
          >
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p
            id="rsvp-success"
            className="rounded-[1rem] border border-[#66b68c]/25 bg-[#e7f8ec] px-4 py-3 font-body text-sm text-[#1f6e47]"
            role="status"
            aria-live="polite"
          >
            {successMessage}
          </p>
        ) : null}

        {notificationMessage ? (
          <p
            id="rsvp-notification"
            className="rounded-[1rem] border border-ink/12 bg-white/70 px-4 py-3 font-body text-sm text-ink/70"
            role="status"
            aria-live="polite"
          >
            {notificationMessage}
          </p>
        ) : null}

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? RSVP_PAGE_CONTENT.submittingLabel
            : RSVP_PAGE_CONTENT.submitLabel}
        </Button>
      </form>
    </PixelCard>
  );
}
