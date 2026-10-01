import { describe, it, expect } from "vitest";
import path from "node:path";
import { validateRegistryFile } from "@geocn/registry";

describe("Shadcn Registry Invariants & Schema Validation", () => {
  it("should validate the compiled registry.json", () => {
    const rootDir = path.resolve(__dirname, "../..");
    const registryJsonPath = path.join(rootDir, "registry/registry.json");

    const report = validateRegistryFile(registryJsonPath, rootDir);

    expect(report.valid).toBe(true);
    expect(report.itemCount).toBeGreaterThanOrEqual(1);
    expect(report.errors).toHaveLength(0);
  });
});
