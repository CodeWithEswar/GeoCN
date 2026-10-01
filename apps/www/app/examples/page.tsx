import { GeoBadge, StatusBeacon } from "@geocn/ui";

const plannedExamples = [
  {
    title: "Container-Aware Responsive Projection",
    slug: "responsive-projection",
    description:
      "Dynamically resizing geographic projection that refits geometry using useGeoContainer as browser or dashboard frames resize.",
    component: "use-geo-container + @geocn/geo",
    status: "Implemented",
  },
  {
    title: "US States Administrative Boundary Map",
    slug: "us-states-map",
    description:
      "Rendering verified US Census Bureau administrative boundaries with Albers USA composite projection.",
    component: "GeoMap (Phase 3)",
    status: "Pipeline Verified",
  },
  {
    title: "Regional Choropleth with Accessible Scale",
    slug: "accessible-choropleth",
    description:
      "Numeric metric distribution mapped to high-contrast color steps with accessible screen reader labels and keyboard focus.",
    component: "Choropleth (Phase 7)",
    status: "Upcoming",
  },
];

export default function ExamplesCatalogPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Examples</GeoBadge>
          <StatusBeacon status="info">Reproducible Patterns</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Interactive Geographic Patterns
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Tested, reproducible implementations demonstrating how to compose GeoCN
          primitives, responsive hooks, and validated datasets inside your application.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plannedExamples.map((ex) => (
          <div
            key={ex.slug}
            className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-background p-6 dark:border-zinc-800"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {ex.title}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {ex.description}
              </p>
            </div>

            <div className="mt-5 border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800/80">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-400">Stack:</span>
                <span className="text-zinc-700 dark:text-zinc-300">{ex.component}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
