import { describe, expect, it } from 'vitest';
import {
  RSVP_VALIDATION_MESSAGES,
  sanitizeRSVPName,
  validateRSVPName,
} from '../../src/features/guest-list/guestList.validation';

describe('guestList.validation', () => {
  it('rejects an empty name', () => {
    expect(validateRSVPName('')).toEqual({
      valid: false,
      error: RSVP_VALIDATION_MESSAGES.nameRequired,
    });
  });

  it('rejects a whitespace-only name', () => {
    expect(validateRSVPName('   ')).toEqual({
      valid: false,
      error: RSVP_VALIDATION_MESSAGES.nameRequired,
    });
  });

  it('accepts a trimmed valid name', () => {
    expect(validateRSVPName('  Ramona  ')).toEqual({ valid: true });
    expect(sanitizeRSVPName('  Ramona  ')).toBe('Ramona');
  });
});
