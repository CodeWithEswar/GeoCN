import { GeoBadge, StatusBeacon } from "@geocn/ui";

export default function DocsPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Documentation</GeoBadge>
          <StatusBeacon status="info">Phase 1 Foundation</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Introduction to GeoCN
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN is an open-source geographic UI registry providing carefully engineered
          React and Next.js geographic components through the shadcn registry model.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Copy-and-own philosophy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          The Copy-and-Own Philosophy
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Most frontend map implementations force teams to choose between heavy,
          proprietary runtimes with recurring costs, or low-level, fragmented GIS
          libraries with steep learning curves. GeoCN bridges this gap:
        </p>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200">
          Install → Inspect → Understand → Modify → Own
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Components are installed directly into your repository source tree. You have
          total transparency over the rendering code, styles, and data structures.
        </p>
      </section>

      {/* Setup Guide */}
      <section id="setup" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Installation & Repository Setup
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN components can be installed using standard package managers and the shadcn
          CLI registry command:
        </p>
        <div className="relative rounded-md bg-zinc-950 p-4 font-mono text-xs text-zinc-100">
          <code>npx shadcn@latest add https://geocn.dev/r/geo-utils.json</code>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          All dependencies are standard open-source tools: React, TypeScript, Tailwind
          CSS, and D3 geographic projection math.
        </p>
      </section>

      {/* Vertical-slice development */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Vertical-Slice Engineering
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN develops one complete, verified vertical slice at a time. We prioritize 1
          production-quality, fully accessible, validated geographic component over dozens
          of half-baked prototypes.
        </p>
      </section>
    </div>
  );
}
