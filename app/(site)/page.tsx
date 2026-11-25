import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getHome, getProjects, getServices } from "@/lib/data";
import { getAllPosts } from "@/lib/posts";
import { ButtonLink, Container, Eyebrow, Rich, SectionHeading } from "@/components/ui";
import { PostCard, ProjectCard } from "@/components/cards";
import { Orbit } from "@/components/orbit";
import { Marquee } from "@/components/marquee";

export default function Home() {
  const home = getHome();
  const services = getServices();
  const projects = getProjects().slice(0, 3);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink">
        <div className="dot-grid absolute inset-0" aria-hidden />
        <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-ink bg-surface px-4 py-1.5 font-mono text-xs">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {home.hero.status}
            </p>
            <h1 className="mt-7 whitespace-pre-line text-balance font-display text-6xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-[5.5rem]">
              <Rich text={home.hero.headline} />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{home.hero.text}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={home.hero.primaryCta.href}>
                {home.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </ButtonLink>
              <ButtonLink href={home.hero.secondaryCta.href} variant="secondary">
                {home.hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {home.hero.points.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent-600" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <Orbit items={home.orbit} />
        </Container>
      </section>

      <Marquee items={home.stack} />

      {/* El nombre / omni */}
      <section className="on-ink border-b border-ink bg-ink text-paper">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {home.meaning.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-5xl font-bold leading-[1] tracking-tighter sm:text-6xl">
              <Rich text={home.meaning.title} />
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/70">{home.meaning.text}</p>
          </div>
          <ol className="divide-y divide-paper/15 border-y border-paper/15">
            {home.meaning.principles.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-4 py-7">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-paper/65">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Servicios */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={home.services.eyebrow} title={home.services.title} text={home.services.text} />
          <ul className="mt-12 border-t border-ink">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href="/servicios"
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 border-b border-ink py-7 transition hover:bg-surface sm:grid-cols-[4rem_1fr_1.2fr_2rem] sm:px-3"
                >
                  <span className="font-mono text-sm text-accent-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{s.data.title}</h3>
                  <p className="col-start-2 leading-relaxed text-muted sm:col-start-auto">{s.body}</p>
                  <ArrowUpRight className="hidden h-6 w-6 -translate-x-2 text-accent opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 sm:block" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/servicios" variant="secondary">
              {home.services.linkLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Proyectos */}
      {projects.length > 0 && (
        <section className="border-y border-ink bg-surface py-20 sm:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow={home.projects.eyebrow} title={home.projects.title} text={home.projects.text} />
              <Link href="/portfolio" className="inline-flex items-center gap-1.5 font-semibold hover:text-accent-600">
                {home.projects.linkLabel} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {projects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Blog */}
      {posts.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow={home.blog.eyebrow} title={home.blog.title} />
              <Link href="/blog" className="inline-flex items-center gap-1.5 font-semibold hover:text-accent-600">
                {home.blog.linkLabel} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section>
        <Container>
          <div className="on-ink relative overflow-hidden rounded-3xl border border-ink bg-ink px-8 py-16 text-paper sm:px-14 sm:py-24">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-dashed border-paper/25" aria-hidden>
              <span className="absolute right-[16%] top-[8%] h-5 w-5 rounded-full bg-accent" />
            </div>
            <div className="absolute -right-4 -top-4 h-48 w-48 rounded-full border border-dashed border-paper/20" aria-hidden />
            <Eyebrow>omnicode</Eyebrow>
            <h2 className="relative mt-5 max-w-2xl text-balance font-display text-5xl font-bold leading-[1] tracking-tighter sm:text-7xl">
              <Rich text={home.cta.title} />
            </h2>
            <p className="relative mt-6 max-w-xl text-lg text-paper/70">{home.cta.text}</p>
            <div className="relative mt-9">
              <ButtonLink href="/contacto" variant="light">
                {home.cta.label} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
