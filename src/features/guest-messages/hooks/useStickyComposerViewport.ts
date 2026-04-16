import { useEffect, useMemo, useState } from 'react';

const SAFE_AREA_INSET_BOTTOM = 'env(safe-area-inset-bottom, 0px)';

export function useStickyComposerViewport() {
  const [keyboardInset, setKeyboardInset] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateKeyboardInset = () => {
      if (!window.visualViewport) {
        setKeyboardInset(0);
        return;
      }

      const { height, offsetTop } = window.visualViewport;
      const inset = Math.max(0, window.innerHeight - (height + offsetTop));
      setKeyboardInset(inset);
    };

    updateKeyboardInset();

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener('resize', updateKeyboardInset);
    visualViewport?.addEventListener('scroll', updateKeyboardInset);
    window.addEventListener('resize', updateKeyboardInset);

    return () => {
      visualViewport?.removeEventListener('resize', updateKeyboardInset);
      visualViewport?.removeEventListener('scroll', updateKeyboardInset);
      window.removeEventListener('resize', updateKeyboardInset);
    };
  }, []);

  const composerBottom = useMemo(
    () => `calc(${SAFE_AREA_INSET_BOTTOM} + ${keyboardInset}px)`,
    [keyboardInset],
  );

  return {
    keyboardInset,
    composerBottom,
  };
}
