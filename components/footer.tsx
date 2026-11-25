import Link from "next/link";
import type { Site } from "@/lib/data";
import { Container } from "./ui";
import { Logo } from "./brand";

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="mt-24 overflow-hidden border-t border-ink">
      <Container className="grid gap-10 pt-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo brand={site.brand} />
          <p className="mt-5 max-w-sm leading-relaxed text-muted">{site.description}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Navegación</p>
          <ul className="mt-4 space-y-2 font-medium">
            {[...site.nav, { label: "Contacto", href: "/contacto" }].map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-accent-600">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Contacto</p>
          <ul className="mt-4 space-y-2 font-medium">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-accent-600">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent-600">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-600">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="mt-12 flex flex-col gap-1 font-mono text-xs text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.url.replace("https://", "")}</p>
      </Container>

      <div
        className="mt-4 select-none whitespace-nowrap text-center font-display font-bold leading-[0.8] tracking-tighter text-ink/[0.07]"
        style={{ fontSize: "clamp(5rem, 21vw, 18rem)" }}
        aria-hidden
      >
        {site.brand}
      </div>
    </footer>
  );
}
