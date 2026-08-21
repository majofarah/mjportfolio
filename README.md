# Portfolio — María José Farah

Sitio construido con [Astro](https://astro.build) (salida estática, sin framework de UI —
el carrusel es JS plano co-ubicado en su componente). Se despliega en GitHub Pages vía
GitHub Actions.

```
astro.config.mjs           Config de Astro (sitemap; sin site/base hardcodeados, ver más abajo)
public/
├── favicon.svg              Ícono de la pestaña, con los tokens de color del sitio
└── og-image.jpg             Imagen para previews al compartir el link (OG / Twitter)
src/
├── layouts/Layout.astro     <head>: meta, fuentes, OG/Twitter, preload del hero, favicon
├── styles/styles.css        Tokens de diseño + componentes + responsive
├── data/
│   ├── lines.ts               Las 6 líneas de mobiliario (nombre, nota, imagen)
│   ├── cases.ts                Los 2 casos de estudio (texto, detail-list, link a PDF)
│   └── docs.ts                  Los 4 links de documentación
├── components/                Un componente por sección + Carousel.astro y Gallery.astro
│   (las dos variantes de "media" que puede llevar un caso de estudio)
├── assets/img/               Fotos originales — Astro las procesa en build (WebP + srcset)
└── pages/index.astro         Arma la página a partir de Layout + componentes + data
.github/workflows/astro.yml  Build + deploy a GitHub Pages (ver sección de abajo)
```

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/ localmente
```

## Publicar en GitHub Pages

Ya configurado — no requiere pasos manuales para publicar. El repo tiene:

- **Settings → Pages → Source: GitHub Actions** (ya activado)
- `.github/workflows/astro.yml`: en cada push a `main`, instala dependencias, corre
  `astro build --site ... --base ...` (esos dos valores los inyecta el propio workflow
  desde la configuración de Pages del repo — por eso `astro.config.mjs` no los tiene
  hardcodeados) y publica `dist/` como el sitio.
- El deploy usa la ruta moderna de Pages (`upload-pages-artifact` + `deploy-pages`), no
  Jekyll — así que no aplica el problema típico de Jekyll ignorando carpetas que
  empiezan con `_` (como `_astro/`).

Sitio publicado: **https://majofarah.github.io/mjportfolio/**

## Convenciones

**Tokens.** Colores, tipografías, radios y medidas viven en `:root` (`src/styles/styles.css`,
sección 1). Cambiar la paleta o las fuentes se hace ahí, no en los componentes.

**Tipografía.** DM Serif Display para títulos, DM Sans para texto. Se cargan desde
Google Fonts en `Layout.astro`.

**Imágenes.** Cada foto está pre-recortada a la proporción de su marco (el CSS usa
`object-fit: cover`). Astro genera automáticamente versiones WebP en varios anchos
(`widths`/`sizes` en cada `<Image>`) — al reemplazar una foto alcanza con poner el
archivo nuevo en `src/assets/img/` con el mismo nombre; no hace falta optimizarla a mano.

**Contenido repetido.** Las líneas de mobiliario, los casos de estudio y los links de
documentación viven en `src/data/*.ts`, no en el HTML — agregar o editar uno de estos
ítems es editar esos archivos, no tocar componentes.

**Carrusel.** `Carousel.astro` es el único componente con `data-carousel`; su lógica
(rotación automática, pausa en hover y al ocultar la pestaña) vive en un `<script>`
co-ubicado en el mismo archivo. `data-interval` en ms controla la velocidad.

**Casos de estudio.** `ProjectCase.astro` es genérico — recibe el texto por props y el
bloque de media (`Gallery` o `Carousel`) por slot. El prop `reverse` no es solo estético:
controla el orden real del DOM, que es lo que decide qué columna ocupa cada bloque en
desktop — mantenerlo en sync con el layout deseado al agregar un caso nuevo.

**Enlaces a PDFs.** Alojados en Google Drive; los `href` en `src/data/cases.ts` y
`src/data/docs.ts` apuntan a los links de compartir. Para cambiar un documento, se
reemplaza sólo el `href`.
