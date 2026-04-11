import { useMemo } from 'react';
import { GuestMessageForm } from '../../features/components/GuestMessageForm';
import { GuestMessagesList } from '../../features/components/GuestMessagesList';
import { PixelCard } from '../../shared/components/PixelCard/PixelCard';
import { EVENT_INFO, SITE_COPY } from '../../shared/constants/events.constants';
import { useGuestMessageForm } from '../../features/guest-messages/hooks/useGuestMessageForm';
import { useMessageWall } from '../../features/guest-messages/hooks/useMessageWall';

const MAX_MESSAGE_LENGTH = 180;

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

    const handleSubmit = async () => {
        const success = await submit();
        if (success) {
            await reload();
        }
        return success;
    };

    const wallMessageCount = useMemo(() => cards.length, [cards]);

    return (
        <main className="pb-16">
            <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-6 pt-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-28">
                <div className="space-y-5">
                    <span className="inline-flex rounded-full border border-ink/10 bg-white/70 px-4 py-2 font-display text-[0.68rem] uppercase tracking-[0.34em] text-ink/60">
                        Public message wall
                    </span>
                    <div className="space-y-3">
                        <h1 className="font-display text-4xl uppercase tracking-[0.1em] text-ink sm:text-5xl">
                            Drop a Message
                        </h1>
                        <p className="max-w-2xl font-body text-lg leading-8 text-ink/75">
                            {SITE_COPY.messageIntro}
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <PixelCard className="bg-[#dff7ef]">
                            <p className="font-display text-[0.64rem] uppercase tracking-[0.34em] text-ink/55">
                                Messages saved here
                            </p>
                            <p className="mt-3 font-body text-4xl text-ink">{wallMessageCount}</p>
                        </PixelCard>
                        <PixelCard className="bg-[#ffe6f2]">
                            <p className="font-display text-[0.64rem] uppercase tracking-[0.34em] text-ink/55">
                                Character limit
                            </p>
                            <p className="mt-3 font-body text-4xl text-ink">{MAX_MESSAGE_LENGTH}</p>
                        </PixelCard>
                    </div>
                    <p className="font-body text-sm text-ink/55">
                        Messages publish immediately once persisted and will refresh the wall.
                    </p>
                </div>

                <GuestMessageForm
                    guestName={guestName}
                    message={message}
                    errors={errors}
                    maxLength={MAX_MESSAGE_LENGTH}
                    onGuestNameChange={setGuestName}
                    onMessageChange={setMessage}
                    onSubmit={handleSubmit}
                    successMessage={successMessage}
                    isSubmitting={isSubmitting}
                />
            </section>

            <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                            Notes for {EVENT_INFO.title}
                        </h2>
                        <p className="mt-2 font-body text-sm text-ink/65">
                            Playful, compact cards inspired by a social timeline rather than a strict feed.
                        </p>
                    </div>
                    <span className="font-display text-xs uppercase tracking-[0.3em] text-ink/45">
                        Live wall
                    </span>
                </div>

                {wallError ? (
                    <div className="mb-6 rounded-[2rem] border border-[#d95763]/20 bg-[#ffe4e7] px-6 py-6 text-center text-[#842434]">
                        {wallError}
                    </div>
                ) : null}

                {isLoading ? (
                    <div className="rounded-[2rem] border border-ink/15 bg-white/60 p-10 text-center text-ink/60">
                        Loading messages...
                    </div>
                ) : (
                    <GuestMessagesList messages={cards} isEmpty={isEmpty} />
                )}
            </section>
        </main>
    );
}
