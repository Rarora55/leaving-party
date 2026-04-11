import { motion } from 'motion/react';
import { useRef } from 'react';
import { HOME_SCENE_CONFIG } from '../../../shared/constants/home.constants';
import { HomeCloudField } from './HomeCloudField';
import { HomeFooter } from './HomeFooter';
import { HomeSkyLayer } from './HomeSkyLayer';
import { HomeTitleReveal } from './HomeTitleReveal';
import { useHomeSceneProgress } from '../useHomeSceneProgress';

export function HomeScene() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const { cloudProgress, footerProgress, sceneProgress, shouldReduceMotion } =
    useHomeSceneProgress(sceneRef);
  const totalSceneHeight =
    HOME_SCENE_CONFIG.stickyScrollHeightVh + HOME_SCENE_CONFIG.footerScrollHeightVh;

  return (
    <section
      ref={sceneRef}
      className="relative overflow-clip"
      aria-label="Scroll-driven farewell home scene"
      style={{ minHeight: `${totalSceneHeight}svh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <HomeSkyLayer color={HOME_SCENE_CONFIG.initialSkyColor} />
        <HomeCloudField
          cloudProgress={cloudProgress}
          clouds={HOME_SCENE_CONFIG.clouds}
          shouldReduceMotion={shouldReduceMotion}
        />
        <HomeTitleReveal
          config={HOME_SCENE_CONFIG.title}
          footerFadeOutRange={HOME_SCENE_CONFIG.footer.titleFadeOutRange}
          sceneProgress={sceneProgress}
          shouldReduceMotion={shouldReduceMotion}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42svh] bg-gradient-to-t from-[rgba(246,211,150,0.58)] via-[rgba(255,240,208,0.18)] to-transparent"
          style={{ opacity: footerProgress }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10">
          <HomeFooter
            config={HOME_SCENE_CONFIG.footer}
            footerProgress={footerProgress}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      </div>
    </section>
  );
}
