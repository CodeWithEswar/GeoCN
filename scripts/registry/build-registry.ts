/**
 * @file scripts/registry/build-registry.ts
 * @description Compiles and writes the registry artifacts to /registry and apps/www/public/r.
 */

import path from "node:path";
import fs from "node:fs";
import { buildRegistry } from "../../packages/registry/src/generator";
import { REGISTRY_ITEMS } from "../../packages/registry/manifests/registry-items";

function runBuildRegistry(): void {
  const rootDir = path.resolve(__dirname, "../..");
  const registryOutputDir = path.join(rootDir, "registry");
  const wwwPublicRDir = path.join(rootDir, "apps/www/public/r");

  console.log("\n=======================================================");
  console.log("  GeoCN Registry Build Pipeline");
  console.log("=======================================================\n");

  console.log(`Building ${REGISTRY_ITEMS.length} registry item(s)...`);

  // 1. Build to root /registry
  const result = buildRegistry(REGISTRY_ITEMS, {
    rootDir,
    outputDir: registryOutputDir,
  });

  console.log(
    `✔ Generated ${result.generatedCount} registry items at: ${result.outputPath}`
  );

  // 2. Also mirror into apps/www/public/r for Next.js static serving
  if (!fs.existsSync(wwwPublicRDir)) {
    fs.mkdirSync(wwwPublicRDir, { recursive: true });
  }

  // Copy registry.json to public/r/index.json and public/r/registry.json
  const registryJsonContent = fs.readFileSync(result.outputPath, "utf-8");
  fs.writeFileSync(path.join(wwwPublicRDir, "index.json"), registryJsonContent);
  fs.writeFileSync(path.join(wwwPublicRDir, "registry.json"), registryJsonContent);

  // Copy individual item JSONs to public/r/<item>.json
  const itemsDir = path.join(registryOutputDir, "items");
  if (fs.existsSync(itemsDir)) {
    for (const itemFile of fs.readdirSync(itemsDir)) {
      const src = path.join(itemsDir, itemFile);
      const dest = path.join(wwwPublicRDir, itemFile);
      fs.copyFileSync(src, dest);
    }
  }

  console.log(`✔ Mirrored registry distribution to public endpoint: ${wwwPublicRDir}\n`);
}

runBuildRegistry();
