# ADR-0003: Provenance-First Geographic Data & Manifest Architecture

## Context

Many mapping and visualization projects silently bundle arbitrary GeoJSON files found across the internet without recording their origin, license, administrative level, or transformation history. This introduces severe legal risks for commercial applications (license violations), geographic inaccuracies (disputed boundaries, mismatched coordinate references), and payload bloat (unsimplified coordinates).

## Decision

GeoCN enforces a **provenance-first geographic data pipeline**. No geometry enters the repository without a typed manifest schema (`GeoDatasetManifest`) declaring source, license, redistribution rights, CRS, and transformation records.

## Consequences

- **Positive**:
  - Full legal compliance and traceable attribution.
  - Reproducible, deterministic builds.
  - Clean separation between raw upstream geometries and optimized production artifacts.
  - Actionable build-time diagnostics preventing broken or unverified geometry from reaching developers.
- **Negative / Constraints**:
  - Contributing new datasets requires completing a manifest and passing the validator suite.
