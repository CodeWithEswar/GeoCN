/**
 * @file packages/geo-data/src/schemas/provenance.ts
 * @description Zod schemas for geographic data provenance, licensing, and transformation audit trails.
 */

import { z } from "zod";

export const GeoSourceSchema = z.object({
  name: z.string().min(1, "Source name is required"),
  url: z.string().url("Source URL must be a valid URL"),
  provider: z.string().optional(),
});

export const GeoLicenseSchema = z.object({
  name: z.string().min(1, "License name is required"),
  url: z.string().url().optional(),
  attribution: z.string().optional(),
  redistributionAllowed: z.boolean({
    required_error: "Must explicitly declare whether redistribution is allowed",
  }),
});

export const GeoTransformationSchema = z.object({
  type: z.string().min(1, "Transformation type is required"),
  appliedAt: z.string().datetime("Applied date must be ISO 8601 format"),
  summary: z.string().min(1, "Transformation summary is required"),
  parameters: z.record(z.unknown()).optional(),
});

export type GeoSource = z.infer<typeof GeoSourceSchema>;
export type GeoLicense = z.infer<typeof GeoLicenseSchema>;
export type GeoTransformation = z.infer<typeof GeoTransformationSchema>;
