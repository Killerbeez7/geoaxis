import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  FIELD_LIMITS,
  HONEYPOT_FIELD,
  MAX_FILES,
  MESSAGE_MIN_LENGTH,
  MAX_TOTAL_UPLOAD_SIZE,
  MIN_FILL_TIME_MS,
  STARTED_AT_FIELD,
  formatMb,
  getServiceLabel,
  isAllowedFile,
  isValidEmail,
  isValidPhone,
} from "@/lib/contact";
import { contacts } from "@/config/content/contacts";

const PUBLIC_SEND_ERROR =
  "Не успяхме да изпратим запитването. Моля, опитайте отново или се свържете с нас по телефон.";
const DEFAULT_FROM = "GeoAxis <onboarding@resend.dev>";

// Best-effort limit per server instance; stops simple floods without extra infrastructure.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  preferredContact: string;
  message: string;
  files: File[];
  privacyConsent: boolean;
  source: "full" | "callback";
  honeypot: string;
  startedAt: number;
};

// File signatures for the allowed types, so a renamed file cannot pass as a PDF or image.
const FILE_SIGNATURES: { type: string; matches: (bytes: Uint8Array) => boolean }[] = [
  { type: "application/pdf", matches: (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 },
  { type: "image/png", matches: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { type: "image/jpeg", matches: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    type: "image/webp",
    matches: (b) =>
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
];

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asString(value: FormDataEntryValue | null | unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeFileName(name: string) {
  const cleaned = name.replace(/[\\/\u0000-\u001f\u007f]/g, "_").trim();
  return cleaned.slice(-120) || "file";
}

function getClientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

async function hasValidSignature(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  return FILE_SIGNATURES.some(
    (signature) => signature.type === file.type && signature.matches(bytes)
  );
}

async function parseContactRequest(req: Request): Promise<ContactPayload> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = (await req.json()) as Record<string, unknown>;

    return {
      name: asString(body.name),
      email: "",
      phone: asString(body.phone),
      service: "",
      location: "",
      preferredContact: "phone",
      message: "",
      files: [],
      privacyConsent: body.privacyConsent === true,
      source: "callback",
      honeypot: asString(body[HONEYPOT_FIELD]),
      startedAt: Number(body[STARTED_AT_FIELD]) || 0,
    };
  }

  const formData = await req.formData();

  return {
    name: asString(formData.get("name")),
    email: asString(formData.get("email")),
    phone: asString(formData.get("phone")),
    service: asString(formData.get("service")),
    location: asString(formData.get("location")),
    preferredContact: asString(formData.get("preferredContact")),
    message: asString(formData.get("message")),
    files: formData.getAll("files").filter((file): file is File => file instanceof File),
    privacyConsent: formData.get("privacyConsent") === "on",
    source: "full",
    honeypot: asString(formData.get(HONEYPOT_FIELD)),
    startedAt: Number(formData.get(STARTED_AT_FIELD)) || 0,
  };
}

function isLikelyBot({ honeypot, startedAt }: ContactPayload) {
  if (honeypot) return true;
  if (!startedAt) return true;
  return Date.now() - startedAt < MIN_FILL_TIME_MS;
}

async function validatePayload(payload: ContactPayload) {
  const { name, email, phone, location, message, files, privacyConsent, source } = payload;

  if (!privacyConsent) {
    return "Моля, потвърдете, че сте запознати с Политиката за поверителност.";
  }

  if (source === "callback") {
    if (!phone || !isValidPhone(phone)) return "Моля, въведете валиден телефонен номер.";
    if (name.length > FIELD_LIMITS.name) return "Името е твърде дълго.";
    return null;
  }

  if (!name || !message) {
    return "Моля, попълнете име и съобщение.";
  }

  if (message.length < MESSAGE_MIN_LENGTH) {
    return "Моля, опишете накратко какво ви е необходимо.";
  }

  if (!email && !phone) {
    return "Моля, оставете телефон или имейл за връзка.";
  }

  if (email && !isValidEmail(email)) return "Моля, въведете валиден имейл адрес.";
  if (phone && !isValidPhone(phone)) return "Моля, въведете валиден телефонен номер.";

  if (
    name.length > FIELD_LIMITS.name ||
    email.length > FIELD_LIMITS.email ||
    phone.length > FIELD_LIMITS.phone ||
    location.length > FIELD_LIMITS.location ||
    message.length > FIELD_LIMITS.message
  ) {
    return "Някое от полетата е твърде дълго. Моля, съкратете текста.";
  }

  if (files.length > MAX_FILES) {
    return `Можете да прикачите до ${MAX_FILES} файла.`;
  }

  const totalUploadSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalUploadSize > MAX_TOTAL_UPLOAD_SIZE) {
    return `Общият размер на файловете не трябва да надвишава ${formatMb(MAX_TOTAL_UPLOAD_SIZE)}.`;
  }

  for (const file of files) {
    if (!isAllowedFile(file) || !(await hasValidSignature(file))) {
      return `Невалиден файл: "${sanitizeFileName(file.name)}". Позволени са JPG, PNG, WebP и PDF.`;
    }
  }

  return null;
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 8px 0; color: #666; width: 160px;">${label}</td>
      <td style="padding: 8px 0;">${escapeHtml(value || "-")}</td>
    </tr>`;
}

function buildEmail(payload: ContactPayload) {
  const { name, email, phone, service, location, preferredContact, message, files, source } =
    payload;

  if (source === "callback") {
    return {
      subject: `Заявка за обратно обаждане: ${phone}`.slice(0, 150),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2a3a33; border-bottom: 2px solid #c79d32; padding-bottom: 8px;">
            Заявка за обратно обаждане
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            ${row("Телефон:", phone)}
            ${row("Име:", name)}
          </table>
        </div>`,
    };
  }

  const contactLabel = preferredContact === "email" ? "По имейл" : "По телефон";

  return {
    subject: `Ново запитване от ${name}`.slice(0, 150),
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a3a33; border-bottom: 2px solid #c79d32; padding-bottom: 8px;">
          Ново запитване от GeoAxis
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          ${row("Име:", name)}
          ${row("Имейл:", email)}
          ${row("Телефон:", phone)}
          ${row("Услуга:", getServiceLabel(service) ?? service)}
          ${row("Населено място:", location)}
          ${row("Предпочитан контакт:", contactLabel)}
          ${row("Прикачени файлове:", files.map((file) => sanitizeFileName(file.name)).join(", "))}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f4f5f2; border-radius: 8px;">
          <p style="color: #666; margin: 0 0 8px;">Съобщение:</p>
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      </div>`,
  };
}

// Auto-reply to the visitor. It repeats nothing they typed except the service picked from the fixed list,
// so the form cannot be used to send someone else's text from our domain to a third party.
function buildConfirmation(payload: ContactPayload) {
  const service = getServiceLabel(payload.service);
  const about = service ? ` за „${service}“` : "";
  const notice =
    "Получавате това писмо, защото този имейл адрес е посочен във формата за запитване на geoaxis.bg. Ако не сте изпращали запитване, просто го игнорирайте.";

  return {
    subject: "Получихме запитването Ви – GeoAxis",
    text: [
      "Здравейте,",
      "",
      `благодарим Ви, че се свързахте с GeoAxis. Получихме запитването Ви${about}.`,
      "Ще го прегледаме и ще се свържем с Вас възможно най-скоро. Ако е нужно, ще уточним детайлите, преди да Ви изпратим оферта и срок.",
      "",
      "Ако искате да добавите документ или подробност, просто отговорете на този имейл.",
      "",
      "Поздрави,",
      "Екипът на GeoAxis",
      `${contacts.phone} · geoaxis.bg`,
      "",
      notice,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2a25; line-height: 1.6;">
        <p style="font-size: 20px; font-weight: 600; margin: 0 0 24px;">Geo<span style="color: #c79d32;">Axis</span></p>
        <p style="margin: 0 0 12px;">Здравейте,</p>
        <p style="margin: 0 0 12px;">благодарим Ви, че се свързахте с GeoAxis. Получихме запитването Ви${escapeHtml(about)}.</p>
        <p style="margin: 0 0 12px;">Ще го прегледаме и ще се свържем с Вас възможно най-скоро. Ако е нужно, ще уточним детайлите, преди да Ви изпратим оферта и срок.</p>
        <p style="margin: 0 0 24px;">Ако искате да добавите документ или подробност, просто отговорете на този имейл.</p>
        <p style="margin: 0;">Поздрави,<br>Екипът на GeoAxis</p>
        <p style="margin: 4px 0 0; color: #5b6660;">${escapeHtml(contacts.phone)} · <a href="https://geoaxis.bg" style="color: #8a6a1f;">geoaxis.bg</a></p>
        <p style="margin: 32px 0 0; padding-top: 16px; border-top: 1px solid #e3e6e1; font-size: 12px; color: #8a938e;">${notice}</p>
      </div>`,
  };
}

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !toEmail) {
      console.error("Contact form error: RESEND_API_KEY or CONTACT_EMAIL is not set");
      return NextResponse.json({ error: PUBLIC_SEND_ERROR }, { status: 500 });
    }

    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { error: "Изпратихте много запитвания за кратко време. Моля, опитайте отново по-късно или се обадете." },
        { status: 429 }
      );
    }

    const payload = await parseContactRequest(req);

    // Bots get a normal-looking response so they don't adapt; nothing is sent.
    if (isLikelyBot(payload)) {
      return NextResponse.json({ success: true });
    }

    const validationError = await validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const attachments = await Promise.all(
      payload.files.map(async (file) => ({
        filename: sanitizeFileName(file.name),
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      }))
    );

    const { subject, html } = buildEmail(payload);
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: toEmail,
      replyTo: payload.email || undefined,
      subject,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("Contact form error: Resend rejected the email", error.name);
      return NextResponse.json({ error: PUBLIC_SEND_ERROR }, { status: 502 });
    }

    // Confirmation to the visitor, only when they gave an email and a verified sender is set
    // (Resend's test sender cannot reach other addresses). A failure here never fails the inquiry.
    let confirmationSent = false;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    if (fromEmail && payload.source === "full" && payload.email) {
      try {
        const confirmation = buildConfirmation(payload);
        const { error: confirmationError } = await resend.emails.send({
          from: fromEmail,
          to: payload.email,
          replyTo: toEmail,
          ...confirmation,
        });
        if (confirmationError) console.error("Contact form: confirmation not sent", confirmationError.name);
        else confirmationSent = true;
      } catch (confirmationError) {
        console.error(
          "Contact form: confirmation not sent",
          confirmationError instanceof Error ? confirmationError.name : "unknown"
        );
      }
    }

    return NextResponse.json({ success: true, confirmationSent });
  } catch (error) {
    console.error("Contact form error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: PUBLIC_SEND_ERROR }, { status: 500 });
  }
}
