import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Database,
  ExternalLink,
  Globe,
  Layers,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { GeoBadge, StatusBeacon } from "@geocn/ui";
import {
  getAllDatasetManifests,
  getDatasetGeoJSON,
  getDatasetManifestById,
} from "@/lib/datasets";
import { createProjection, fitProjectionToContainer } from "@geocn/geo";
import { geoPath, geoAlbersUsa } from "d3-geo";
import type { FeatureCollection } from "geojson";

export async function generateStaticParams() {
  const manifests = getAllDatasetManifests();
  return manifests.map((m) => ({ dataset: m.id }));
}

interface DatasetDetailPageProps {
  params: Promise<{ dataset: string }>;
}

export default async function DatasetDetailPage({ params }: DatasetDetailPageProps) {
  const { dataset: datasetId } = await params;
  const manifest = getDatasetManifestById(datasetId);

  if (!manifest) {
    notFound();
  }

  const geojson = getDatasetGeoJSON(manifest) as FeatureCollection | null;
  const isFixture = manifest.id.includes("fixture");

  // Project features for live preview
  let svgPaths: { id: string; name: string; d: string }[] = [];
  if (geojson && geojson.features.length > 0) {
    try {
      // Use Albers USA composite projection for US States if possible, otherwise Mercator
      const isUsDataset = manifest.id.startsWith("us-");
      const projection = isUsDataset
        ? geoAlbersUsa().fitExtent(
            [
              [20, 20],
              [780, 430],
            ],
            geojson as unknown as Parameters<
              ReturnType<typeof geoAlbersUsa>["fitExtent"]
            >[1]
          )
        : createProjection({ type: "mercator" });

      if (!isUsDataset) {
        fitProjectionToContainer(
          projection,
          geojson,
          { width: 800, height: 450 },
          { top: 25, right: 25, bottom: 25, left: 25 }
        );
      }

      const pathGenerator = geoPath().projection(projection);

      svgPaths = geojson.features
        .map((feature) => {
          const d = pathGenerator(feature);
          if (!d) return null;
          return {
            id: String(feature.id ?? Math.random()),
            name: String(feature.properties?.name ?? feature.id),
            d,
          };
        })
        .filter((item): item is { id: string; name: string; d: string } => item !== null);
    } catch {
      svgPaths = [];
    }
  }

  const fileSizeFormatted = manifest.fileSizeBytes
    ? (manifest.fileSizeBytes / 1024).toFixed(1) + " KB"
    : "< 50 KB";

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Breadcrumb / Back Link */}
      <div className="mb-6">
        <Link
          href="/data"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="size-3.5" /> Back to Data Catalog
        </Link>
      </div>

      {/* Dataset Identity Header */}
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-2">
          <GeoBadge variant="verified">
            {manifest.country ?? "Global"} · ADM{manifest.adminLevel ?? "0"}
          </GeoBadge>
          <GeoBadge variant="coordinate">{manifest.crs}</GeoBadge>
          {isFixture ? (
            <StatusBeacon status="warning">Synthetic Test Fixture</StatusBeacon>
          ) : (
            <StatusBeacon status="success">Verified Upstream Provenance</StatusBeacon>
          )}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          {manifest.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
          <span>GeoCN ID: {manifest.id}</span>
          <span>•</span>
          <span>Version: {manifest.version}</span>
          <span>•</span>
          <span>Acquired: {manifest.acquiredAt.split("T")[0]}</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        {/* Main Content Column */}
        <div className="space-y-10">
          {/* Live Geographic SVG Preview */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Globe className="size-4" />
                <span>Geographic Vector Preview (SVG)</span>
              </h2>
              <span className="font-mono text-xs text-zinc-500">
                {manifest.featureCount} Features
              </span>
            </div>

            <div className="geo-graticule-bg relative flex min-h-[380px] w-full items-center justify-center rounded-lg border border-zinc-200 bg-background p-4 shadow-xs dark:border-zinc-800">
              {svgPaths.length > 0 ? (
                <svg
                  viewBox="0 0 800 450"
                  className="w-full h-auto max-h-[440px] drop-shadow-xs"
                  role="img"
                  aria-label={`${manifest.name} vector boundary preview`}
                >
                  {/* Graticule boundary guide */}
                  <rect
                    x="1"
                    y="1"
                    width="798"
                    height="448"
                    fill="none"
                    stroke="currentColor"
                    className="text-zinc-200 dark:text-zinc-800"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  {svgPaths.map((path) => (
                    <path
                      key={path.id}
                      d={path.d}
                      className="fill-zinc-200/90 stroke-zinc-700 transition-colors hover:fill-zinc-300 dark:fill-zinc-800 dark:stroke-zinc-400 dark:hover:fill-zinc-700"
                      strokeWidth="1.2"
                    >
                      <title>{path.name}</title>
                    </path>
                  ))}
                </svg>
              ) : (
                <div className="p-8 text-center text-xs text-zinc-500">
                  Preview geometry not loaded or empty
                </div>
              )}
            </div>
          </section>

          {/* Transformation Audit Trail */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Layers className="size-4" />
              <span>Transformation Pipeline Audit Trail</span>
            </h2>
            <div className="rounded-lg border border-zinc-200 bg-background p-5 dark:border-zinc-800">
              <div className="space-y-4">
                {manifest.transformations.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-mono text-[11px] font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      {t.step ?? idx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        <span>{t.type}</span>
                        <span className="text-zinc-400 font-normal">
                          ({t.appliedAt.split("T")[0]})
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        {t.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Integration & Installation */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Terminal className="size-4" />
              <span>Component Integration & Usage</span>
            </h2>
            <div className="rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 leading-relaxed overflow-x-auto">
              <div className="text-zinc-500 mb-1">// 1. Install GeoCN core utilities</div>
              <div className="text-emerald-400">
                npx shadcn@latest add https://geocn.dev/r/geo-utils.json
              </div>

              <div className="text-zinc-500 mt-4 mb-1">
                // 2. Import dataset into your geographic component
              </div>
              <div>
                import dataset from &quot;@geocn/geo-data/generated/{manifest.id}
                .json&quot;;
              </div>
              <div>
                import &#123; createProjection &#125; from
                &quot;@/lib/geo-projections&quot;;
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column: Provenance & Technical Metadata */}
        <aside className="space-y-6">
          {/* Authoritative Source Box */}
          <div className="rounded-lg border border-zinc-200 bg-background p-5 dark:border-zinc-800">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span>Source & Provenance</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-zinc-500 block text-[11px]">Provider:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {manifest.source.provider}
                </span>
              </div>

              <div>
                <span className="text-zinc-500 block text-[11px]">Dataset Title:</span>
                <span className="text-zinc-800 dark:text-zinc-200">
                  {manifest.source.datasetTitle}
                </span>
              </div>

              <div>
                <span className="text-zinc-500 block text-[11px]">License:</span>
                <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                  {manifest.license.name}
                </span>
              </div>

              <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800/80 space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Authoritative Links
                </span>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={manifest.source.reference.datasetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-zinc-800 hover:text-zinc-950 hover:underline dark:text-zinc-200 dark:hover:text-white"
                  >
                    Original Dataset <ExternalLink className="size-3" />
                  </a>

                  {manifest.source.reference.homepageUrl ? (
                    <a
                      href={manifest.source.reference.homepageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-white"
                    >
                      Provider Website <ExternalLink className="size-3" />
                    </a>
                  ) : null}

                  {manifest.source.reference.documentationUrl ? (
                    <a
                      href={manifest.source.reference.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-white"
                    >
                      Source Documentation <ExternalLink className="size-3" />
                    </a>
                  ) : null}

                  {manifest.license.url ? (
                    <a
                      href={manifest.license.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-white"
                    >
                      License Documentation <ExternalLink className="size-3" />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800/80 text-[11px] text-zinc-500">
                <span className="font-semibold block mb-0.5">Required Attribution:</span>
                <p>{manifest.license.attribution}</p>
              </div>
            </div>
          </div>

          {/* Technical Specifications Box */}
          <div className="rounded-lg border border-zinc-200 bg-background p-5 dark:border-zinc-800">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-1.5">
              <Database className="size-4" />
              <span>Artifact Specifications</span>
            </h3>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Format:</span>
                <span className="uppercase text-zinc-800 dark:text-zinc-200">
                  {manifest.format}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Feature Count:</span>
                <span className="text-zinc-800 dark:text-zinc-200">
                  {manifest.featureCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Payload Size:</span>
                <span className="text-zinc-800 dark:text-zinc-200">
                  {fileSizeFormatted}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">CRS:</span>
                <span className="text-zinc-800 dark:text-zinc-200">WGS84</span>
              </div>
              <div className="border-t border-zinc-100 pt-2.5 dark:border-zinc-800/80">
                <span className="text-zinc-500 block text-[11px] mb-1">
                  Bounding Box (RFC 7946):
                </span>
                <span className="text-[11px] text-zinc-800 dark:text-zinc-300 break-all">
                  [{manifest.bbox.map((n) => n.toFixed(2)).join(", ")}]
                </span>
              </div>
              {manifest.generatedChecksum ? (
                <div className="border-t border-zinc-100 pt-2.5 dark:border-zinc-800/80">
                  <span className="text-zinc-500 block text-[11px] mb-1">
                    SHA256 Checksum:
                  </span>
                  <span className="text-[10px] text-zinc-400 break-all">
                    {manifest.generatedChecksum}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
