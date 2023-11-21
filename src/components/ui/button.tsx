import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "cva";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:text-gray-a8 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-accent-9 text-accent-contrast hover:bg-accent-10 disabled:bg-gray-a3",
        soft: "bg-gray-a3 text-gray-12 hover:bg-gray-a4 disabled:bg-gray-a3",
        surface:
          "bg-accent-a2 text-accent-a11 ring-1 ring-accent-a7 hover:ring-accent-a8 disabled:ring-gray-a6 disabled:bg-gray-a2",
        outline:
          "ring-1 ring-gray-a11 text-gray-12 hover:bg-gray-a3 disabled:ring-gray-a7",
        danger:
          "bg-danger-9 text-danger-1 hover:bg-danger-10 disabled:bg-gray-a3",
        ghost: "hover:bg-gray-a3",
        link: "text-accent-a11 font-normal cursor-pointer hover:underline-offset-2 hover:underline hover:decoration-accent-a6",
      },
      size: {
        default: "h-8 px-3 py-1.5",
        sm: "h-7 py-1 px-2",
        lg: "h-10 rounded-md px-4",
        text: null,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
