/**
 * @file packages/registry/src/generator/index.ts
 * @description Generates shadcn-compatible registry artifacts and distribution manifests.
 */

import fs from "node:fs";
import path from "node:path";
import { RegistryIndexSchema, type RegistryItem } from "../schemas/registry-item";

export interface RegistryBuildOptions {
  readonly rootDir: string;
  readonly outputDir: string;
}

/**
 * Builds the distribution registry index and per-item JSON files
 */
export function buildRegistry(
  items: readonly RegistryItem[],
  options: RegistryBuildOptions
): { readonly generatedCount: number; readonly outputPath: string } {
  // Validate all items before writing
  const validatedIndex = RegistryIndexSchema.parse(items);

  const registryOutputDir = options.outputDir;
  if (!fs.existsSync(registryOutputDir)) {
    fs.mkdirSync(registryOutputDir, { recursive: true });
  }

  // 1. Write the main registry.json index
  const indexPath = path.join(registryOutputDir, "registry.json");
  fs.writeFileSync(indexPath, JSON.stringify(validatedIndex, null, 2) + "\n", "utf-8");

  // 2. Generate per-item standalone files for shadcn add <item>
  const itemsDir = path.join(registryOutputDir, "items");
  if (!fs.existsSync(itemsDir)) {
    fs.mkdirSync(itemsDir, { recursive: true });
  }

  for (const item of validatedIndex) {
    const itemWithContents: RegistryItem = {
      ...item,
      files: item.files.map((file) => {
        const absoluteFilePath = path.isAbsolute(file.path)
          ? file.path
          : path.resolve(options.rootDir, file.path);

        let content = file.content;
        if (!content && fs.existsSync(absoluteFilePath)) {
          content = fs.readFileSync(absoluteFilePath, "utf-8");
        }

        return {
          ...file,
          content: content ?? "",
        };
      }),
    };

    const itemPath = path.join(itemsDir, `${item.name}.json`);
    fs.writeFileSync(itemPath, JSON.stringify(itemWithContents, null, 2) + "\n", "utf-8");
  }

  return {
    generatedCount: validatedIndex.length,
    outputPath: indexPath,
  };
}
