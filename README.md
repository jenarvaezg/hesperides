# Paradoja inmobiliaria · versión interactiva

Sitio estático que convierte el PDF:

- `Informe CRR sobre la Paradoja Inmobiliaria y su Impacto en el Mercado.pdf`

en una lectura vertical con:

- 18 gráficos interactivos.
- 2 tablas clave.
- 2 playgrounds de simulación (rentabilidad y desbloqueo de oferta).

## Estructura

- `index.html`: layout principal y bloques de lectura.
- `styles.css`: estilo editorial y responsive.
- `data.js`: datos de gráficos/tablas y metadatos.
- `app.js`: renderizado de ECharts, navegación y playgrounds.

## Ejecución local

Puedes usar cualquier servidor estático:

```bash
python3 -m http.server 4173
```

Luego abre `http://localhost:4173`.

## Publicación en GitHub Pages

1. Sube el contenido del repo a GitHub.
2. En GitHub, ve a `Settings > Pages`.
3. En `Build and deployment`, selecciona:
- `Source`: `Deploy from a branch`.
- `Branch`: `main` (o la rama que uses).
- Carpeta: `/ (root)`.
4. Guarda y espera el despliegue.

Como es un sitio estático sin build, no requiere pipeline adicional.

## Nota metodológica

- Donde el PDF muestra cifras exactas, se replican directamente.
- Donde el PDF no incluye tabla numérica explícita, las series están marcadas como `reconstruida visualmente`.

## Escalado a múltiples informes

Este repo queda preparado para evolucionar a un portal con varios reportes:

- `reports/manifest.json`: catálogo de informes publicados.
- `reports/<slug>/`: carpeta por informe (HTML, CSS, JS y assets propios).
- `index.html` (raíz): puede convertirse en portada/listado leyendo el `manifest`.

Estructura recomendada de cada entrada del catálogo:

- `id`: identificador único.
- `slug`: ruta pública del informe.
- `title`: título corto para navegación.
- `subtitle`: bajada descriptiva.
- `reportUrl`: URL del informe original (fuente).
- `publishedAt`: fecha de publicación.
- `entry`: fichero de entrada del informe (por ejemplo `index.html`).

## Decisión de producto (raíz del sitio)

Queda acordado para evolución próxima:

- Estado actual: `https://jenarvaezg.github.io/hesperides/` muestra directamente el informe actual.
- Estado objetivo: `https://jenarvaezg.github.io/hesperides/` será un **catálogo de informes**.
- Comportamiento objetivo: la portada listará todos los reportes disponibles y enlazará a su ruta por `slug` (por ejemplo, `/hesperides/paradoja-inmobiliaria/`).
- Alcance actual: esta decisión queda documentada, pero la portada catálogo **no se implementa en este cambio**.

Implementación prevista cuando se active:

- Leer `reports/manifest.json` en la raíz.
- Pintar cards/listado por cada entrada de `reports`.
- Mantener cada informe aislado en su propia ruta (`/<slug>/`).
