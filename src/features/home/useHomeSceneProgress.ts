import { useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import type { MotionValue, SpringOptions } from 'motion/react';
import type { RefObject } from 'react';
import { HOME_SCENE_CONFIG } from '../../shared/constants/home.constants';

interface HomeSceneProgress {
  cloudProgress: MotionValue<number>;
  footerProgress: MotionValue<number>;
  sceneProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

const springConfig: SpringOptions = {
  stiffness: 120,
  damping: 28,
  mass: 0.2,
};

export function useHomeSceneProgress(
  target: RefObject<HTMLElement | null>,
): HomeSceneProgress {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion ?? false;
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start start', 'end end'],
  });

  const smoothSceneProgress = useSpring(scrollYProgress, springConfig);
  const sceneProgress = shouldReduceMotion ? scrollYProgress : smoothSceneProgress;
  const cloudTravelRange = [...HOME_SCENE_CONFIG.motion.cloudTravelRange];
  const footerRevealRange = [...HOME_SCENE_CONFIG.footer.revealRange] as [number, number];

  const cloudProgress = useTransform(sceneProgress, cloudTravelRange, [0, 1]);
  const footerProgress = useTransform(sceneProgress, footerRevealRange, [0, 1]);

  return {
    cloudProgress,
    footerProgress,
    sceneProgress,
    shouldReduceMotion,
  };
}
