import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { HOME_FOOTER_LAYER_DOM_RENDER_ORDER } from '../../../shared/constants/home.constants';
import type {
  HomeFooterMotionMode,
  HomeFooterSceneConfig,
} from '../../../shared/types/site.types';
import { cn } from '../../../shared/utils/cn';
import { HomeFooterLayer } from './HomeFooterLayer';

interface HomeFooterSceneProps {
  config: HomeFooterSceneConfig;
  isCompactHeightMode: boolean;
  isInteractive: boolean;
  motionMode: HomeFooterMotionMode;
}

export function HomeFooterScene({
  config,
  isCompactHeightMode,
  isInteractive,
  motionMode,
}: HomeFooterSceneProps) {
  const compactHeightCtaScale = isCompactHeightMode ? config.compactHeightLayerScale : 1;
  const renderedLayers = HOME_FOOTER_LAYER_DOM_RENDER_ORDER.map((layerId) => {
    return config.layers.find((layer) => layer.id === layerId);
  }).filter((layer): layer is (typeof config.layers)[number] => Boolean(layer));
  const sceneStyle = {
    '--footer-frame-width-mobile': isCompactHeightMode
      ? config.frameWidthCompact
      : config.frameWidthMobile,
    '--footer-frame-width-tablet': isCompactHeightMode
      ? config.frameWidthCompact
      : config.frameWidthTablet,
    '--footer-frame-width-desktop': isCompactHeightMode
      ? config.frameWidthCompact
      : config.frameWidthDesktop,
    '--footer-cta-offset-mobile': `${Math.round(config.cta.bottomOffsetMobile * compactHeightCtaScale)}px`,
    '--footer-cta-offset-tablet': `${Math.round(config.cta.bottomOffsetTablet * compactHeightCtaScale)}px`,
    '--footer-cta-offset-desktop': `${Math.round(config.cta.bottomOffsetDesktop * compactHeightCtaScale)}px`,
    '--footer-cta-max-width': config.cta.maxWidth,
  } as CSSProperties;
  const ctaPlacementClasses =
    config.cta.placement === 'above-front-layer'
      ? 'sm:justify-end sm:pr-8 lg:pr-14'
      : 'justify-center';

  return (
    <div
      className={cn(
        'relative isolate flex w-full items-end overflow-x-clip overflow-y-hidden',
        config.minHeight,
        config.bottomInset,
      )}
      style={sceneStyle}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(191,233,255,0)_34%,rgba(235,244,234,0.14)_58%,rgba(245,217,159,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_74%,rgba(255,247,214,0.28),rgba(255,247,214,0)_28%)]" />
      <div className="relative flex w-full items-end justify-center">
        <div className="relative aspect-[4/1] w-[var(--footer-frame-width-mobile)] max-w-none sm:w-[var(--footer-frame-width-tablet)] lg:w-[var(--footer-frame-width-desktop)]">
          {renderedLayers.map((layer) => (
            <HomeFooterLayer
              key={layer.id}
              layer={layer}
              motionMode={motionMode}
            />
          ))}
          {config.characters.map((character) => (
            <img
              key={character.id}
              src={character.assetSrc}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute select-none object-contain [image-rendering:pixelated] drop-shadow-[0_-8px_18px_rgba(20,16,10,0.2)]"
              style={{
                left: `${character.leftPercent}%`,
                bottom: `${character.bottomPercent}%`,
                width: `${character.widthPercent}%`,
                zIndex: character.zIndex,
              }}
            />
          ))}
          <div
            aria-hidden={!isInteractive}
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-[var(--footer-cta-offset-mobile)] z-40 flex px-4 sm:bottom-[var(--footer-cta-offset-tablet)] sm:px-6 lg:bottom-[var(--footer-cta-offset-desktop)] lg:px-10',
              ctaPlacementClasses,
            )}
          >
            <Link
              to={config.cta.route}
              aria-label={config.cta.ariaLabel}
              tabIndex={isInteractive ? 0 : -1}
              className={cn(
                'pointer-events-auto inline-flex w-full max-w-[var(--footer-cta-max-width)] items-center justify-center rounded-full border border-ink/15 bg-paper/95 px-5 py-3 font-display text-[0.72rem] uppercase tracking-[0.24em] text-ink shadow-card backdrop-blur-sm transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2',
                motionMode === 'reduced'
                  ? ''
                  : 'hover:-translate-y-0.5 hover:bg-white',
                !isInteractive && 'pointer-events-none opacity-0',
              )}
            >
              {config.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
