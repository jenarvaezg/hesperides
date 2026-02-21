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
