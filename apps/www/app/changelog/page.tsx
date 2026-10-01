import { GeoBadge, StatusBeacon } from "@geocn/ui";

const releases = [
  {
    version: "v0.2.0-alpha",
    date: "October 2026",
    title: "Phase 2A: Information Architecture & Real Geographic Data Pipeline",
    categories: [
      {
        tag: "Data Pipeline",
        items: [
          "Integrated first production real-data vertical slice: US Census Bureau 50 States + DC (ADM1).",
          "Established GeoSourceReference schema with verified external source, documentation, and license URLs.",
          "Implemented deterministic decimal coordinate quantization and GeoJSON feature normalization.",
        ],
      },
      {
        tag: "Architecture & UI",
        items: [
          "Created first-class Data Catalog (/data) and Dataset Inspector (/data/[dataset]) with live SVG preview.",
          "Introduced useGeoContainer responsive ResizeObserver hook for dynamic container fitting.",
          "Implemented full Information Architecture: Docs, Components, Maps, Countries, Data, Examples, Registry, Changelog.",
        ],
      },
      {
        tag: "Registry",
        items: [
          "Added use-geo-container hook to registry distribution manifests.",
          "Extended shadcn registry validator to check explicit dependencies and registry item types.",
        ],
      },
    ],
  },
  {
    version: "v0.1.0-alpha",
    date: "October 2026",
    title: "Phase 1: Production Engineering Foundation",
    categories: [
      {
        tag: "Monorepo & Toolchain",
        items: [
          "Initialized npm workspaces: @geocn/geo, @geocn/geo-data, @geocn/registry, @geocn/ui, @geocn/www.",
          "Configured strict TypeScript, Vitest unit test suites, Prettier, and ESLint 9.",
          "Established ADR-0001 (SVG + D3 Geo), ADR-0002 (shadcn registry), ADR-0003 (provenance-first).",
        ],
      },
      {
        tag: "Validation & Fixtures",
        items: [
          "Implemented validateDatasetManifest() and RFC 7946 GeoJSON coordinate range checking.",
          "Synthesized architectural testing fixture (sample-admin-fixture) in tests/fixtures/.",
        ],
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Release History</GeoBadge>
          <StatusBeacon status="info">Audit Trail</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Changelog & Data Updates
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Geographic datasets and boundary updates are first-class product changes. All
          releases document code, component APIs, data provenance, and boundary revisions.
        </p>
      </div>

      <div className="mt-10 max-w-3xl space-y-12">
        {releases.map((rel) => (
          <article
            key={rel.version}
            className="relative border-l border-zinc-200 pl-6 dark:border-zinc-800"
          >
            <div className="absolute -left-1.5 top-1 size-3 rounded-full border-2 border-zinc-900 bg-background dark:border-zinc-100" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {rel.version}
              </span>
              <span className="text-xs text-zinc-400">— {rel.date}</span>
            </div>
            <h2 className="mt-1 text-base font-semibold text-zinc-800 dark:text-zinc-200">
              {rel.title}
            </h2>

            <div className="mt-4 space-y-4">
              {rel.categories.map((cat) => (
                <div key={cat.tag} className="space-y-1.5">
                  <span className="font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    [{cat.tag}]
                  </span>
                  <ul className="list-disc pl-5 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                    {cat.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
