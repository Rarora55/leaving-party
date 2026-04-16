# Research: Simplified RSVP Route

## Decision: Use Supabase as the only authoritative source for latest confirmations

**Rationale**: The current RSVP page reads and writes local `RsvpEntry` values through
`siteStorage.ts`, which makes the latest-confirmations view device-specific and violates
the spec. The existing code already submits RSVPs through `guestList.api.ts`, so the
lowest-risk correction is to make Supabase `guest_rsvps` the only source for confirmed
names while keeping `localStorage` limited to temporary draft recovery.

**Alternatives considered**:

- Keep `localStorage` as a fallback feed source. Rejected because it would still show
  different results per device and would conflict with the new "shared authoritative
  source" requirement.
- Add a second browser cache layer for the feed. Rejected because the feed is capped at
  three items and can be fetched cheaply from Supabase.

## Decision: Persist RSVP first, then trigger secure notification delivery

**Rationale**: The RSVP must remain confirmed even when email delivery has a temporary
failure. The cleanest way to guarantee that is to insert the RSVP row first with a
notification status such as `pending`, then attempt host notification separately through
a secure server-side function that updates the notification fields to `sent` or
`retry_required`.

**Alternatives considered**:

- Send email from the browser after insert. Rejected because provider secrets would be
  exposed client-side and browser/network failures would make notification state harder
  to track safely.
- Require notification success before confirming the RSVP. Rejected because it violates
  the spec's persistence-vs-notification separation.
- Use a dedicated notification table immediately. Rejected for now because a few
  notification metadata fields on `guest_rsvps` are simpler and enough to support retry
  or operational follow-up.

## Decision: Add a dedicated latest-confirmations read path limited to three confirmed names

**Rationale**: The page now needs a deterministic derived view: confirmed names only,
newest first, maximum three. A dedicated `fetchLatestConfirmedRSVPs(limit = 3)` function
in `guestList.api.ts` keeps that rule centralized and makes route/hook tests explicit.

**Alternatives considered**:

- Reuse `fetchRSVPs()` and slice in the page. Rejected because it fetches more data than
  needed and leaves confirmed-only / ordering rules duplicated in UI code.
- Subscribe to real-time changes immediately. Rejected because the spec only requires
  immediate refresh after the current session submits; initial implementation stays
  simpler with fetch + local optimistic update + background revalidation.

## Decision: Match Home visually by reusing tokens and atmosphere primitives, not the full scroll scene

**Rationale**: `HomeScene` is a scroll-driven composition with clouds, title reveal, and
footer scene behavior. The RSVP page should inherit the same atmosphere, spacing rhythm,
and typography feel without becoming another scrolling cinematic route. Reusing Home
tokens and a lightweight backdrop extraction keeps the visual match close while avoiding
regressions in the Home route itself.

**Alternatives considered**:

- Embed `HomeScene` directly into the RSVP route. Rejected because it would add extra
  structure and motion that conflict with the route's required minimal two-block layout.
- Restyle the RSVP page independently. Rejected because the spec explicitly requires the
  Home atmosphere as the visual source of truth.

## Decision: Add Vitest + React Testing Library for regression coverage

**Rationale**: The repo currently exposes no configured test runner, but the feature has
clear behavior that benefits from automation: trim-aware validation, max-3 ordering,
duplicate acceptance, and persistence succeeding even when notification delivery needs
retry. Vite-native test tooling is the smallest addition that fits the stack.

**Alternatives considered**:

- Manual QA only. Rejected because the feature combines asynchronous API behavior with UI
  state transitions that are easy to regress silently.
- End-to-end tests first. Rejected because the project lacks backend notification
  infrastructure today; hook/service/component tests provide faster low-risk coverage for
  the planned implementation steps.
