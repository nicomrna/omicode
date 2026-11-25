import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/bricolage-grotesque";
import { getSite } from "@/lib/data";

// Los estilos del sitio (globals.css) se cargan en app/(site)/layout.tsx,
// así el panel de administración (/keystatic) queda con su propio diseño.

export function generateMetadata(): Metadata {
  const site = getSite();
  return {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s — ${site.brand}` },
    description: site.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: site.url,
      siteName: site.brand,
      title: site.title,
      description: site.description,
    },
    twitter: { card: "summary_large_image", title: site.title, description: site.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { themeColor: "#f4f1ea" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
