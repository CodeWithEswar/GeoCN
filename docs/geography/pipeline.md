# GeoCN Geographic Pipeline Specification

GeoCN mandates that no geographic data enters the repository without traceable provenance, license verification, and geometric integrity checks.

---

## 1. Pipeline Stages

```text
External Geographic Source (Natural Earth, GADM, OpenStreetMap, GeoBoundaries)
        ↓
Source Manifest (packages/geo-data/manifests/<dataset-id>.manifest.json)
        ↓
Raw Staging (packages/geo-data/raw/<dataset-id>.geojson)
        ↓
Schema Validation (Zod Manifest & RFC 7946 Validator)
        ↓
Geometry Validation (Unique IDs, Coordinate Range [-180..180, -90..90], Bounding Box)
        ↓
Normalization (Standardized properties: id, name, code, adminLevel)
        ↓
Optimization (Precision quantization, deterministic rounding)
        ↓
Generated Artifact (packages/geo-data/generated/<dataset-id>.json)
        ↓
Registry Distribution & Component Consumption
```

---

## 2. Invariant Rules

### Rule 1: No Undocumented Geometries

Every dataset must possess a matching `<dataset-id>.manifest.json` specifying:

- Source organization name and URL
- Data acquisition timestamp (ISO 8601)
- License identifier (e.g. CC-BY-4.0, ODbL, Public Domain)
- Explicit redistribution approval boolean flag
- Original and target Coordinate Reference System (CRS)
- Expected feature count and bounding box

### Rule 2: Strict Coordinate Verification

Coordinates must strictly conform to RFC 7946:

- Longitude (x) first, Latitude (y) second.
- Longitude constrained to `[-180.0, 180.0]`.
- Latitude constrained to `[-90.0, 90.0]`.
- Coordinate values must be valid numbers (no `NaN` or `Infinity`).

### Rule 3: Unique Region Identifiers

Every feature in a `FeatureCollection` must have an explicit identifier (`feature.id` or `feature.properties.id`). Duplicate IDs within a dataset are rejected during validation.

---

## 3. Developer Tooling

To run dataset validation:

```bash
npm run geo:validate
```
