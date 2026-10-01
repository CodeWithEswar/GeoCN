import Link from "next/link";
import { ArrowRight, Database, ExternalLink, ShieldCheck } from "lucide-react";
import { GeoBadge, StatusBeacon } from "@geocn/ui";
import { getAllDatasetManifests } from "@/lib/datasets";

export default function DataCatalogPage() {
  const datasets = getAllDatasetManifests();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Data Catalog</GeoBadge>
          <StatusBeacon status="success">Provenance Audited</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Geographic Data Catalog
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN transforms fragmented GIS infrastructure into installable, validated, and
          traceable geographic datasets. Every boundary layer below includes verified
          upstream source navigation, license records, and transformation audit trails.
        </p>
      </div>

      {/* Dataset Directory Table */}
      <div className="mt-10 overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-xs dark:border-zinc-800">
        <div className="border-b border-zinc-200 bg-zinc-50/70 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            <Database className="size-4" />
            <span>REGISTERED DATASETS ({datasets.length})</span>
          </div>
          <span className="text-xs text-zinc-500">
            Showing verified production & fixture datasets
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50/40 text-zinc-500 font-mono text-[11px] uppercase tracking-wider dark:border-zinc-800 dark:bg-zinc-900/30">
              <tr>
                <th className="p-3.5">Dataset / ID</th>
                <th className="p-3.5">Country & Level</th>
                <th className="p-3.5">Provider & Source</th>
                <th className="p-3.5">Features</th>
                <th className="p-3.5">Format & Size</th>
                <th className="p-3.5">License</th>
                <th className="p-3.5 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {datasets.map((dataset) => {
                const isFixture = dataset.id.includes("fixture");
                const sizeKb = dataset.fileSizeBytes
                  ? (dataset.fileSizeBytes / 1024).toFixed(1) + " KB"
                  : "< 50 KB";

                return (
                  <tr
                    key={dataset.id}
                    className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50"
                  >
                    <td className="p-3.5">
                      <div className="flex flex-col gap-0.5">
                        <Link
                          href={`/data/${dataset.id}`}
                          className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
                        >
                          {dataset.name}
                        </Link>
                        <span className="font-mono text-[11px] text-zinc-500">
                          {dataset.id}
                        </span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {dataset.country ?? "Global"}
                        </span>
                        <GeoBadge variant="coordinate">
                          ADM{dataset.adminLevel ?? "0"}
                        </GeoBadge>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-col gap-0.5 max-w-[240px]">
                        <span className="truncate text-zinc-800 dark:text-zinc-200 font-medium">
                          {dataset.source.provider}
                        </span>
                        <a
                          href={dataset.source.reference.datasetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-900 hover:underline dark:hover:text-zinc-300"
                        >
                          Source Dataset <ExternalLink className="size-2.5" />
                        </a>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-zinc-700 dark:text-zinc-300">
                      {dataset.featureCount}
                    </td>

                    <td className="p-3.5 font-mono text-zinc-600 dark:text-zinc-400">
                      <div className="flex flex-col gap-0.5">
                        <span className="uppercase text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                          {dataset.format}
                        </span>
                        <span className="text-[10px] text-zinc-400">{sizeKb}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      {isFixture ? (
                        <GeoBadge variant="outline">Test Fixture</GeoBadge>
                      ) : (
                        <GeoBadge variant="verified">
                          {dataset.license.spdxId ?? dataset.license.name}
                        </GeoBadge>
                      )}
                    </td>

                    <td className="p-3.5 text-right">
                      <Link
                        href={`/data/${dataset.id}`}
                        className="inline-flex items-center gap-1 rounded border border-zinc-200 bg-background px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-2xs transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      >
                        Inspect <ArrowRight className="size-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sourcing Principles */}
      <div className="mt-12 rounded-lg border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>Provenance-First Geography Commitment</span>
        </h3>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
          GeoCN never silently introduces or scrapes geographic boundaries. Every dataset
          must link back to an authoritative government agency or reputable international
          institution, have clearly verified redistribution licensing, and document all
          simplification, normalization, and topology transformations performed.
        </p>
      </div>
    </div>
  );
}
