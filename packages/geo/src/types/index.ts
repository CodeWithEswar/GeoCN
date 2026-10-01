/**
 * @file packages/geo/src/types/index.ts
 * @description Core geographic primitives, projection types, and coordinate structures.
 */

import type { Feature, FeatureCollection, Geometry } from "geojson";

/**
 * Longitude/Latitude pair: [longitude: -180..180, latitude: -90..90]
 * Adheres strictly to the GeoJSON RFC 7946 specification (x/longitude first, y/latitude second).
 */
export type GeoCoordinate = [longitude: number, latitude: number];

/**
 * Bounding box representation: [minLongitude, minLatitude, maxLongitude, maxLatitude]
 */
export type GeoBoundingBox = [
  minLongitude: number,
  minLatitude: number,
  maxLongitude: number,
  maxLatitude: number,
];

/**
 * Visual viewport or rendering canvas dimensions
 */
export interface GeoDimensions {
  readonly width: number;
  readonly height: number;
}

/**
 * Margins / padding applied around projection bounds
 */
export interface GeoPadding {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

/**
 * Supported stable mathematical projections
 */
export type GeoProjectionType =
  | "mercator"
  | "albersUsa"
  | "equalEarth"
  | "naturalEarth1"
  | "orthographic"
  | "azimuthalEqualArea"
  | "conicEqualArea";

/**
 * Projection configuration parameters
 */
export interface GeoProjectionConfig {
  readonly type: GeoProjectionType;
  readonly center?: GeoCoordinate;
  readonly rotate?: [yaw: number, pitch: number, roll?: number];
  readonly scale?: number;
  readonly translate?: [x: number, y: number];
  readonly precision?: number;
  readonly clipAngle?: number;
  readonly parallels?: [number, number];
}

/**
 * Standard normalized feature properties structure
 */
export interface StandardFeatureProperties {
  readonly id: string;
  readonly name: string;
  readonly code?: string;
  readonly adminLevel?: number | string;
  readonly [key: string]: unknown;
}

/**
 * Normalized GeoJSON Feature with standard properties
 */
export type NormalizedGeoFeature<
  G extends Geometry = Geometry,
  P extends StandardFeatureProperties = StandardFeatureProperties,
> = Feature<G, P>;

/**
 * Normalized GeoJSON FeatureCollection
 */
export type NormalizedFeatureCollection<
  G extends Geometry = Geometry,
  P extends StandardFeatureProperties = StandardFeatureProperties,
> = FeatureCollection<G, P>;

/**
 * Diagnostic error/warning report structure
 */
export interface GeoDiagnostic {
  readonly severity: "error" | "warning" | "info";
  readonly code: string;
  readonly message: string;
  readonly path?: string;
  readonly context?: Record<string, unknown>;
}

/**
 * Result wrapper for validation and parsing operations
 */
export type GeoResult<T> =
  | {
      readonly success: true;
      readonly data: T;
      readonly diagnostics: readonly GeoDiagnostic[];
    }
  | { readonly success: false; readonly errors: readonly GeoDiagnostic[] };
