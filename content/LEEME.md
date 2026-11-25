# Cómo editar el contenido del sitio

Todo lo que se ve en el sitio sale de esta carpeta. Tenés dos formas de editarlo:

1. **Panel visual (recomendado):** `npm run dev` y abrí http://localhost:3000/keystatic.
   Formularios y un editor de texto para los artículos. Guarda directo en estos archivos.
   (En producción: https://omnicode.store/keystatic, ver README.)
2. **A mano:** abrí el archivo en tu editor. Funciona igual: son los mismos archivos.

| Querés cambiar...                         | Panel                     | Archivo                                    |
| ----------------------------------------- | ------------------------- | ------------------------------------------ |
| Nombre, email, redes, menú                | Datos del sitio           | `site.yaml`                                |
| Textos del inicio                         | Inicio                    | `pages/home.yaml`                          |
| Servicios: textos, proceso, preguntas     | Servicios y precios       | `pages/servicios.yaml`                     |
| Textos de Portfolio / Blog / Contacto     | Portfolio, Blog, Contacto | `pages/portfolio.yaml`, `blog.yaml`, `contacto.yaml` |
| Tu historia, experiencia, tecnologías     | Sobre mí                  | `pages/sobre-mi.md`                        |
| Un servicio                               | Servicios                 | `services/` (un archivo por servicio)      |
| Un paquete de precios                     | Paquetes y precios        | `packages/` (un archivo por paquete)       |
| Un proyecto del portfolio                 | Proyectos (portfolio)     | `projects/` (un archivo por proyecto)      |
| Un artículo del blog                      | Artículos del blog        | `blog/` (un archivo por artículo)          |

## Reglas simples

- **Agregar** algo: en el panel, botón *Add*. A mano: copiá un archivo de la carpeta y editalo.
- **Ocultar** sin borrar: casilla "Ocultar del sitio (borrador)" (a mano: `draft: true`).
- **Ordenar**: campo *Orden* (número chico = primero). Los 3 primeros proyectos salen también en el Inicio.
- **Resaltar** palabras en un título: ponelas entre `**dos asteriscos**` (se ven en naranja).
- **Imágenes de proyectos**: se suben desde el panel y quedan en `public/projects/`.
- Los archivos que empiezan con `_` se ignoran.
- Si a mano algo queda mal escrito, al ejecutar el sitio el error te dice **qué archivo y qué campo** corregir.
- Al guardar, el panel puede reformatear un archivo (comillas, viñetas, fecha). Es normal y el sitio lo entiende igual.
- Los comentarios `# TODO` son lo que falta reemplazar con tus datos reales; el panel los borra al guardar ese archivo.

## Formato de los archivos (si editás a mano)

Servicios, paquetes y proyectos son `.yaml`:

```yaml
title: Sistema de turnos para clínica
description: Plataforma de reservas online con recordatorios automáticos.
year: "2025"
tags: [Next.js, PostgreSQL]
order: 1
```

Los artículos del blog son `.mdx` (encabezado entre `---` y luego el texto en Markdown):

```
---
title: Título del artículo
description: Resumen para Google y redes
date: 2026-12-01
tags: [Tag1, Tag2]
---

Texto en Markdown. Podés usar ## títulos, **negritas**, listas, [enlaces](/contacto) y > citas.
```
