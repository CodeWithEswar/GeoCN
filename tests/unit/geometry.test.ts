import { describe, it, expect } from "vitest";
import {
  calculateBoundingBox,
  getBoundingBoxCenter,
  isValidBoundingBox,
  isValidCoordinate,
} from "@geocn/geo";
import type { FeatureCollection } from "geojson";

describe("@geocn/geo: geometry utilities", () => {
  it("should validate legitimate coordinates [lng, lat]", () => {
    expect(isValidCoordinate([0, 0])).toBe(true);
    expect(isValidCoordinate([-180, -90])).toBe(true);
    expect(isValidCoordinate([180, 90])).toBe(true);
    expect(isValidCoordinate([77.209, 28.6139])).toBe(true); // New Delhi
  });

  it("should reject invalid coordinates", () => {
    expect(isValidCoordinate(null)).toBe(false);
    expect(isValidCoordinate([])).toBe(false);
    expect(isValidCoordinate([10])).toBe(false);
    expect(isValidCoordinate([-181, 0])).toBe(false);
    expect(isValidCoordinate([0, 91])).toBe(false);
    expect(isValidCoordinate([NaN, 0])).toBe(false);
    expect(isValidCoordinate(["0", "0"])).toBe(false);
  });

  it("should validate bounding boxes [minLng, minLat, maxLng, maxLat]", () => {
    expect(isValidBoundingBox([-10, -20, 10, 20])).toBe(true);
    expect(isValidBoundingBox([0, 0, 0, 0])).toBe(true);
    expect(isValidBoundingBox([20, 10, 10, 20])).toBe(false); // minLng > maxLng
    expect(isValidBoundingBox([0, 20, 10, 10])).toBe(false); // minLat > maxLat
  });

  it("should correctly compute bounding box and center for a FeatureCollection", () => {
    const sampleFC: FeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: "r1",
          properties: { id: "r1", name: "Region 1" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [10, 20],
                [30, 20],
                [30, 40],
                [10, 40],
                [10, 20],
              ],
            ],
          },
        },
      ],
    };

    const bbox = calculateBoundingBox(sampleFC);
    expect(bbox).toEqual([10, 20, 30, 40]);

    const center = getBoundingBoxCenter(bbox);
    expect(center).toEqual([20, 30]);
  });
});
