/**
 * @file packages/geo/src/constants/index.ts
 * @description Geographic constants, default boundaries, and coordinate systems.
 */

import type { GeoBoundingBox, GeoDimensions, GeoPadding } from "../types";

/**
 * Standard Coordinate Reference System: WGS84 (EPSG:4326)
 */
export const STANDARD_CRS = "urn:ogc:def:crs:OGC:1.3:CRS84";

/**
 * Worldwide geographic extent in WGS84 coordinates: [minLng, minLat, maxLng, maxLat]
 */
export const WORLD_BOUNDING_BOX: GeoBoundingBox = [-180, -90, 180, 90];

/**
 * Default container dimensions for geographic previews and component frames
 */
export const DEFAULT_DIMENSIONS: GeoDimensions = {
  width: 800,
  height: 500,
};

/**
 * Default boundary inset padding in pixels
 */
export const DEFAULT_PADDING: GeoPadding = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

/**
 * Longitude limits in standard WGS84
 */
export const LONGITUDE_MIN = -180;
export const LONGITUDE_MAX = 180;

/**
 * Latitude limits in standard WGS84
 */
export const LATITUDE_MIN = -90;
export const LATITUDE_MAX = 90;
