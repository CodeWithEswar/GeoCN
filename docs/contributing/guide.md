# Contributing to GeoCN

Thank you for your interest in contributing to GeoCN! This guide provides instructions for setting up your local development environment, adhering to code quality standards, and contributing new features or datasets.

---

## 1. Development Prerequisites

- **Node.js**: v20 or later (Node v24 LTS supported)
- **npm**: v10 or later
- **Git**

---

## 2. Setup Workflow

```bash
# Clone the repository
git clone https://github.com/CodeWithEswar/GeoCN.git
cd GeoCN

# Install dependencies across all monorepo workspaces
npm install

# Run documentation app in development mode
npm run dev
```

---

## 3. Engineering Guidelines

- **Copy-and-Own**: All registry components must remain inspectable and modifiable. Avoid hidden runtimes or proprietary abstractions.
- **Strict TypeScript**: Do not use `any` as an escape hatch. All interfaces must be fully typed.
- **Provenance-First**: Never add geographic boundary data without a corresponding `<dataset-id>.manifest.json`.

---

## 4. Quality Verification Commands

Before opening a pull request, ensure all local checks pass:

```bash
# 1. Typecheck all workspaces
npm run typecheck

# 2. Run unit and integration tests
npm run test

# 3. Validate geographic datasets & manifests
npm run geo:validate

# 4. Build and validate shadcn registry items
npm run registry:build
npm run registry:validate

# 5. Production build
npm run build
```
