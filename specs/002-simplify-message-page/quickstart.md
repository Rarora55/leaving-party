# Quickstart: 002-simplify-message-page

## Goal

Implement a minimal MessagePage with only two primary sections (`Empty Wall`, `Leave a note`), sticky bottom composer usability on mobile keyboard, and emoji-friendly validation rules, without backend changes.

## Implementation Assumptions

- Message max length is fixed at `500` characters across client validation and Supabase API fallback validation.
- Name accepts emojis and symbols but must contain at least one Unicode letter or number.
- Message is required after trim and may be emoji-only when non-empty.
- `Leave a note` stays docked to viewport bottom with `visualViewport` keyboard offset handling where supported.

## Prerequisites

- Node.js and npm installed
- Project dependencies installed:

```bash
npm install
```

## Implementation Sequence

1. Update page composition in `src/pages/MessagesPage/MessagesPages.tsx`:
   - Remove extra hero/stats/helper blocks.
   - Keep `Empty Wall` as the first section.
   - Keep `Leave a note` as the second section docked to viewport bottom.
2. Update form component in `src/features/components/GuestMessageForm.tsx`:
   - Remove persistent character counter and extra helper copy.
   - Keep concise inline validation feedback only.
3. Update validation in `src/features/guest-messages/guestMessages.validation.ts`:
   - Name must include at least one Unicode letter/number.
   - Message remains required after trim.
   - Max message length remains unchanged.
4. Update hook behavior in `src/features/guest-messages/hooks/useGuestMessageForm.ts`:
   - Ensure error messages remain concise and map to inline display.
5. Confirm `GuestMessagesList` empty/populated rendering contract remains correct.
6. Add tests under `tests/messages/` for validation, layout/order, form flow, and accessibility semantics.

## Verification Commands

```bash
npm run lint
npm test
```

## Manual QA Checklist

1. Desktop (`1440x900`):
   - Two primary sections only.
   - Empty Wall appears before Leave a note.
   - Leave a note remains docked at viewport bottom while scrolling.
2. Mobile (`360x800`) and tablet (`768x1024`):
   - Sticky composer remains usable.
   - Last wall card remains visible and not hidden by composer.
3. Mobile keyboard open (iOS Safari and Android Chrome target behavior):
   - Name/message inputs remain accessible.
   - Submit button remains reachable.
4. Validation:
   - Name `😀😀` rejected.
   - Name `Ana😀` accepted.
   - Message whitespace-only rejected.
   - Over-limit message rejected with concise inline error.
5. Wall rendering:
   - Empty state shown only when no messages.
   - Existing messages render correctly with preserved emoji.

## Out of Scope

- Supabase schema/table changes
- New APIs or edge functions
- Navigation redesign outside MessagePage

## Execution Results

- Date: 2026-04-15
- `npm run lint`: PASS
- `npm test`: PASS (`14` files, `34` tests)
- `npx vitest run --config vitest.config.ts tests/messages`: PASS (`6` files, `18` tests)
