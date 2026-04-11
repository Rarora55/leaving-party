import { motion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
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
      </div>
    </div>
  );
}
