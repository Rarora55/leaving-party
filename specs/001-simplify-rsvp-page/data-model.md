# Data Model: Simplified RSVP Route

## RSVP Record

**Purpose**: Canonical record of a confirmed RSVP plus host-notification delivery state.

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `id` | `string` / UUID | Supabase | Primary identifier |
| `name` | `string` | User input | Stored after trim normalization; duplicate values allowed |
| `status` | `'confirmed'` | Supabase | The feed reads confirmed rows only |
| `confirmedAt` | ISO timestamp | Supabase | Primary ordering field for newest-first display |
| `createdAt` | ISO timestamp | Supabase | Secondary ordering / audit fallback |
| `notificationStatus` | `'pending' \| 'sent' \| 'retry_required'` | Supabase | Tracks host notification lifecycle |
| `notificationRecipient` | `string` | Config + Supabase | Starts as configured host inbox |
| `notificationAttempts` | `number` | Supabase | Incremented on each send attempt |
| `notificationLastAttemptAt` | ISO timestamp \| `null` | Supabase | Last delivery attempt time |
| `notificationSentAt` | ISO timestamp \| `null` | Supabase | Set when the email is delivered successfully |
| `notificationError` | `string` \| `null` | Supabase | Stores the last temporary failure reason for follow-up |

## Latest Confirmation Item

**Purpose**: Minimal display projection for the guest-facing latest-confirmations card.

| Field | Type | Derived from | Notes |
|-------|------|--------------|-------|
| `id` | `string` | `RSVP Record.id` | Stable list key |
| `name` | `string` | `RSVP Record.name` | Only guest-facing field shown prominently |
| `confirmedAt` | ISO timestamp | `RSVP Record.confirmedAt` | Used for newest-first sort and immediate refresh |

## RSVP Draft Recovery

**Purpose**: Temporary local draft storage when persistence fails.

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `name` | `string` | Browser localStorage | Only unsent form input is stored locally |
| `expiresAt` | `number` | Browser localStorage | Existing temporary retention behavior remains |

## Validation Rules

- Trim leading and trailing whitespace before validation and before persistence.
- Empty or whitespace-only names are invalid and block submission inline.
- Duplicate names are valid and produce distinct RSVP records.
- Preserve the existing implementation safeguard for reasonable max length if the table
  schema still requires it; this is secondary to the spec's trim-to-empty validation rule.

## State Transitions

### Submission lifecycle

1. User enters a draft name.
2. `validateRSVPName` trims the candidate value.
3. If invalid:
   - No network request is made.
   - Inline error state is shown.
   - Draft remains editable.
4. If valid:
   - Create `RSVP Record` with `status = 'confirmed'` and `notificationStatus = 'pending'`.
   - Clear local draft recovery only after persistence succeeds.

### Notification lifecycle

1. `pending`
   - Initial state immediately after the confirmed RSVP row is written.
2. `sent`
   - Email delivery succeeded.
   - `notificationSentAt` and `notificationLastAttemptAt` are set.
3. `retry_required`
   - Email delivery failed temporarily after RSVP persistence succeeded.
   - `notificationAttempts` increments and `notificationError` is retained.
   - The record remains confirmed and can be retried or followed up operationally later.

## Derived Views

### Latest Confirmations Feed

- Query source: confirmed RSVP records only.
- Sort order: `confirmedAt DESC`, then `createdAt DESC`.
- Limit: 3.
- Empty state: render no placeholder names and no summary stats; show a minimal empty message instead.
