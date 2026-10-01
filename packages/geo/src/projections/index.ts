/**
 * @file packages/geo/src/projections/index.ts
 * @description Mathematical projection factories and deterministic fit-to-container utilities.
 */

import {
  geoMercator,
  geoAlbersUsa,
  geoEqualEarth,
  geoNaturalEarth1,
  geoOrthographic,
  geoAzimuthalEqualArea,
  geoConicEqualArea,
  type GeoProjection,
  type ExtendedFeatureCollection,
} from "d3-geo";
import type { GeoJsonObject } from "geojson";
import type { GeoDimensions, GeoPadding, GeoProjectionConfig } from "../types";
import { DEFAULT_DIMENSIONS, DEFAULT_PADDING } from "../constants";

/**
 * Creates a configured d3-geo projection instance based on GeoProjectionConfig
 */
export function createProjection(config: GeoProjectionConfig): GeoProjection {
  let projection: GeoProjection;

  switch (config.type) {
    case "mercator":
      projection = geoMercator();
      break;
    case "albersUsa":
      projection = geoAlbersUsa();
      break;
    case "equalEarth":
      projection = geoEqualEarth();
      break;
    case "naturalEarth1":
      projection = geoNaturalEarth1();
      break;
    case "orthographic":
      projection = geoOrthographic();
      break;
    case "azimuthalEqualArea":
      projection = geoAzimuthalEqualArea();
      break;
    case "conicEqualArea": {
      const conic = geoConicEqualArea();
      if (config.parallels) {
        conic.parallels(config.parallels);
      }
      projection = conic;
      break;
    }
    default: {
      const exhaustiveCheck: never = config.type;
      throw new Error(`GeoCN: Unsupported projection type "${String(exhaustiveCheck)}"`);
    }
  }

  if (config.center) {
    projection.center(config.center);
  }
  if (config.rotate) {
    const [yaw, pitch, roll] = config.rotate;
    if (typeof roll === "number") {
      projection.rotate([yaw, pitch, roll]);
    } else {
      projection.rotate([yaw, pitch]);
    }
  }
  if (typeof config.scale === "number") {
    projection.scale(config.scale);
  }
  if (config.translate) {
    projection.translate(config.translate);
  }
  if (typeof config.precision === "number") {
    projection.precision(config.precision);
  }
  if (typeof config.clipAngle === "number") {
    projection.clipAngle(config.clipAngle);
  }

  return projection;
}

/**
 * Fits a d3-geo projection to a GeoJSON object inside the specified dimensions with padding.
 * Ensures the geographic visualization scales deterministically within responsive containers.
 */
export function fitProjectionToContainer(
  projection: GeoProjection,
  geojson: GeoJsonObject,
  dimensions: GeoDimensions = DEFAULT_DIMENSIONS,
  padding: Partial<GeoPadding> = {}
): GeoProjection {
  const mergedPadding: GeoPadding = {
    top: padding.top ?? DEFAULT_PADDING.top,
    right: padding.right ?? DEFAULT_PADDING.right,
    bottom: padding.bottom ?? DEFAULT_PADDING.bottom,
    left: padding.left ?? DEFAULT_PADDING.left,
  };

  const extent: [[number, number], [number, number]] = [
    [mergedPadding.left, mergedPadding.top],
    [
      Math.max(1, dimensions.width - mergedPadding.right),
      Math.max(1, dimensions.height - mergedPadding.bottom),
    ],
  ];

  // d3-geo fitExtent expects an ExtendedFeatureCollection or GeoJsonObject
  projection.fitExtent(extent, geojson as unknown as ExtendedFeatureCollection);
  return projection;
}
