# Guía operativa: convertir informes PDF en web interactiva (reutilizable)

Este documento deja estandarizado el proceso que seguimos para transformar un informe PDF en una web interactiva, manteniendo fidelidad visual al documento original y publicable en GitHub Pages.

**Requisito permanente a partir de ahora:** en todos los informes futuros se debe mantener fidelidad visual estricta con el PDF y evitar cualquier solape de ejes, etiquetas, paneles, leyendas o controles.

## 1) Objetivo

Convertir un informe PDF en una experiencia de lectura vertical (scrollytelling) con:

- Narrativa por capítulos.
- Gráficos interactivos.
- Tablas cuando el original use tabla.
- Fuentes trazables.
- Playground(s) de simulación.
- Sitio estático deployable en GitHub Pages.

## 2) Estructura estándar del proyecto

Archivos base:

- `index.html`: estructura de la página.
- `styles.css`: estilos y responsive.
- `data.js`: dataset de gráficos/tablas y metadatos.
- `app.js`: render (ECharts), navegación, interacciones y playgrounds.
- `README.md`: instrucciones de ejecución y publicación.
- `.nojekyll`: recomendado para GitHub Pages estático.
- `Informe ... .pdf`: fuente original.

Carpeta de apoyo:

- `pages/`: imágenes por página para digitalizar gráficos (`pdftoppm`).
- `informe.txt`: texto extraído (`pdftotext`).

## 3) Flujo de trabajo (paso a paso)

### Paso 1: Ingesta y exploración del PDF

Comandos útiles:

```bash
pdfinfo "Informe.pdf"
pdftotext -layout "Informe.pdf" informe.txt
pdftoppm -png -r 180 "Informe.pdf" pages/page
```

Objetivo:

- Detectar capítulos, gráficos y tablas.
- Identificar fuentes por gráfico (CIS, INE, MIVAU, etc.).
- Verificar si hay cifras explícitas o si toca reconstrucción visual.

### Paso 2: Inventario de visuales

Crear lista de:

- `Gráfico 1..N`
- `Tabla 1..M`
- Tipo visual original de cada uno (tabla, barra horizontal, barra vertical, línea, small multiples, etc.).

Regla clave: **no cambiar el tipo de visual del PDF**.

### Paso 3: Construcción del `data.js`

Modelo recomendado por gráfico:

- `id`, `title`, `subtitle`
- `source`
- `exactness`: `exacta del gráfico` o `reconstruida visualmente`
- `x`, `series`
- `renderAs` (si aplica): `table`, `small-multiples`
- `orientation` (si aplica): `horizontal`

Ejemplos usados:

- `g1`: `renderAs: "table"`
- `g2`: `orientation: "horizontal"`
- `g3`, `g12`: `renderAs: "small-multiples"`

### Paso 4: Render fiel en `app.js`

Implementar render condicionado por metadatos:

- `renderAs === "table"` -> tabla HTML (no gráfica de barras).
- `orientation === "horizontal"` -> barras horizontales.
- `renderAs === "small-multiples"` -> paneles separados por serie.
- Resto -> render estándar ECharts.

### Paso 5: Reglas de UX aplicadas (estándar del proyecto)

- Fuente visible **debajo** de cada visual.
- Incluir enlace al informe original en la fuente.
- Botón de descarga por gráfico (toolbox custom).
- La imagen descargada debe incluir:
  - título
  - subtítulo
  - fuente
  - URL del informe
- Excluir toolbox en export para que el icono de descarga no aparezca en la imagen.
- No usar botón `Restaurar` si no aporta.

### Paso 6: Manejo de solapes y legibilidad

- Si hay etiquetas largas: aumentar márgenes y envolver texto.
- Evitar minimapa/slider en casos con etiquetas diagonales largas si solapa.
- Mantener zoom interno cuando el slider estorbe.
- Usar formateador central de ticks por unidad para evitar cifras largas o inconsistentes en ejes.
- En small multiples, usar el mismo rango y ticks entre paneles cuando el original comparta escala.
- Después de renderizar paneles, forzar `resize` para evitar recortes de gráficos.

### Paso 7: Playgrounds (recomendación)

Cada playground debe tener:

- Inputs claros.
- Resultados en KPIs.
- Sección de ayuda de fórmula con botón `?` y tooltip.

En este proyecto:

- Playground 1: rentabilidad del promotor.
- Playground 2: desbloqueo de oferta.

## 4) Criterios de fidelidad (obligatorios)

1. Si en PDF es tabla, en web debe ser tabla.
2. Si en PDF son barras horizontales, mantener horizontal.
3. Si en PDF son paneles separados (small multiples), mantener paneles.
4. Si el original usa ejes comparables entre paneles, mantener exactamente la misma escala entre paneles.
5. No simplificar un gráfico solo “por estética” si cambia la lectura.
6. Marcar siempre qué es exacto y qué está reconstruido visualmente.

## 5) Control de calidad antes de entregar

Checklist:

- `node --check app.js`
- `node --check data.js` (si aplica)
- Levantar servidor local y revisar desktop + móvil:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

- Revisar especialmente:
  - solapes de etiquetas
  - solapes o cortes en números del eje Y y eje X
  - recorte de paneles en small multiples
  - coherencia de escala entre paneles que deban compararse
  - tooltips
  - descarga PNG con metadatos
  - links de fuente
  - capítulos/navegación

## 6) Publicación en GitHub Pages

1. Subir repo a GitHub.
2. `Settings > Pages`.
3. `Deploy from a branch`.
4. Seleccionar rama (`main`) y carpeta raíz (`/root`).
5. Guardar.

Si es estático puro, no necesita build.

## 7) Plantilla de arranque para nuevos informes

Cuando llegue un nuevo PDF, repetir:

1. Copiar PDF al repo.
2. Extraer texto + render de páginas (`pdftotext` + `pdftoppm`).
3. Inventariar todos los visuales con su tipo original.
4. Rellenar `data.js` con fuentes y exactitud.
5. Implementar render fiel por tipo (`table`, `horizontal`, `small-multiples`, etc.).
6. Añadir 1-2 playgrounds si aportan contexto analítico.
7. QA + deploy.

## 8) Convenciones de datos y transparencia

- `exactness: "exacta del gráfico"` -> dato transcrito tal cual del PDF.
- `exactness: "reconstruida visualmente"` -> aproximación digitalizada del gráfico.
- Nunca mezclar ambos sin marcarlo.
- Mantener fuente por gráfico y listado global de fuentes.

## 9) Errores comunes que evitar

- Cambiar orientación/tipo de gráfico respecto al original.
- Romper la comparabilidad entre paneles (small multiples) con escalas distintas cuando no toca.
- Dejar números de ejes mal formateados o con solapes.
- Ocultar fuentes o no enlazar informe base.
- Dejar controles que no funcionan (`restore` sin valor real).
- Exportar PNG con elementos UI sobrantes.
- Forzar minimapas que rompen etiquetas.

---

## 10) Criterio de aceptación final (bloqueante)

No se considera terminado un informe si ocurre cualquiera de estos casos:

- Alguna visual no respeta el tipo original del PDF.
- Hay solapes de etiquetas, ejes o leyendas.
- Hay paneles recortados o con escalas incoherentes en comparaciones.
- Los ejes muestran números mal formateados o difíciles de leer.

## Resumen operativo corto

- Fidelidad primero.
- Cero solapes siempre.
- Interactividad encima de esa fidelidad.
- Transparencia de fuentes y método siempre visible.
- Entrega estática lista para GitHub Pages.

## 11) Decisión de navegación multiinforme (acuerdo de producto)

Para próximas iteraciones, el comportamiento objetivo del sitio en GitHub Pages será:

- `https://jenarvaezg.github.io/hesperides/` actuará como **catálogo/portada** de todos los informes.
- Cada informe vivirá en su ruta dedicada por `slug` (ejemplo: `/hesperides/paradoja-inmobiliaria/`).
- La portada leerá `reports/manifest.json` como fuente única de verdad para listar informes.

Nota: este documento fija la decisión para futuros informes. La portada catálogo no es obligatoria en el mismo cambio de digitalización inicial de cada PDF.
