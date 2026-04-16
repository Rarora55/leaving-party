import { describe, expect, it } from 'vitest';
import {
  MESSAGE_MAX_LENGTH,
  MESSAGE_NAME_MAX_LENGTH,
  sanitizeMessageGuestName,
  sanitizeMessageText,
  validateMessageGuestName,
  validateMessageSubmission,
  validateMessageText,
} from '../../src/features/guest-messages/guestMessages.validation';

describe('guestMessages.validation', () => {
  it('rejects names that do not include a letter or number', () => {
    expect(validateMessageGuestName('😀😀')).toEqual({
      valid: false,
      error: 'Include at least one letter or number in your name.',
    });
  });

  it('accepts names with letters and emojis across alphabets', () => {
    expect(validateMessageGuestName('Ana😀')).toEqual({ valid: true });
    expect(validateMessageGuestName('夏子🎈')).toEqual({ valid: true });
  });

  it('rejects whitespace-only messages after trim', () => {
    expect(validateMessageText('    ')).toEqual({
      valid: false,
      error: 'Please enter a message.',
    });
  });

  it('keeps emoji-only messages valid when non-empty', () => {
    expect(validateMessageText('🎉🎉🎉')).toEqual({ valid: true });
  });

  it('rejects over-limit content with concise errors', () => {
    const tooLongName = `A${'b'.repeat(MESSAGE_NAME_MAX_LENGTH)}`;
    const tooLongMessage = `A${'x'.repeat(MESSAGE_MAX_LENGTH)}`;

    expect(validateMessageGuestName(tooLongName)).toEqual({
      valid: false,
      error: `Please keep your name under ${MESSAGE_NAME_MAX_LENGTH} characters.`,
    });
    expect(validateMessageText(tooLongMessage)).toEqual({
      valid: false,
      error: `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`,
    });
  });

  it('trims persisted values before submission', () => {
    expect(sanitizeMessageGuestName('  Alex😀  ')).toBe('Alex😀');
    expect(sanitizeMessageText('  We will miss you 🎉  ')).toBe('We will miss you 🎉');
  });

  it('supports a batch of 20 emoji-containing valid submissions', () => {
    const submissions = Array.from({ length: 20 }, (_, index) => ({
      guestName: `Guest${index + 1}😀`,
      message: `Bye for now ${index + 1} 🎈`,
    }));

    submissions.forEach(({ guestName, message }) => {
      expect(validateMessageSubmission(guestName, message)).toEqual({
        valid: true,
        errors: {},
      });
    });
  });
});
