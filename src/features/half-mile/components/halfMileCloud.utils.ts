import type { HalfMileCloudPlacement, HalfMileCloudSeed } from '../../../shared/types/site.types';

const CTA_SAFE_ZONE_TOP = 80;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

const randomBetween = (
  min: number,
  max: number,
  randomFn: () => number,
) => {
  return min + ((max - min) * randomFn());
};

export const generateHalfMileCloudPlacements = (
  seeds: readonly HalfMileCloudSeed[],
  randomFn: () => number = Math.random,
): HalfMileCloudPlacement[] => {
  return seeds.map((seed) => {
    const xPercent = clamp(
      randomBetween(seed.minXPercent, seed.maxXPercent, randomFn),
      0,
      100,
    );
    const yRaw = randomBetween(seed.minYPercent, seed.maxYPercent, randomFn);
    const yPercent = clamp(yRaw, 0, CTA_SAFE_ZONE_TOP);

    return {
      id: seed.id,
      assetSrc: seed.assetSrc,
      width: seed.width,
      opacity: seed.opacity,
      xPercent,
      yPercent,
      zIndex: seed.zIndex,
    };
  });
};
