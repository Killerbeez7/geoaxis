import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    await resend.emails.send({
      from: "GeoAxis <onboarding@resend.dev>",
      to: "your@email.com", // 👈 CHANGE THIS
      subject: "Ново запитване от GeoAxis",
      html: `
        <h2>Ново запитване</h2>
        <p><b>Име:</b> ${name}</p>
        <p><b>Имейл:</b> ${email}</p>
        <p><b>Съобщение:</b></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
