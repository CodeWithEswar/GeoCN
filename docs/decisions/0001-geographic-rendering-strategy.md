# ADR-0001: Geographic Rendering Strategy for Administrative UI

## Context

Frontend applications frequently need administrative boundary visualization (countries, states, counties, sales territories, choropleths), but are forced to integrate heavy slippy-map engines (e.g. Mapbox GL JS, MapLibre, Google Maps) which introduce 800KB+ bundle footprints, WebGL requirements, external tile server dependencies, and proprietary API keys.

## Decision

For administrative geographic visualization and dashboards, GeoCN adopts a **lightweight, SVG-first rendering strategy** powered by mathematical projections (`d3-geo`).

## Consequences

- **Positive**:
  - Zero heavy tile runtime dependencies.
  - Full DOM and SVG inspectability, allowing Tailwind CSS and CSS variables to style boundaries and landmasses.
  - Native SSR and React Server Component compatibility.
  - Tiny runtime footprint (~15KB gzip).
  - Superior accessibility via native SVG DOM nodes (`<path>`, `<g>`, `<title>`, ARIA labels).
- **Negative / Constraints**:
  - Not suitable for street-level navigation, raster satellite imagery, or millions of dense raw points. Heavy tile engines may be introduced in a future vertical slice only when continuous zoom or raster tiles are explicitly required.
