import { useEffect, useMemo, useRef, useState } from 'react';
import { GuestMessageForm } from '../../features/components/GuestMessageForm';
import { GuestMessagesList } from '../../features/components/GuestMessagesList';
import { MESSAGE_MAX_LENGTH } from '../../features/guest-messages/guestMessages.validation';
import { useGuestMessageForm } from '../../features/guest-messages/hooks/useGuestMessageForm';
import { useMessageWall } from '../../features/guest-messages/hooks/useMessageWall';
import { useStickyComposerViewport } from '../../features/guest-messages/hooks/useStickyComposerViewport';
import { MESSAGE_PAGE_CONTENT } from '../../shared/constants/events.constants';

export function MessagesPage() {
  const {
    guestName,
    message,
    errors,
    isSubmitting,
    successMessage,
    setGuestName,
    setMessage,
    submit,
  } = useGuestMessageForm();

  const { cards, isLoading, error: wallError, isEmpty, reload } = useMessageWall();
  const { composerBottom, keyboardInset } = useStickyComposerViewport();
  const composerRef = useRef<HTMLDivElement | null>(null);
  const [composerHeight, setComposerHeight] = useState(0);

  useEffect(() => {
    const composerElement = composerRef.current;
    if (!composerElement) {
      return;
    }

    const updateComposerHeight = () => {
      setComposerHeight(Math.ceil(composerElement.getBoundingClientRect().height));
    };

    updateComposerHeight();

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => updateComposerHeight());

    resizeObserver?.observe(composerElement);
    window.addEventListener('resize', updateComposerHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateComposerHeight);
    };
  }, []);

  const handleSubmit = async () => {
    const success = await submit();
    if (success) {
      await reload();
    }
    return success;
  };

  const wallPaddingBottom = useMemo(
    () =>
      `calc(${Math.max(composerHeight, 320)}px + env(safe-area-inset-bottom, 0px) + ${keyboardInset}px + 1rem)`,
    [composerHeight, keyboardInset],
  );

  return (
    <main className="relative isolate min-h-svh overflow-x-clip pb-6 pt-24 sm:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,250,240,0.72)_0%,rgba(245,238,219,0.9)_48%,rgba(239,230,206,0.96)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_8%,rgba(255,255,255,0.7),transparent_32%)]"
      />

      <section
        aria-label={MESSAGE_PAGE_CONTENT.wallTitle}
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        style={{ paddingBottom: wallPaddingBottom }}
      >
        <div className="mb-5 rounded-[2rem] border border-ink/10 bg-white/60 px-6 py-5 shadow-soft backdrop-blur-sm">
          <h1 className="font-display text-2xl uppercase tracking-[0.18em] text-ink sm:text-3xl">
            {MESSAGE_PAGE_CONTENT.wallTitle}
          </h1>
        </div>

        {wallError ? (
          <div className="mb-6 rounded-[2rem] border border-[#d95763]/20 bg-[#ffe4e7] px-6 py-6 text-center text-[#842434]">
            {wallError || MESSAGE_PAGE_CONTENT.wallErrorFallback}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-[2rem] border border-ink/15 bg-white/60 p-10 text-center text-ink/60 shadow-soft">
            {MESSAGE_PAGE_CONTENT.wallLoading}
          </div>
        ) : (
          <GuestMessagesList messages={cards} isEmpty={isEmpty} />
        )}
      </section>

      <section
        aria-label={MESSAGE_PAGE_CONTENT.formTitle}
        className="fixed bottom-0 message-composer-shell"
        style={{ bottom: composerBottom }}
      >
        <div ref={composerRef} className="message-composer-inner pb-4 pt-3">
          <GuestMessageForm
            guestName={guestName}
            message={message}
            errors={errors}
            maxLength={MESSAGE_MAX_LENGTH}
            isKeyboardOpen={keyboardInset > 0}
            onGuestNameChange={setGuestName}
            onMessageChange={setMessage}
            onSubmit={handleSubmit}
            successMessage={successMessage}
            isSubmitting={isSubmitting}
          />
        </div>
      </section>
    </main>
  );
}
