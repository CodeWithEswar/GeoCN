/**
 * @file packages/geo/src/transforms/index.ts
 * @description Geographic property normalization and coordinate precision helpers.
 */

import type { Feature, FeatureCollection, Geometry } from "geojson";
import type {
  NormalizedGeoFeature,
  NormalizedFeatureCollection,
  StandardFeatureProperties,
} from "../types";

/**
 * Normalization options for standardizing feature properties
 */
export interface NormalizationOptions {
  /** Property key or extractor function for feature unique ID */
  idKey?: string | ((feature: Feature) => string | undefined);
  /** Property key or extractor function for feature name */
  nameKey?: string | ((feature: Feature) => string | undefined);
  /** Property key or extractor function for administrative code (e.g., ISO, FIPS, HASC) */
  codeKey?: string | ((feature: Feature) => string | undefined);
  /** Property key or extractor function for admin level */
  adminLevelKey?: string | ((feature: Feature) => number | string | undefined);
}

/**
 * Normalizes a single GeoJSON Feature into a NormalizedGeoFeature with standard properties
 */
export function normalizeFeature<G extends Geometry = Geometry>(
  feature: Feature<G>,
  options: NormalizationOptions = {}
): NormalizedGeoFeature<G> {
  const props = feature.properties ?? {};

  // Extract ID
  let id = "";
  if (typeof options.idKey === "function") {
    id = options.idKey(feature) ?? "";
  } else if (typeof options.idKey === "string" && options.idKey in props) {
    id = String(props[options.idKey] ?? "");
  } else if (feature.id !== undefined && feature.id !== null) {
    id = String(feature.id);
  } else if ("id" in props && props.id !== undefined) {
    id = String(props.id);
  }

  // Extract Name
  let name = "";
  if (typeof options.nameKey === "function") {
    name = options.nameKey(feature) ?? "";
  } else if (typeof options.nameKey === "string" && options.nameKey in props) {
    name = String(props[options.nameKey] ?? "");
  } else if ("name" in props && typeof props.name === "string") {
    name = props.name;
  } else if ("NAME" in props && typeof props.NAME === "string") {
    name = props.NAME;
  } else {
    name = id;
  }

  // Extract Code
  let code: string | undefined;
  if (typeof options.codeKey === "function") {
    code = options.codeKey(feature);
  } else if (typeof options.codeKey === "string" && options.codeKey in props) {
    code = String(props[options.codeKey]);
  } else if ("code" in props && typeof props.code === "string") {
    code = props.code;
  } else if ("ISO" in props && typeof props.ISO === "string") {
    code = props.ISO;
  }

  // Extract Admin Level
  let adminLevel: number | string | undefined;
  if (typeof options.adminLevelKey === "function") {
    adminLevel = options.adminLevelKey(feature);
  } else if (
    typeof options.adminLevelKey === "string" &&
    options.adminLevelKey in props
  ) {
    adminLevel = props[options.adminLevelKey] as number | string;
  } else if ("admin_level" in props) {
    adminLevel = props.admin_level as number | string;
  }

  const standardProperties: StandardFeatureProperties = {
    ...props,
    id,
    name,
    ...(code ? { code } : {}),
    ...(adminLevel !== undefined ? { adminLevel } : {}),
  };

  return {
    ...feature,
    id,
    properties: standardProperties,
  };
}

/**
 * Normalizes all features within a FeatureCollection
 */
export function normalizeFeatureCollection<G extends Geometry = Geometry>(
  collection: FeatureCollection<G>,
  options: NormalizationOptions = {}
): NormalizedFeatureCollection<G> {
  return {
    type: "FeatureCollection",
    features: collection.features.map((feature) => normalizeFeature(feature, options)),
  };
}

/**
 * Rounds a number to a specified coordinate precision
 */
export function roundCoordinate(value: number, decimals = 4): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
