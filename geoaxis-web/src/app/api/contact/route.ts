import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_EMAIL;

    if (!toEmail) {
      throw new Error("CONTACT_EMAIL is not set");
    }

    await resend.emails.send({
      from: "GeoAxis <onboarding@resend.dev>",
      to: toEmail,
      subject: "Ново запитване от GeoAxis",
      html: `
        <h2>Ново запитване</h2>
        <p><b>Име:</b> ${escapeHtml(name)}</p>
        <p><b>Имейл:</b> ${escapeHtml(email || "—")}</p>
        <p><b>Съобщение:</b></p>
        <p>${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
