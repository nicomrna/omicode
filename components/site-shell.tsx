import { getSite } from "@/lib/data";
import { Header } from "./header";
import { Footer } from "./footer";

/** Marco común del sitio público: encabezado, contenido y pie. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const site = getSite();
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:shadow"
      >
        Saltar al contenido
      </a>
      <Header brand={site.brand} nav={site.nav} />
      <main id="contenido">{children}</main>
      <Footer site={site} />
    </>
  );
}
