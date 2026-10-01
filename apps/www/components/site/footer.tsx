import Link from "next/link";
import { GeoBadge } from "@geocn/ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50/50 py-8 text-xs text-zinc-500 dark:border-zinc-800/80 dark:bg-zinc-950/50 dark:text-zinc-400">
      <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
              GeoCN
            </span>
            <GeoBadge variant="coordinate">WGS84 / EPSG:4326</GeoBadge>
            <GeoBadge variant="verified">RFC 7946</GeoBadge>
          </div>
          <p className="max-w-md">
            Open-source geographic UI registry and cartographic component ecosystem for
            React and Next.js. Built on copy-and-own principles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
          <Link
            href="/docs/architecture"
            className="hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            Architecture
          </Link>
          <Link
            href="/docs/pipeline"
            className="hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            Provenance Pipeline
          </Link>
          <Link
            href="/docs/registry"
            className="hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            Shadcn Registry
          </Link>
          <Link
            href="https://github.com/CodeWithEswar/GeoCN"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
