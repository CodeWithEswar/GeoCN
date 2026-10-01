import { describe, it, expect } from "vitest";

describe("Container Measurement & Responsive Projection Geometry", () => {
  it("should calculate correct aspect ratios and dimension constraints", () => {
    const width = 800;
    const height = 450;
    const aspect = width / height;

    expect(aspect).toBeCloseTo(1.777, 2);

    // Derived height from aspect ratio
    const newWidth = 600;
    const derivedHeight = newWidth / aspect;
    expect(Math.round(derivedHeight)).toBe(338);
  });
});
