/**
 * @file apps/www/config/site.ts
 * @description Centralized site configuration and primary information architecture navigation structure.
 */

export interface NavItem {
  readonly title: string;
  readonly href: string;
  readonly description?: string;
  readonly badge?: string;
  readonly external?: boolean;
}

export interface SiteConfig {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly links: {
    readonly github: string;
    readonly docs: string;
    readonly data: string;
  };
  readonly mainNav: readonly NavItem[];
  readonly secondaryNav: readonly NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "GeoCN",
  description:
    "Open-source geographic UI registry and cartographic component ecosystem for React and Next.js, built on copy-and-own principles.",
  url: "https://geocn.dev",
  links: {
    github: "https://github.com/CodeWithEswar/GeoCN",
    docs: "/docs",
    data: "/data",
  },
  mainNav: [
    {
      title: "Docs",
      href: "/docs",
      description:
        "Engineering guides, system architecture, and rendering specifications.",
    },
    {
      title: "Components",
      href: "/components",
      description: "Reusable geographic UI primitives (maps, regions, markers, legends).",
    },
    {
      title: "Maps",
      href: "/maps",
      description: "High-level cartographic compositions (choropleths, regional maps).",
    },
    {
      title: "Countries",
      href: "/countries",
      description:
        "Geographic coverage discovery by country and administrative hierarchy.",
    },
    {
      title: "Data",
      href: "/data",
      description: "First-class geographic dataset catalog and provenance explorer.",
      badge: "Provenance",
    },
    {
      title: "Examples",
      href: "/examples",
      description: "Tested, reproducible geographic interface implementation patterns.",
    },
  ],
  secondaryNav: [
    {
      title: "Registry",
      href: "/registry",
      description: "Shadcn-compatible distribution metadata and copy-and-own philosophy.",
    },
    {
      title: "Changelog",
      href: "/changelog",
      description:
        "Release history across code components, datasets, and boundary updates.",
    },
  ],
};
