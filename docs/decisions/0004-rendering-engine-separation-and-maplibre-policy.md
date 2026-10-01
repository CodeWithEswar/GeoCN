# ADR-0004: Rendering Engine Separation and MapLibre Policy

## Context

Developers frequently ask whether an open-source mapping system should standardize entirely on WebGL tile-based engines like MapLibre GL JS, or on pure SVG-based rendering.
Attempting to force MapLibre into lightweight administrative dashboards causes excessive bundle bloat (800KB+ minified), complex canvas lifecycle issues in server-rendered environments, and poor inspectability for simple state/country maps. Conversely, attempting to render millions of continuous zoom vector tiles in pure SVG degrades browser DOM performance.

## Decision

GeoCN establishes an explicit **dual-engine boundary policy**:

1. **Default Engine: SVG + D3 Geo**
   - **Target**: Bounded administrative geography (countries, states, provinces, counties, choropleths, regional statistics, selection diagrams).
   - **Tech Stack**: React DOM + SVG `<path>` elements + `d3-geo` projection mathematics.
   - **Rationale**: Inspectable source code, seamless Tailwind CSS and CSS custom property styling, zero external canvas/WebGL overhead, instant SSR, superior accessibility.

2. **Specialized Engine: MapLibre GL JS**
   - **Target**: Deep zoomable basemaps, dense dynamic point clusters (>10,000 points), street-level vector tiles, continuous pan-and-zoom GIS exploration.
   - **Tech Stack**: WebGL canvas + vector tile server (PMTiles or tile APIs).
   - **Isolation**: MapLibre components will be packaged as distinct, explicit registry items (e.g. `maplibre-viewport`) and will **never** be a runtime dependency of core administrative SVG components.

## Consequences

- **Positive**:
  - The vast majority of frontend developers who only need country/state administrative visualization receive lightweight (~15KB) SVG components without WebGL bloat.
  - No monolithic engine switching inside single components; components have single, predictable responsibilities.
- **Negative / Constraints**:
  - Components built for SVG cannot seamlessly handle continuous worldwide street-level pan/zoom. That requires a dedicated vector-tile component.
