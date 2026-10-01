/**
 * @file packages/geo-data/src/schemas/manifest.ts
 * @description Typed dataset manifest schema for traceable geographic artifacts.
 */

import { z } from "zod";
import { GeoLicenseSchema, GeoSourceSchema, GeoTransformationSchema } from "./provenance";

export const GeoBoundingBoxSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);

export const GeoDatasetManifestSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Dataset ID must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1, "Dataset name is required"),
  country: z.string().optional(),
  iso2: z.string().length(2).optional(),
  iso3: z.string().length(3).optional(),
  adminLevel: z.union([z.number().int().nonnegative(), z.string()]).optional(),
  source: GeoSourceSchema,
  license: GeoLicenseSchema,
  acquiredAt: z.string().datetime("Acquisition date must be ISO 8601 format"),
  version: z.string().default("1.0.0"),
  format: z.enum(["geojson", "topojson"]),
  crs: z.string().default("urn:ogc:def:crs:OGC:1.3:CRS84"),
  featureCount: z.number().int().positive("Dataset must contain at least 1 feature"),
  bbox: GeoBoundingBoxSchema,
  relativePath: z.string().min(1, "Relative path to geographic artifact is required"),
  rawChecksum: z.string().optional(),
  generatedChecksum: z.string().optional(),
  fileSizeBytes: z.number().int().positive().optional(),
  transformations: z.array(GeoTransformationSchema).default([]),
});

export type GeoDatasetManifest = z.infer<typeof GeoDatasetManifestSchema>;
