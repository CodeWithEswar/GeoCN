# GeoCN System Architecture Overview

GeoCN is designed as a five-plane system that guarantees data provenance, framework-independent cartographic correctness, and zero runtime lock-in.

```text
GeoCN Architecture
│
├── 1. Documentation Plane (apps/www)
│   ├── Next.js App Router
│   ├── Technical Cartographic Design System
│   ├── Component Preview & Sizing Harness
│   └── Public Registry HTTP Endpoints (/r/*.json)
│
├── 2. Registry Plane (packages/registry & registry/)
│   ├── Shadcn-Compatible Registry Item Schemas
│   ├── Deterministic Generator Pipeline (registry:build)
│   ├── Dependency Resolution & File Existence Validator (registry:validate)
│   └── Distributable Component Artifacts (registry/registry.json)
│
├── 3. Geographic Core Plane (packages/geo)
│   ├── Pure Framework-Independent Projection Primitives (d3-geo)
│   ├── Strict Coordinate Bounds Checking (RFC 7946)
│   ├── Bounding Box & Centroid Calculation Utilities
│   └── Dynamic Container-Aware Projection Fitting
│
├── 4. Geographic Data Pipeline Plane (packages/geo-data)
│   ├── Typed Provenance Manifests (Zod Schema)
│   ├── Raw Geographic Data Staging
│   ├── Property & Administrative Level Normalization
│   └── Geometry Optimization & Deterministic Decimal Quantization
│
└── 5. Quality Pipeline Plane (tests/ & .github/workflows)
    ├── Unit Tests (vitest)
    ├── Geography Geometry & Invariant Fixture Tests
    ├── Registry Schema Invariant Tests
    └── Automated CI Quality Gates (Typecheck, Lint, Validate, Build)
```

---

## Data and Code Flow

1. **Geographic Data Flow**:
   External boundary sources (GeoJSON/TopoJSON) are registered with explicit provenance manifests (`packages/geo-data/manifests/`). During `npm run geo:validate`, datasets are verified against RFC 7946 coordinate limits, feature ID uniqueness, and bounding box invariants before normalization.

2. **Registry Distribution Flow**:
   Components authored under `@geocn/ui` and `@geocn/geo` are registered into `packages/registry/manifests/registry-items.ts`. Running `npm run registry:build` parses the items, validates file existence, extracts code contents, and emits distribution payloads to `registry/` and `apps/www/public/r/` for direct consumption by `npx shadcn@latest add ...`.

3. **Rendering & Layout Flow**:
   Components do not rely on hardcoded pixel sizes. Projections use `fitProjectionToContainer()` with ResizeObserver or container query boundaries, ensuring responsive rendering across desktop, tablet, and embedded dashboards.
