/**
 * @file packages/ui/src/hooks/use-geo-container.ts
 * @description Hydration-safe ResizeObserver hook computing responsive SVG viewport bounds and aspect ratios.
 */

import * as React from "react";

export interface GeoContainerDimensions {
  readonly width: number;
  readonly height: number;
  readonly aspect: number;
  readonly ready: boolean;
}

export interface UseGeoContainerOptions {
  /** Fallback width before mount or when container is 0-width (default: 800) */
  readonly defaultWidth?: number;
  /** Fallback height before mount or when container is 0-height (default: 500) */
  readonly defaultHeight?: number;
  /** Target fixed aspect ratio (width / height). If specified, height is derived from measured width. */
  readonly aspectRatio?: number;
}

export function useGeoContainer<T extends HTMLElement | SVGElement = HTMLDivElement>(
  targetRef: React.RefObject<T | null>,
  options: UseGeoContainerOptions = {}
): GeoContainerDimensions {
  const { defaultWidth = 800, defaultHeight = 500, aspectRatio } = options;

  const [dimensions, setDimensions] = React.useState<GeoContainerDimensions>({
    width: defaultWidth,
    height: aspectRatio ? defaultWidth / aspectRatio : defaultHeight,
    aspect: aspectRatio ?? defaultWidth / defaultHeight,
    ready: false,
  });

  React.useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    let frameId: number | null = null;

    const updateDimensions = (measuredWidth: number, measuredHeight: number) => {
      // Prevent 0-dimension updates on hidden tabs or unmounted frames
      const safeWidth = measuredWidth > 0 ? measuredWidth : defaultWidth;
      const safeHeight = aspectRatio
        ? safeWidth / aspectRatio
        : measuredHeight > 0
          ? measuredHeight
          : defaultHeight;

      setDimensions({
        width: Math.round(safeWidth),
        height: Math.round(safeHeight),
        aspect: safeWidth / safeHeight,
        ready: true,
      });
    };

    // Initial measurement
    const rect = element.getBoundingClientRect();
    updateDimensions(rect.width, rect.height);

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        let width = 0;
        let height = 0;

        if (entry.contentBoxSize && entry.contentBoxSize[0]) {
          width = entry.contentBoxSize[0].inlineSize;
          height = entry.contentBoxSize[0].blockSize;
        } else {
          width = entry.contentRect.width;
          height = entry.contentRect.height;
        }

        updateDimensions(width, height);
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [targetRef, defaultWidth, defaultHeight, aspectRatio]);

  return dimensions;
}
