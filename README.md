# omnicode.store

Sitio de omnicode: servicios, portfolio, blog y contacto.
Next.js (App Router) + Tailwind CSS v4 + MDX + panel de administración Keystatic.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # variables del formulario de contacto
npm run dev                  # sitio: http://localhost:3000
```

## Panel de administración (editar sin tocar código)

Abrí **http://localhost:3000/keystatic** con `npm run dev`.
Ahí editás todo con formularios (portada, servicios, precios, proyectos, textos, "Sobre mí") y con un editor de texto
para los artículos del blog. Guarda directamente en los archivos de `content/`, así que el sitio se actualiza al instante.

- Proyectos con captura: se suben desde el panel y quedan en `public/projects/`.
- Podés seguir editando los archivos a mano si preferís: son los mismos. Guía completa en [`content/LEEME.md`](content/LEEME.md).
- La interfaz del panel (botones *Save*, *Add*, *Dashboard*) está en inglés; los nombres de secciones y campos, en español.

### Usar el panel desde omnicode.store/keystatic (producción)

En producción el panel guarda como un **commit en tu repositorio de GitHub**, y Vercel republica el sitio solo
(los cambios se ven en aproximadamente 1 minuto). Solo puede entrar quien tenga permiso de escritura en el repo.
Se configura una sola vez:

1. Subí el proyecto a GitHub y desplegalo en Vercel (sección siguiente).
2. En tu computadora, en `.env.local`, poné `NEXT_PUBLIC_KEYSTATIC_REPO=tu-usuario/tu-repositorio` y corré `npm run dev`.
3. Abrí http://localhost:3000/keystatic. Con esa variable el panel pasa a modo GitHub y te muestra un asistente
   que **crea una GitHub App** y genera 4 variables en un archivo `.env`:
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` y `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
4. En Vercel → **Settings → Environment Variables**, cargá esas 4 más `NEXT_PUBLIC_KEYSTATIC_REPO`, y volvé a desplegar.
5. En GitHub, abrí `https://github.com/apps/<el-slug-de-tu-app>` → **App settings** → **Add Callback URL** y agregá:
   `https://omnicode.store/api/keystatic/github/oauth/callback`
6. Entrá a https://omnicode.store/keystatic e iniciá sesión con GitHub.

Para volver a editar **sin hacer commits** en tu computadora, borrá o comentá `NEXT_PUBLIC_KEYSTATIC_REPO` de `.env.local`.

> Este paso a producción sigue el procedimiento de la documentación de Keystatic, pero no pude probarlo de punta a punta
> desde acá (requiere tu cuenta de GitHub). El modo local sí está probado.

## Despliegue en Vercel

1. Subí el proyecto a un repositorio de GitHub.
2. Vercel → **Add New → Project** → importá el repositorio (detecta Next.js solo) → **Deploy**.
3. **Settings → Environment Variables**: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (ver `.env.example`) y volvé a desplegar.
4. **Settings → Domains**: agregá `omnicode.store` y `www.omnicode.store`. Vercel te muestra, en la tarjeta de cada dominio,
   los registros DNS exactos para tu registrador: **usá siempre esos valores** (el `A` del dominio raíz suele ser `76.76.21.21`,
   pero el `CNAME` de `www` es propio de cada proyecto). Borrá antes los registros `A`/`AAAA` viejos del dominio raíz.
5. Elegí un dominio principal y redirigí el otro.

> **Plan de Vercel:** el plan gratuito (Hobby) es para uso personal y no comercial. Un sitio que promociona servicios pagos
> probablemente cuente como comercial; revisá las *Fair Use Guidelines* de Vercel y elegí el plan que corresponda.

Cada cambio que llegue a GitHub (a mano o desde el panel) se publica automáticamente.

### Formulario de contacto (Resend)
1. Cuenta en https://resend.com y verificá `omnicode.store` (registros DNS que te indica).
2. Creá una API key y cargala en Vercel.
Hasta entonces, el formulario le avisa al visitante que escriba por email.

## Estructura

- `content/` — todo el contenido (lo que edita el panel).
- `keystatic.config.ts` — define las pantallas y campos del panel.
- `app/(site)/` — páginas públicas · `app/keystatic/` — panel · `app/api/contact/` — formulario.
- `app/globals.css` y `components/` — diseño (colores, tipografías, componentes).

## Checklist antes de publicar
- [ ] Reemplazar los `TODO`: nombre, email, redes, historia, experiencia (desde el panel)
- [ ] Proyectos y precios reales (o "A cotizar")
- [ ] Borrar o reescribir los 2 artículos de ejemplo
- [ ] Configurar Resend y probar el formulario en producción
- [ ] Configurar el panel en producción (sección de arriba) y probar un cambio
- [ ] Enviar `https://omnicode.store/sitemap.xml` a Google Search Console
