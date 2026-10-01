import Link from "next/link";
import { Compass, Github } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { StatusBeacon } from "@geocn/ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-background/95 backdrop-blur dark:border-zinc-800/80">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-50"
          >
            <span className="flex size-7 items-center justify-center rounded border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
              <Compass className="size-4 text-zinc-900 dark:text-zinc-100" />
            </span>
            <span>GeoCN</span>
          </Link>
          <StatusBeacon status="info" className="hidden sm:inline-flex text-[11px]">
            Phase 1 Foundation
          </StatusBeacon>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link
            href="/docs"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Documentation
          </Link>
          <Link
            href="/docs/architecture"
            className="hidden sm:inline transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Architecture
          </Link>
          <Link
            href="/docs/pipeline"
            className="hidden md:inline transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Data Pipeline
          </Link>
          <Link
            href="/docs/registry"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Registry
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/CodeWithEswar/GeoCN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="GitHub Repository"
          >
            <Github className="size-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
