import { GeoBadge, StatusBeacon } from "@geocn/ui";

export default function RegistryPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">shadcn Registry</GeoBadge>
          <StatusBeacon status="success">Active Ecosystem</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Shadcn Registry Distribution
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN components are distributed via the shadcn registry format. When you install a
          GeoCN component, the source code is placed directly into your project. You own it,
          inspect it, and modify it.
        </p>
      </div>

      {/* Installation Mechanics */}
      <div className="mt-10 max-w-3xl space-y-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Installation Command
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Install any GeoCN component into your React or Next.js application using the
          official shadcn CLI:
        </p>

        <div className="rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 leading-relaxed">
          <div className="text-zinc-500 mb-1"># Install core geographic utilities</div>
          <code>npx shadcn@latest add https://geocn.dev/r/geo-utils.json</code>
          <div className="text-zinc-500 mt-3 mb-1"># Install container-aware measurement hook</div>
          <code>npx shadcn@latest add https://geocn.dev/r/use-geo-container.json</code>
        </div>

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 pt-4">
          Registry Item Types
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              registry:component
            </span>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Composable UI components (e.g., GeoMap, GeoRegionLayer).
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              registry:hook
            </span>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Reusable React hooks (e.g., useGeoContainer, useGeoSelection).
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              registry:ui
            </span>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Interface accessories (e.g., GeoLegend, GeoTooltip, GeoBadge).
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-background p-4 dark:border-zinc-800">
            <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              registry:lib
            </span>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Pure math and projection helpers (e.g., geo-utils).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
