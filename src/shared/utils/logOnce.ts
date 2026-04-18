const emittedLogKeys = new Set<string>();

function normalizeDetails(details: unknown): unknown[] {
  if (typeof details === 'undefined') {
    return [];
  }

  return [details];
}

export function logErrorOnce(key: string, message: string, details?: unknown): void {
  if (emittedLogKeys.has(`error:${key}`)) {
    return;
  }

  emittedLogKeys.add(`error:${key}`);
  console.error(message, ...normalizeDetails(details));
}

export function logWarnOnce(key: string, message: string, details?: unknown): void {
  if (emittedLogKeys.has(`warn:${key}`)) {
    return;
  }

  emittedLogKeys.add(`warn:${key}`);
  console.warn(message, ...normalizeDetails(details));
}

