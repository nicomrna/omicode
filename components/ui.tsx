import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/** Convierte **texto** en un resaltado con el color de marca. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <em key={i} className="hl">
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent-600">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
        <Rich text={title} />
      </h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden border-b border-ink">
      <div className="dot-grid absolute inset-0" aria-hidden />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-dashed border-ink/30 sm:h-96 sm:w-96"
        aria-hidden
      >
        <span className="absolute right-[14%] top-[10%] h-4 w-4 rounded-full bg-accent" />
      </div>
      <Container className="relative py-16 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
          <Rich text={title} />
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{text}</p>
      </Container>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles = {
    primary: "border-ink bg-ink text-paper hover:border-accent hover:bg-accent hover:text-ink",
    secondary: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
    light: "border-paper bg-paper text-ink hover:border-accent hover:bg-accent",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${
        dark ? "border-paper/30 text-paper/80" : "border-ink/25 text-ink/70"
      }`}
    >
      {children}
    </span>
  );
}
