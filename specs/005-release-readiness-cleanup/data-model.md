# Data Model: 005-release-readiness-cleanup

## Scope

No product database schema changes are introduced. This feature defines release-operation data entities used to classify repository artifacts, enforce publication blockers, validate release gates, and formalize deployment/documentation readiness.

## Entities

## 1) ArtifactInventoryItem (repository audit entity)

- Represents: One tracked artifact evaluated for release relevance.
- Fields:
  - `path: string`
  - `type: 'file' | 'directory'`
  - `category: 'required' | 'removable' | 'needs-confirmation'`
  - `rationale: string`
  - `owner: string | null`
  - `resolutionStatus: 'open' | 'resolved'`
  - `resolvedAs: 'required' | 'removed' | null`
- Constraints:
  - Every tracked artifact must have exactly one inventory record.
  - `needs-confirmation` items cannot remain unresolved at publication time.

## 2) PublicationSafetyRule (safety policy entity)

- Represents: A publication-safety invariant that blocks release when violated.
- Fields:
  - `id: string`
  - `title: string`
  - `severity: 'blocker' | 'warning'`
  - `condition: string`
  - `requiredRemediation: string`
  - `verificationMethod: string`
- Constraints:
  - Secret exposure rule is always severity `blocker`.
  - Blocker rules must have explicit remediation and verification steps.

## 3) SecretExposureIncident (security finding entity)

- Represents: Verified real secret exposure in tracked files or git history.
- Fields:
  - `id: string`
  - `locationType: 'tracked-file' | 'git-history'`
  - `locationRef: string`
  - `secretType: string`
  - `status: 'open' | 'revoked-rotated' | 'remediated' | 'closed'`
  - `remediationNotes: string`
  - `verifiedBy: string`
- Constraints:
  - Any incident with status other than `closed` blocks publication.
  - Revocation/rotation evidence is required before incident closure.

## 4) ReleaseGateDefinition (quality gate entity)

- Represents: One mandatory automated release gate.
- Fields:
  - `name: string`
  - `command: string`
  - `required: boolean`
  - `scope: 'local' | 'ci' | 'both'`
  - `passCriteria: string`
- Constraints:
  - All existing automated quality/build scripts are `required = true`.
  - Waived failures are not allowed for required gates.
  - Current core gate pack is `npm run check:release`; schema gate is `npm run verify:rsvp-schema` when DB connectivity secret is available.

## 5) EnvironmentContractVariable (production config entity)

- Represents: One required runtime/build environment variable contract for safe publication.
- Fields:
  - `name: string`
  - `required: boolean`
  - `allowedLocation: 'local-dev-file' | 'ci-secret' | 'hosting-build-env'`
  - `visibility: 'public-client' | 'server-only'`
  - `exampleValue: string`
  - `notes: string`
- Constraints:
  - Variables exposed to browser code must remain public-safe only.
  - Secret/server-only keys must never appear in client-visible env files.

## 6) DeploymentTargetProfile (deployment validation entity)

- Represents: The single documented primary production deployment target for readiness checks.
- Fields:
  - `name: string`
  - `type: string`
  - `buildCommand: string`
  - `requiredEnvVars: string[]`
  - `validationChecklistRef: string`
- Constraints:
  - Exactly one primary target is in scope for this feature.
  - Non-primary targets are out of scope unless feature is re-scoped.
  - Current primary target profile: Vercel static deployment from `dist/` built by `npm run build`.

## 7) LaunchReadinessChecklistItem (manual release control entity)

- Represents: One explicit manual pre-launch verification step.
- Fields:
  - `id: string`
  - `area: 'repo-hygiene' | 'security' | 'quality-gates' | 'runtime-smoke' | 'deployment' | 'documentation'`
  - `description: string`
  - `status: 'pending' | 'pass' | 'fail'`
  - `owner: string`
  - `evidenceRef: string | null`
- Constraints:
  - Final launch approval requires no `fail` or `pending` items.
  - Checklist must be reproducible from repository docs.

## Relationships

- `ArtifactInventoryItem` outcomes are validated by `PublicationSafetyRule` and must satisfy publication constraints.
- `SecretExposureIncident` is governed by the secret-related `PublicationSafetyRule` and can block all downstream release steps.
- `ReleaseGateDefinition` results inform `LaunchReadinessChecklistItem` entries under quality-gate area.
- `EnvironmentContractVariable` and `DeploymentTargetProfile` jointly define deploy-readiness validation scope.
- `LaunchReadinessChecklistItem` aggregates evidence from artifact audit, gate execution, security remediation, and deployment checks.

## State Transitions

## Artifact resolution lifecycle

1. Artifact discovered -> category assigned.
2. If `needs-confirmation`, assign owner and investigate.
3. Resolve to `required` or `removed`.
4. Publication permitted only when all items are resolved.

## Secret incident lifecycle

1. Potential secret detected.
2. Verify if real secret.
3. If real: revoke/rotate and remediate repository exposure.
4. Validate remediation evidence and close incident.

## Release gate lifecycle

1. Define required commands from existing automated scripts.
2. Execute from clean checkout.
3. Record pass/fail per gate.
4. Any failed required gate blocks publication.

## Validation Rules

- Every tracked artifact must be classified and resolved.
- Zero unresolved real secret exposures may exist at publication time.
- 100% of required automated gates must pass with no waivers.
- Deployment readiness must be evaluated only against the documented primary production target.
- Primary documentation must include setup, environment, build, deployment, and manual pre-launch checklist instructions.
