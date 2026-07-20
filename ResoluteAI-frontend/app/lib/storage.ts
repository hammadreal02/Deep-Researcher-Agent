const CONVERSATIONS_KEY = "resoluteai-conversations";
const REPORTS_KEY = "resoluteai-reports";
const MAX_CONVERSATIONS = 50;

export interface StoredConversation {
  id: string;
  query: string;
  timestamp: number;
  stages: { stage: string; content: string; sources?: string[] }[];
  report?: string;
  messages: { id: string; role: "user" | "assistant"; content: string }[];
}

export interface StoredReport {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export function saveConversation(conv: StoredConversation): void {
  try {
    const existing: StoredConversation[] = JSON.parse(
      localStorage.getItem(CONVERSATIONS_KEY) || "[]"
    );
    const updated = [conv, ...existing.filter((c) => c.id !== conv.id)].slice(
      0,
      MAX_CONVERSATIONS
    );
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(updated));
  } catch {
    console.warn("Failed to save conversation");
  }
}

export function getConversations(): StoredConversation[] {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteConversation(id: string): void {
  try {
    const existing: StoredConversation[] = JSON.parse(
      localStorage.getItem(CONVERSATIONS_KEY) || "[]"
    );
    localStorage.setItem(
      CONVERSATIONS_KEY,
      JSON.stringify(existing.filter((c) => c.id !== id))
    );
  } catch {
    console.warn("Failed to delete conversation");
  }
}

export function saveReport(report: StoredReport): void {
  try {
    const existing: StoredReport[] = JSON.parse(
      localStorage.getItem(REPORTS_KEY) || "[]"
    );
    const updated = [report, ...existing.filter((r) => r.id !== report.id)];
    localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
  } catch {
    console.warn("Failed to save report");
  }
}

export function getReports(): StoredReport[] {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearAllData(): void {
  try {
    localStorage.removeItem(CONVERSATIONS_KEY);
    localStorage.removeItem(REPORTS_KEY);
  } catch {
    console.warn("Failed to clear data");
  }
}
