import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded bg-surface px-3 py-1.5 text-sm ring-1 ring-gray-a7 file:bg-transparent file:font-medium file:ring-0 placeholder:text-gray-a10 read-only:bg-gray-a3 read-only:text-gray-a11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-text disabled:bg-gray-a3 disabled:text-gray-a8 disabled:placeholder:text-gray-a8",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
