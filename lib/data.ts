import { readCollection, readMarkdown, readYaml } from "./content";

export type Link = { label: string; href: string };

export type Site = {
  name: string;
  brand: string;
  url: string;
  title: string;
  description: string;
  email: string;
  location: string;
  social: { github: string; linkedin: string };
  nav: Link[];
};

export type SectionText = { eyebrow: string; title: string; text?: string; linkLabel?: string };
export type PageHead = { eyebrow: string; title: string; text: string };

export type Home = {
  hero: {
    status: string;
    headline: string;
    text: string;
    primaryCta: Link;
    secondaryCta: Link;
    points: string[];
  };
  orbit: string[];
  stack: string[];
  meaning: { eyebrow: string; title: string; text: string; principles: { title: string; text: string }[] };
  services: SectionText;
  projects: SectionText;
  blog: SectionText;
  cta: { title: string; text: string; label: string };
};

export type Service = { title: string; order?: number; draft?: boolean };
export type Pkg = { name: string; price: string; featured?: boolean; features: string[]; order?: number; draft?: boolean };
export type Project = {
  title: string;
  year: string;
  tags: string[];
  url?: string;
  image?: string;
  tone?: "accent" | "ink" | "sand";
  order?: number;
  draft?: boolean;
};

export type ServiciosPage = PageHead & {
  servicesTitle: string;
  packagesEyebrow: string;
  packagesTitle: string;
  packagesText: string;
  packageButton: string;
  packageBadge: string;
  process: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
};

export type PortfolioPage = PageHead & { ctaTitle: string; ctaText: string; ctaLabel: string };

export type BlogPage = PageHead & {
  empty: string;
  postCtaTitle: string;
  postCtaText: string;
  postCtaLabel: string;
};

export type ContactoPage = PageHead & {
  topics: string[];
  details: { icon: "clock" | "pin"; label: string; value: string }[];
  success: { title: string; text: string };
};

export type SobreMi = PageHead & {
  skillsTitle: string;
  experienceEyebrow: string;
  experienceTitle: string;
  factsTitle: string;
  cta: string;
  skills: string[];
  experience: { period: string; role: string; place: string; text: string }[];
  facts: { label: string; value: string }[];
};

export const getSite = () => readYaml<Site>("site.yaml");
export const getHome = () => readYaml<Home>("pages/home.yaml");
export const getServiciosPage = () => readYaml<ServiciosPage>("pages/servicios.yaml");
export const getPortfolioPage = () => readYaml<PortfolioPage>("pages/portfolio.yaml");
export const getBlogPage = () => readYaml<BlogPage>("pages/blog.yaml");
export const getContactoPage = () => readYaml<ContactoPage>("pages/contacto.yaml");
export const getSobreMi = () => readMarkdown<SobreMi>("pages/sobre-mi.md");

export const getServices = () => readCollection<Service>("services", ["title"]);
export const getPackages = () => readCollection<Pkg>("packages", ["name", "price", "features"]);
export const getProjects = () => readCollection<Project>("projects", ["title", "year", "tags"]);
