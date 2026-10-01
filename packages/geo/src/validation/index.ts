/**
 * @file packages/geo/src/validation/index.ts
 * @description GeoJSON structure validation, coordinate bounds checking, and actionable diagnostic errors.
 */

import type { FeatureCollection, Feature, Geometry } from "geojson";
import type { GeoDiagnostic, GeoResult } from "../types";
import { isValidCoordinate } from "../geometry";

/**
 * Validates a GeoJSON FeatureCollection and its contained features
 */
export function validateFeatureCollection(input: unknown): GeoResult<FeatureCollection> {
  const diagnostics: GeoDiagnostic[] = [];

  if (typeof input !== "object" || input === null) {
    return {
      success: false,
      errors: [
        {
          severity: "error",
          code: "GEO_INVALID_OBJECT",
          message: `Expected GeoJSON object, received ${typeof input}.`,
        },
      ],
    };
  }

  const candidate = input as Record<string, unknown>;

  if (candidate.type !== "FeatureCollection") {
    diagnostics.push({
      severity: "error",
      code: "GEO_NOT_FEATURE_COLLECTION",
      message: `Expected "type": "FeatureCollection", received "${String(candidate.type)}".`,
      path: "type",
    });
    return { success: false, errors: diagnostics };
  }

  if (!Array.isArray(candidate.features)) {
    diagnostics.push({
      severity: "error",
      code: "GEO_MISSING_FEATURES",
      message: `FeatureCollection requires a "features" array, received ${typeof candidate.features}.`,
      path: "features",
    });
    return { success: false, errors: diagnostics };
  }

  const seenIds = new Set<string>();

  candidate.features.forEach((rawFeature: unknown, index: number) => {
    const featurePath = `features[${index}]`;

    if (typeof rawFeature !== "object" || rawFeature === null) {
      diagnostics.push({
        severity: "error",
        code: "GEO_INVALID_FEATURE",
        message: `Feature at index ${index} must be an object.`,
        path: featurePath,
      });
      return;
    }

    const feature = rawFeature as Partial<Feature>;

    if (feature.type !== "Feature") {
      diagnostics.push({
        severity: "error",
        code: "GEO_INVALID_FEATURE_TYPE",
        message: `Feature at index ${index} must have type "Feature", found "${String(feature.type)}".`,
        path: `${featurePath}.type`,
      });
    }

    // ID validation & uniqueness check
    const id = feature.id ?? feature.properties?.id;
    if (id === undefined || id === null || id === "") {
      diagnostics.push({
        severity: "error",
        code: "GEO_MISSING_FEATURE_ID",
        message: `Feature at index ${index} has no identifier. Every feature must have a unique "id" or "properties.id".`,
        path: `${featurePath}.id`,
      });
    } else {
      const stringId = String(id);
      if (seenIds.has(stringId)) {
        diagnostics.push({
          severity: "error",
          code: "GEO_DUPLICATE_FEATURE_ID",
          message: `Duplicate feature ID "${stringId}" detected at index ${index}. Feature IDs must be unique within a dataset.`,
          path: `${featurePath}.id`,
          context: { duplicateId: stringId, index },
        });
      } else {
        seenIds.add(stringId);
      }
    }

    // Geometry validation
    if (!feature.geometry) {
      diagnostics.push({
        severity: "warning",
        code: "GEO_EMPTY_GEOMETRY",
        message: `Feature at index ${index} (id: "${String(id)}") has null or undefined geometry.`,
        path: `${featurePath}.geometry`,
      });
    } else {
      validateGeometry(feature.geometry, `${featurePath}.geometry`, diagnostics);
    }
  });

  const hasErrors = diagnostics.some((d) => d.severity === "error");

  if (hasErrors) {
    return {
      success: false,
      errors: diagnostics.filter((d) => d.severity === "error"),
    };
  }

  return {
    success: true,
    data: candidate as unknown as FeatureCollection,
    diagnostics,
  };
}

/**
 * Validates geometric coordinate boundaries
 */
function validateGeometry(
  geometry: Geometry,
  path: string,
  diagnostics: GeoDiagnostic[]
): void {
  const checkPositions = (coords: unknown, subPath: string): void => {
    if (!Array.isArray(coords)) return;
    if (
      typeof coords[0] === "number" &&
      typeof coords[1] === "number" &&
      coords.length >= 2
    ) {
      if (!isValidCoordinate(coords)) {
        diagnostics.push({
          severity: "error",
          code: "GEO_INVALID_COORDINATE",
          message: `Invalid coordinate [${coords[0]}, ${coords[1]}]. Longitude must be [-180, 180] and latitude [-90, 90].`,
          path: subPath,
        });
      }
      return;
    }
    coords.forEach((nested, i) => checkPositions(nested, `${subPath}[${i}]`));
  };

  if ("coordinates" in geometry) {
    checkPositions(geometry.coordinates, `${path}.coordinates`);
  }
}
