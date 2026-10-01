/**
 * @file scripts/geo/validate-datasets.ts
 * @description CLI script to validate all dataset manifests and geometry artifacts in packages/geo-data.
 */

import fs from "node:fs";
import path from "node:path";
import { validateDatasetManifest } from "../../packages/geo-data/src/validation/dataset-validator";

function runDatasetValidation(): void {
  const manifestsDir = path.resolve(__dirname, "../../packages/geo-data/manifests");

  console.log("\n=======================================================");
  console.log("  GeoCN Geographic Dataset Validation Pipeline");
  console.log("=======================================================\n");

  if (!fs.existsSync(manifestsDir)) {
    console.error(`✖ Manifests directory does not exist: ${manifestsDir}`);
    process.exit(1);
  }

  const manifestFiles = fs
    .readdirSync(manifestsDir)
    .filter((file) => file.endsWith(".manifest.json"));

  if (manifestFiles.length === 0) {
    console.warn("⚠ No dataset manifests found in packages/geo-data/manifests.");
    process.exit(0);
  }

  console.log(`Found ${manifestFiles.length} dataset manifest(s) to validate...\n`);

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of manifestFiles) {
    const fullPath = path.join(manifestsDir, file);
    const report = validateDatasetManifest(fullPath);

    if (report.valid) {
      console.log(`✔ [VALID] ${report.datasetId}`);
      console.log(`  Artifact: ${report.artifactPath ?? "N/A"}`);
      console.log(`  Features: ${report.featureCount ?? "N/A"}`);
      if (report.warnings.length > 0) {
        for (const w of report.warnings) {
          console.log(`  ⚠ Warning: ${w}`);
          totalWarnings++;
        }
      }
      console.log("");
    } else {
      totalErrors++;
      console.error(`✖ [FAILED] ${report.datasetId}`);
      console.error(`  Manifest: ${report.manifestPath}`);
      if (report.artifactPath) {
        console.error(`  Artifact: ${report.artifactPath}`);
      }
      console.error("  Problems:");
      for (const err of report.errors) {
        console.error(`    - ${err}`);
      }
      console.error("\n  Suggested action:");
      console.error(
        "    Check manifest metadata or verify geometry coordinates with RFC 7946.\n"
      );
    }
  }

  console.log("-------------------------------------------------------");
  if (totalErrors > 0) {
    console.error(
      `Validation FAILED: ${totalErrors} invalid dataset(s), ${totalWarnings} warning(s).\n`
    );
    process.exit(1);
  } else {
    console.log(
      `Validation PASSED: All ${manifestFiles.length} dataset(s) valid, ${totalWarnings} warning(s).\n`
    );
    process.exit(0);
  }
}

runDatasetValidation();
