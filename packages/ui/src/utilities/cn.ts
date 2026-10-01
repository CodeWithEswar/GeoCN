/**
 * @file packages/ui/src/utilities/cn.ts
 * @description Standard className merging utility combining clsx and tailwind-merge.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
