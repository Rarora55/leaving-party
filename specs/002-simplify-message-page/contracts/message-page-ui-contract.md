# UI Contract: Message Page Simplification

## Contract Scope

- Route: `/drop-a-message`
- Applies to:
  - `MessagesPages.tsx`
  - `GuestMessagesList.tsx`
  - `GuestMessageForm.tsx`
  - `guestMessages.validation.ts`
  - `useGuestMessageForm.ts`

## 1) Route Composition Contract

- The page MUST render exactly two primary content sections:
  - `Empty Wall` (first in DOM and visual order)
  - `Leave a note` (second, docked to viewport bottom)
- No third primary hero/stats/helper section may be rendered.
- The wall section MUST reserve enough bottom space so sticky composer does not obscure final cards/empty state.

## 2) Empty Wall Rendering Contract

- Inputs:
  - `messages: MessageCard[]`
  - `isEmpty: boolean`
- Behavior:
  - If `isEmpty === true`, render empty-state container and heading `Empty wall`.
  - If `isEmpty === false`, render message cards only; do not render empty placeholder copy.
- Data contract:
  - Message text and name display content must preserve emoji and Unicode characters.

## 3) Leave a Note Form Contract

- Required fields:
  - Name (`message-name`)
  - Message (`message-text`)
- Name rules:
  - Trimmed length between 1 and 100.
  - Must contain at least one Unicode letter or number.
  - Emoji characters are accepted when rule above is satisfied.
- Message rules:
  - Required after trimming.
  - Max length remains existing limit (500).
  - Emoji-only messages are valid if non-empty.
- Error feedback:
  - Inline concise text only.
  - Error elements expose `role="alert"` and are linked via `aria-describedby`.
- Character limit UX:
  - No persistent counter or helper note is shown.
  - Only concise inline error appears when limit is violated.

## 4) Sticky Behavior Contract

- Form container remains docked to viewport bottom while wall scrolls.
- On mobile keyboard open:
  - Form remains reachable and interactive.
  - Required controls are not permanently hidden behind keyboard.
- Safe area:
  - Bottom insets are respected for devices with notch/home indicator.

## 5) Copy Contract

- Must not render these legacy strings:
  - `Drop a message`
  - `message saved here` / `messages saved here`
  - persistent character-limit guidance note
- Form labels and concise errors remain for clarity/accessibility.

## 6) Non-Functional Contract

- No new dependencies.
- No backend API/schema changes.
- Rendering and form interaction remain responsive on mobile/tablet/desktop breakpoints.
