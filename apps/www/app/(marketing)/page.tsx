import Link from "next/link";
import { ArrowRight, Code2, Database, ShieldCheck, Terminal } from "lucide-react";
import { GeoBadge, StatusBeacon } from "@geocn/ui";
import { ComponentPreview } from "../../components/preview/component-preview";
import { calculateBoundingBox, createProjection } from "@geocn/geo";
import { geoPath } from "d3-geo";
import type { FeatureCollection } from "geojson";

// Import sample fixture directly to verify rendering pipeline
import fixtureDataRaw from "../../../../tests/fixtures/sample-admin-fixture.json";

const fixtureData = fixtureDataRaw as unknown as FeatureCollection;

export default function HomePage() {
  // Compute projection path for sample test fixture
  const _bbox = calculateBoundingBox(fixtureData);
  const projection = createProjection({
    type: "mercator",
  });

  // Center and fit projection in a 400x240 SVG view
  const [[minX, minY], [maxX, maxY]] = [
    [10.0, 45.0],
    [15.0, 55.0],
  ];
  const centerLng = (minX + maxX) / 2;
  const centerLat = (minY + maxY) / 2;

  projection.center([centerLng, centerLat]).scale(850).translate([200, 120]);

  const pathGenerator = geoPath().projection(projection);

  return (
    <div className="flex flex-col items-center">
      {/* Engineering Header Reference */}
      <section className="w-full border-b border-zinc-200/80 bg-zinc-50/50 py-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 text-xs font-mono text-zinc-500 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-zinc-700 dark:text-zinc-300 font-semibold">
              GRID REF:
            </span>
            <span>45.0000°N — 55.0000°N / 10.0000°E — 15.0000°E</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>CRS: EPSG:4326</span>
            <span>SPEC: RFC 7946</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-start gap-6 max-w-3xl">
          <div className="flex items-center gap-2">
            <GeoBadge variant="verified">Open Source</GeoBadge>
            <GeoBadge variant="default">shadcn Registry Model</GeoBadge>
            <StatusBeacon status="success">Deterministic Pipeline</StatusBeacon>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Geographic UI Registry for React & Next.js
          </h1>

          <p className="text-base text-zinc-600 dark:text-zinc-400 sm:text-lg leading-relaxed">
            Carefully engineered geographic React components, projection primitives, and
            validated administrative boundaries. Distributed as inspectable source code
            following the shadcn model.
          </p>

          {/* Philosophy Lifecycle */}
          <div className="my-2 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
            <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 dark:border-zinc-800 dark:bg-zinc-900 font-semibold text-zinc-900 dark:text-zinc-100">
              Install
            </span>
            <span>→</span>
            <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 dark:border-zinc-800 dark:bg-zinc-900 font-semibold text-zinc-900 dark:text-zinc-100">
              Inspect
            </span>
            <span>→</span>
            <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 dark:border-zinc-800 dark:bg-zinc-900 font-semibold text-zinc-900 dark:text-zinc-100">
              Understand
            </span>
            <span>→</span>
            <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 dark:border-zinc-800 dark:bg-zinc-900 font-semibold text-zinc-900 dark:text-zinc-100">
              Modify
            </span>
            <span>→</span>
            <span className="rounded border border-zinc-900 bg-zinc-900 px-2 py-1 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 font-semibold">
              Own
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/docs"
              className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Get Started <ArrowRight className="ml-1.5 size-4" />
            </Link>
            <Link
              href="/docs/architecture"
              className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 bg-background px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Architecture Overview
            </Link>
          </div>
        </div>

        {/* Live Architectural Vertical Slice Preview */}
        <div className="mt-14">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              <Code2 className="size-4" />
              <span>ARCHITECTURAL VERIFICATION PREVIEW: MATHEMATICAL SVG PROJECTION</span>
            </div>
            <GeoBadge variant="coordinate">BBOX: [10, 45, 15, 55]</GeoBadge>
          </div>

          <ComponentPreview
            title="Sample Admin Fixture Geometry"
            description="Pure SVG rendering rendered deterministically from @geocn/geo projection primitives"
            code={`// Example: Rendering pure SVG geometry from @geocn/geo
import { createProjection } from "@geocn/geo";
import { geoPath } from "d3-geo";

const projection = createProjection({ type: "mercator" })
  .center([12.5, 50.0])
  .scale(850)
  .translate([200, 120]);

const pathGenerator = geoPath().projection(projection);`}
          >
            <div className="flex flex-col items-center gap-3 p-4">
              <svg
                width={400}
                height={240}
                viewBox="0 0 400 240"
                className="rounded border border-zinc-300 bg-zinc-50/50 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40"
                role="img"
                aria-label="Sample Administrative Boundary Vector Rendering"
              >
                {/* Graticule lines */}
                <path
                  d="M 50,0 L 50,240 M 150,0 L 150,240 M 250,0 L 250,240 M 350,0 L 350,240 M 0,60 L 400,60 M 0,120 L 400,120 M 0,180 L 400,180"
                  stroke="currentColor"
                  className="text-zinc-200 dark:text-zinc-800/80"
                  strokeWidth={0.5}
                  strokeDasharray="2 2"
                />

                {/* Render features from test fixture */}
                {fixtureData.features.map((feature) => {
                  const d = pathGenerator(feature);
                  if (!d) return null;
                  const featureName =
                    (feature.properties && "name" in feature.properties
                      ? String(feature.properties.name)
                      : String(feature.id)) ?? "Region";
                  return (
                    <path
                      key={String(feature.id)}
                      d={d}
                      className="fill-zinc-200 stroke-zinc-700 transition-colors hover:fill-zinc-300 dark:fill-zinc-800 dark:stroke-zinc-400 dark:hover:fill-zinc-700"
                      strokeWidth={1.5}
                    >
                      <title>{featureName}</title>
                    </path>
                  );
                })}
              </svg>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span>Features: {fixtureData.features.length}</span>
                <span>•</span>
                <span>Type: Synthetic Test Fixture</span>
                <span>•</span>
                <span>Status: Validated</span>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* Engineering Pillars */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-background p-6 dark:border-zinc-800">
            <div className="mb-3 flex size-9 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              <Terminal className="size-4" />
            </div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Copy-and-Own Architecture
            </h2>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Never locked behind a proprietary runtime or paid tile server. You install
              raw source components directly into your codebase and retain total
              ownership.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-background p-6 dark:border-zinc-800">
            <div className="mb-3 flex size-9 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              <Database className="size-4" />
            </div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Provenance-First Geography
            </h2>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every boundary dataset carries strict metadata: provider, license,
              acquisition timestamp, CRS definition, and deterministic transformation
              audit trails.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-background p-6 dark:border-zinc-800">
            <div className="mb-3 flex size-9 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              <ShieldCheck className="size-4" />
            </div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Deterministic Math & Validation
            </h2>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              All geometries are validated before build time. Features enforce RFC 7946
              invariants, unique region IDs, and container-aware projection scaling.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
