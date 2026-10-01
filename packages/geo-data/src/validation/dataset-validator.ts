/**
 * @file packages/geo-data/src/validation/dataset-validator.ts
 * @description Validates dataset manifests against geometry artifacts with actionable error formatting.
 */

import fs from "node:fs";
import path from "node:path";
import { GeoDatasetManifestSchema } from "../schemas/manifest";
import { calculateBoundingBox, validateFeatureCollection } from "@geocn/geo";

export interface DatasetValidationReport {
  readonly datasetId: string;
  readonly valid: boolean;
  readonly manifestPath: string;
  readonly artifactPath?: string;
  readonly featureCount?: number;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

/**
 * Validates a single dataset manifest file and its referenced geometry artifact
 */
export function validateDatasetManifest(manifestPath: string): DatasetValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!fs.existsSync(manifestPath)) {
    return {
      datasetId: path.basename(manifestPath, ".json"),
      valid: false,
      manifestPath,
      errors: [`Manifest file does not exist at: ${manifestPath}`],
      warnings: [],
    };
  }

  let rawJson: unknown;
  try {
    const rawContent = fs.readFileSync(manifestPath, "utf-8");
    rawJson = JSON.parse(rawContent);
  } catch (err) {
    return {
      datasetId: path.basename(manifestPath, ".json"),
      valid: false,
      manifestPath,
      errors: [
        `Manifest file is not valid JSON: ${err instanceof Error ? err.message : String(err)}`,
      ],
      warnings: [],
    };
  }

  const parseResult = GeoDatasetManifestSchema.safeParse(rawJson);
  if (!parseResult.success) {
    const zodErrors = parseResult.error.issues.map(
      (issue) => `[${issue.path.join(".")}] ${issue.message}`
    );
    return {
      datasetId: (rawJson as { id?: string })?.id ?? path.basename(manifestPath, ".json"),
      valid: false,
      manifestPath,
      errors: zodErrors,
      warnings: [],
    };
  }

  const manifest = parseResult.data;
  const manifestDir = path.dirname(manifestPath);
  const resolvedArtifactPath = path.resolve(manifestDir, manifest.relativePath);

  if (!fs.existsSync(resolvedArtifactPath)) {
    errors.push(
      `Referenced artifact file not found at: ${resolvedArtifactPath} (relativePath: "${manifest.relativePath}")`
    );
    return {
      datasetId: manifest.id,
      valid: false,
      manifestPath,
      artifactPath: resolvedArtifactPath,
      errors,
      warnings,
    };
  }

  let artifactContent: unknown;
  try {
    artifactContent = JSON.parse(fs.readFileSync(resolvedArtifactPath, "utf-8"));
  } catch (err) {
    errors.push(
      `Artifact is not valid JSON: ${err instanceof Error ? err.message : String(err)}`
    );
    return {
      datasetId: manifest.id,
      valid: false,
      manifestPath,
      artifactPath: resolvedArtifactPath,
      errors,
      warnings,
    };
  }

  if (manifest.format === "geojson") {
    const geoValidation = validateFeatureCollection(artifactContent);
    if (!geoValidation.success) {
      for (const diag of geoValidation.errors) {
        errors.push(
          `FeatureCollection Error [${diag.code}]: ${diag.message}${diag.path ? ` at ${diag.path}` : ""}`
        );
      }
    } else {
      const fc = geoValidation.data;
      if (fc.features.length !== manifest.featureCount) {
        errors.push(
          `Feature count mismatch: manifest declares ${manifest.featureCount}, but artifact contains ${fc.features.length} features.`
        );
      }

      // Check bounding box bounds
      try {
        const computedBbox = calculateBoundingBox(fc);
        const [cMinX, cMinY, cMaxX, cMaxY] = computedBbox;
        const [mMinX, mMinY, mMaxX, mMaxY] = manifest.bbox;

        // Verify computed bbox is roughly bounded by manifest bbox (allow small epsilon)
        const EPS = 0.05;
        if (
          cMinX < mMinX - EPS ||
          cMinY < mMinY - EPS ||
          cMaxX > mMaxX + EPS ||
          cMaxY > mMaxY + EPS
        ) {
          warnings.push(
            `Computed bbox [${computedBbox.map((n) => n.toFixed(3)).join(", ")}] extends beyond declared manifest bbox [${manifest.bbox.map((n) => n.toFixed(3)).join(", ")}].`
          );
        }
      } catch (bboxErr) {
        errors.push(
          `Failed to compute bounding box from geometry: ${bboxErr instanceof Error ? bboxErr.message : String(bboxErr)}`
        );
      }
    }
  }

  return {
    datasetId: manifest.id,
    valid: errors.length === 0,
    manifestPath,
    artifactPath: resolvedArtifactPath,
    featureCount: manifest.featureCount,
    errors,
    warnings,
  };
}
