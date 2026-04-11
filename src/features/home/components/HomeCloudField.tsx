import { motion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useState, type CSSProperties } from 'react';
import type { HomeCloudLayer } from '../../../shared/types/site.types';

interface HomeCloudFieldProps {
  cloudProgress: MotionValue<number>;
  clouds: readonly HomeCloudLayer[];
  shouldReduceMotion: boolean;
}

interface HomeCloudLayerItemProps {
  cloudProgress: MotionValue<number>;
  layer: HomeCloudLayer;
  shouldReduceMotion: boolean;
}

function HomeCloudLayerItem({
  cloudProgress,
  layer,
  shouldReduceMotion,
}: HomeCloudLayerItemProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const scrollX = useTransform(cloudProgress, [0, 1], [0, layer.scrollTravelX]);
  const layerStyle = {
    '--cloud-delay': `${layer.ambientDelaySeconds}s`,
    '--cloud-drift': `${layer.ambientDriftX}px`,
    '--cloud-duration': `${layer.ambientDurationSeconds}s`,
    left: `${layer.baseXPercent}%`,
    opacity: layer.opacity,
    top: `${layer.baseYPercent}%`,
    width: layer.width,
    zIndex: layer.zIndex,
  } as CSSProperties;

  if (!isAvailable) {
    return null;
  }

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        ...layerStyle,
        x: scrollX,
      }}
    >
      <div className={shouldReduceMotion ? '' : 'home-cloud-drift'}>
        <img
          src={layer.assetSrc}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full select-none object-contain"
          onError={() => setIsAvailable(false)}
        />
      </div>
    </motion.div>
  );
}

export function HomeCloudField({
  cloudProgress,
  clouds,
  shouldReduceMotion,
}: HomeCloudFieldProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map((layer) => (
        <HomeCloudLayerItem
          key={layer.id}
          cloudProgress={cloudProgress}
          layer={layer}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </div>
  );
}
