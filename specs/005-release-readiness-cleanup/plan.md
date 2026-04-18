# Implementation Plan: Pre-Release Cleanup and Publication Readiness

**Branch**: `[005-release-readiness-cleanup]` | **Date**: 2026-04-18 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/005-release-readiness-cleanup/spec.md`

## Summary

Harden the repository for public release by removing non-essential tracked artifacts, enforcing strict release blockers for secret exposure and failing quality gates, documenting production-safe environment and deployment expectations, and validating route/metadata/basic failure-state readiness without redesigning product behavior or visual identity.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2  
**Primary Dependencies**: React 19, Vite 8, React Router 7, Tailwind CSS 4, Motion 12, `@supabase/supabase-js`, Radix Dialog (existing only; no new runtime dependencies)  
**Storage**: Supabase (`guest_rsvps`, `guest_messages`) plus browser `localStorage` for draft/temporary recovery; static typed constants and repository documentation files for release metadata  
**Testing**: `npm run lint`, `npm test`, `npm run build`, `npm run verify:rsvp-schema` (with `SUPABASE_DB_URL`), and manual release checklist validation for routes/metadata/failure states/deployment config  
**Target Platform**: Responsive web (mobile-first, tablet, desktop)  
**Project Type**: Frontend web application  
**Performance Goals**: No regression to current interaction smoothness; release checks complete reliably in CI from clean checkout  
**Constraints**: Conservative changes only; no product redesign; preserve pixel-art continuity; publish-safe secret handling; all existing automated quality/build scripts are mandatory release gates; deployment validation scope limited to documented primary production target  
**Scale/Scope**: Repository hygiene, safety, and release operations across root configuration, scripts, docs, CI checks, and only blocker-level UI/runtime corrections

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Pre-Design Gate: PASS

- Stack remains within the constitutional toolchain; no new framework or dependency class is introduced.
- Proposed work is distributed across docs/config/scripts/services/pages without collapsing modular boundaries.
- Product visual/narrative continuity is preserved because changes are release-safety and blocker-fix oriented, not redesign oriented.
- Motion behavior remains untouched except for defect-level fixes if required.
- Repeatable release-critical content (env contracts, gate definitions, launch checklist) is modeled in maintained docs/contracts, not ad hoc notes.
- CMS/admin-panel viability is preserved because runtime content architecture is not altered.
- Dependency policy is respected: no additional dependencies are planned.
- Performance/deployment simplicity is preserved through strict but existing command gates and primary-target-only deployment validation.

Post-Design Gate (after Phase 1): PASS

- Research, data model, contract, and quickstart artifacts keep scope conservative and constitution-compliant.
- Design artifacts enforce release quality without violating stack, architecture, or experience principles.

## Project Structure

### Documentation (this feature)

```text
specs/005-release-readiness-cleanup/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- release-readiness-contract.md
`-- tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
.github/
|-- workflows/
|   `-- ci.yml
scripts/
|-- verify-rsvp-schema.mjs
src/
|-- app/
|   `-- AppRouter.tsx
|-- shared/
|   |-- config/
|   |   `-- env.ts
|   `-- constants/
|       |-- navigation.constants.ts
|       `-- events.constants.ts
|-- services/
|   `-- supabase/
|       `-- client.ts
`-- pages/
    |-- HomePage/
    |-- GuestListPage/
    |-- MessagesPage/
    `-- HalfMilePage/
```

**Structure Decision**: Keep release-readiness logic and documentation centralized at repository/documentation boundaries (`README`, contracts, env docs, CI workflow, scripts) while limiting runtime code touches to validation/failure-state blockers. Product page composition and feature modules remain unchanged unless a release blocker requires a minimal correction.

## Phased Technical Plan

### Phase 0: Research and Decision Freeze

- Define deterministic classification criteria for tracked artifacts (`required`, `removable`, `needs-confirmation`) and enforce publication-blocking resolution of all `needs-confirmation` items.
- Define publication safety policy for real secrets found in tracked files and git history (revocation/rotation + remediation required before release).
- Confirm strict gate semantics: all existing automated quality/build scripts are mandatory pass criteria.
- Define primary deployment target validation boundaries and avoid multi-target expansion.
- Define documentation baseline for clean install/config/build/deploy instructions and manual pre-launch checks.
- Output: `research.md`.

### Phase 1: Design and Contracts

- Model release domain entities for artifact inventory, safety rules, release gates, env contract variables, deployment target profile, and launch checklist.
- Define release-readiness contract specifying required inputs, pass/fail gates, artifact outputs, and blocker conditions.
- Produce operator quickstart with exact command sequence and expected outcomes from clean checkout.
- Output: `data-model.md`, `contracts/release-readiness-contract.md`, `quickstart.md`.

### Phase 2: Implementation Planning

- Repository hygiene:
  - Audit tracked files and remove obsolete/temporary/duplicate/accidental artifacts.
  - Align `.gitignore` with actual local/generated outputs.
- Release gates:
  - Align scripts/CI expectations for lint/test/build/schema verification and fail-fast behavior.
  - Ensure waiver-free enforcement for defined core checks.
- Production safety:
  - Validate and document environment variable requirements and secret-handling rules.
  - Verify no client-exposed secret misuse and enforce remediation path for historical exposures.
- Runtime release checks:
  - Validate route coverage, route fallback behavior, and baseline metadata.
  - Validate basic UX failure states for environment/config and data-service outages.
- Documentation:
  - Update/create README with setup, configuration, build, deployment, and final manual pre-launch checklist.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Ambiguous file ownership for legacy artifacts | Cleanup may delete needed files or leave accidental files | Require per-item rationale and owner confirmation for any uncertain artifact before final removal |
| Secret exposure detected in history near release date | Publication can be blocked unexpectedly | Define early secret scan checkpoints and remediation runbook (revoke/rotate, history cleanup where required) |
| Existing scripts are inconsistent across local and CI | False readiness signal | Normalize documented gate set to existing scripts + CI (`lint`, `test`, `build`, `verify:rsvp-schema`) |
| Missing explicit primary deployment target | Scope drift into multi-platform validation | Document one primary production target and validate only that target in this feature |
| Documentation gaps despite technical fixes | Release handoff remains risky | Treat README/quickstart completion as mandatory gate, not optional polish |

## Acceptance Criteria (Implementation-Level)

- All tracked repository artifacts are classified and all `needs-confirmation` entries are resolved before publication.
- No obvious temporary/duplicate/experimental/accidental files remain tracked.
- All existing automated quality/build scripts pass without waivers from a clean checkout.
- Real secret exposures in tracked files or git history are treated as hard blockers until remediated.
- Primary production deployment target is explicitly documented and validated.
- Core routes and fallback behavior are validated; essential metadata and basic UX failure states are checked for release blockers.
- README (or equivalent primary doc) provides complete install/configure/build/deploy guidance and a manual pre-launch checklist.

## Testing Strategy

Automated:

- Execute `npm run lint`.
- Execute `npm test`.
- Execute `npm run build`.
- Execute `npm run verify:rsvp-schema` where `SUPABASE_DB_URL` is available.
- Verify CI parity in `.github/workflows/ci.yml`.

Manual:

- Validate route navigation and wildcard fallback behavior across key routes.
- Validate environment/config failure UX for Supabase-dependent flows.
- Validate metadata baseline in built output (title/favicon/viewport and release-critical head tags).
- Execute documentation trial from clean checkout and confirm no undocumented steps.
- Execute final manual pre-launch checklist before publication approval.

## File-by-File Change Plan

- `.gitignore`
  - Remove inconsistencies and ensure generated/local artifacts are ignored correctly.
- `README.md` (create or update)
  - Add install, environment setup, build, deployment, and manual pre-launch checklist.
- `SUPABASE_ENVIRONMENT.md`
  - Align with production publication safety and env variable handling.
- `.env.example`
  - Ensure only safe, non-secret placeholders and required variable names are documented.
- `.github/workflows/ci.yml`
  - Keep release-gate checks coherent with the defined core scripts.
- `package.json`
  - Align script semantics and naming if needed to support clear release gates.
- `scripts/verify-rsvp-schema.mjs`
  - Keep schema verification behavior explicit and fail-fast for release gating.
- `src/shared/config/env.ts`
  - Verify production-safe validation and failure messaging behavior.
- `src/services/supabase/client.ts`
  - Ensure safe client initialization and error handling for missing/invalid configuration.
- `src/app/AppRouter.tsx` and related route constants/pages
  - Validate route availability and fallback behavior; only blocker-level fixes if necessary.
- `index.html`
  - Validate and adjust essential metadata only where release blockers exist.

## Complexity Tracking

No constitution violations expected; section intentionally left without entries.
