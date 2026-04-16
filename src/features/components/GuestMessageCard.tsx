import { PixelCard } from '../../shared/components/PixelCard/PixelCard';
import type { MessageCard } from '../../shared/types/site.types';
import { cn } from '../../shared/utils/cn';

interface GuestMessageCardProps {
  index: number;
  message: MessageCard;
}

const cardOffsets = [
  'self-start',
  'translate-y-3 self-start',
  'translate-y-1 self-start',
  'translate-y-4 self-start',
] as const;

export function GuestMessageCard({ index, message }: GuestMessageCardProps) {
  const offsetClassName = cardOffsets[index % cardOffsets.length];
  const cardColor = message.displayColor ?? 'bg-paper';
  const rotationStyle = { transform: `rotate(${message.displayRotation}deg)` };

  return (
    <PixelCard
      style={rotationStyle}
      className={cn(
        'w-full max-w-sm flex-1 basis-[18rem] border-ink/12 shadow-soft transition-transform hover:-translate-y-1',
        offsetClassName,
        cardColor,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-body text-base font-semibold text-ink">{message.guestName}</p>
          <p className="mt-1 font-body text-xs text-ink/50">
            {new Date(message.createdAt).toLocaleDateString([], {
              day: '2-digit',
              month: 'short',
            })}
          </p>
        </div>
        <span className="rounded-full border border-ink/10 bg-white/55 px-3 py-1 font-display text-[0.58rem] uppercase tracking-[0.28em] text-ink/50">
          Note
        </span>
      </div>
      <p className="mt-5 font-body text-base leading-7 text-ink/80">{message.message}</p>
    </PixelCard>
  );
}
