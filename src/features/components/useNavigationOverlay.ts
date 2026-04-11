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
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }, []);

  const openOverlay = useCallback(() => {
    scrollPositionBeforeOpen.current = window.scrollY || document.documentElement.scrollTop;
    setIsOpen(true);
    lockBodyScroll();
  }, [lockBodyScroll]);

  const closeOverlay = useCallback(
    (options: CloseOverlayOptions = {}) => {
      setIsOpen(false);
      unlockBodyScroll();

      if (options.restoreScroll !== false) {
        window.scrollTo(0, scrollPositionBeforeOpen.current);
      }
    },
    [unlockBodyScroll],
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
