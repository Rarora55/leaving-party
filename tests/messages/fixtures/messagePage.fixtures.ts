import type { MessageCard } from '../../../src/shared/types/site.types';

interface StickyComposerViewportFixture {
  composerBottom: string;
  keyboardInset: number;
}

export function createMessageCard(overrides: Partial<MessageCard> = {}): MessageCard {
  return {
    id: 'msg-1',
    guestName: 'Alex',
    message: 'See you soon! 🎉',
    displayRotation: 0,
    displayColor: 'bg-[#ddefe7]',
    createdAt: '2026-04-15T12:00:00.000Z',
    ...overrides,
  };
}

export function createMessageCards(count: number): MessageCard[] {
  return Array.from({ length: count }, (_, index) =>
    createMessageCard({
      id: `msg-${index + 1}`,
      guestName: `Guest ${index + 1}`,
      message: `Message ${index + 1} 🎈`,
      createdAt: new Date(2026, 3, 15, 10, index).toISOString(),
    }),
  );
}

export function createStickyComposerViewport(
  overrides: Partial<StickyComposerViewportFixture> = {},
): StickyComposerViewportFixture {
  return {
    composerBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0px)',
    keyboardInset: 0,
    ...overrides,
  };
}
