import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-[1.15rem] border border-ink/12 bg-paper px-4 py-3 font-body text-base text-ink shadow-inner outline-none transition placeholder:text-ink/35 focus:border-ink/25 focus:bg-white',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
