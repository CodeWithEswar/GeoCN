/**
 * @file scripts/registry/validate-registry.ts
 * @description Validates the compiled registry.json against schemas and file existence.
 */

import path from "node:path";
import { validateRegistryFile } from "../../packages/registry/src/validator";

function runValidateRegistry(): void {
  const rootDir = path.resolve(__dirname, "../..");
  const registryJsonPath = path.join(rootDir, "registry/registry.json");

  console.log("\n=======================================================");
  console.log("  GeoCN Registry Schema & Invariants Validator");
  console.log("=======================================================\n");

  const report = validateRegistryFile(registryJsonPath, rootDir);

  if (report.valid) {
    console.log(`✔ Registry is valid! (${report.itemCount} items)`);
    console.log(`  File: ${registryJsonPath}\n`);
    process.exit(0);
  } else {
    console.error(`✖ Registry validation FAILED:`);
    for (const err of report.errors) {
      console.error(`  - ${err}`);
    }
    console.error("\nRun 'npm run registry:build' to recompile registry artifacts.\n");
    process.exit(1);
  }
}

runValidateRegistry();
