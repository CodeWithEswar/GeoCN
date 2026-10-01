import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts", "packages/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@geocn/geo": path.resolve(__dirname, "./packages/geo/src/index.ts"),
      "@geocn/geo-data": path.resolve(__dirname, "./packages/geo-data/src/index.ts"),
      "@geocn/ui": path.resolve(__dirname, "./packages/ui/src/index.ts"),
      "@geocn/registry": path.resolve(__dirname, "./packages/registry/src/index.ts"),
    },
  },
});
