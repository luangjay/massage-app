import * as React from "react";
import { cva, type VariantProps } from "cva";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium leading-none",
  {
    variants: {
      variant: {
        default: "bg-accent-9 text-accent-contrast",
        soft: "bg-gray-a3 text-gray-12",
        surface: "bg-accent-a2 text-accent-a11 ring-1 ring-accent-a7",
        outline: "text-gray-12 ring-1 ring-gray-a11",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
