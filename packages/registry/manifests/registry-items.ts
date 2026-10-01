/**
 * @file packages/registry/manifests/registry-items.ts
 * @description Master source of truth for all GeoCN registry distribution items.
 */

import type { RegistryItem } from "../src/schemas/registry-item";

export const REGISTRY_ITEMS: readonly RegistryItem[] = [
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "geo-utils",
    type: "registry:lib",
    title: "GeoCN Core Utilities",
    description:
      "Mathematical projections, coordinate bounds calculations, and container fitting helpers for geographic UI.",
    dependencies: ["d3-geo"],
    devDependencies: ["@types/d3-geo", "@types/geojson"],
    registryDependencies: [],
    files: [
      {
        path: "packages/geo/src/types/index.ts",
        target: "lib/geo-types.ts",
        type: "registry:lib",
      },
      {
        path: "packages/geo/src/constants/index.ts",
        target: "lib/geo-constants.ts",
        type: "registry:lib",
      },
      {
        path: "packages/geo/src/geometry/index.ts",
        target: "lib/geo-geometry.ts",
        type: "registry:lib",
      },
      {
        path: "packages/geo/src/projections/index.ts",
        target: "lib/geo-projections.ts",
        type: "registry:lib",
      },
    ],
    categories: ["utilities", "geography"],
    meta: {
      framework: "react",
      strictTypeScript: true,
    },
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "use-geo-container",
    type: "registry:hook",
    title: "Use Geo Container Hook",
    description:
      "Hydration-safe ResizeObserver hook computing responsive SVG viewport bounds and aspect ratios.",
    dependencies: [],
    devDependencies: ["@types/react"],
    registryDependencies: [],
    files: [
      {
        path: "packages/ui/src/hooks/use-geo-container.ts",
        target: "hooks/use-geo-container.ts",
        type: "registry:hook",
      },
    ],
    categories: ["hooks", "geography", "responsive"],
    meta: {
      framework: "react",
      strictTypeScript: true,
    },
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "geo-badge",
    type: "registry:ui",
    title: "Geo Badge",
    description:
      "Technical cartographic badge for coordinate stamps, projection types, and provenance tags.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    devDependencies: ["@types/react"],
    registryDependencies: [],
    files: [
      {
        path: "packages/ui/src/primitives/geo-badge.tsx",
        target: "components/ui/geo-badge.tsx",
        type: "registry:ui",
      },
    ],
    categories: ["ui", "cartography"],
    meta: {
      framework: "react",
      strictTypeScript: true,
    },
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "status-beacon",
    type: "registry:ui",
    title: "Status Beacon",
    description:
      "Technical status beacon indicator for datasets, quality gates, and registry items.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    devDependencies: ["@types/react"],
    registryDependencies: [],
    files: [
      {
        path: "packages/ui/src/primitives/status-beacon.tsx",
        target: "components/ui/status-beacon.tsx",
        type: "registry:ui",
      },
    ],
    categories: ["ui", "indicators"],
    meta: {
      framework: "react",
      strictTypeScript: true,
    },
  },
];
