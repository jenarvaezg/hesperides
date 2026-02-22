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
  - leyendas/series corregidas en graficos 13 y 16,
  - area entre curvas en grafico 17,
  - parser de texto corregido para evitar falsos titulos numericos.
- Marcadores de `text.ranges` validados y corregidos para evitar cortes vacios de texto en informes.

## Pendiente prioritario
1. QA visual manual 1:1 contra PDF en despliegue para cada reporte (el backlog ya separa hecho vs pendiente).
2. Validar que no haya solapes en movil/desktop en los 7 informes tras esta ronda de ajustes globales.
3. Revisar enlaces finales “de verdad” donde aun queden placeholders o rutas temporales.

## Pendiente de mejora visual
1. Animaciones simples y consistentes (entrada, transiciones suaves).
2. Refinar home (jerarquia, espaciado y equilibrio visual de cards/CTA).
3. Ajustar tipografia para aproximar mejor el estilo Hesperides.

## Criterio de cierre
No se cierra un informe hasta que cada visual respete tipo, orden, etiquetas y jerarquia del PDF, sin overlap y con fuente trazable.
