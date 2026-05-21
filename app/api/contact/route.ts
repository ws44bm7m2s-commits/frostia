import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, company, message } = await req.json();

  await resend.emails.send({
    from:     "onboarding@resend.dev"
    to:      ["ljesusf@gmail.com"],
    subject: `Nueva solicitud de demo — ${company}`,
    html:    `<p><b>${name}</b> (${email}) de <b>${company}</b> escribió:</p><p>${message}</p>`,
  });

  return NextResponse.json({ ok: true });
}