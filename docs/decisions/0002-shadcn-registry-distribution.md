# ADR-0002: Shadcn Registry Model Distribution

## Context

Traditional component libraries distribute monolithic npm packages containing hundreds of components. Consumers must accept whatever styling abstraction, dependency choices, and runtime behaviors the author dictates, and cannot modify component internals without fragile patching or forking.

## Decision

GeoCN adopts the **shadcn registry distribution model** (Copy-and-Own). Components are published as open registry endpoints and installed directly into consumer applications via `npx shadcn@latest add ...`.

## Consequences

- **Positive**:
  - Developers own the installed component code in their repository.
  - Zero runtime framework lock-in.
  - Complete freedom to customize animations, accessibility tags, colors, and event handlers.
  - Small payloads: applications only import the specific components they install.
- **Negative / Constraints**:
  - Upstream updates require intentional diffing rather than simple `npm update`. Maintainers must ensure stable, backwards-conscious component structures.
