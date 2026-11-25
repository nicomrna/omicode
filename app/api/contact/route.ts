import { NextResponse } from "next/server";

export const runtime = "nodejs";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const topic = String(body.topic ?? "").trim().slice(0, 100);
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.website ?? "");
  const elapsed = Number(body.elapsed ?? 0);

  // Bots: campo trampa completo o envío en menos de 2 segundos → fingimos éxito.
  if (honeypot || elapsed < 2000) return NextResponse.json({ ok: true });

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Ingresá tu nombre." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Ingresá un email válido." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json({ error: "El mensaje debe tener entre 10 y 4000 caracteres." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Contacto: faltan RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return NextResponse.json(
      { error: "El formulario no está disponible por ahora. Escribime directamente por email." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `[omnicode] ${topic || "Consulta"} — ${name.replace(/[\r\n]/g, " ")}`,
      html: `<p><strong>Nombre:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Tema:</strong> ${esc(topic)}</p>
<p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json({ error: "No se pudo enviar el mensaje. Probá de nuevo en un rato." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
