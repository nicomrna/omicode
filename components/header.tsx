"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./brand";

type NavItem = { label: string; href: string };

export function Header({ brand, nav }: { brand: string; nav: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label={`${brand} — inicio`}>
          <Logo brand={brand} />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm font-medium transition hover:text-accent-600 ${active ? "text-ink" : "text-ink/70"}`}
              >
                {item.label}
                {active && <span className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-accent" aria-hidden />}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            className="rounded-full border border-ink bg-ink px-5 py-2 text-sm font-semibold text-paper transition hover:border-accent hover:bg-accent hover:text-ink"
          >
            Contactame
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-ink md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink bg-paper px-5 pb-5 pt-2 md:hidden" aria-label="Móvil">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block border-b border-line py-4 font-display text-2xl font-bold">
              {item.label}
            </Link>
          ))}
          <Link href="/contacto" className="mt-4 block rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-paper">
            Contactame
          </Link>
        </nav>
      )}
    </header>
  );
}
