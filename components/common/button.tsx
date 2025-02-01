import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-400 focus:outline-none',
        neutral:
          'bg-neutral text-neutral-foreground shadow hover:bg-neutral/90 disabled:bg-gray-200 disabled:text-gray-400 focus:outline-none',
        destructive:
          'bg-destructive text-destructive-foreground shadow hover:bg-destructive/80 focus:outline-none',
        destructiveOutline:
          'bg-background border-destructive border-solid border-2 text-destructive transition-all hover:bg-destructive/90 hover:text-destructive-foreground',
        outline:
          'h-3 bg-background text-primary border border-primary border-2 bg-background shadow-sm hover:bg-primary hover:text-primary-foreground',
        outlineNeutral:
          'text-neutral bg-background border-neutral border-2 border-solid shadow-sm transition-all hover:bg-neutral hover:text-neutral-foreground',
        secondary:
          'bg-background text-primary shadow-sm hover:bg-background/90 transition',
        ghost: 'text-black hover:bg-gray-200 transition',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8 px-6 py-2',
        sm: 'h-7 rounded-md px-2 py-1 text-xs',
        lg: 'h-10 rounded-md px-8 py-10',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
