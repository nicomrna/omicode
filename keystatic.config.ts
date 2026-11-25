import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Panel de administración (http://localhost:3000/keystatic).
 * Edita los mismos archivos de /content que usa el sitio.
 *
 * - En tu computadora (npm run dev): guarda directo en los archivos.
 * - En producción: guarda como un commit en GitHub y Vercel republica solo.
 *   Requiere NEXT_PUBLIC_KEYSTATIC_REPO=usuario/repositorio (ver README).
 */
const repo = process.env.NEXT_PUBLIC_KEYSTATIC_REPO as `${string}/${string}` | undefined;

// ── Atajos para escribir el esquema ────────────────────────────────────────
const text = (label: string, description?: string) => fields.text({ label, description });
const long = (label: string, description?: string) => fields.text({ label, description, multiline: true });
const list = (label: string, itemLabel: string, description?: string) =>
  fields.array(fields.text({ label: itemLabel }), { label, description, itemLabel: (p) => p.value });
const link = (label: string) =>
  fields.object(
    { label: text("Texto del botón"), href: text("Enlace", "Ej.: /contacto") },
    { label },
  );
const pageHead = {
  eyebrow: text("Etiqueta superior", "Texto chico sobre el título."),
  title: text("Título"),
  text: long("Texto de apoyo"),
};
const ORDER = fields.integer({ label: "Orden", description: "Número chico = aparece primero." });
const DRAFT = fields.checkbox({
  label: "Ocultar del sitio (borrador)",
  description: "Si lo marcás, no se muestra pero no se borra.",
  defaultValue: false,
});

export default config({
  storage: repo ? { kind: "github", repo } : { kind: "local" },

  ui: {
    brand: { name: "omnicode" },
    navigation: {
      "Páginas": ["home", "servicios", "portfolio", "sobreMi", "contacto", "blogPage"],
      "Contenido": ["posts", "projects", "services", "packages"],
      "General": ["site"],
    },
  },

  // ── Colecciones: un archivo por elemento ─────────────────────────────────
  collections: {
    posts: collection({
      label: "Artículos del blog",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        description: long("Resumen", "Se ve en las tarjetas y en Google."),
        date: fields.date({ label: "Fecha de publicación" }),
        tags: list("Etiquetas", "Etiqueta"),
        draft: DRAFT,
        content: fields.mdx({ label: "Artículo", extension: "mdx" }),
      },
    }),

    projects: collection({
      label: "Proyectos (portfolio)",
      slugField: "title",
      path: "content/projects/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Nombre del proyecto" } }),
        description: long("Descripción"),
        year: text("Año"),
        tags: list("Tecnologías", "Tecnología"),
        url: text("Enlace (opcional)", "Si lo completás, la tarjeta lleva a este sitio."),
        image: fields.image({
          label: "Captura (opcional)",
          description: "Si no subís imagen, se muestra una tarjeta de color con el número.",
          directory: "public/projects",
          publicPath: "/projects/",
        }),
        tone: fields.select({
          label: "Color de la tarjeta (si no hay imagen)",
          options: [
            { label: "Naranja", value: "accent" },
            { label: "Negro", value: "ink" },
            { label: "Arena", value: "sand" },
          ],
          defaultValue: "accent",
        }),
        order: fields.integer({
          label: "Orden",
          description: "Número chico = primero. Los 3 primeros también aparecen en el Inicio; sin número, va al final.",
        }),
        draft: DRAFT,
      },
    }),

    services: collection({
      label: "Servicios",
      slugField: "title",
      path: "content/services/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Nombre del servicio" } }),
        description: long("Descripción"),
        order: ORDER,
        draft: DRAFT,
      },
    }),

    packages: collection({
      label: "Paquetes y precios",
      slugField: "name",
      path: "content/packages/*",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Nombre del paquete" } }),
        price: text("Precio", "Ej.: Desde USD 400  ·  A cotizar"),
        description: long("Descripción corta"),
        features: list("Qué incluye", "Ítem"),
        featured: fields.checkbox({ label: "Destacar este paquete (\"Más elegido\")", defaultValue: false }),
        order: ORDER,
        draft: DRAFT,
      },
    }),
  },

  // ── Singletons: contenido que existe una sola vez ────────────────────────
  singletons: {
    site: singleton({
      label: "Datos del sitio",
      path: "content/site",
      format: { data: "yaml" },
      schema: {
        name: text("Tu nombre"),
        brand: text("Marca"),
        url: text("Dirección del sitio", "Ej.: https://omnicode.store"),
        title: text("Título para Google"),
        description: long("Descripción para Google y redes"),
        email: text("Email de contacto"),
        location: text("Ubicación"),
        social: fields.object(
          { github: text("GitHub (enlace)"), linkedin: text("LinkedIn (enlace)") },
          { label: "Redes" },
        ),
        nav: fields.array(
          fields.object({ label: text("Texto"), href: text("Enlace", "Ej.: /servicios") }),
          { label: "Menú de navegación", itemLabel: (p) => p.fields.label.value },
        ),
      },
    }),

    home: singleton({
      label: "Inicio",
      path: "content/pages/home",
      format: { data: "yaml" },
      schema: {
        hero: fields.object(
          {
            status: text("Cartel de disponibilidad"),
            headline: long("Titular", "Poné **asteriscos** alrededor de lo que quieras en naranja. Enter = nueva línea."),
            text: long("Texto debajo del titular"),
            primaryCta: link("Botón principal"),
            secondaryCta: link("Botón secundario"),
            points: list("Puntos de confianza", "Punto"),
          },
          { label: "Portada" },
        ),
        orbit: list("Nodos que giran en la portada", "Nodo", "Se recomiendan 6."),
        stack: list("Cinta de tecnologías", "Tecnología"),
        meaning: fields.object(
          {
            eyebrow: text("Etiqueta superior"),
            title: long("Título", "Usá **asteriscos** para resaltar. Enter = nueva línea."),
            text: long("Texto"),
            principles: fields.array(
              fields.object({ title: text("Título"), text: long("Texto") }),
              { label: "Principios", itemLabel: (p) => p.fields.title.value },
            ),
          },
          { label: "Sección \"El nombre\"" },
        ),
        services: fields.object(
          { eyebrow: text("Etiqueta superior"), title: text("Título"), text: long("Texto"), linkLabel: text("Texto del botón") },
          { label: "Sección Servicios" },
        ),
        projects: fields.object(
          { eyebrow: text("Etiqueta superior"), title: text("Título"), text: long("Texto"), linkLabel: text("Texto del enlace") },
          { label: "Sección Proyectos" },
        ),
        blog: fields.object(
          { eyebrow: text("Etiqueta superior"), title: text("Título"), linkLabel: text("Texto del enlace") },
          { label: "Sección Blog" },
        ),
        cta: fields.object(
          { title: text("Título"), text: long("Texto"), label: text("Texto del botón") },
          { label: "Cierre (llamado a contactar)" },
        ),
      },
    }),

    servicios: singleton({
      label: "Servicios y precios",
      path: "content/pages/servicios",
      format: { data: "yaml" },
      schema: {
        ...pageHead,
        servicesTitle: text("Título oculto de la lista de servicios"),
        packagesEyebrow: text("Paquetes · etiqueta superior"),
        packagesTitle: text("Paquetes · título"),
        packagesText: long("Paquetes · texto"),
        packageButton: text("Paquetes · texto del botón"),
        packageBadge: text("Paquetes · cartel del destacado"),
        process: fields.object(
          {
            eyebrow: text("Etiqueta superior"),
            title: text("Título"),
            steps: fields.array(
              fields.object({ title: text("Paso"), text: long("Explicación") }),
              { label: "Pasos", itemLabel: (p) => p.fields.title.value },
            ),
          },
          { label: "Cómo trabajamos" },
        ),
        faq: fields.object(
          {
            eyebrow: text("Etiqueta superior"),
            title: text("Título"),
            items: fields.array(
              fields.object({ q: text("Pregunta"), a: long("Respuesta") }),
              { label: "Preguntas", itemLabel: (p) => p.fields.q.value },
            ),
          },
          { label: "Preguntas frecuentes" },
        ),
      },
    }),

    portfolio: singleton({
      label: "Portfolio (textos)",
      path: "content/pages/portfolio",
      format: { data: "yaml" },
      schema: {
        ...pageHead,
        ctaTitle: text("Cierre · título"),
        ctaText: long("Cierre · texto"),
        ctaLabel: text("Cierre · texto del botón"),
      },
    }),

    blogPage: singleton({
      label: "Blog (textos)",
      path: "content/pages/blog",
      format: { data: "yaml" },
      schema: {
        ...pageHead,
        empty: text("Mensaje cuando no hay artículos"),
        postCtaTitle: text("Final de cada artículo · título"),
        postCtaText: long("Final de cada artículo · texto"),
        postCtaLabel: text("Final de cada artículo · texto del botón"),
      },
    }),

    contacto: singleton({
      label: "Contacto",
      path: "content/pages/contacto",
      format: { data: "yaml" },
      schema: {
        ...pageHead,
        topics: list("Opciones de \"¿Qué necesitás?\"", "Opción"),
        details: fields.array(
          fields.object({
            icon: fields.select({
              label: "Ícono",
              options: [
                { label: "Reloj", value: "clock" },
                { label: "Ubicación", value: "pin" },
              ],
              defaultValue: "clock",
            }),
            label: text("Título"),
            value: text("Texto"),
          }),
          { label: "Datos al costado del formulario", itemLabel: (p) => p.fields.label.value },
        ),
        success: fields.object(
          { title: text("Título"), text: long("Texto") },
          { label: "Mensaje al enviar el formulario" },
        ),
      },
    }),

    sobreMi: singleton({
      label: "Sobre mí",
      path: "content/pages/sobre-mi",
      format: { contentField: "story" },
      schema: {
        ...pageHead,
        story: fields.mdx({ label: "Tu historia", extension: "md" }),
        skillsTitle: text("Título de tecnologías"),
        skills: list("Tecnologías", "Tecnología"),
        experienceEyebrow: text("Experiencia · etiqueta superior"),
        experienceTitle: text("Experiencia · título"),
        experience: fields.array(
          fields.object({
            period: text("Período", "Ej.: 2023 — Actualidad"),
            role: text("Puesto"),
            place: text("Lugar"),
            text: long("Descripción"),
          }),
          { label: "Experiencia", itemLabel: (p) => p.fields.role.value },
        ),
        factsTitle: text("Título de datos rápidos"),
        facts: fields.array(
          fields.object({ label: text("Dato"), value: text("Valor") }),
          { label: "Datos rápidos", itemLabel: (p) => p.fields.label.value },
        ),
        cta: text("Texto del botón"),
      },
    }),
  },
});
