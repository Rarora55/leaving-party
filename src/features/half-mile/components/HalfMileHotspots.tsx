import { useEffect, useMemo, useState } from 'react';
import starAsset from '../../../../Components/Popup/star.png';
import type { HalfMileBrewery } from '../../../shared/types/site.types';
import { cn } from '../../../shared/utils/cn';
import { HalfMileBreweryCard } from './HalfMileBreweryCard';

interface HalfMileHotspotsProps {
  breweries: readonly HalfMileBrewery[];
}

export function HalfMileHotspots({ breweries }: HalfMileHotspotsProps) {
  const [activeBreweryId, setActiveBreweryId] = useState<string | null>(null);
  const [lastTriggerElement, setLastTriggerElement] = useState<HTMLButtonElement | null>(null);

  const activeBrewery = useMemo(() => {
    return breweries.find((brewery) => brewery.id === activeBreweryId) ?? null;
  }, [activeBreweryId, breweries]);

  useEffect(() => {
    if (!activeBreweryId) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeBreweryId]);

  const closePopup = () => {
    setActiveBreweryId(null);
    if (lastTriggerElement && document.contains(lastTriggerElement)) {
      lastTriggerElement.focus();
    }
  };

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
            onClick={(event) => {
              setLastTriggerElement(event.currentTarget);
              setActiveBreweryId(brewery.id);
            }}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter'
                || event.key === ' '
                || event.key === 'Space'
                || event.key === 'Spacebar'
              ) {
                event.preventDefault();
                setLastTriggerElement(event.currentTarget);
                setActiveBreweryId(brewery.id);
              }
            }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-black outline-none transition-colors duration-150',
              isActive ? 'bg-red-500' : 'bg-red-500/30 hover:bg-cyan-100',
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
            {brewery.id === 'signature-brew' ? (
              <img
                src={starAsset}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            ) : null}
          </button>
        );
      })}

      {activeBrewery ? (
        <HalfMileBreweryCard
          brewery={activeBrewery}
          onClose={closePopup}
        />
      ) : null}
    </div>
  );
}
