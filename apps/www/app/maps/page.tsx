import { GeoBadge, StatusBeacon } from "@geocn/ui";

const mapCompositions = [
  {
    title: "Administrative Boundaries Map",
    slug: "administrative-map",
    category: "Administrative",
    description:
      "Vector administrative territory map with hierarchical drills (Country → State → County/District).",
    engine: "SVG + D3 Geo",
    phase: "Phase 3–4",
  },
  {
    title: "Choropleth Analytics Map",
    slug: "choropleth-map",
    category: "Thematic",
    description:
      "Statistical area visualization with customizable color classification scales, tooltips, and legends.",
    engine: "SVG + D3 Geo",
    phase: "Phase 7",
  },
  {
    title: "Point & Bubble Symbol Map",
    slug: "bubble-map",
    category: "Proportional Symbol",
    description:
      "Quantitative location rendering with radius scale calibration and interactive coordinate inspect.",
    engine: "SVG + D3 Geo",
    phase: "Phase 6",
  },
  {
    title: "Continuous Vector Tile Map",
    slug: "vector-tile-map",
    category: "Slippy Basemap",
    description:
      "Deep zoomable basemap utilizing vector tiles and WebGL for dense features and continuous navigation.",
    engine: "MapLibre GL",
    phase: "Future Engine Vertical Slice",
  },
];

export default function MapsCatalogPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Map Compositions</GeoBadge>
          <StatusBeacon status="info">High-Level Patterns</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Map Compositions & Patterns
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Higher-level cartographic compositions combining primitives, legends, tooltips,
          and datasets into cohesive application patterns.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {mapCompositions.map((item) => (
          <div
            key={item.slug}
            className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-background p-6 dark:border-zinc-800"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </span>
                <GeoBadge variant="coordinate">{item.category}</GeoBadge>
              </div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800/80">
              <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                Engine: {item.engine}
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                Roadmap: {item.phase}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
