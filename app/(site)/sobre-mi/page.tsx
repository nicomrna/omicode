import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getSobreMi } from "@/lib/data";
import { ButtonLink, Container, PageHeader, SectionHeading } from "@/components/ui";

export function generateMetadata(): Metadata {
  const { data } = getSobreMi();
  return { title: "Sobre mí", description: data.text, alternates: { canonical: "/sobre-mi" } };
}

export default function SobreMiPage() {
  const { data, body } = getSobreMi();
  return (
    <>
      <PageHeader eyebrow={data.eyebrow} title={data.title} text={data.text} />
      <section className="py-16">
        <Container className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={body} />
            </div>

            <div className="mt-16">
              <SectionHeading eyebrow={data.experienceEyebrow} title={data.experienceTitle} />
              <ol className="mt-10 space-y-9 border-l border-ink pl-7">
                {data.experience.map((e) => (
                  <li key={e.period + e.role} className="relative">
                    <span className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full border border-ink bg-accent" aria-hidden />
                    <p className="font-mono text-xs text-muted">{e.period}</p>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight">
                      {e.role} <span className="font-sans text-base font-normal text-muted">· {e.place}</span>
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">{e.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-ink bg-surface p-6">
              <h2 className="font-display text-xl font-bold tracking-tight">{data.skillsTitle}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {data.skills.map((s) => (
                  <li key={s} className="rounded-full border border-ink px-3 py-1 font-mono text-xs">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-ink bg-surface p-6">
              <h2 className="font-display text-xl font-bold tracking-tight">{data.factsTitle}</h2>
              <dl className="mt-4 divide-y divide-line">
                {data.facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-muted">{f.label}</dt>
                    <dd className="text-right font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ButtonLink href="/contacto">{data.cta}</ButtonLink>
          </aside>
        </Container>
      </section>
    </>
  );
}
