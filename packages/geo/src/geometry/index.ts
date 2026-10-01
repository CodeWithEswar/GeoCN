/**
 * @file packages/geo/src/geometry/index.ts
 * @description Coordinate inspection, bounding box calculation, and spatial geometry utilities.
 */

import type { GeoJsonObject, Geometry, Feature, FeatureCollection } from "geojson";
import type { GeoBoundingBox, GeoCoordinate } from "../types";
import { LATITUDE_MAX, LATITUDE_MIN, LONGITUDE_MAX, LONGITUDE_MIN } from "../constants";

/**
 * Validates whether a value conforms to a GeoCoordinate [lng, lat]
 */
export function isValidCoordinate(coord: unknown): coord is GeoCoordinate {
  if (!Array.isArray(coord) || coord.length < 2) {
    return false;
  }
  const [lng, lat] = coord;
  if (typeof lng !== "number" || typeof lat !== "number") {
    return false;
  }
  if (Number.isNaN(lng) || Number.isNaN(lat)) {
    return false;
  }
  return (
    lng >= LONGITUDE_MIN &&
    lng <= LONGITUDE_MAX &&
    lat >= LATITUDE_MIN &&
    lat <= LATITUDE_MAX
  );
}

/**
 * Validates whether a value conforms to a GeoBoundingBox [minLng, minLat, maxLng, maxLat]
 */
export function isValidBoundingBox(bbox: unknown): bbox is GeoBoundingBox {
  if (!Array.isArray(bbox) || bbox.length !== 4) {
    return false;
  }
  const [minLng, minLat, maxLng, maxLat] = bbox;
  return (
    typeof minLng === "number" &&
    typeof minLat === "number" &&
    typeof maxLng === "number" &&
    typeof maxLat === "number" &&
    !Number.isNaN(minLng) &&
    !Number.isNaN(minLat) &&
    !Number.isNaN(maxLng) &&
    !Number.isNaN(maxLat) &&
    minLng <= maxLng &&
    minLat <= maxLat &&
    minLng >= LONGITUDE_MIN &&
    maxLng <= LONGITUDE_MAX &&
    minLat >= LATITUDE_MIN &&
    maxLat <= LATITUDE_MAX
  );
}

/**
 * Recursively extracts all [lng, lat] positions from arbitrary GeoJSON coordinates
 */
function extractCoordinates(coords: unknown, target: GeoCoordinate[]): void {
  if (!Array.isArray(coords) || coords.length === 0) {
    return;
  }
  if (
    typeof coords[0] === "number" &&
    typeof coords[1] === "number" &&
    coords.length >= 2
  ) {
    target.push([coords[0], coords[1]]);
    return;
  }
  for (const item of coords) {
    extractCoordinates(item, target);
  }
}

/**
 * Extracts all coordinates from a GeoJSON geometry
 */
export function getCoordinatesFromGeometry(geometry: Geometry): GeoCoordinate[] {
  const result: GeoCoordinate[] = [];
  if (geometry.type === "GeometryCollection") {
    for (const geom of geometry.geometries) {
      result.push(...getCoordinatesFromGeometry(geom));
    }
  } else if ("coordinates" in geometry) {
    extractCoordinates(geometry.coordinates, result);
  }
  return result;
}

/**
 * Calculates the bounding box [minLng, minLat, maxLng, maxLat] for any GeoJSON object.
 * Throws a descriptive error if the object contains no valid coordinates.
 */
export function calculateBoundingBox(geojson: GeoJsonObject): GeoBoundingBox {
  const coordinates: GeoCoordinate[] = [];

  if (geojson.type === "FeatureCollection") {
    const fc = geojson as FeatureCollection;
    for (const feature of fc.features) {
      if (feature.geometry) {
        coordinates.push(...getCoordinatesFromGeometry(feature.geometry));
      }
    }
  } else if (geojson.type === "Feature") {
    const f = geojson as Feature;
    if (f.geometry) {
      coordinates.push(...getCoordinatesFromGeometry(f.geometry));
    }
  } else {
    coordinates.push(...getCoordinatesFromGeometry(geojson as Geometry));
  }

  if (coordinates.length === 0) {
    throw new Error(
      "GeoCN: Cannot calculate bounding box for empty or geometry-less GeoJSON object."
    );
  }

  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  for (const [lng, lat] of coordinates) {
    if (lng < minLng) minLng = lng;
    if (lat < minLat) minLat = lat;
    if (lng > maxLng) maxLng = lng;
    if (lat > maxLat) maxLat = lat;
  }

  return [minLng, minLat, maxLng, maxLat];
}

/**
 * Calculates the center coordinate [lng, lat] from a bounding box
 */
export function getBoundingBoxCenter(bbox: GeoBoundingBox): GeoCoordinate {
  const [minLng, minLat, maxLng, maxLat] = bbox;
  return [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
}
