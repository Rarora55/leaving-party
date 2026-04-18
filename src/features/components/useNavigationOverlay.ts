import { useCallback, useEffect, useRef, useState } from 'react';

interface CloseOverlayOptions {
  restoreScroll?: boolean;
}

export const useNavigationOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPositionBeforeOpen = useRef(0);

  const lockBodyScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.documentElement.style.overflow = '';
  }, []);

  const openOverlay = useCallback(() => {
    if (isOpen) {
      return;
    }

    scrollPositionBeforeOpen.current = window.scrollY || document.documentElement.scrollTop;
    setIsOpen(true);
    lockBodyScroll();
  }, [isOpen, lockBodyScroll]);

  const closeOverlay = useCallback(
    (options: CloseOverlayOptions = { restoreScroll: false }) => {
      if (!isOpen) {
        return;
      }

      setIsOpen(false);
      unlockBodyScroll();

      if (options.restoreScroll !== false) {
        window.scrollTo(0, scrollPositionBeforeOpen.current);
      }
    },
    [isOpen, unlockBodyScroll],
  );

  const toggleOverlay = useCallback(() => {
    if (isOpen) {
      closeOverlay();
      return;
    }

    openOverlay();
  }, [closeOverlay, isOpen, openOverlay]);

  useEffect(() => {
    return () => {
      unlockBodyScroll();
    };
  }, [unlockBodyScroll]);

  return {
    isOpen,
    openOverlay,
    closeOverlay,
    toggleOverlay,
  };
};
