import { SiteShell } from "@/components/site-shell";
import "../globals.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
