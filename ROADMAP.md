# ROADMAP

## Estado actual (2026-02-22)
El catalogo y las 7 rutas de informes estan operativas con arquitectura unificada basada en `pages/app-reports.js` + `pages/data-*.js`.

## Revisado y cerrado
- Home/catalogo publicado y enlazado con rutas canonicas de `informes/`.
- Navegacion base unificada (volver a home, abrir fuente original, descarga PNG en visuales).
- Modo de lectura activo (`solo graficas` vs `graficas + texto`).
- Texto vivo integrado por secciones y notas al pie renderizadas por capitulo.
- Reglas anti-overlap reforzadas en renderer:
  - `hideOverlap` en ejes de categoria.
  - soporte `xLabelRotate`, `xLabelInterval`, `gridBottom`, `height`, `noWrapLabels`.
  - soporte layout configurable en small multiples (`smallMultiplesColumns`).
- QA y correcciones avanzadas en **La (in)sostenibilidad de la Seguridad Social**:
  - ajustes de tipos (waterfall/stacked/small multiples),
  - mejora de legibilidad de ejes,
  - orden y escala en barras horizontales,
  - areas diferenciales donde aplica.

## Pendiente prioritario
1. QA grafico 1:1 del resto de informes (por reporte y por grafico), empezando por **El dia D de las pensiones**.
2. Completar y revisar los cambios ya iniciados en `pages/data-dia-d.js` (fidelidad total al PDF).
3. Validar que no haya solapes en movil/desktop en los 7 informes tras cada ronda.
4. Revisar enlaces finales “de verdad” donde aun queden placeholders o rutas temporales.

## Pendiente de mejora visual
1. Animaciones simples y consistentes (entrada, transiciones suaves).
2. Refinar home (jerarquia, espaciado y equilibrio visual de cards/CTA).
3. Ajustar tipografia para aproximar mejor el estilo Hesperides.

## Criterio de cierre
No se cierra un informe hasta que cada visual respete tipo, orden, etiquetas y jerarquia del PDF, sin overlap y con fuente trazable.
