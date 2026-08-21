# Portfolio — María José Farah

Sitio estático, sin build step ni dependencias. Se sirve tal cual.

```
site/
├── index.html          Estructura y contenido
├── css/styles.css      Tokens de diseño + componentes + responsive
├── js/main.js          Carrusel de imágenes (crossfade)
└── assets/img/         Fotos, ya recortadas al encuadre final
```

## Desarrollo local

Cualquier servidor estático:

```bash
cd site
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar en GitHub Pages

Opción A — servir desde la raíz: copiar el contenido de `site/` a la raíz del repo.
Opción B — Settings → Pages → Branch `main`, folder `/docs`: renombrar `site/` a `docs/`.

## Convenciones

**Tokens.** Colores, tipografías, radios y medidas viven en `:root` (`css/styles.css`,
sección 1). Cambiar la paleta o las fuentes se hace ahí, no en los componentes.

**Tipografía.** DM Serif Display para títulos, DM Sans para texto. Se cargan desde
Google Fonts en el `<head>`.

**Imágenes.** Cada foto está pre-recortada a la proporción de su marco, así que el CSS
sólo necesita `object-fit: cover`. Al reemplazar una foto, respetar la proporción del
archivo anterior o ajustar `object-position` en la regla correspondiente.

**Carrusel.** Cualquier contenedor con `data-carousel` y varios `.carousel__slide`
(uno con `.is-active`) rota solo. `data-interval` en ms controla la velocidad.

**Enlaces a PDFs.** Alojados en Google Drive; los `href` apuntan a los links de
compartir. Para cambiar un documento, se reemplaza sólo el `href`.
