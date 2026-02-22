# Snippet recomendado para /init (QA de gráficas)

Pega este bloque en `/init` para próximas sesiones:

- Replica cada visual 1:1 con el tipo del PDF (tabla, barras, líneas, small multiples, scatter, waterfall, stacked).
- Criterio bloqueante: cero solapes de etiquetas/ejes/leyendas/controles en desktop y móvil.
- Si hay más de 10 categorías en eje X, aplicar rotación/intervalo o layout alternativo para evitar overlap.
- Si hay etiquetas largas, usar `noWrapLabels`, `xLabelRotate`, `gridBottom` y `height` según el caso.
- En barras horizontales con muchas categorías, aumentar altura del chart y verificar orden del paper.
- QA obligatorio por gráfico: tipo, orden, ejes, unidades, leyenda, legibilidad y fuente.
- No cerrar tarea sin revisar visualmente los 7 reportes en local y en GitHub Pages.

Checklist mínimo de salida:
- `node --check pages/app-reports.js`
- `node --check pages/data-*.js`
- Revisión manual de overlap en todos los gráficos.
