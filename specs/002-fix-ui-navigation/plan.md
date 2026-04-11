# Implementation Plan: Fix UI and Navigation Issues

**Branch**: `002-fix-ui-navigation` | **Date**: 2026-04-09 | **Spec**: [specs/002-fix-ui-navigation/spec.md](specs/002-fix-ui-navigation/spec.md)
**Input**: Feature specification from `/specs/002-fix-ui-navigation/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

Fix UI and navigation issues in the farewell party site: ensure home screen covers full viewport, re-enable intro title fade-in animation, remove extra title, replace burger menu with cross icon, implement full-screen navbar, and properly implement pages.

## Technical Context

**Language/Version**: TypeScript + React  
**Primary Dependencies**: React, Vite, React Router, Tailwind CSS, Motion  
**Storage**: Browser localStorage for site data, Supabase for guest list and messages  
**Testing**: Vitest, React Testing Library, manual QA checklist  
**Target Platform**: Responsive web (mobile-first, tablet, desktop)  
**Project Type**: Frontend web application  
**Performance Goals**: Smooth scrolling and animation, aiming for 60 fps on modern devices  
**Constraints**: Preserve pixel-art identity, support reduced motion, keep dependencies minimal, keep content data-driven, and maintain simple deployment  
**Scale/Scope**: Farewell invitation website with landing, guest confirmation, and public messages experiences

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Stack remains React + Vite + React Router + Tailwind CSS + Motion.
- Proposed files preserve separation between app wiring, pages, feature logic, shared
  primitives, content/config, and services.
- UI design preserves pixel-art identity and defines responsive, readable,
  accessible behavior for all affected breakpoints.
- Motion has a clear storytelling or interaction purpose and includes reduced-motion
  handling.
- Repeatable copy, event data, and configurable UI states are modeled as reusable
  data structures rather than page-local hardcoded content.
- Architecture keeps future CMS or admin-panel integration viable.
- Added dependencies are minimal, justified, and cheaper than extending the approved
  stack.
- Performance plan covers scroll behavior, animation budget, asset loading, and
  deployment simplicity.

## Project Structure

### Documentation (this feature)

```text
specs/002-fix-ui-navigation/
|-- plan.md              # This file (/speckit.plan command output)
|-- research.md          # Phase 0 output (/speckit.plan command)
|-- data-model.md        # Phase 1 output (/speckit.plan command)
|-- quickstart.md        # Phase 1 output (/speckit.plan command)
|-- contracts/           # Phase 1 output (/speckit.plan command)
`-- tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
|-- app/
|   |-- providers/
|   `-- AppRouter.tsx
|-- assets/
|   |-- fonts/
|   |-- icons/
|   |-- images/
|   `-- pixel-art/
|-- features/
|   |-- guest-list/
|   |-- guest-messages/
|   |-- home/
|   `-- components/
|-- pages/
|   |-- GuestListPage/
|   |-- HomePage/
|   `-- MessagesPage/
|-- services/
|   |-- localStorage/
|   `-- supabase/
|-- shared/
|   |-- components/
|   |-- config/
|   |-- constants/
|   |-- hooks/
|   |-- types/
|   `-- utils/
`-- styles/
```

**Structure Decision**: Affected directories include pages/, features/, shared/components/. Feature boundary is UI fixes across home and navigation. Content remains data-driven via constants and services.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

None - all checks pass.
| [e.g., extra dependency] | [specific need] | [why the approved stack could not cover it] |
