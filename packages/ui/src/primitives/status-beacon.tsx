/**
 * @file packages/ui/src/primitives/status-beacon.tsx
 * @description Technical status beacon indicator for datasets, quality gates, and registry items.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utilities/cn";

const beaconVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-xs tracking-tight",
  {
    variants: {
      status: {
        success: "text-emerald-600 dark:text-emerald-400",
        warning: "text-amber-600 dark:text-amber-400",
        error: "text-rose-600 dark:text-rose-400",
        neutral: "text-zinc-600 dark:text-zinc-400",
        info: "text-sky-600 dark:text-sky-400",
      },
    },
    defaultVariants: {
      status: "neutral",
    },
  }
);

const dotVariants = cva("size-2 rounded-full", {
  variants: {
    status: {
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      error: "bg-rose-500",
      neutral: "bg-zinc-400",
      info: "bg-sky-500",
    },
  },
  defaultVariants: {
    status: "neutral",
  },
});

export interface StatusBeaconProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof beaconVariants> {
  children?: React.ReactNode;
}

export function StatusBeacon({
  className,
  status,
  children,
  ...props
}: StatusBeaconProps) {
  return (
    <span className={cn(beaconVariants({ status }), className)} {...props}>
      <span className={cn(dotVariants({ status }))} aria-hidden="true" />
      {children ? <span>{children}</span> : null}
    </span>
  );
}
