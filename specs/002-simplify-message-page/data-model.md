# Data Model: 002-simplify-message-page

## Scope

No new persistent entities are introduced. This feature refines UI/domain models that already map to existing `guest_messages` records.

## Entities

## 1) WallMessage (existing persisted entity)

- Source: `guest_messages` table via `fetchGuestMessages()`.
- Fields:
  - `id: string`
  - `guestName: string`
  - `message: string`
  - `approved: boolean`
  - `createdAt: string`
- Usage: Rendered inside `Empty Wall` when list is non-empty.
- Constraints:
  - No schema change.
  - Emoji content must round-trip unchanged.

## 2) MessageCard (derived presentation entity)

- Source: `useMessageWall` mapped from `WallMessage`.
- Fields:
  - All `WallMessage` fields needed for display
  - `displayRotation: number`
  - `displayColor?: string`
- Usage: Visual card variant in `GuestMessagesList`.
- Constraints:
  - `cards.length === 0` implies empty state visible.
  - Presentation fields must not mutate persisted content.

## 3) MessageDraftInput (form domain entity)

- Source: `useGuestMessageForm` state and localStorage draft.
- Fields:
  - `guestName: string`
  - `message: string`
- Validation rules:
  - `guestName`:
    - Trimmed length `1..100`.
    - Must contain at least one Unicode letter or number.
    - Emojis and symbols are allowed in addition to that requirement.
  - `message`:
    - Trimmed length `1..500` (existing max retained).
    - Whitespace-only is invalid.
    - Emojis are valid.
- Sanitization:
  - Submit payload uses trimmed values.

## 4) MessageFormErrorState (form feedback entity)

- Fields:
  - `guestName?: string`
  - `message?: string`
- Constraints:
  - Errors are concise, inline, and bound with `aria-describedby`.
  - No persistent instructional character-limit note.

## 5) MessagePageSectionModel (layout entity)

- Fields:
  - `sections: ['empty-wall', 'leave-note']`
  - `stickyComposerEnabled: boolean` (always true in supported viewports)
  - `composerDock: 'viewport-bottom'`
- Constraints:
  - Exactly two primary sections.
  - Empty Wall appears first.
  - Leave a note remains docked during scroll.
  - Composer remains usable with mobile keyboard open.

## Relationships

- `MessageDraftInput` submits to API -> creates `WallMessage`.
- `WallMessage` maps to `MessageCard` for rendering.
- `MessagePageSectionModel` orchestrates display order and sticky behavior around `MessageCard` list and form.

## State Transitions

## Form lifecycle (`useGuestMessageForm`)

1. `idle` -> `editing` on input change.
2. `editing` -> `validating` on submit.
3. `validating` -> `validation_error` when Name/Message rules fail.
4. `validating` -> `submitting` when valid.
5. `submitting` -> `success` on API success (draft cleared, success feedback shown).
6. `submitting` -> `submit_error` on API failure (draft retained).
7. `success` -> `editing` on next input.

## Wall lifecycle (`useMessageWall`)

1. `loading` on mount/reload.
2. `loading` -> `ready_non_empty` when cards exist.
3. `loading` -> `ready_empty` when no cards exist.
4. `loading` -> `error` on fetch failure.
5. `ready_*` updates live on real-time inserts.
