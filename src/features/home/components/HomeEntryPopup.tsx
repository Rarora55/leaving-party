import { useEffect, useRef } from 'react';
import popupAsset from '../../../../Components/Popup/Popup.png';
import { HOME_SURFACE_TOKENS } from '../../../shared/constants/home.constants';
import { cn } from '../../../shared/utils/cn';

interface HomeEntryPopupProps {
  onClose: () => void;
}

export function HomeEntryPopup({ onClose }: HomeEntryPopupProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px]"
      role="presentation"
      onClick={onClose}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-label="Welcome details"
        className={cn(
          'relative w-full max-w-[35rem] rounded-2xl p-4 text-ink sm:p-5',
          HOME_SURFACE_TOKENS.cardClassName,
          HOME_SURFACE_TOKENS.outlineClassName,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/35 bg-transparent text-base font-semibold leading-none shadow-md transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          aria-label="Close welcome popup"
        >
          X
        </button>

        <div className="relative mb-3">
          <img
            src={popupAsset}
            alt=""
            aria-hidden="true"
            className="h-auto w-full rounded-xl object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute bottom-[9%] right-[14%] rounded-md border-2 border-dashed border-ink/35 bg-transparent px-7 py-2 text-base font-semibold text-transparent transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          >
            Got it
          </button>
        </div>

        <h2 className="pr-10 text-base font-semibold tracking-wide">Welcome</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/80">
          We are leaving soon. Check the map and party details below.
        </p>

      </article>
    </div>
  );
}




