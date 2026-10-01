/**
 * @file packages/registry/src/schemas/registry-item.ts
 * @description Zod schema for shadcn-compatible registry components and distribution manifests.
 */

import { z } from "zod";

export const RegistryItemTypeSchema = z.enum([
  "registry:ui",
  "registry:component",
  "registry:hook",
  "registry:lib",
  "registry:block",
  "registry:example",
]);

export const RegistryItemFileSchema = z.object({
  path: z.string().min(1, "File path is required"),
  content: z.string().optional(),
  type: z.enum([
    "registry:ui",
    "registry:component",
    "registry:hook",
    "registry:lib",
    "registry:page",
  ]),
  target: z.string().optional(),
});

export const RegistryItemSchema = z.object({
  $schema: z.string().optional(),
  name: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Registry item name must be lowercase kebab-case"),
  type: RegistryItemTypeSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(RegistryItemFileSchema).default([]),
  categories: z.array(z.string()).default([]),
  meta: z.record(z.unknown()).optional(),
});

export const RegistryIndexSchema = z.array(RegistryItemSchema);

export type RegistryItemType = z.infer<typeof RegistryItemTypeSchema>;
export type RegistryItemFile = z.infer<typeof RegistryItemFileSchema>;
export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
