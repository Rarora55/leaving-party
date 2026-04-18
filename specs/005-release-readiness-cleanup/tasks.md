# Tasks: Pre-Release Cleanup and Publication Readiness

**Input**: Design documents from `/specs/005-release-readiness-cleanup/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/release-readiness-contract.md](./contracts/release-readiness-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Automated validation tasks are included because the implementation plan defines mandatory quality gates (`lint`, `test`, `build`, schema verification) and runtime release-smoke checks.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on unfinished tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`) used only in user-story phases
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare release-readiness working artifacts and baseline documentation anchors.

- [X] T001 Create release-evidence workspace scaffold in `specs/005-release-readiness-cleanup/evidence/.gitkeep`
- [X] T002 [P] Add execution-log sections for hygiene, security, gates, and docs validation in `specs/005-release-readiness-cleanup/quickstart.md`
- [X] T003 [P] Create primary project documentation scaffold with release-readiness headings in `README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared rules and infrastructure that all user stories depend on.

**CRITICAL**: No user-story work should begin until this phase is complete.

- [X] T004 Align artifact classification and blocker contract details in `specs/005-release-readiness-cleanup/contracts/release-readiness-contract.md`
- [X] T005 [P] Align ignore policy for local/generated artifacts in `.gitignore`
- [X] T006 [P] Align mandatory release-gate scripts in `package.json`
- [X] T007 [P] Align CI gate execution and required environment handling in `.github/workflows/ci.yml`
- [X] T008 [P] Align environment variable publication-safety contract in `.env.example` and `SUPABASE_ENVIRONMENT.md`
- [X] T009 Implement shared runtime configuration safety checks in `src/shared/config/env.ts` and `src/services/supabase/client.ts`

**Checkpoint**: Foundation complete; user stories can now begin.

---

## Phase 3: User Story 1 - Establish a Publish-Safe Repository Baseline (Priority: P1)

**Goal**: Leave the tracked repository in a publication-safe state with zero unresolved artifact classifications and documented safety rationale.

**Independent Test**: Review tracked artifacts and confirm each is classified with rationale, no temporary/duplicate/accidental artifacts remain tracked, and no unresolved `needs-confirmation` entries exist.

### Implementation for User Story 1

- [X] T010 [P] [US1] Create tracked-artifact inventory with classification fields in `specs/005-release-readiness-cleanup/evidence/tracked-artifact-inventory.md`
- [X] T011 [US1] Remove obsolete/duplicate/temporary/accidental tracked artifacts and record removal rationale in `specs/005-release-readiness-cleanup/evidence/tracked-artifact-inventory.md`
- [X] T012 [US1] Resolve all `needs-confirmation` artifacts to `required` or `removed` and record owner decisions in `specs/005-release-readiness-cleanup/evidence/tracked-artifact-inventory.md`
- [X] T013 [P] [US1] Create secret exposure incident log with blocker fields in `specs/005-release-readiness-cleanup/evidence/secret-exposure-log.md`
- [X] T014 [US1] Perform tracked-file and git-history secret review and document remediation/closure evidence in `specs/005-release-readiness-cleanup/evidence/secret-exposure-log.md`
- [X] T015 [US1] Finalize ignore-rule updates after hygiene cleanup in `.gitignore`
- [X] T016 [US1] Document retained-but-questionable artifact rationale for reviewer traceability in `specs/005-release-readiness-cleanup/evidence/retained-artifacts-rationale.md`

**Checkpoint**: User Story 1 is independently complete and publication-safe at repository level.

---

## Phase 4: User Story 2 - Verify Production Readiness of Configuration and Quality Gates (Priority: P2)

**Goal**: Enforce strict release gates, validate production-safe configuration, and close blocker-level route/metadata/failure-state risks.

**Independent Test**: From a clean checkout, all mandatory core gates pass without waivers, production configuration is explicit and safe, and route/metadata/failure-state checks reveal no release blockers.

### Tests for User Story 2

- [X] T017 [P] [US2] Add environment-config failure-state coverage in `tests/release-readiness/env-config-failure.test.ts`
- [X] T018 [P] [US2] Add route fallback and metadata smoke coverage in `tests/release-readiness/router-metadata-smoke.test.tsx`

### Implementation for User Story 2

- [X] T019 [US2] Harden runtime env validation and user-safe failure messaging in `src/shared/config/env.ts`
- [X] T020 [US2] Harden Supabase client initialization safety and error propagation in `src/services/supabase/client.ts`
- [X] T021 [US2] Validate and adjust wildcard fallback route behavior for release readiness in `src/app/AppRouter.tsx`
- [X] T022 [US2] Validate and adjust essential publication metadata baseline in `index.html`
- [X] T023 [US2] Enforce release-gate command coherence and fail-fast behavior in `.github/workflows/ci.yml`
- [X] T024 [US2] Align gate command definitions and schema verification wiring in `package.json` and `scripts/verify-rsvp-schema.mjs`
- [X] T025 [US2] Execute mandatory gate commands and record pass/fail outcomes in `specs/005-release-readiness-cleanup/quickstart.md`

**Checkpoint**: User Story 2 is independently complete with strict gate and runtime-readiness validation.

---

## Phase 5: User Story 3 - Publish Clear Setup and Deployment Documentation (Priority: P3)

**Goal**: Provide complete, reproducible install/configure/build/deploy instructions and final manual pre-launch checks for collaborators.

**Independent Test**: A collaborator follows README and linked docs from clean checkout to deployment preparation without undocumented steps.

### Implementation for User Story 3

- [X] T026 [P] [US3] Document install and local setup workflow in `README.md`
- [X] T027 [P] [US3] Document production environment and secret-handling rules in `README.md` and `SUPABASE_ENVIRONMENT.md`
- [X] T028 [US3] Document primary production deployment target and deployment preparation steps in `README.md`
- [X] T029 [US3] Add final manual pre-launch checklist with explicit pass/fail criteria in `README.md`
- [X] T030 [US3] Run clean-checkout documentation trial and capture reproducibility notes in `specs/005-release-readiness-cleanup/quickstart.md`

**Checkpoint**: All user stories are independently functional and release handoff documentation is complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-story verification and sign-off artifacts.

- [X] T031 [P] Run full release-readiness command pack and record final outcomes in `specs/005-release-readiness-cleanup/quickstart.md`
- [X] T032 Validate non-regression for responsive, accessibility, and reduced-motion behavior after blocker fixes in `specs/005-release-readiness-cleanup/quickstart.md`
- [X] T033 [P] Reconcile final contract/data-model alignment with implemented outcomes in `specs/005-release-readiness-cleanup/contracts/release-readiness-contract.md` and `specs/005-release-readiness-cleanup/data-model.md`
- [X] T034 Produce final publication sign-off checklist artifact in `specs/005-release-readiness-cleanup/checklists/release-signoff.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2 and may run in parallel with US1 after foundational completion.
- **Phase 5 (US3)**: Depends on Phase 2 and should finalize after US1/US2 evidence is available.
- **Phase 6 (Polish)**: Depends on completion of selected user stories.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories after foundational phase.
- **US2 (P2)**: No strict dependency on US1, but benefits from US1 artifact cleanup outputs for final gate confidence.
- **US3 (P3)**: Depends on US1/US2 outcomes to document final verified commands, blockers, and deployment guidance accurately.

### Dependency Graph

- Setup -> Foundational -> US1 -> Polish
- Setup -> Foundational -> US2 -> Polish
- Setup -> Foundational -> US1 + US2 -> US3 -> Polish

### Within Each User Story

- Complete story-specific models/contracts/docs updates before final verification tasks.
- For US2, add/adjust automated smoke coverage before runtime blocker fixes.
- Execute story-level independent test criteria before moving to lower-priority stories.

### Parallel Opportunities

- **US1**: T010 and T013 can run in parallel; T011 and T014 can run in parallel after inventory/log setup.
- **US2**: T017 and T018 can run in parallel; T019 and T020 can run in parallel; T023 and T024 can run in parallel.
- **US3**: T026 and T027 can run in parallel, then merge into T028 and T029.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 and Phase 2.
2. Deliver **US1** to ensure repository publication safety baseline.
3. Run US1 independent test before starting further release gates.

### Incremental Delivery

1. Add **US2** for strict quality gates, production config safety, and runtime blocker checks.
2. Add **US3** for complete collaborator-facing setup/deploy documentation.
3. Complete Phase 6 for final publication sign-off.

### Team Parallelization Strategy

1. Engineer A: repository hygiene and safety evidence (`.gitignore`, `specs/005-release-readiness-cleanup/evidence/*`).
2. Engineer B: runtime/gate alignment (`src/shared/config/env.ts`, `src/services/supabase/client.ts`, `src/app/AppRouter.tsx`, `index.html`, CI/scripts).
3. Engineer C: documentation and final runbook (`README.md`, `SUPABASE_ENVIRONMENT.md`, `quickstart.md`, checklist artifacts).

