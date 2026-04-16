/**
 * Guest message validation utilities.
 */

export const MESSAGE_NAME_MIN_LENGTH = 1;
export const MESSAGE_NAME_MAX_LENGTH = 100;
export const MESSAGE_MAX_LENGTH = 500;

const UNICODE_LETTER_OR_NUMBER_PATTERN = /[\p{L}\p{N}]/u;

export const MESSAGE_VALIDATION_MESSAGES = {
  nameRequired: 'Please enter your name.',
  nameTooLong: `Please keep your name under ${MESSAGE_NAME_MAX_LENGTH} characters.`,
  nameNeedsLetterOrNumber: 'Include at least one letter or number in your name.',
  messageRequired: 'Please enter a message.',
  messageTooLong: `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`,
} as const;

export const MESSAGE_VALIDATION_RULES = {
  guestName: {
    minLength: MESSAGE_NAME_MIN_LENGTH,
    maxLength: MESSAGE_NAME_MAX_LENGTH,
  },
  message: {
    minLength: MESSAGE_NAME_MIN_LENGTH,
    maxLength: MESSAGE_MAX_LENGTH,
  },
} as const;

export const containsUnicodeLetterOrNumber = (value: string): boolean =>
  UNICODE_LETTER_OR_NUMBER_PATTERN.test(value);

export const validateMessageGuestName = (
  name: string,
): { valid: boolean; error?: string } => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { valid: false, error: MESSAGE_VALIDATION_MESSAGES.nameRequired };
  }

  if (trimmedName.length > MESSAGE_NAME_MAX_LENGTH) {
    return { valid: false, error: MESSAGE_VALIDATION_MESSAGES.nameTooLong };
  }

  if (!containsUnicodeLetterOrNumber(trimmedName)) {
    return { valid: false, error: MESSAGE_VALIDATION_MESSAGES.nameNeedsLetterOrNumber };
  }

  return { valid: true };
};

export const validateMessageText = (message: string): { valid: boolean; error?: string } => {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return { valid: false, error: MESSAGE_VALIDATION_MESSAGES.messageRequired };
  }

  if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
    return { valid: false, error: MESSAGE_VALIDATION_MESSAGES.messageTooLong };
  }

  return { valid: true };
};

export const validateMessageSubmission = (
  guestName: string,
  message: string,
): { valid: boolean; errors: { guestName?: string; message?: string } } => {
  const errors: { guestName?: string; message?: string } = {};

  const guestNameValidation = validateMessageGuestName(guestName);
  if (!guestNameValidation.valid) {
    errors.guestName = guestNameValidation.error;
  }

  const messageValidation = validateMessageText(message);
  if (!messageValidation.valid) {
    errors.message = messageValidation.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const sanitizeMessageGuestName = (name: string): string => name.trim();

export const sanitizeMessageText = (message: string): string => message.trim();
