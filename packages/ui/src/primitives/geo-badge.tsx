/**
 * @file packages/ui/src/primitives/geo-badge.tsx
 * @description Technical cartographic badge for coordinate stamps, projection types, and provenance tags.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utilities/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[11px] font-medium leading-none tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-zinc-200 bg-zinc-100/80 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200",
        outline:
          "border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
        coordinate:
          "border-blue-200/80 bg-blue-50/60 text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300",
        verified:
          "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface GeoBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function GeoBadge({ className, variant, ...props }: GeoBadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
