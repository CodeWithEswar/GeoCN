import { describe, it, expect } from "vitest";
import path from "node:path";
import { validateRegistryFile } from "@geocn/registry";

describe("Shadcn Registry Invariants & Schema Validation", () => {
  it("should validate the compiled registry.json with all 4 foundational items", () => {
    const rootDir = path.resolve(__dirname, "../..");
    const registryJsonPath = path.join(rootDir, "registry/registry.json");

    const report = validateRegistryFile(registryJsonPath, rootDir);

    expect(report.valid).toBe(true);
    expect(report.itemCount).toBe(4);
    expect(report.errors).toHaveLength(0);
  });
});
