import { GeoBadge, StatusBeacon } from "@geocn/ui";

export default function PipelineDocsPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Data Governance</GeoBadge>
          <StatusBeacon status="success">Validated</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Geographic Data Provenance Pipeline
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN treats geographic boundaries with strict provenance accounting. Every
          boundary file is tracked from raw acquisition through validation and
          optimization.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Pipeline flow */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          The Provenance Lifecycle
        </h2>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200 leading-relaxed">
          External Source → Manifest Schema → Raw Staging → RFC 7946 Validator →
          Normalization → Generated Artifact → Registry Distribution
        </div>
      </section>

      {/* Manifest Schema */}
      <section id="provenance" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Dataset Manifest Schema
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Every dataset in{" "}
          <code className="font-mono text-xs">packages/geo-data/manifests/</code> must
          satisfy the strict Zod schema:
        </p>
        <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 leading-relaxed">
          {`interface GeoDatasetManifest {
  id: string;                    // Lowercase alphanumeric slug
  name: string;                  // Human-readable dataset name
  country?: string;              // ISO country name
  iso2?: string;                 // ISO-3166-1 alpha-2 code
  adminLevel?: number | string;  // Admin level (0 = country, 1 = state/province)
  source: {
    name: string;                // Upstream provider name
    url: string;                 // Provenance source URL
  };
  license: {
    name: string;                // SPDX license identifier
    attribution?: string;        // Attribution requirement
    redistributionAllowed: bool; // Explicit redistribution check
  };
  acquiredAt: string;            // ISO 8601 acquisition timestamp
  format: "geojson" | "topojson";
  crs: string;                   // Coordinate reference system (e.g. EPSG:4326)
  featureCount: number;          // Verified feature count
  bbox: [minLng, minLat, maxLng, maxLat];
  relativePath: string;          // Path to geometry file
  transformations: GeoTransformation[];
}`}
        </pre>
      </section>

      {/* Validation CLI */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Running Dataset Validation
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Maintainers can validate all geographic datasets and manifests at any time:
        </p>
        <div className="relative rounded-md bg-zinc-950 p-4 font-mono text-xs text-zinc-100">
          <code>npm run geo:validate</code>
        </div>
      </section>
    </div>
  );
}
