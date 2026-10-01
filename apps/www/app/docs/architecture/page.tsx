import { GeoBadge } from "@geocn/ui";

export default function ArchitectureDocsPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">System Design</GeoBadge>
          <GeoBadge variant="coordinate">Monorepo</GeoBadge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Monorepo Architecture & Module Ownership
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN is architected as a modular monorepo enforcing clear separation of
          concerns, deterministic data flows, and zero circular dependencies.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Module boundaries */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Workspace Module Ownership
        </h2>
        <div className="space-y-3">
          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              packages/geo (@geocn/geo)
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Pure framework-independent geographic math, bounding box calculation, RFC
              7946 coordinate verification, and d3-geo projection wrappers. Has zero React
              dependencies.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              packages/geo-data (@geocn/geo-data)
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Geographic dataset pipeline: provenance schemas, typed manifests, raw data
              staging, coordinate validators, and automated normalization scripts.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              packages/registry (@geocn/registry)
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Shadcn registry generators and schema validators. Compiles source files into
              distributable registry metadata and verified JSON payloads.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              packages/ui (@geocn/ui)
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Technical cartographic design tokens, coordinate badges, status beacons, and
              common interface utilities.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              apps/www (@geocn/www)
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Public Next.js documentation portal, interactive component preview frame,
              and registry static distribution host.
            </p>
          </div>
        </div>
      </section>

      {/* Tokens */}
      <section id="tokens" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Cartographic Semantic Design Tokens
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN defines dedicated semantic tokens for cartographic layers, ensuring
          seamless theming between light and dark modes:
        </p>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <tr>
                <th className="p-3 font-semibold">Token</th>
                <th className="p-3 font-semibold">Semantic Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="p-3 font-semibold">--geo-land</td>
                <td className="p-3 font-sans text-zinc-600 dark:text-zinc-400">
                  Default landmass background fill
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">--geo-boundary</td>
                <td className="p-3 font-sans text-zinc-600 dark:text-zinc-400">
                  Administrative boundary stroke
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">--geo-boundary-strong</td>
                <td className="p-3 font-sans text-zinc-600 dark:text-zinc-400">
                  National or top-level country borders
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">--geo-water</td>
                <td className="p-3 font-sans text-zinc-600 dark:text-zinc-400">
                  Oceans, lakes, and hydrographic bodies
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">--geo-grid</td>
                <td className="p-3 font-sans text-zinc-600 dark:text-zinc-400">
                  Latitude / Longitude graticule lines
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section id="a11y" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Accessibility Foundations
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Maps cannot depend entirely on color or pointer interaction. All GeoCN
          components are built with visible focus rings, keyboard navigability, semantic
          ARIA labels, and non-color status indicators.
        </p>
      </section>
    </div>
  );
}
