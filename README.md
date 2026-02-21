# Centro Ruth Richardson · catálogo de informes interactivos

Sitio estático que publica un catálogo de informes en la raíz y páginas interactivas por reporte.

Incluye, entre otros, estos informes:
- `informes/paradoja-inmobiliaria/index.html`
- `informes/sistemas-de-pensiones-comparados/index.html`
- `informes/insostenibilidad-seguridad-social/index.html`
- `informes/informe-dia-d-pensiones/index.html`
- `informes/reformas-seguridad-social-espana/index.html`
- `informes/radiografia-mercado-vivienda-espana/index.html`
- `informes/turismo-vivienda-canarias/index.html`

## Estructura

- `index.html`: portada catálogo.
- `catalog.css` y `catalog.js`: interfaz y lógica del catálogo (lee `reports/manifest.json`).
- `reports/manifest.json`: fuente de verdad del listado de informes.
- `informes/`: rutas canónicas públicas de los reportes.
- `pages/` y `paradoja-inmobiliaria/`: implementación previa mantenida para compatibilidad.

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

## Catálogo de informes

Cada entrada de `reports/manifest.json` usa:

- `id`: identificador único.
- `slug`: ruta pública del informe.
- `title`: título corto para navegación.
- `subtitle`: bajada descriptiva.
- `reportUrl`: URL del informe original (fuente).
- `publishedAt`: fecha de publicación.
- `entry`: fichero de entrada del informe (por ejemplo `index.html`).

La raíz del sitio (`/`) ya renderiza el catálogo y enlaza cada reporte.
