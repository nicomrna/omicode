import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";
import { getContactoPage, getSite } from "@/lib/data";
import { Container, PageHeader } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";

export function generateMetadata(): Metadata {
  return { title: "Contacto", description: getContactoPage().text, alternates: { canonical: "/contacto" } };
}

const icons = { clock: Clock, pin: MapPin };

export default function ContactoPage() {
  const page = getContactoPage();
  const site = getSite();
  const rows = [
    { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...page.details.map((d) => ({ Icon: icons[d.icon] ?? Clock, label: d.label, value: d.value, href: undefined as string | undefined })),
  ];

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} text={page.text} />
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-ink bg-surface p-6 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-9">
            <ContactForm topics={page.topics} success={page.success} />
          </div>
          <aside className="space-y-7 lg:pt-4">
            {rows.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink bg-accent/20">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
                  {href ? (
                    <a href={href} className="font-display text-xl font-bold tracking-tight hover:text-accent-600">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </aside>
        </Container>
      </section>
    </>
  );
}
