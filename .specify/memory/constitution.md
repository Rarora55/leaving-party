<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
  - Template Principle 1 -> I. Canonical Frontend Stack
  - Template Principle 2 -> II. Modular, Scalable Architecture
  - Template Principle 3 -> III. Pixel-Art Storytelling Experience
  - Template Principle 4 -> IV. Reusable, Data-Driven Content Systems
  - Template Principle 5 -> V. Accessible Performance and Maintainability
- Added sections:
  - Experience Standards
  - Delivery Workflow
- Removed sections:
  - None
- Templates requiring updates:
  - done: .specify/templates/plan-template.md
  - done: .specify/templates/spec-template.md
  - done: .specify/templates/tasks-template.md
  - pending: .specify/templates/commands/*.md (directory not present in this repository)
- Follow-up TODOs:
  - None
-->

# We Are Leaving Constitution

## Core Principles

### I. Canonical Frontend Stack
All user-facing surfaces MUST be built with React, Vite, React Router, Tailwind CSS,
and Motion. Replacing any of these tools or introducing overlapping alternatives is
not allowed unless this constitution is amended first. Every additional dependency
MUST be justified in the implementation plan, remain minimal in scope, and be cheaper
to maintain than extending the approved stack.

### II. Modular, Scalable Architecture
The codebase MUST preserve clear separation between application wiring, page
composition, feature logic, shared UI primitives, content/configuration, and data
services. Features MUST be implemented through small, composable modules that are easy
to read, test, and hand off. SOLID, DRY, and KISS are mandatory constraints:
abstractions exist only when they reduce duplication or coupling, never to introduce
cleverness for its own sake.

### III. Pixel-Art Storytelling Experience
The product MUST maintain a cohesive pixel art identity across the animated landing
page, guest confirmation flow, and public messages pages. Motion MUST support
storytelling, atmosphere, interaction clarity, or pacing; decorative animation with no
product value is not acceptable. Every animated interaction MUST preserve readability,
avoid disorientation, and provide a reduced-motion fallback.

### IV. Reusable, Data-Driven Content Systems
Event details, invitation copy, page sections, message rules, guest states, and other
repeatable content MUST be modeled through typed constants, configuration objects, or
service-managed data structures instead of page-local hardcoded values. Reusable
components are preferred over duplicated markup. Data access MUST remain isolated
behind service modules so a future CMS or admin panel can replace the content source
without rewriting page composition.

### V. Accessible Performance and Maintainability
Every feature MUST be fully responsive, accessible, and readable on mobile, tablet,
and desktop layouts. Implementations MUST prioritize smooth scrolling, stable
animation performance, restrained asset weight, and simple deployment. When two
approaches are viable, the simpler and more maintainable option wins over the more
clever one.

## Experience Standards

The product scope centers on a playful, personal farewell invitation website with
three primary surfaces: a scrolling animated landing page, a guest confirmation
experience, and a public messages experience. All new work MUST reinforce that
identity instead of fragmenting it.

Design and implementation decisions MUST satisfy all of the following:

- Pixel-art styling, typography, illustration, and layout language MUST remain coherent
  across routes.
- Motion sequences MUST clarify narrative progression, state changes, or interaction
  feedback and MUST degrade gracefully when reduced motion is requested.
- UI copy and structured content MUST live in maintainable data shapes that can later
  be exposed through CMS or admin tooling.
- Accessibility is a product requirement: semantic structure, readable contrast,
  keyboard support where applicable, and clear focus states are mandatory.
- Responsive behavior MUST be defined intentionally rather than treated as a final
  polish step.

## Delivery Workflow

Every future specification, implementation plan, and task list MUST demonstrate
compliance with this constitution before delivery work starts.

- Specifications MUST describe the user journey, affected route or feature surface,
  accessibility impact, motion intent, and any content structures that should remain
  data-driven.
- Implementation plans MUST include an explicit constitution check covering stack
  compliance, modular boundaries, pixel-art continuity, responsive accessibility,
  content modeling, CMS readiness, and performance expectations.
- Task lists MUST include work for reusable component boundaries, content/config
  modeling, responsive verification, accessibility review, and motion/performance
  validation when those concerns are affected.
- Reviews MUST reject work that violates the approved stack, collapses separation of
  concerns, hardcodes repeatable content into page components, or adds unjustified
  dependencies.

## Governance

This constitution overrides conflicting local habits, ad hoc design choices, and
feature-level preferences. Amendments require a documented rationale, explicit
statement of impacted principles or sections, and synchronization of dependent
templates and guidance files before the amendment is considered complete.

Versioning policy:

- MAJOR: Remove or redefine a core principle in a backward-incompatible way.
- MINOR: Add a new principle or materially expand required workflow or standards.
- PATCH: Clarify wording, tighten definitions, or make non-semantic editorial fixes.

Compliance review expectations:

- Every spec, plan, and implementation review MUST verify constitution alignment.
- Any exception MUST be written down in the relevant plan with a clear justification
  and an explanation of why a simpler compliant alternative was rejected.
- The repository guidance in README.md and the templates in `.specify/templates/`
  MUST stay aligned with this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-04-07 | **Last Amended**: 2026-04-07
