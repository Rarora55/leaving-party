# Research: 005-release-readiness-cleanup

## Decision 1: Artifact classification is mandatory and publication-blocking when unresolved

- Decision: Audit every tracked artifact into `required`, `removable`, or `needs-confirmation`, then resolve every `needs-confirmation` entry before publication.
- Rationale: The clarified spec requires zero unresolved tracked artifacts at release time and treats ambiguity as a safety risk.
- Alternatives considered:
  - Allow unresolved artifacts with owner notes.
    - Rejected because spec clarification makes unresolved artifacts a blocker.
  - Focus only on newly added or recently changed files.
    - Rejected because legacy tracked clutter can still leak accidental content.

## Decision 2: Real secret exposure (tracked files or git history) is a hard release blocker

- Decision: Treat any verified real secret in current tracked files or repository history as a hard blocker requiring revoke/rotate and remediation before publication.
- Rationale: Public release safety cannot rely on post-publication cleanup when credentials may already be exploitable.
- Alternatives considered:
  - Clean only current files and document historical exposure.
    - Rejected because history remains publicly accessible in repository publication contexts.
  - Flag secrets for later follow-up without blocking.
    - Rejected because this violates clarified blocker rules and creates avoidable launch risk.

## Decision 3: Core release gates are all existing automated quality/build scripts

- Decision: Define the core gate set as all currently existing automated quality/build scripts and require 100% pass with no waivers.
- Rationale: This aligns release policy with clarified strict gating and avoids ambiguous "optional" checks.
- Alternatives considered:
  - Only block on build and lint.
    - Rejected because it weakens release confidence and contradicts clarified gate strictness.
  - Allow documented waivers.
    - Rejected because clarified requirements explicitly prohibit waiver-based publication.

## Decision 4: Primary-target deployment validation only

- Decision: Validate deployment-readiness against only the documented primary production deployment target for this feature scope.
- Rationale: This preserves conservative scope, prevents validation sprawl, and matches clarified deployment-target constraints.
- Alternatives considered:
  - Validate all potential deployment targets in repository context.
    - Rejected because it expands scope beyond conservative cleanup/readiness intent.
  - Skip target-specific validation.
    - Rejected because readiness claims must be tied to a concrete production target.

## Decision 5: Release-readiness includes route, metadata, and failure-state smoke validation

- Decision: Include blocker-focused validation for route availability/fallbacks, essential metadata, and baseline UX failure behavior for missing/invalid configuration.
- Rationale: These checks cover high-impact user-facing release blockers without redesigning product behavior.
- Alternatives considered:
  - Restrict scope to repository hygiene and docs only.
    - Rejected because spec requires runtime release-readiness validation too.
  - Expand to full UX redesign or broad refactors.
    - Rejected due explicit conservative-change constraint.

## Decision 6: Documentation handoff is a release gate, not a nice-to-have

- Decision: Require primary release documentation (README or equivalent) to cover install, configuration, build, deployment, and final manual pre-launch checks.
- Rationale: Operational reproducibility is a core acceptance criterion and must be validated like code checks.
- Alternatives considered:
  - Keep release instructions distributed across ad hoc files only.
    - Rejected because this increases onboarding and launch failure risk.
  - Document only build commands.
    - Rejected because publication readiness also depends on env and deployment clarity.

## Decision 7: No new dependency or architectural surface is introduced

- Decision: Execute the feature using existing stack, scripts, and project boundaries only.
- Rationale: The constitution and feature constraints prioritize maintainability, conservative change, and zero unnecessary architecture drift.
- Alternatives considered:
  - Introduce tooling for advanced scanning/reporting.
    - Rejected unless existing capabilities are proven insufficient in implementation phase.
  - Create new runtime abstraction layers for release checks.
    - Rejected because repository-level documentation and scripts can satisfy scope directly.
