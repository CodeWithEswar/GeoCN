/**
 * @file apps/www/lib/datasets.ts
 * @description Helper functions to query registered dataset manifests from packages/geo-data.
 */

import fs from "node:fs";
import path from "node:path";
import type { GeoDatasetManifest } from "@geocn/geo-data";

export function getAllDatasetManifests(): GeoDatasetManifest[] {
  const manifestsDir = path.resolve(process.cwd(), "../../packages/geo-data/manifests");

  // Fallback if running directly inside apps/www or from root
  const targetDir = fs.existsSync(manifestsDir)
    ? manifestsDir
    : path.resolve(process.cwd(), "packages/geo-data/manifests");

  if (!fs.existsSync(targetDir)) {
    return [];
  }

  const files = fs.readdirSync(targetDir).filter((f) => f.endsWith(".manifest.json"));

  const manifests: GeoDatasetManifest[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(targetDir, file), "utf-8");
      manifests.push(JSON.parse(content));
    } catch {
      // Ignore unparseable files
    }
  }

  return manifests;
}

export function getDatasetManifestById(id: string): GeoDatasetManifest | undefined {
  const manifests = getAllDatasetManifests();
  return manifests.find((m) => m.id === id);
}

export function getDatasetGeoJSON(manifest: GeoDatasetManifest): unknown | null {
  const manifestsDir = path.resolve(process.cwd(), "../../packages/geo-data/manifests");
  const targetDir = fs.existsSync(manifestsDir)
    ? manifestsDir
    : path.resolve(process.cwd(), "packages/geo-data/manifests");

  const resolved = path.resolve(targetDir, manifest.relativePath);
  if (!fs.existsSync(resolved)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(resolved, "utf-8"));
  } catch {
    return null;
  }
}
