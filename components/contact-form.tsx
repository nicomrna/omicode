"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 w-full rounded-lg border border-ink/30 bg-surface px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-ink focus:ring-4 focus:ring-accent/25";

export function ContactForm({
  topics,
  success,
}: {
  topics: string[];
  success: { title: string; text: string };
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [loadedAt] = useState(() => Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - loadedAt }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo enviar el mensaje.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Probá de nuevo.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-ink bg-accent/15 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent-600" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-bold">{success.title}</h3>
        <p className="mt-2 text-muted">{success.text}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Nombre
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={field} placeholder="Tu nombre" />
        </label>
        <label className="block text-sm font-semibold">
          Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="vos@ejemplo.com" />
        </label>
      </div>
      <label className="block text-sm font-semibold">
        ¿Qué necesitás?
        <select name="topic" className={field}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold">
        Mensaje
        <textarea name="message" required minLength={10} maxLength={4000} rows={6} className={field} placeholder="Contame brevemente tu proyecto, plazos y presupuesto aproximado." />
      </label>

      {/* Honeypot anti-spam: los humanos no lo ven */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Sitio web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-7 py-3 text-sm font-semibold text-paper transition hover:border-accent hover:bg-accent hover:text-ink disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
