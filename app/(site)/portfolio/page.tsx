import type { Metadata } from "next";
import { getPortfolioPage, getProjects } from "@/lib/data";
import { ButtonLink, Container, PageHeader, Rich } from "@/components/ui";
import { ProjectCard } from "@/components/cards";

export function generateMetadata(): Metadata {
  return { title: "Portfolio", description: getPortfolioPage().text, alternates: { canonical: "/portfolio" } };
}

export default function PortfolioPage() {
  const page = getPortfolioPage();
  const projects = getProjects();
  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} text={page.text} />
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="mt-16 rounded-xl border border-ink bg-surface p-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              <Rich text={page.ctaTitle} />
            </h2>
            <p className="mt-2 text-muted">{page.ctaText}</p>
            <div className="mt-6">
              <ButtonLink href="/contacto">{page.ctaLabel}</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
