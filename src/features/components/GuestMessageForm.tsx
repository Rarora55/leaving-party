import type { FormEvent } from 'react';
import { Button } from '../../shared/components/Button/Button';
import { Input } from '../../shared/components/Input/Input';
import { PixelCard } from '../../shared/components/PixelCard/PixelCard';
import { TextArea } from '../../shared/components/TextArea/TextArea';
import { cn } from '../../shared/utils/cn';
import { MESSAGE_PAGE_CONTENT } from '../../shared/constants/events.constants';

interface GuestMessageFormProps {
  guestName: string;
  message: string;
  maxLength: number;
  errors: {
    guestName?: string;
    message?: string;
  };
  isComposerCollapsed: boolean;
  onGuestNameChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onToggleComposer: () => void;
  onSubmit: () => Promise<boolean>;
  successMessage: string | null;
  isSubmitting: boolean;
}

export function GuestMessageForm({
  guestName,
  message,
  maxLength,
  errors,
  isComposerCollapsed,
  onGuestNameChange,
  onMessageChange,
  onToggleComposer,
  onSubmit,
  successMessage,
  isSubmitting,
}: GuestMessageFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <PixelCard className="border border-ink/15 bg-paper/95 shadow-soft backdrop-blur-md">
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
        aria-label={MESSAGE_PAGE_CONTENT.formTitle}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl uppercase tracking-[0.12em] text-ink">
            {MESSAGE_PAGE_CONTENT.formTitle}
          </h2>
          <button
            type="button"
            onClick={onToggleComposer}
            aria-controls="message-composer-panel"
            aria-expanded={!isComposerCollapsed}
            aria-label={
              isComposerCollapsed
                ? MESSAGE_PAGE_CONTENT.composerCollapsedToggleLabel
                : MESSAGE_PAGE_CONTENT.composerExpandedToggleLabel
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-white/85 text-xl leading-none text-ink shadow-sm transition hover:bg-white focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">
              {isComposerCollapsed
                ? MESSAGE_PAGE_CONTENT.composerCollapsedArrow
                : MESSAGE_PAGE_CONTENT.composerExpandedArrow}
            </span>
          </button>
        </div>

        <div id="message-composer-panel" className={cn('space-y-5', isComposerCollapsed && 'hidden')}>
          <div className="space-y-2">
            <label
              htmlFor="message-name"
              className="font-display text-[0.68rem] uppercase tracking-[0.32em] text-ink/55"
            >
              {MESSAGE_PAGE_CONTENT.nameLabel}
            </label>
            <Input
              id="message-name"
              name="message-name"
              placeholder={MESSAGE_PAGE_CONTENT.namePlaceholder}
              value={guestName}
              onChange={(event) => onGuestNameChange(event.target.value)}
              aria-invalid={Boolean(errors.guestName)}
              aria-describedby={errors.guestName ? 'message-name-error' : undefined}
            />
            {errors.guestName ? (
              <p id="message-name-error" className="text-sm text-[#842434]" role="alert">
                {errors.guestName}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message-text"
              className="font-display text-[0.68rem] uppercase tracking-[0.32em] text-ink/55"
            >
              {MESSAGE_PAGE_CONTENT.messageLabel}
            </label>
            <TextArea
              id="message-text"
              name="message-text"
              maxLength={maxLength}
              placeholder={MESSAGE_PAGE_CONTENT.messagePlaceholder}
              value={message}
              onChange={(event) => onMessageChange(event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-text-error' : undefined}
            />
            {errors.message ? (
              <p id="message-text-error" className="text-sm text-[#842434]" role="alert">
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
            {isSubmitting ? MESSAGE_PAGE_CONTENT.submittingLabel : MESSAGE_PAGE_CONTENT.submitLabel}
          </Button>
        </div>
      </form>
    </PixelCard>
  );
}
