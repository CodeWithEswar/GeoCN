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
];
