import { useEffect, useMemo, useState } from 'react';
import type { HalfMileBrewery } from '../../../shared/types/site.types';
import { cn } from '../../../shared/utils/cn';
import { HalfMileBreweryCard } from './HalfMileBreweryCard';

interface HalfMileHotspotsProps {
  breweries: readonly HalfMileBrewery[];
}

export function HalfMileHotspots({ breweries }: HalfMileHotspotsProps) {
  const [activeBreweryId, setActiveBreweryId] = useState<string | null>(null);

  const activeBrewery = useMemo(() => {
    return breweries.find((brewery) => brewery.id === activeBreweryId) ?? null;
  }, [activeBreweryId, breweries]);

  useEffect(() => {
    if (!activeBreweryId) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) {
        return;
      }

      if (target.closest('[data-half-mile-card="true"]')) {
        return;
      }

      if (target.closest('[data-half-mile-hotspot="true"]')) {
        return;
      }

      setActiveBreweryId(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveBreweryId(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeBreweryId]);

  return (
    <div className="absolute inset-0 z-30" data-testid="half-mile-hotspot-layer">
      {breweries.map((brewery) => {
        const isActive = activeBreweryId === brewery.id;
        const diameterMobile = brewery.hotspot.radiusPxMobile * 2;
        const diameterDesktop = brewery.hotspot.radiusPxDesktop * 2;

        return (
          <button
            key={brewery.id}
            type="button"
            data-half-mile-hotspot="true"
            data-testid={`hotspot-${brewery.id}`}
            aria-label={`Open ${brewery.name} details`}
            aria-expanded={isActive}
            onClick={() => setActiveBreweryId(brewery.id)}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter'
                || event.key === ' '
                || event.key === 'Space'
                || event.key === 'Spacebar'
              ) {
                event.preventDefault();
                setActiveBreweryId(brewery.id);
              }
            }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-0 bg-transparent outline-none',
              'focus-visible:ring-2 focus-visible:ring-ink/55 focus-visible:ring-offset-2 focus-visible:ring-offset-white/80',
            )}
            style={{
              left: `${brewery.hotspot.xPercent}%`,
              top: `${brewery.hotspot.yPercent}%`,
              width: `clamp(${diameterMobile}px, 6vw, ${diameterDesktop}px)`,
              height: `clamp(${diameterMobile}px, 6vw, ${diameterDesktop}px)`,
            }}
          >
            <span className="sr-only">{brewery.name}</span>
          </button>
        );
      })}

      {activeBrewery ? (
        <HalfMileBreweryCard
          brewery={activeBrewery}
          onClose={() => setActiveBreweryId(null)}
        />
      ) : null}
    </div>
  );
}
