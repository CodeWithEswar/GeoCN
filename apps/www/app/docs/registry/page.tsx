import { GeoBadge, StatusBeacon } from "@geocn/ui";

export default function RegistryDocsPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GeoBadge variant="verified">Distribution</GeoBadge>
          <StatusBeacon status="success">shadcn Compatible</StatusBeacon>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Shadcn Registry Distribution Model
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          GeoCN components are distributed via the open shadcn registry specification,
          allowing direct installation via the official CLI with zero package lock-in.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Registry Structure */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          How Registry Installation Works
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          When you execute the shadcn CLI with a GeoCN registry item, the CLI reads the
          manifest, fetches the source code files, installs required open-source
          dependencies (like <code className="font-mono text-xs">d3-geo</code>), and
          places the code directly into your application:
        </p>
        <div className="relative rounded-md bg-zinc-950 p-4 font-mono text-xs text-zinc-100">
          <code>npx shadcn@latest add https://geocn.dev/r/geo-utils.json</code>
        </div>
      </section>

      {/* Registry Build and Validation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Compiling & Validating Registry
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The registry pipeline automatically validates that all referenced source files
          exist, dependency versions are valid, and generates both{" "}
          <code className="font-mono text-xs">registry.json</code> and individual item
          endpoints:
        </p>
        <div className="space-y-2">
          <div className="relative rounded-md bg-zinc-950 p-3 font-mono text-xs text-zinc-100">
            <code>npm run registry:build</code>
          </div>
          <div className="relative rounded-md bg-zinc-950 p-3 font-mono text-xs text-zinc-100">
            <code>npm run registry:validate</code>
          </div>
        </div>
      </section>
    </div>
  );
}
