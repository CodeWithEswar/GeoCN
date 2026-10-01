import { describe, it, expect } from "vitest";
import path from "node:path";
import { validateDatasetManifest, GeoSourceReferenceSchema } from "@geocn/geo-data";
import { validateFeatureCollection } from "@geocn/geo";

describe("Geographic Pipeline & Dataset Validation", () => {
  it("should validate the sample-admin-fixture manifest and geometry artifact", () => {
    const manifestPath = path.resolve(
      __dirname,
      "../../packages/geo-data/manifests/sample-admin-fixture.manifest.json"
    );

    const report = validateDatasetManifest(manifestPath);

    expect(report.valid).toBe(true);
    expect(report.datasetId).toBe("sample-admin-fixture");
    expect(report.featureCount).toBe(2);
    expect(report.errors).toHaveLength(0);
  });

  it("should validate the real US States & DC production dataset manifest", () => {
    const manifestPath = path.resolve(
      __dirname,
      "../../packages/geo-data/manifests/us-states-admin-1.manifest.json"
    );

    const report = validateDatasetManifest(manifestPath);

    expect(report.valid).toBe(true);
    expect(report.datasetId).toBe("us-states-admin-1");
    expect(report.featureCount).toBe(51);
    expect(report.errors).toHaveLength(0);
  });

  it("should validate source reference URLs using GeoSourceReferenceSchema", () => {
    const validRef = {
      datasetUrl: "https://www.census.gov/geographies/mapping-files.html",
      homepageUrl: "https://www.census.gov",
      documentationUrl: "https://www.census.gov/docs.html",
      licenseUrl: "https://www.usa.gov/government-works",
    };

    const parsed = GeoSourceReferenceSchema.safeParse(validRef);
    expect(parsed.success).toBe(true);

    const invalidRef = {
      datasetUrl: "not-a-valid-url",
    };
    const failedParse = GeoSourceReferenceSchema.safeParse(invalidRef);
    expect(failedParse.success).toBe(false);
  });

  it("should reject GeoJSON with duplicate feature IDs", () => {
    const invalidData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: "dup-1",
          properties: { id: "dup-1" },
          geometry: { type: "Point", coordinates: [0, 0] },
        },
        {
          type: "Feature",
          id: "dup-1",
          properties: { id: "dup-1" },
          geometry: { type: "Point", coordinates: [1, 1] },
        },
      ],
    };

    const result = validateFeatureCollection(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.code === "GEO_DUPLICATE_FEATURE_ID")).toBe(true);
    }
  });

  it("should reject GeoJSON with invalid coordinates", () => {
    const invalidCoordsData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: "valid-id",
          properties: { id: "valid-id" },
          geometry: { type: "Point", coordinates: [999, 999] },
        },
      ],
    };

    const result = validateFeatureCollection(invalidCoordsData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.code === "GEO_INVALID_COORDINATE")).toBe(true);
    }
  });
});
