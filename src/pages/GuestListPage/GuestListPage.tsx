import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GuestListForm } from '../../features/guest-list/GuestListForm';
import { LatestConfirmations } from '../../features/guest-list/components/LatestConfirmations';
import { useLatestConfirmations } from '../../features/guest-list/hooks/useLatestConfirmations';
import { useRSVPForm } from '../../features/guest-list/hooks/useRSVPForm';
import {
  EVENT_INFO,
  RSVP_PAGE_CONTENT,
} from '../../shared/constants/events.constants';
import {
  HOME_SCENE_CONFIG,
  HOME_SURFACE_TOKENS,
} from '../../shared/constants/home.constants';
import { MESSAGES_DESTINATION } from '../../shared/constants/navigation.constants';
import { PageContainer } from '../../shared/components/PageContainer/PageContainer';
import { cn } from '../../shared/utils/cn';

function getCardMotion(shouldReduceMotion: boolean, delaySeconds: number) {
  return shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.35,
          ease: 'easeOut' as const,
          delay: delaySeconds,
        },
      };
}

export function GuestListPage() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { items, isLoading, error, refresh, prependConfirmation } = useLatestConfirmations();
  const {
    name,
    setName,
    error: formError,
    isSubmitting,
    successMessage,
    notificationMessage,
    submit,
  } = useRSVPForm();

  const handleSubmit = async () => {
    const response = await submit();

    if (response.success && response.data) {
      prependConfirmation({
        id: response.data.id,
        name: response.data.name,
        confirmedAt: response.data.confirmedAt,
        createdAt: response.data.createdAt,
      });
      void refresh();
    }
  };

  return (
    <main className="relative isolate overflow-hidden pb-24 pt-24 sm:pt-28">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundColor: HOME_SURFACE_TOKENS.skyColor,
          backgroundImage: [
            HOME_SURFACE_TOKENS.mistGlow,
            HOME_SURFACE_TOKENS.pageGlow,
          ].join(','),
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[45svh]"
        aria-hidden="true"
        style={{ backgroundImage: HOME_SURFACE_TOKENS.horizonGlow }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden">
        <div className="relative mx-auto aspect-[4/1] w-[172%] max-w-none sm:w-[128%] lg:w-full">
          {HOME_SCENE_CONFIG.footer.layers.map((layer) => (
            <img
              key={layer.id}
              src={layer.assetSrc}
              alt=""
              className="absolute inset-x-0 bottom-0 w-full object-contain"
              style={{ zIndex: layer.zIndex }}
            />
          ))}
        </div>
      </div>

      <PageContainer className="relative z-10">
        <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
          <motion.header
            className="space-y-4 text-center"
            {...getCardMotion(prefersReducedMotion, 0)}
          >
            <p className="font-display text-[0.68rem] uppercase tracking-[0.34em] text-ink/58">
              {RSVP_PAGE_CONTENT.eyebrow}
            </p>
            <div className="space-y-3">
              <h1 className="editorial-title text-[clamp(3rem,9vw,5.4rem)] uppercase tracking-[0.12em] text-ink">
                {RSVP_PAGE_CONTENT.title}
              </h1>
              <p className="mx-auto max-w-2xl font-body text-base leading-7 text-ink/74 sm:text-lg">
                {RSVP_PAGE_CONTENT.intro}
              </p>
            </div>
            <p className="font-display text-[0.68rem] uppercase tracking-[0.3em] text-ink/42">
              {EVENT_INFO.dateLabel}
            </p>
          </motion.header>

          <motion.section {...getCardMotion(prefersReducedMotion, 0.08)}>
            <GuestListForm
              name={name}
              onNameChange={setName}
              onSubmit={handleSubmit}
              errorMessage={formError}
              successMessage={successMessage}
              notificationMessage={notificationMessage}
              isSubmitting={isSubmitting}
            />
          </motion.section>

          <motion.section {...getCardMotion(prefersReducedMotion, 0.16)}>
            <LatestConfirmations
              items={items}
              isLoading={isLoading}
              errorMessage={error}
            />
          </motion.section>

          <motion.section
            className="flex justify-center"
            {...getCardMotion(prefersReducedMotion, 0.24)}
          >
            <Link
              to={MESSAGES_DESTINATION.route}
              aria-label="Open the guest messages page"
              className={cn(
                'inline-flex w-full max-w-[min(100%,18rem)] items-center justify-center rounded-full border border-ink/15 bg-paper/95 px-5 py-3 font-display text-[0.72rem] uppercase tracking-[0.24em] text-ink shadow-card backdrop-blur-sm transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2',
                !prefersReducedMotion && 'hover:-translate-y-0.5 hover:bg-white',
              )}
            >
              {MESSAGES_DESTINATION.label}
            </Link>
          </motion.section>
        </div>
      </PageContainer>
    </main>
  );
}
