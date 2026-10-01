import { GeoBadge, StatusBeacon } from "@geocn/ui";

const plannedPrimitives = [
  {
    name: "GeoMap",
    slug: "geo-map",
    type: "registry:component",
    description:
      "Core responsive geographic viewport with container measurement, SVG canvas, and projection context.",
    status: "Upcoming (Phase 3)",
  },
  {
    name: "GeoRegionLayer",
    slug: "geo-region-layer",
    type: "registry:component",
    description:
      "Vector boundary renderer with accessible keyboard focus, selection states, and reactive styling.",
    status: "Upcoming (Phase 4)",
  },
  {
    name: "GeoMarkerLayer",
    slug: "geo-marker-layer",
    type: "registry:component",
    description:
      "Coordinate-projected points with label collision detection, custom SVG glyphs, and clustering hooks.",
    status: "Upcoming (Phase 6)",
  },
  {
    name: "GeoLegend",
    slug: "geo-legend",
    type: "registry:ui",
    description:
      "Continuous and threshold color legends with tick labels, units, and interactive filtering.",
    status: "Upcoming (Phase 5)",
  },
  {
    name: "GeoTooltip",
    slug: "geo-tooltip",
    type: "registry:ui",
    description:
      "Accessible coordinate and feature tooltip anchored to geographic projections.",
    status: "Upcoming (Phase 5)",
  },
  {
    name: "useGeoContainer",
    slug: "use-geo-container",
    type: "registry:hook",
    description:
      "Hydration-safe ResizeObserver hook computing responsive SVG viewport bounds and aspect ratios.",
    status: "Active (Phase 2A)",
  },
];

export default function ComponentsCatalogPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Component Catalog</GeoBadge>
          <StatusBeacon status="info">Vertical Slice Architecture</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Geographic UI Primitives
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN components are composable building blocks distributed as source code via
          the shadcn registry model. Each primitive has focused behavior and zero hidden
          runtime.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plannedPrimitives.map((comp) => (
          <div
            key={comp.slug}
            className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-background p-5 dark:border-zinc-800"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {comp.name}
                </span>
                <GeoBadge variant="coordinate">{comp.type}</GeoBadge>
              </div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {comp.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800/80">
              <span className="font-mono text-[11px]">{comp.status}</span>
              <span className="text-[11px] text-zinc-400">registry: @geocn</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
