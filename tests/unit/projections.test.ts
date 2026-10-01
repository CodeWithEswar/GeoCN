import { describe, it, expect } from "vitest";
import { createProjection, fitProjectionToContainer } from "@geocn/geo";
import type { FeatureCollection } from "geojson";

describe("@geocn/geo: projection factories", () => {
  const sampleFC: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: "r1",
        properties: { id: "r1", name: "Test" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [0, 0],
              [10, 0],
              [10, 10],
              [0, 10],
              [0, 0],
            ],
          ],
        },
      },
    ],
  };

  it("should create mercator, equalEarth, and orthographic projections", () => {
    const merc = createProjection({ type: "mercator" });
    expect(merc).toBeDefined();
    expect(typeof merc([0, 0])).toEqual("object");

    const equalEarth = createProjection({ type: "equalEarth" });
    expect(equalEarth).toBeDefined();

    const ortho = createProjection({ type: "orthographic" });
    expect(ortho).toBeDefined();
  });

  it("should fit projection to container dimensions deterministically", () => {
    const projection = createProjection({ type: "mercator" });
    const fitted = fitProjectionToContainer(
      projection,
      sampleFC,
      { width: 800, height: 600 },
      { top: 20, right: 20, bottom: 20, left: 20 }
    );

    expect(fitted).toBeDefined();
    const p1 = fitted([0, 0]);
    const p2 = fitted([10, 10]);

    expect(p1).toBeDefined();
    expect(p2).toBeDefined();
    if (p1 && p2) {
      expect(p1[0]).toBeGreaterThanOrEqual(0);
      expect(p1[0]).toBeLessThanOrEqual(800);
      expect(p2[1]).toBeGreaterThanOrEqual(0);
      expect(p2[1]).toBeLessThanOrEqual(600);
    }
  });
});
