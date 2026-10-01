import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GeoBadge, StatusBeacon } from "@geocn/ui";

export default function CountriesCatalogPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Coverage Discovery</GeoBadge>
          <StatusBeacon status="info">Traceable Provenance</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Geographic Country Coverage
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN expands geographic coverage incrementally. A country is listed in the
          coverage directory only when its administrative boundaries have passed the
          complete provenance, validation, and license audit.
        </p>
      </div>

      {/* Verified Countries List */}
      <div className="mt-10">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
          Verified Active Coverages
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-background p-5 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                United States
              </span>
              <GeoBadge variant="verified">ISO: USA / US</GeoBadge>
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Available Levels:</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200">
                  ADM1 (States)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Primary Source:</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200">
                  US Census Bureau
                </span>
              </div>
              <div className="flex justify-between">
                <span>License:</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200">
                  Public Domain (CC0)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Feature Count:</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200">
                  51 (50 States + DC)
                </span>
              </div>
            </div>
            <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
              <Link
                href="/data/us-states-admin-1"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100"
              >
                Inspect Dataset & Provenance <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Policy */}
      <div className="mt-12 rounded-lg border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30 max-w-3xl">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Geographic Sourcing Invariant
        </h3>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN never claims country coverage through synthetic geometries or scraped,
          unverified Shapefiles. Country additions require verified source licensing
          (Priority 1 Government Portals or Priority 2/3 International Institutions) and
          published manifests.
        </p>
      </div>
    </div>
  );
}
