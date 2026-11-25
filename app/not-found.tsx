import { SiteShell } from "@/components/site-shell";
import { ButtonLink, Container } from "@/components/ui";
import "./globals.css";

export default function NotFound() {
  return (
    <SiteShell>
      <Container className="py-32 text-center">
        <p className="font-display text-9xl font-bold leading-none tracking-tighter text-accent">404</p>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Esta página no existe</h1>
        <p className="mt-4 text-muted">Puede que el enlace esté roto o que la página se haya movido.</p>
        <div className="mt-8">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
        </div>
      </Container>
    </SiteShell>
  );
}
