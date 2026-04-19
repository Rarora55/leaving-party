# Quickstart: 006-fix-mobile-ui

## Goal

Implement mobile-priority usability fixes for Home and Drop a Message by:

- increasing Home final-scene prominence on phones by at least 20%,
- preserving normal page scrolling while typing with keyboard open,
- adding a collapsible message composer card with required arrow semantics.

## Prerequisites

- Node.js and npm installed
- Dependencies installed:

```bash
npm install
```

## Implementation Sequence

1. Implement mobile home scene scaling:
  - Update mobile-only footer scene sizing tokens in `src/shared/constants/home.constants.ts`.
  - Ensure scene rendering applies the mobile token path without changing desktop/tablet behavior.
2. Wire composer collapse/expand state:
  - Add page-level collapse state in `src/pages/MessagesPage/MessagesPages.tsx`.
  - Add top toggle control and state-driven icon semantics in composer rendering.
3. Preserve form behavior and state:
  - Keep existing `useGuestMessageForm` ownership of `guestName`/`message`.
  - Ensure collapse/expand does not reset in-progress values.
4. Fix typing-scroll ergonomics:
  - Refine keyboard/viewport behavior in `src/features/guest-messages/hooks/useStickyComposerViewport.ts`.
  - Remove nested scroll-trap behavior in composer presentation while keyboard is open.
5. Centralize toggle copy:
  - Add expanded/collapsed toggle labels and arrow content in `src/shared/constants/events.constants.ts`.
6. Add automated coverage:
  - Extend `tests/messages/MessagesPage.layout.test.tsx`.
  - Extend `tests/messages/MessagesPage.formFlow.test.tsx`.
  - Extend `tests/messages/MessagesPage.a11y.test.tsx`.

## Reduced-Motion and Responsive Guardrails

- Keep Home and Message surfaces mobile-first while preserving existing desktop behavior.
- Maintain reduced-motion-safe transitions (no forced high-motion dependency for core interactions).
- Keep horizontal overflow clipped on Home footer scene surfaces.
- Keep keyboard-open message composer positioning responsive to visual viewport changes.

## Verification Commands

```bash
npm run lint
npm test
```

## Execution Evidence

## US1 Mobile Baseline Comparison

- Baseline mobile footer frame width token: `172%` (`src/shared/constants/home.constants.ts`, previous value)
- Implemented mobile footer frame width token: `208%`
- Relative increase: `+20.93%` (`(208-172)/172`)
- Horizontal overflow guard applied:
  - `src/features/home/components/HomeFooter.tsx` -> `overflow-x-clip`
  - `src/features/home/components/HomeFooterScene.tsx` -> `overflow-x-clip overflow-y-hidden`

## SC-002 20-Session Typing Protocol Log

- Protocol target: 20 phone typing-and-scroll sessions.
- Required checks per session:
  - focused input or textarea,
  - keyboard open,
  - vertical page scrolling remains available.
- Session result log: **Pending manual device/browser run**.

## SC-003 Blocked-Refresh Interruption Log

- Required checks:
  - no scroll-lock during typing,
  - no blocked-scroll behavior that triggers unintended refresh interruption.
- Evidence source:
  - automated assertions in message-page tests,
  - manual mobile scroll validation at target breakpoints.
- Result: **Automated checks pass; manual blocked-refresh validation pending**.

## Manual QA Checklist

1. Home scene prominence:
  - On phone widths, final scene appears at least 20% larger than current baseline.
  - On tablet/desktop, final scene remains visually unchanged.
  - No horizontal page scrolling is introduced by scene sizing.
2. Typing + scrolling:
  - Focus name field and message textarea with mobile keyboard open.
  - Continue vertical scrolling through page from input areas.
  - Confirm no scroll lock and no blocked-scroll interruption behavior.
3. Composer toggle:
  - Initial expanded card shows down arrow.
  - Collapse action switches to up arrow and minimizes composer.
  - Expand action restores card and down arrow.
  - Typed values remain present after repeated collapse/expand cycles.
4. Accessibility:
  - Toggle control has clear accessible name and keyboard operability.
  - Focus handling remains visible and logical while toggling.
5. Responsive coverage:
  - Validate at `360x800`, `390x844`, `768x1024`, and `1440x900`.

## Execution Results

- Date: 2026-04-19
- Implementation status: IN PROGRESS (manual mobile QA evidence pending)
- Automated command results:
  - `npm run lint`: PASS
  - `npm test`: PASS (`21` files, `63` tests)
- Automated coverage highlights:
  - composer keyboard-inset and no nested-scroll assertions in `tests/messages/MessagesPage.layout.test.tsx`
  - toggle semantics and accessibility assertions in `tests/messages/MessagesPage.a11y.test.tsx`
  - collapse/expand plus draft persistence assertions in `tests/messages/MessagesPage.formFlow.test.tsx`

## Out of Scope

- New routes or navigation destinations
- Supabase schema/API changes
- localStorage behavior changes
- Redesign of desktop layouts or non-target page surfaces
