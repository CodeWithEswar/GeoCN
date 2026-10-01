# @geocn/geo-data

> Geographic dataset pipeline, provenance manifests, normalization scripts, and validation tooling.

## Pipeline Architecture

Every geographic dataset ingested into GeoCN must flow through the deterministic provenance pipeline:

```text
External Geographic Source
          ↓
Source Manifest (packages/geo-data/manifests/*.manifest.json)
          ↓
Raw Staging (packages/geo-data/raw/)
          ↓
Schema & Coordinate Validation (scripts/geo/validate-datasets.ts)
          ↓
Normalization & ID Standardization (packages/geo-data/normalized/)
          ↓
Geometry Optimization & Simplification (packages/geo-data/generated/)
          ↓
Registry Distribution & Component Consumption
```

## Directory Structure

- `manifests/`: Typed JSON manifests specifying source provenance, license, CRS, feature count, bounding box, and transformation history.
- `raw/`: Unmodified upstream raw downloads (never committed if restricted by redistribution license).
- `normalized/`: Standardized GeoJSON/TopoJSON adhering to RFC 7946 and GeoCN property invariants (`id`, `name`, `code`, `adminLevel`).
- `generated/`: Minified, simplified, production-ready geometries ready for registry distribution.
- `schemas/`: Zod validation schemas enforcing data integrity at build time.

## Validation

Run the dataset validation suite:

```bash
npm run geo:validate
```
