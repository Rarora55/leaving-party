import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type PixelCardProps = HTMLAttributes<HTMLDivElement>;

export function PixelCard({ className, ...props }: PixelCardProps) {
  return (
    <div
      className={cn(
        'rounded-[2rem] border border-ink/10 p-6 shadow-card backdrop-blur-sm sm:p-7',
        className,
      )}
      {...props}
    />
  );
}
