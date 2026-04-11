import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'default' | 'ghost' | 'outline';
type ButtonSize = 'default' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-12 px-5 py-3 font-display text-[0.72rem] uppercase tracking-[0.24em]',
  icon: 'size-12 p-0',
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-ink text-paper shadow-card hover:-translate-y-0.5 hover:bg-[#1f2b48] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink/40',
  ghost:
    'bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink/20',
  outline:
    'border border-ink/15 bg-paper text-ink hover:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink/20',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = 'default', type = 'button', variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition duration-200 ease-out disabled:pointer-events-none disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
