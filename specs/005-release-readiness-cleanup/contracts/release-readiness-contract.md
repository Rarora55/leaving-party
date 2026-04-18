# Contract: Release Readiness and Publication Safety

## Purpose

Define the required release interfaces, pass/fail conditions, and publication blockers for `005-release-readiness-cleanup`.

## Scope

- In scope:
  - Repository artifact hygiene and tracked-file safety.
  - Secret exposure blocking policy.
  - Mandatory automated release gates.
  - Production environment contract clarity.
  - Primary deployment target validation.
  - Documentation completeness for install/configure/build/deploy/pre-launch checks.
- Out of scope:
  - Product redesign or narrative/visual restyling.
  - Multi-target deployment validation expansion.
  - New architecture or dependency introduction unless explicitly re-scoped.

## Interface 1: Artifact Audit Output

### Input

- Full tracked file list for current branch/repository.

### Required Output Shape

| Field | Type | Required | Notes |
|------|------|----------|-------|
| `path` | string | yes | Repository-relative path |
| `category` | enum(`required`,`removable`,`needs-confirmation`) | yes | Initial classification |
| `rationale` | string | yes | Why category was assigned |
| `resolution_status` | enum(`open`,`resolved`) | yes | Publication requires all resolved |
| `resolved_as` | enum(`required`,`removed`,null) | yes | Null only when open |

### Contract Rules

- Every tracked artifact MUST appear exactly once.
- Publication MUST fail if any record remains `needs-confirmation` and unresolved.
- Every `needs-confirmation` record MUST be resolved as either `required` or `removed` before release approval.

## Interface 2: Secret Exposure Handling

### Input

- Findings from tracked-file and git-history secret checks.

### Required Output Shape

| Field | Type | Required | Notes |
|------|------|----------|-------|
| `incident_id` | string | yes | Stable reference |
| `location_type` | enum(`tracked-file`,`git-history`) | yes | Exposure location class |
| `status` | enum(`open`,`revoked-rotated`,`remediated`,`closed`) | yes | `closed` required for release |
| `remediation_notes` | string | yes | Evidence summary |

### Contract Rules

- Any verified real secret exposure MUST be treated as `blocker`.
- Publication MUST fail unless all verified incidents are `closed`.

## Interface 3: Core Release Gate Execution

### Input

- Existing automated quality/build scripts in project configuration and CI.

### Required Gate Set

- `npm run check:release` (`lint` + `test` + `build`)
- `npm run verify:rsvp-schema` (when required DB connectivity secret is available)

### Contract Rules

- All existing automated quality/build scripts are mandatory core gates.
- Publication MUST fail on any required gate failure.
- Waivers are not permitted for required gate failures.

## Interface 4: Environment and Configuration Publication Safety

### Input

- Environment docs and example files (`.env.example`, environment contract docs, runtime config validation paths).

### Required Assertions

- Required production variables are explicitly documented.
- Client-visible variables contain no server-only secrets.
- Secret handling rules are explicit for local and production contexts.

### Contract Rules

- Publication MUST fail if production configuration requirements are ambiguous or unsafe.
- Publication MUST fail if secret/server-only keys are configured in client-visible channels.

## Interface 5: Deployment Validation

### Input

- Documented primary production deployment target profile.

### Required Assertions

- Target is explicitly named and documented.
- Build and required configuration steps are reproducible.
- Validation remains scoped to this primary target.

### Contract Rules

- Publication readiness is valid only for the documented primary target.
- Multi-target validation is optional and out of scope for this feature.
- This feature's primary target is Vercel static deployment using `npm run build` output.

## Interface 6: Documentation Completeness

### Input

- Primary project documentation set.

### Required Sections

- Install
- Environment configuration
- Build
- Deployment preparation
- Manual pre-launch checklist

### Contract Rules

- Documentation MUST be sufficient for a clean-checkout runbook.
- Publication MUST fail when required sections are missing or contradictory.
