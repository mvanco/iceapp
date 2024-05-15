let sessionId: string | null = null;

export function setSessionId(id: string): void {
  sessionId = id;
}

export function getSessionId(): string | null {
  return sessionId;
}