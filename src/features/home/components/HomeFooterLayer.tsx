import { useState, type CSSProperties } from 'react';
import type {
  HomeFooterMotionMode,
  HomeFooterSceneLayer,
} from '../../../shared/types/site.types';
import { cn } from '../../../shared/utils/cn';

interface HomeFooterLayerProps {
  layer: HomeFooterSceneLayer;
  motionMode: HomeFooterMotionMode;
}

const FALLBACK_LAYER_TINTS = {
  far: 'from-[#f2c37d]/12 via-[#c4894d]/36 to-[#684126]/72',
  front: 'from-[#7f4b22]/18 via-[#4c2b14]/55 to-[#241108]/92',
  mid: 'from-[#d59b5a]/14 via-[#8f5529]/40 to-[#40210f]/82',
} as const;

export function HomeFooterLayer({
  layer,
  motionMode,
}: HomeFooterLayerProps) {
  const [hasAssetError, setHasAssetError] = useState(false);
  const layerStyle = {
    zIndex: layer.zIndex,
  } as CSSProperties;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={layerStyle}
      aria-hidden="true"
    >
      <div className="absolute inset-0">
        {hasAssetError ? (
          <div
            className={cn(
              'absolute inset-x-0 bottom-0 h-[58%] border-t border-white/10 bg-gradient-to-t',
              FALLBACK_LAYER_TINTS[layer.depth],
            )}
          />
        ) : (
          <img
            src={layer.assetSrc}
            alt=""
            aria-hidden="true"
            className={cn(
              'block h-full w-full select-none object-contain object-bottom [image-rendering:pixelated]',
              motionMode === 'reduced'
                ? ''
                : layer.depth === 'far'
                  ? 'drop-shadow-[0_-10px_24px_rgba(19,61,77,0.12)]'
                  : 'drop-shadow-[0_-12px_28px_rgba(29,17,8,0.16)]',
            )}
            onError={() => setHasAssetError(true)}
          />
        )}
      </div>
    </div>
  );
}
