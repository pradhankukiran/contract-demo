import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "flex min-h-[120px] w-full border border-input bg-background px-4 py-3 text-sm",
            "ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all resize-y",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField';
