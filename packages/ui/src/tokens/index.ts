/**
 * @file packages/ui/src/tokens/index.ts
 * @description Technical cartographic design tokens and semantic color definitions.
 */

export const GEO_TOKENS = {
  cartographic: {
    // Landmass fill colors
    landDefault: "var(--geo-land)",
    landMuted: "var(--geo-land-muted)",
    landHover: "var(--geo-land-hover)",
    landSelected: "var(--geo-land-selected)",

    // Boundaries and administrative divisions
    boundary: "var(--geo-boundary)",
    boundaryMuted: "var(--geo-boundary-muted)",
    boundaryStrong: "var(--geo-boundary-strong)",

    // Water bodies
    water: "var(--geo-water)",

    // Coordinate grid and graticule markings
    grid: "var(--geo-grid)",
    gridLabel: "var(--geo-grid-label)",

    // Cartographic annotations
    label: "var(--geo-label)",
    labelMuted: "var(--geo-label-muted)",
  },
  typography: {
    fontSans: "var(--font-sans, ui-sans-serif, system-ui, sans-serif)",
    fontMono: "var(--font-mono, ui-monospace, SFMono-Regular, monospace)",
  },
} as const;

export type GeoTokens = typeof GEO_TOKENS;
