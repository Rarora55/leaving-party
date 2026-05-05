# Implementation Plan: Popup Overlay and Content Updates

**Branch**: `[main]` | **Date**: 2026-05-05 | **Spec**: [specs/007-popup-hotspot-home-content/spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-popup-hotspot-home-content/spec.md`

**Note**: This plan is generated via `/speckit-plan` workflow and aligned to the active feature directory in `.specify/feature.json`.

## Summary

Implement an accessible popup experience for Half Mile brewery hotspots using existing popup assets, with dimmed page overlay and explicit close actions (`X`, `Got it`, `Escape`, and overlay click/tap). Add a responsive `star.png` marker over the Signature Brew hotspot and extend Home hero copy with arrival time and address while preserving current style, spacing, and responsive behavior.

## Technical Context

**Language/Version**: TypeScript 5.9 + React 19.2  
**Primary Dependencies**: React, Vite, React Router, Tailwind CSS, Motion, Radix Dialog (already present)  
**Storage**: Static content and in-memory UI state only (no new persistence)  
**Testing**: TypeScript compile (`npx tsc --noEmit`) + targeted manual QA checklist for popup/overlay/accessibility/responsiveness  
**Target Platform**: Responsive web (mobile-first, tablet, desktop)  
**Project Type**: Frontend web application  
**Performance Goals**: Keep interactions smooth and maintain existing map/hero rendering behavior; avoid introducing heavy assets or unnecessary re-renders  
**Constraints**: Preserve pixel-art identity, keyboard accessibility, reduced-motion compatibility, existing visual rhythm, and minimal dependency footprint  
**Scale/Scope**: Localized changes in Half Mile hotspot presentation and Home title copy; no backend/API/schema changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Stack remains React + Vite + React Router + Tailwind CSS + Motion. PASS
- Proposed files preserve separation between app wiring, pages, feature logic, shared primitives, content/config, and services. PASS
- UI design preserves pixel-art identity and defines responsive, readable, accessible behavior for all affected breakpoints. PASS
- Motion has a clear storytelling or interaction purpose and includes reduced-motion handling. PASS (no new motion primitives introduced)
- Repeatable copy, event data, and configurable UI states are modeled as reusable data structures rather than page-local hardcoded content. PARTIAL (one-time copy addition in Home reveal component; acceptable within scope but noted for future constant extraction if content churn increases)
- Architecture keeps future CMS or admin-panel integration viable. PASS
- Added dependencies are minimal, justified, and cheaper than extending the approved stack. PASS (no new dependencies)
- Performance plan covers scroll behavior, animation budget, asset loading, and deployment simplicity. PASS

Post-design gate review: PASS. No constitution violations requiring escalation.

## Project Structure

### Documentation (this feature)

```text
specs/007-popup-hotspot-home-content/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-behavior-contract.md
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- features/
|   `-- half-mile/
|       `-- components/
|           |-- HalfMileBreweryCard.tsx
|           `-- HalfMileHotspots.tsx
|-- features/
|   `-- home/
|       `-- components/
|           `-- HomeTitleReveal.tsx
`-- shared/
    `-- constants/
```

**Structure Decision**: Keep popup interaction logic within `src/features/half-mile/components`, reuse existing shared styling tokens from constants, and confine Home copy updates to existing hero presentation component. No routing/service-layer changes are required.

## Phase 0: Research

Research output is captured in [research.md](./research.md) and resolves behavior decisions for:
- Popup dismissal and focus return semantics
- Overlay interaction model
- Responsive alignment strategy for hotspot marker
- Accessibility baseline for modal-like UI in current architecture

## Phase 1: Design & Contracts

Design artifacts generated:
- [data-model.md](./data-model.md)
- [contracts/ui-behavior-contract.md](./contracts/ui-behavior-contract.md)
- [quickstart.md](./quickstart.md)

Agent context update:
- `AGENTS.md` currently has no `<!-- SPECKIT START -->` / `<!-- SPECKIT END -->` markers, so no marker-bound plan reference update was possible.

## Phase 2: Task Planning Readiness

Feature is ready for `/speckit-tasks`. Requirements are clarified, artifacts are present, and no unresolved constitutional gates remain.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
