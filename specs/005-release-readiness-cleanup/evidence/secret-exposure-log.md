# Secret Exposure Incident Log

Reviewed: 2026-04-18 12:09:20+01:00

## Detection Methods

- Tracked-file keyword scan using `rg` against common credential signatures.
- Git-history regex scan using `git log -G` for common secret signatures.

## Findings

| incident_id | location_type | location_ref | finding | status | remediation_notes | verified_by |
|-------------|---------------|--------------|---------|--------|-------------------|-------------|
| SI-001 | tracked-file | `.env.example:11` | Commented placeholder key name only (`SUPABASE_SERVICE_ROLE_KEY=...`), no credential value present | closed | Kept as explicit anti-pattern warning; no secret material present | release-maintainer |
| SI-002 | tracked-file | `supabase/functions/send-rsvp-notification/index.ts:28` | Runtime environment variable lookup for service role key, no hardcoded secret value | closed | Valid server-side secret retrieval pattern; no credential committed | release-maintainer |
| SI-003 | git-history | `git log -G` commits `ac0b1d3`, `d7da656` | Regex matched secret-key identifiers in code/history, but no real secret values identified | closed | Reviewed matched commits; no verified real secret exposure found | release-maintainer |

## Publication Blocker Result

- Verified real secret exposures remaining: 0
- Blocker status: PASS
