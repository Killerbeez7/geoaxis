// Shared by the contact form (client) and /api/contact (server) so both enforce the same rules.

// Vercel rejects function request bodies above 4.5MB, so the total stays safely below it.
export const MAX_FILES = 5;
export const MAX_TOTAL_UPLOAD_SIZE = 4 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
export const ALLOWED_FILE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  location: 200,
  message: 5000,
} as const;

// Submissions faster than this are treated as bots.
export const MIN_FILL_TIME_MS = 3000;

export const HONEYPOT_FIELD = "website";
export const STARTED_AT_FIELD = "startedAt";

export const CONTACT_SERVICE_OPTIONS = [
  { value: "zasnemane", label: "Геодезическо заснемане" },
  { value: "trasirane", label: "Трасиране" },
  { value: "kadastar", label: "Кадастър" },
  { value: "proektirane", label: "Проектиране" },
  { value: "gradoustroistvo", label: "Градоустройство / ПУП" },
  { value: "konsultacia", label: "Консултация" },
  { value: "other", label: "Друго" },
] as const;

export function getServiceLabel(value: string) {
  return CONTACT_SERVICE_OPTIONS.find((option) => option.value === value)?.label;
}

export function isAllowedFileName(name: string) {
  const lowerName = name.toLowerCase();
  return ALLOWED_FILE_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

export function isAllowedFile(file: File) {
  return ALLOWED_FILE_TYPES.includes(file.type) && isAllowedFileName(file.name);
}

export function formatMb(bytes: number) {
  return `${Math.round(bytes / 1024 / 1024)}MB`;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^[+\d\s()\-./]+$/.test(value) && digits.length >= 6 && digits.length <= 15;
}
