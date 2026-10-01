/**
 * @file packages/geo-data/src/schemas/provenance.ts
 * @description Zod schemas for geographic data provenance, authoritative source references,
 * licensing terms, and transformation audit trails.
 */

import { z } from "zod";

/**
 * Structured source navigation references for authoritative upstream providers
 */
export const GeoSourceReferenceSchema = z.object({
  datasetUrl: z.string().url("Original dataset URL must be a valid URL"),
  homepageUrl: z.string().url("Provider homepage URL must be a valid URL").optional(),
  documentationUrl: z.string().url("Documentation URL must be a valid URL").optional(),
  licenseUrl: z.string().url("License URL must be a valid URL").optional(),
});

export const GeoSourceSchema = z.object({
  name: z.string().min(1, "Source name is required"),
  provider: z.string().min(1, "Provider organization is required"),
  datasetTitle: z.string().min(1, "Dataset title is required"),
  reference: GeoSourceReferenceSchema,
});

export const GeoLicenseSchema = z.object({
  name: z.string().min(1, "License name is required"),
  spdxId: z.string().optional(),
  url: z.string().url("License URL must be a valid URL").optional(),
  attribution: z.string().min(1, "Attribution text is required"),
  redistributionAllowed: z.boolean({
    required_error: "Must explicitly declare whether redistribution is permitted",
  }),
  commercialUseAllowed: z.boolean().default(true),
  modificationsAllowed: z.boolean().default(true),
});

export const GeoTransformationSchema = z.object({
  step: z.number().int().positive().optional(),
  type: z.string().min(1, "Transformation type is required"),
  appliedAt: z.string().datetime("Applied date must be ISO 8601 format"),
  summary: z.string().min(1, "Transformation summary is required"),
  parameters: z.record(z.unknown()).optional(),
});

export type GeoSourceReference = z.infer<typeof GeoSourceReferenceSchema>;
export type GeoSource = z.infer<typeof GeoSourceSchema>;
export type GeoLicense = z.infer<typeof GeoLicenseSchema>;
export type GeoTransformation = z.infer<typeof GeoTransformationSchema>;
