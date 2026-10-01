/**
 * @file packages/registry/src/validator/index.ts
 * @description Validates registry schemas, files, and dependency invariants.
 */

import fs from "node:fs";
import path from "node:path";
import { RegistryIndexSchema } from "../schemas/registry-item";

export interface RegistryValidationReport {
  readonly valid: boolean;
  readonly itemCount: number;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

/**
 * Validates a registry index file and checks source file existence
 */
export function validateRegistryFile(
  registryJsonPath: string,
  repoRoot: string
): RegistryValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!fs.existsSync(registryJsonPath)) {
    return {
      valid: false,
      itemCount: 0,
      errors: [`Registry index file does not exist at: ${registryJsonPath}`],
      warnings: [],
    };
  }

  let rawJson: unknown;
  try {
    rawJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
  } catch (err) {
    return {
      valid: false,
      itemCount: 0,
      errors: [
        `Registry index is not valid JSON: ${err instanceof Error ? err.message : String(err)}`,
      ],
      warnings: [],
    };
  }

  const parseResult = RegistryIndexSchema.safeParse(rawJson);
  if (!parseResult.success) {
    const zodErrors = parseResult.error.issues.map(
      (issue) => `[${issue.path.join(".")}] ${issue.message}`
    );
    return {
      valid: false,
      itemCount: 0,
      errors: zodErrors,
      warnings: [],
    };
  }

  const items = parseResult.data;
  const seenNames = new Set<string>();

  for (const item of items) {
    if (seenNames.has(item.name)) {
      errors.push(`Duplicate registry item name: "${item.name}"`);
    } else {
      seenNames.add(item.name);
    }

    for (const file of item.files) {
      const resolved = path.isAbsolute(file.path)
        ? file.path
        : path.resolve(repoRoot, file.path);

      if (!fs.existsSync(resolved)) {
        errors.push(
          `Registry item "${item.name}" references non-existent file: ${resolved} (path: "${file.path}")`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    itemCount: items.length,
    errors,
    warnings,
  };
}
