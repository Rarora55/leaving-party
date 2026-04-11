import type { FormEvent } from 'react';
import { Button } from '../../shared/components/Button/Button';
import { Input } from '../../shared/components/Input/Input';
import { PixelCard } from '../../shared/components/PixelCard/PixelCard';

interface GuestListFormProps {
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: () => Promise<boolean>;
  errorMessage: string | null;
  successMessage: string | null;
  isSubmitting: boolean;
}

export function GuestListForm({
  name,
  onNameChange,
  onSubmit,
  errorMessage,
  successMessage,
  isSubmitting,
}: GuestListFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <PixelCard className="bg-white/78">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <h2 className="font-display text-2xl uppercase tracking-[0.12em] text-ink">
            Quick RSVP
          </h2>
          <p className="font-body text-base leading-7 text-ink/68">
            One field, one tap. Add your name and lock in your spot.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="guest-name"
            className="font-display text-[0.68rem] uppercase tracking-[0.32em] text-ink/55"
          >
            Your name
          </label>
          <Input
            id="guest-name"
            name="guest-name"
            placeholder="Type your name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? 'rsvp-error' : undefined}
          />
        </div>

        {errorMessage ? (
          <p
            id="rsvp-error"
            className="rounded-[1rem] border border-[#d95763]/20 bg-[#ffe4e7] px-4 py-3 font-body text-sm text-[#842434]"
            role="alert"
            aria-live="assertive"
          >
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p
            className="rounded-[1rem] border border-[#66b68c]/20 bg-[#e2f6e8] px-4 py-3 font-body text-sm text-[#1e6a45]"
            role="status"
            aria-live="polite"
          >
            {successMessage}
          </p>
        ) : null}

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Confirm attendance'}
        </Button>
      </form>
    </PixelCard>
  );
}
