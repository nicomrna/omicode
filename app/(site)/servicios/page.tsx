import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getPackages, getServiciosPage, getServices } from "@/lib/data";
import { ButtonLink, Container, PageHeader, SectionHeading } from "@/components/ui";

export function generateMetadata(): Metadata {
  const page = getServiciosPage();
  return { title: "Servicios y precios", description: page.text, alternates: { canonical: "/servicios" } };
}

export default function ServiciosPage() {
  const page = getServiciosPage();
  const services = getServices();
  const packages = getPackages();

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} text={page.text} />

      <section className="py-20">
        <Container>
          <h2 className="sr-only">{page.servicesTitle}</h2>
          <div className="grid gap-px overflow-hidden rounded-xl border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div key={s.slug} className="bg-surface p-7">
                <span className="font-mono text-sm text-accent-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight">{s.data.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-ink bg-surface py-20 sm:py-28" id="precios">
        <Container>
          <SectionHeading eyebrow={page.packagesEyebrow} title={page.packagesTitle} text={page.packagesText} />
          <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
            {packages.map((p) => {
              const dark = p.data.featured === true;
              return (
                <div
                  key={p.slug}
                  className={`relative flex flex-col rounded-xl border border-ink p-8 ${
                    dark ? "on-ink bg-ink text-paper shadow-[8px_8px_0_0_var(--color-accent)]" : "bg-paper"
                  }`}
                >
                  {dark && (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 font-mono text-xs font-semibold text-ink">
                      {page.packageBadge}
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-bold tracking-tight">{p.data.name}</h3>
                  <p className="mt-4 font-display text-4xl font-bold tracking-tighter">{p.data.price}</p>
                  <p className={`mt-3 leading-relaxed ${dark ? "text-paper/70" : "text-muted"}`}>{p.body}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.data.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check className={`mt-1 h-4 w-4 shrink-0 ${dark ? "text-accent" : "text-accent-600"}`} aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink href="/contacto" variant={dark ? "light" : "secondary"}>
                      {page.packageButton}
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={page.process.eyebrow} title={page.process.title} />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
            {page.process.steps.map((step, i) => (
              <li key={step.title} className="bg-surface p-7">
                <span className="font-display text-6xl font-bold leading-none tracking-tighter text-accent">{i + 1}</span>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-ink bg-surface py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={page.faq.eyebrow} title={page.faq.title} />
          <div className="mt-10 divide-y divide-ink rounded-xl border border-ink bg-paper">
            {page.faq.items.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold tracking-tight">
                  {f.q}
                  <span className="text-3xl font-normal text-accent-600 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
