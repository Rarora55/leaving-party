import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  HOME_NAVIGATION_OVERLAY_TOKENS,
  HOME_SURFACE_TOKENS,
} from '../../../shared/constants/home.constants';
import { HALF_MILE_SCENE_CONFIG } from '../../../shared/constants/halfMile.constants';
import { cn } from '../../../shared/utils/cn';
import { HalfMileHotspots } from './HalfMileHotspots';
import { generateHalfMileCloudPlacements } from './halfMileCloud.utils';

export function HalfMileScene() {
  const prefersReducedMotion =
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clouds = useMemo(() => {
    return generateHalfMileCloudPlacements(HALF_MILE_SCENE_CONFIG.clouds);
  }, []);

  return (
    <section
      className="relative min-h-svh overflow-x-clip px-1 sm:px-2"
      aria-label="The Half Mile map scene"
      data-testid="half-mile-scene"
      style={{
        backgroundColor: HOME_SURFACE_TOKENS.skyColor,
        backgroundImage: [HOME_SURFACE_TOKENS.mistGlow, HOME_SURFACE_TOKENS.pageGlow].join(','),
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ backgroundImage: HOME_NAVIGATION_OVERLAY_TOKENS.topHighlight }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40svh]"
        aria-hidden="true"
        style={{ backgroundImage: HOME_SURFACE_TOKENS.horizonGlow }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute will-change-transform"
            style={{
              left: `${cloud.xPercent}%`,
              top: `${cloud.yPercent}%`,
              width: cloud.width,
              opacity: cloud.opacity,
              zIndex: cloud.zIndex,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={prefersReducedMotion ? '' : 'home-cloud-drift'}>
              <img
                src={cloud.assetSrc}
                alt=""
                aria-hidden="true"
                className="h-auto w-full select-none object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        <div className={cn(HALF_MILE_SCENE_CONFIG.mapTopMargin, HALF_MILE_SCENE_CONFIG.mapBottomMargin)}>
          <div
            className="relative mx-auto w-full"
            data-testid="half-mile-map-frame"
          >
            <img
              src={HALF_MILE_SCENE_CONFIG.mapAssetSrc}
              alt={HALF_MILE_SCENE_CONFIG.mapAlt}
              className="block h-auto w-full select-none object-contain"
              data-testid="half-mile-map-image"
            />
            <HalfMileHotspots breweries={HALF_MILE_SCENE_CONFIG.breweries} />
          </div>
        </div>
      </div>

      <Link
        to={HALF_MILE_SCENE_CONFIG.cta.route}
        aria-label={HALF_MILE_SCENE_CONFIG.cta.ariaLabel}
        data-testid="half-mile-home-cta"
        className={cn(
          'fixed left-1/2 z-40 inline-flex -translate-x-1/2 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide text-ink transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/45',
          HOME_SURFACE_TOKENS.cardClassName,
          HOME_SURFACE_TOKENS.outlineClassName,
        )}
        style={{
          bottom: `clamp(${HALF_MILE_SCENE_CONFIG.cta.bottomOffsetMobile}px, 2.8vw, ${HALF_MILE_SCENE_CONFIG.cta.bottomOffsetDesktop}px)`,
          maxWidth: HALF_MILE_SCENE_CONFIG.cta.maxWidth,
          width: 'calc(100% - 2rem)',
        }}
      >
        {HALF_MILE_SCENE_CONFIG.cta.label}
      </Link>
    </section>
  );
}
