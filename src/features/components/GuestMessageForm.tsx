import type { FormEvent } from 'react';
import { Button } from '../../shared/components/Button/Button';
import { Input } from '../../shared/components/Input/Input';
import { PixelCard } from '../../shared/components/PixelCard/PixelCard';
import { TextArea } from '../../shared/components/TextArea/TextArea';

interface GuestMessageFormProps {
  guestName: string;
  message: string;
  maxLength: number;
  errors: {
    guestName?: string;
    message?: string;
  };
  onGuestNameChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: () => Promise<boolean>;
  successMessage: string | null;
  isSubmitting: boolean;
}

export function GuestMessageForm({
  guestName,
  message,
  maxLength,
  errors,
  onGuestNameChange,
  onMessageChange,
  onSubmit,
  successMessage,
  isSubmitting,
}: GuestMessageFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <PixelCard className="bg-white/78">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <h2 className="font-display text-2xl uppercase tracking-[0.12em] text-ink">
            Leave a note
          </h2>
          <p className="font-body text-base leading-7 text-ink/68">
            Keep it short, warm, and ready to sit on the public wall.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message-name"
            className="font-display text-[0.68rem] uppercase tracking-[0.32em] text-ink/55"
          >
            Your name
          </label>
          <Input
            id="message-name"
            name="message-name"
            placeholder="Type your name"
            value={guestName}
            onChange={(event) => onGuestNameChange(event.target.value)}
            aria-invalid={Boolean(errors.guestName)}
            aria-describedby={errors.guestName ? 'message-name-error' : undefined}
          />
          {errors.guestName ? (
            <p
              id="message-name-error"
              className="text-sm text-[#842434]"
              role="alert"
            >
              {errors.guestName}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="message-text"
              className="font-display text-[0.68rem] uppercase tracking-[0.32em] text-ink/55"
            >
              Your message
            </label>
            <span className="font-display text-[0.66rem] uppercase tracking-[0.26em] text-ink/40">
              {message.trim().length}/{maxLength}
            </span>
          </div>
          <TextArea
            id="message-text"
            name="message-text"
            maxLength={maxLength}
            placeholder="We will miss you already..."
            value={message}
            onChange={(event) => onMessageChange(event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-text-error' : undefined}
          />
          {errors.message ? (
            <p
              id="message-text-error"
              className="text-sm text-[#842434]"
              role="alert"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

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
          {isSubmitting ? 'Publishing…' : 'Publish message'}
        </Button>
      </form>
    </PixelCard>
  );
}
