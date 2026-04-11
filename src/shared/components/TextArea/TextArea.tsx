import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, rows = 6, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'flex min-h-36 w-full rounded-[1.4rem] border border-ink/12 bg-paper px-4 py-4 font-body text-base text-ink shadow-inner outline-none transition placeholder:text-ink/35 focus:border-ink/25 focus:bg-white',
          className,
        )}
        {...props}
      />
    );
  },
);

TextArea.displayName = 'TextArea';
