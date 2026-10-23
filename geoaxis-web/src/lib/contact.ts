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

export const MESSAGE_MIN_LENGTH = 10;

// Submissions faster than this are treated as bots.
export const MIN_FILL_TIME_MS = 3000;

export const HONEYPOT_FIELD = "website";
export const STARTED_AT_FIELD = "startedAt";

export const CONTACT_SERVICE_OPTIONS = [
  {
    value: "zasnemane",
    label: "Геодезическо заснемане",
    hint: "Терен, сгради, за проект",
    placeholder: "Напр.: Предстои строеж на къща и проектантът иска актуално заснемане на имота.",
  },
  {
    value: "trasirane",
    label: "Трасиране",
    hint: "Граници, сгради, огради",
    placeholder: "Напр.: Ще строим ограда и трябва да знаем точно къде минава границата.",
  },
  {
    value: "kadastar",
    label: "Кадастър",
    hint: "Скици, промени, нанасяне",
    placeholder: "Напр.: Сградата не е нанесена в кадастъра, а предстои продажба.",
  },
  {
    value: "proektirane",
    label: "Проектиране",
    hint: "Вертикална планировка, данни",
    placeholder: "Напр.: Нужна е вертикална планировка за двора на нова къща.",
  },
  {
    value: "gradoustroistvo",
    label: "Градоустройство / ПУП",
    hint: "ПУП, регулация, УПИ",
    placeholder: "Напр.: Искаме да разделим имота на два урегулирани имота.",
  },
  {
    value: "konsultacia",
    label: "Консултация",
    hint: "Документи и насоки",
    placeholder: "Опишете накратко ситуацията и какво искате да постигнете.",
  },
  {
    value: "other",
    label: "Друго",
    hint: "Задача извън списъка",
    placeholder: "Опишете накратко задачата.",
  },
  {
    value: "nesigurno",
    label: "Не съм сигурен",
    hint: "Ще ви насочим",
    placeholder: "Опишете ситуацията – ще ви кажем каква услуга е нужна.",
  },
] as const;

export type ContactServiceValue = (typeof CONTACT_SERVICE_OPTIONS)[number]["value"];

export function getServiceOption(value: string) {
  return CONTACT_SERVICE_OPTIONS.find((option) => option.value === value);
}

export function getServiceLabel(value: string) {
  return getServiceOption(value)?.label;
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
