# ROADMAP

## Estado actual (2026-02-22)
El catalogo y las 7 rutas de informes estan operativas con arquitectura unificada basada en `pages/app-reports.js` + `pages/data-*.js`.

## Revisado y cerrado
- Home/catalogo publicado y enlazado con rutas canonicas de `informes/`.
- Navegacion base unificada (volver a home, abrir fuente original, descarga PNG en visuales).
- Modo de lectura activo (`solo graficas` vs `graficas + texto`).
- Texto vivo integrado por secciones y notas al pie renderizadas por capitulo.
- Reglas anti-overlap reforzadas en renderer:
  - auto-ajuste de `xLabelInterval`, `xLabelRotate` y tamaño de fuente segun densidad.
  - `hideOverlap` activo en eje X y ajuste de fuente en eje Y para horizontales.
  - soporte `xLabelRotate`, `xLabelInterval`, `gridBottom`, `height`, `noWrapLabels`.
  - soporte layout configurable en small multiples (`smallMultiplesColumns`).
- soporte de exclusión de series auxiliares en leyenda (`excludeFromLegend`), util para graficos con rellenos diferenciales.
- QA y correcciones avanzadas en **La (in)sostenibilidad de la Seguridad Social**:
  - ajustes de tipos (waterfall/stacked/small multiples),
  - mejora de legibilidad de ejes,
  - orden y escala en barras horizontales,
  - areas diferenciales donde aplica.
- QA aplicado en **La paradoja inmobiliaria**:
  - orden de ranking, escalas de ejes y densidad de etiquetas,
  - tooltip escalado (miles) y orden interno de la seccion 4.
- QA aplicado en **El dia D de las pensiones**:
  - layout 4x2 en small multiples del grafico 3,
  - series completadas en grafico 3 (cohortes faltantes),
  - leyenda/orden/alineacion corregidos en grafico 16 y tooltip robusto sin NaN,
  - area entre curvas en grafico 17,
  - parser de texto corregido para evitar falsos titulos numericos.
- QA aplicado en **Sistemas de pensiones comparados**:
  - reconstruccion grafico a grafico (1-32) y tablas alineadas con el PDF,
  - ajustes de layout, ejes y jerarquia por capitulo.
- QA aplicado en **Las Reformas de la Seguridad Social en Espana**:
  - tabla principal reconstruida (Tabla 1),
  - series largas reestimadas (Graficos 1-3),
  - reorden de visuales dentro del capitulo 8 para respetar flujo del PDF.
- QA aplicado en **Radiografia del mercado de la vivienda** y **Turismo y vivienda en Canarias**:
  - pass manual de consistencia chart-by-chart (tipo, orientacion, xlen, series, titulos) contra mapas de figuras.
- Renderer mejorado:
  - formateador de tooltip robusto ante `null/undefined` (evita `NaN`),
  - controles de posicion/estilo de leyenda y toolbox por grafico (`legendTop`, `legendLeft`, etc.).
- Marcadores de `text.ranges` validados y corregidos para evitar cortes vacios de texto en informes.

## Pendiente prioritario
1. QA visual manual 1:1 en navegador (desktop + movil) para cerrar pendientes marcados en `docs/QA_BACKLOG_POR_REPORTE.md`.
2. Validacion final de home/catalogo responsive y jerarquia tipografica.
3. Revisar enlaces finales “de verdad” donde aun queden placeholders o rutas temporales.

## Pendiente de mejora visual
1. Animaciones simples y consistentes (entrada, transiciones suaves).
2. Refinar home (jerarquia, espaciado y equilibrio visual de cards/CTA).
3. Ajustar tipografia para aproximar mejor el estilo Hesperides.

## Criterio de cierre
No se cierra un informe hasta que cada visual respete tipo, orden, etiquetas y jerarquia del PDF, sin overlap y con fuente trazable.
