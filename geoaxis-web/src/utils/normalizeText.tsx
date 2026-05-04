export function normalizeParagraphs(content?: string | string[]): string[] {
  if (!content) return [];

  if (Array.isArray(content)) {
    return content.map((item) => item.trim()).filter(Boolean);
  }

  const trimmed = content.trim();
  return trimmed ? [trimmed] : [];
}
