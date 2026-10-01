# GeoCN

> **Open-Source Geographic UI Registry & Cartographic Component System for React and Next.js**

GeoCN provides carefully engineered geographic visualization components, projection primitives, and validated administrative boundaries distributed via the [shadcn registry model](https://ui.shadcn.com).

Developers can install a GeoCN component, inspect its source code, modify it, and own it inside their application:

$$\text{Install} \longrightarrow \text{Inspect} \longrightarrow \text{Understand} \longrightarrow \text{Modify} \longrightarrow \text{Own}$$

---

## 🧭 Project Status: Phase 1 — Foundation

GeoCN is actively establishing its **production-grade engineering foundation**. Rather than populating the repository with dozens of incomplete or fake visualizations, GeoCN follows a **vertical-slice development model**: each geographic component is delivered only after its complete pipeline—from raw geographic acquisition and provenance validation to rendering, accessibility, documentation, and registry distribution—is fully verified.

### Current Implementation Scope
- [x] Monorepo architecture & module boundaries (`@geocn/geo`, `@geocn/geo-data`, `@geocn/ui`, `@geocn/registry`, `@geocn/www`)
- [x] Geographic manifest schema with strict provenance & transformation history
- [x] Deterministic validation tooling (`npm run geo:validate`, `npm run registry:validate`)
- [x] Strict TypeScript configuration, linting, and automated test runners
- [x] Technical cartographic design tokens (light/dark/contrast/grid)
- [ ] *Phase 2 (Upcoming)*: Visual language & geographic rendering engine primitives

---

## 🏛 Core Principles

1. **Copy-and-Own (No Hidden Runtime)**: Components are distributed as source code into your repository. GeoCN does not rely on a proprietary hosted runtime to render your maps.
2. **Provenance-First Geography**: Every geographic dataset is paired with traceable metadata: original source, license, provider, acquisition date, CRS (Coordinate Reference System), and transformation history.
3. **Accessibility**: Visualizations are designed for all users, including keyboard navigation, semantic regions, ARIA labels, high contrast boundaries, and non-color-dependent data indicators.
4. **Composability**: Built from focused primitives rather than monolithic components with hundreds of props.
5. **Deterministic Builds & Small Payloads**: Zero worldwide geometry bloat in application bundles. Payloads are divided by region, administrative level, and simplified deterministically.

---

## 📁 Repository Architecture

```text
geocn/
├── apps/
│   └── www/               # Documentation site, interactive component previews & registry host
├── packages/
│   ├── geo/               # Framework-independent geographic logic (projections, geometry, math)
│   ├── geo-data/          # Provenance schemas, dataset manifests, normalization & validation
│   ├── registry/          # Shadcn-compatible registry generator and schema validators
│   └── ui/                # Shared design tokens, cartographic utility classes, base primitives
├── registry/              # Generated registry distribution artifacts (registry.json)
├── scripts/               # CI & CLI validation/build scripts (geo:validate, registry:build)
├── tests/                 # Unit, geography fixture, and registry validation test suites
└── docs/                  # Architecture Decision Records (ADRs) and pipeline specifications
```

---

## 🛠 Getting Started

### Prerequisites
- **Node.js**: `v20+` (LTS recommended)
- **Package Manager**: `npm` (`npm workspaces` standard)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/CodeWithEswar/GeoCN.git
cd GeoCN

# Install dependencies across all workspaces
npm install
```

### Development & Validation Commands

```bash
# Run local documentation & preview server
npm run dev

# Run comprehensive strict type-checking
npm run typecheck

# Run test suites (unit, geo fixtures, registry)
npm run test

# Validate geographic datasets and provenance manifests
npm run geo:validate

# Build & validate shadcn-compatible registry artifacts
npm run registry:build
npm run registry:validate

# Production build
npm run build
```

---

## 📜 Architectural Decisions (ADRs)

Key architectural decisions are documented under [`docs/decisions/`](docs/decisions/):
- **ADR-0001**: Lightweight SVG & mathematical projections (`d3-geo`) over heavy proprietary tile runtimes for administrative UI.
- **ADR-0002**: Shadcn registry model distribution over monolithic npm package bundling.
- **ADR-0003**: Provenance-first geographic metadata specification.

---

## 🤝 Contributing

We welcome contributions! Please review our [Contributing Guide](docs/contributing/guide.md) before submitting pull requests.

## 📄 License

GeoCN code is licensed under the [MIT License](LICENSE). Geographic datasets maintain their individual source licenses and attribution requirements detailed within their respective dataset manifests.
