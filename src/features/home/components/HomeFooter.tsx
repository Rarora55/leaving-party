import { motion, useMotionValueEvent, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useEffect, useState } from 'react';
import { HOME_SCENE_CONFIG } from '../../../shared/constants/home.constants';
import type { HomeFooterSceneConfig } from '../../../shared/types/site.types';
import { cn } from '../../../shared/utils/cn';
import { HomeFooterScene } from './HomeFooterScene';

interface HomeFooterProps {
  config: HomeFooterSceneConfig;
  footerProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

function useCompactHeightMode(maxHeight: number) {
  const [isCompactHeightMode, setIsCompactHeightMode] = useState(() => {
    return typeof window !== 'undefined'
      && window.matchMedia(`(max-height: ${maxHeight}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(`(max-height: ${maxHeight}px)`);
    const update = () => {
      setIsCompactHeightMode(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, [maxHeight]);

  return isCompactHeightMode;
}

export function HomeFooter({
  config,
  footerProgress,
  shouldReduceMotion,
}: HomeFooterProps) {
  const isCompactHeightMode = useCompactHeightMode(config.compactHeightMax);
  const [isInteractive, setIsInteractive] = useState(() => footerProgress.get() >= 0.72);
  const opacity = useTransform(footerProgress, [0, 0.15, 1], [0, 0.4, 1]);
  const y = useTransform(
    footerProgress,
    [0, 1],
    [
      shouldReduceMotion
        ? HOME_SCENE_CONFIG.motion.footerReducedEnterY
        : HOME_SCENE_CONFIG.motion.footerEnterY,
      0,
    ],
  );
  const scale = useTransform(
    footerProgress,
    [0, 1],
    [shouldReduceMotion ? 1 : 0.985, 1],
  );
  const motionMode = shouldReduceMotion ? 'reduced' : 'full';

  useEffect(() => {
    setIsInteractive(footerProgress.get() >= 0.72);
  }, [footerProgress]);

  useMotionValueEvent(footerProgress, 'change', (latest) => {
    const nextIsInteractive = latest >= 0.72;
    setIsInteractive((current) => {
      return current === nextIsInteractive ? current : nextIsInteractive;
    });
  });

  return (
    <section
      className="relative flex w-full items-end overflow-hidden"
      aria-labelledby="home-footer-scene-heading"
    >
      <h2 id="home-footer-scene-heading" className="sr-only">
        Farewell road scene with RSVP call to action
      </h2>
      <motion.div
        className={cn('w-full', isInteractive ? 'pointer-events-auto' : 'pointer-events-none')}
        style={{ opacity, scale, transformOrigin: 'center bottom', y }}
      >
        <HomeFooterScene
          config={config}
          isCompactHeightMode={isCompactHeightMode}
          isInteractive={isInteractive}
          motionMode={motionMode}
        />
      </motion.div>
    </section>
  );
}
