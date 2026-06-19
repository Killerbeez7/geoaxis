import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
const MAX_TOTAL_UPLOAD_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
const PUBLIC_SEND_ERROR =
  "Не успяхме да изпратим запитването. Моля, опитайте отново или се свържете с нас по телефон.";

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
  source: "quick" | "full";
};

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isAllowedFile(file: File) {
  const lowerName = file.name.toLowerCase();

  return (
    ALLOWED_TYPES.includes(file.type) ||
    ALLOWED_EXTENSIONS.some((extension) => lowerName.endsWith(extension))
  );
}

function formatMb(bytes: number) {
  return `${Math.round(bytes / 1024 / 1024)}MB`;
}

async function parseContactRequest(req: Request): Promise<ContactPayload> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = (await req.json()) as Record<string, unknown>;

    return {
      name: typeof body.name === "string" ? body.name.trim() : "",
      email: typeof body.email === "string" ? body.email.trim() : "",
      phone: typeof body.phone === "string" ? body.phone.trim() : "",
      service: typeof body.service === "string" ? body.service.trim() : "",
      location: typeof body.location === "string" ? body.location.trim() : "",
      preferredContact:
        typeof body.preferredContact === "string" ? body.preferredContact.trim() : "",
      message: typeof body.message === "string" ? body.message.trim() : "",
      files: [],
      privacyConsent: body.privacyConsent === true || body.privacyConsent === "true",
      source: "quick",
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
  };
}

function validatePayload({
  name,
  email,
  phone,
  message,
  files,
  privacyConsent,
  source,
}: ContactPayload) {
  if (!name || !message) {
    return "Моля, попълнете име и съобщение.";
  }

  if (!privacyConsent) {
    return "Моля, потвърдете, че сте запознати с Политиката за поверителност.";
  }

  if (source === "quick" && !email) {
    return "Моля, попълнете име, имейл и съобщение.";
  }

  if (source === "full" && !email && !phone) {
    return "Моля, оставете телефон или имейл за връзка.";
  }

  if (files.length > MAX_FILES) {
    return `Можете да прикачите до ${MAX_FILES} файла.`;
  }

  const totalUploadSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalUploadSize > MAX_TOTAL_UPLOAD_SIZE) {
    return `Общият размер на файловете не трябва да надвишава ${formatMb(MAX_TOTAL_UPLOAD_SIZE)}.`;
  }

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      return `Файлът "${file.name}" е по-голям от ${formatMb(MAX_FILE_SIZE)}.`;
    }

    if (!isAllowedFile(file)) {
      return `Невалиден тип файл: "${file.name}". Позволени са JPG, PNG, WebP и PDF.`;
    }
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey) {
      console.error("Contact form error: RESEND_API_KEY is not set");
      return NextResponse.json({ error: PUBLIC_SEND_ERROR }, { status: 500 });
    }

    if (!toEmail) {
      console.error("Contact form error: CONTACT_EMAIL is not set");
      return NextResponse.json({ error: PUBLIC_SEND_ERROR }, { status: 500 });
    }

    const payload = await parseContactRequest(req);
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { name, email, phone, service, location, preferredContact, message, files } =
      payload;

    const attachments = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        return {
          filename: file.name,
          content: Buffer.from(buffer).toString("base64"),
        };
      })
    );

    const serviceMap: Record<string, string> = {
      survey: "Геодезическо заснемане",
      layout: "Трасиране",
      cadastre: "Кадастър",
      regulation: "Регулация / ПУП",
      consultation: "Консултация",
      other: "Друго",
    };

    const contactMap: Record<string, string> = {
      phone: "По телефон",
      email: "По имейл",
    };

    const resend = new Resend(resendApiKey);

    const result = await resend.emails.send({
      from: "GeoAxis <onboarding@resend.dev>",
      to: toEmail,
      subject: `Ново запитване от ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2a3a33; border-bottom: 2px solid #c79d32; padding-bottom: 8px;">
            Ново запитване от GeoAxis
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px;">Име:</td>
              <td style="padding: 8px 0; font-weight: bold;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Имейл:</td>
              <td style="padding: 8px 0;">${escapeHtml(email || "-")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Телефон:</td>
              <td style="padding: 8px 0;">${escapeHtml(phone || "-")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Услуга:</td>
              <td style="padding: 8px 0;">${escapeHtml(serviceMap[service] || service || "-")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Населено място:</td>
              <td style="padding: 8px 0;">${escapeHtml(location || "-")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Предпочитан контакт:</td>
              <td style="padding: 8px 0;">${escapeHtml(contactMap[preferredContact] || "-")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Прикачени файлове:</td>
              <td style="padding: 8px 0;">${files.length > 0 ? files.map((file) => escapeHtml(file.name)).join(", ") : "-"}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background: #f4f5f2; border-radius: 8px;">
            <p style="color: #666; margin: 0 0 8px;">Съобщение:</p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: PUBLIC_SEND_ERROR }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/contact" });
}
