import { motion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { HOME_SCENE_CONFIG } from '../../../shared/constants/home.constants';
import type { HomeTitleRevealConfig } from '../../../shared/types/site.types';

interface HomeTitleRevealProps {
  config: HomeTitleRevealConfig;
  footerFadeOutRange: readonly [number, number];
  sceneProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

export function HomeTitleReveal({
  config,
  footerFadeOutRange,
  sceneProgress,
  shouldReduceMotion,
}: HomeTitleRevealProps) {
  const mobileCta = HOME_SCENE_CONFIG.footer.cta;
  const titleOpacity = useTransform(
    sceneProgress,
    [
      config.titleRevealRange[0],
      config.titleRevealRange[1],
      footerFadeOutRange[0],
      footerFadeOutRange[1],
    ],
    [0, 1, 1, 0],
  );
  const dateOpacity = useTransform(
    sceneProgress,
    [
      config.dateRevealRange[0],
      config.dateRevealRange[1],
      footerFadeOutRange[0],
      footerFadeOutRange[1],
    ],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(
    sceneProgress,
    [
      config.titleRevealRange[0],
      config.titleRevealRange[1],
      footerFadeOutRange[0],
      footerFadeOutRange[1],
    ],
    [
      shouldReduceMotion
        ? HOME_SCENE_CONFIG.motion.reducedMotionTranslateY
        : HOME_SCENE_CONFIG.motion.titleTranslateY,
      0,
      0,
      shouldReduceMotion ? -4 : -18,
    ],
  );
  const dateY = useTransform(
    sceneProgress,
    [
      config.dateRevealRange[0],
      config.dateRevealRange[1],
      footerFadeOutRange[0],
      footerFadeOutRange[1],
    ],
    [
      shouldReduceMotion
        ? HOME_SCENE_CONFIG.motion.reducedMotionTranslateY
        : HOME_SCENE_CONFIG.motion.dateTranslateY,
      0,
      0,
      shouldReduceMotion ? -3 : -12,
    ],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-6">
      <div className="max-w-5xl text-center">
        <motion.h1
          className="editorial-title text-balance leading-[0.92] text-black"
          style={{
            color: config.textColor,
            fontFamily: config.fontFamily,
            fontSize: `clamp(${config.titleSizeMobile}px, 7vw, ${config.titleSizeDesktop}px)`,
            letterSpacing: '-0.05em',
            opacity: titleOpacity,
            y: titleY,
          }}
        >
          {config.title}
        </motion.h1>
        <motion.p
          className="editorial-title text-balance leading-none text-black"
          style={{
            color: config.textColor,
            fontFamily: config.fontFamily,
            fontSize: `clamp(${config.dateSizeMobile}px, 3.4vw, ${config.dateSizeDesktop}px)`,
            letterSpacing: '-0.03em',
            marginTop: config.dateSpacingPx,
            opacity: dateOpacity,
            y: dateY,
          }}
        >
          {config.date}
        </motion.p>
        <motion.p
          className="text-balance text-center font-medium leading-tight"
          style={{
            color: config.subtitleColor,
            fontSize: `clamp(${config.subtitleSizeMobile}px, 2.6vw, ${config.subtitleSizeDesktop}px)`,
            letterSpacing: '-0.01em',
            marginTop: config.subtitleSpacingPx,
            opacity: dateOpacity,
            y: dateY,
          }}
        >
          {config.subtitle}
        </motion.p>
        <motion.p
          className="text-balance text-center font-medium leading-tight"
          style={{
            color: config.subtitleColor,
            fontSize: `clamp(${config.subtitleSizeMobile}px, 2.4vw, ${config.subtitleSizeDesktop - 1}px)`,
            letterSpacing: '-0.01em',
            marginTop: 10,
            opacity: dateOpacity,
            y: dateY,
          }}
        >
          We'll be there at <span className="text-red-600">5:00 PM</span>
        </motion.p>
        <motion.p
          className="text-balance text-center font-medium leading-tight"
          style={{
            color: config.subtitleColor,
            fontSize: `clamp(${config.subtitleSizeMobile}px, 2.3vw, ${config.subtitleSizeDesktop - 2}px)`,
            letterSpacing: '-0.01em',
            marginTop: 6,
            opacity: dateOpacity,
            y: dateY,
          }}
        >
          Unit 15, Blackhorse Ln, London E17 5QJ
        </motion.p>
        <motion.div
          className="mt-5 flex justify-center sm:hidden"
          style={{ opacity: dateOpacity, y: dateY }}
        >
          <Link
            to={mobileCta.route}
            aria-label={mobileCta.ariaLabel}
            className="pointer-events-auto inline-flex w-full max-w-[18rem] items-center justify-center rounded-full border border-ink/15 bg-paper/95 px-5 py-3 font-display text-[0.72rem] uppercase tracking-[0.24em] text-ink shadow-card backdrop-blur-sm transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2"
          >
            {mobileCta.label}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
