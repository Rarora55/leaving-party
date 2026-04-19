import { useEffect, useMemo, useState } from 'react';

const SAFE_AREA_INSET_BOTTOM = 'env(safe-area-inset-bottom, 0px)';
const KEYBOARD_INSET_THRESHOLD = 56;

export function useStickyComposerViewport() {
  const [keyboardInset, setKeyboardInset] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let frameId: number | null = null;

    const updateKeyboardInset = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        if (!window.visualViewport) {
          setKeyboardInset(0);
          return;
        }

        const { height, offsetTop } = window.visualViewport;
        const rawInset = Math.max(0, window.innerHeight - (height + offsetTop));
        const normalizedInset = rawInset >= KEYBOARD_INSET_THRESHOLD ? rawInset : 0;
        setKeyboardInset(normalizedInset);
      });
    };

    const visualViewport = window.visualViewport;
    updateKeyboardInset();
    visualViewport?.addEventListener('resize', updateKeyboardInset, { passive: true });
    visualViewport?.addEventListener('scroll', updateKeyboardInset, { passive: true });
    window.addEventListener('resize', updateKeyboardInset, { passive: true });

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
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
