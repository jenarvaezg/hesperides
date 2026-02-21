(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };

  const figures = [
    { label: "Tabla 1", page: 4, file: "tabla-01-p04.png" },
    { label: "Grafico 1", page: 5, file: "grafico-01-p05.png" },
    { label: "Grafico 2", page: 6, file: "grafico-02-p06.png" },
    { label: "Grafico 3", page: 8, file: "grafico-03-p08.png" },
    { label: "Grafico 4", page: 9, file: "grafico-04-p09.png" },
    { label: "Tabla 2", page: 10, file: "tabla-02-p10.png" },
    { label: "Grafico 5", page: 11, file: "grafico-05-p11.png" },
    { label: "Grafico 6", page: 14, file: "grafico-06-p14.png" },
    { label: "Grafico 7", page: 15, file: "grafico-07-p15.png" },
    { label: "Grafico 8", page: 16, file: "grafico-08-p16.png" },
    { label: "Grafico 9", page: 18, file: "grafico-09-p18.png" },
    { label: "Grafico 10", page: 19, file: "grafico-10-p19.png" },
    { label: "Grafico 11", page: 20, file: "grafico-11-p20.png" },
    { label: "Grafico 12", page: 22, file: "grafico-12-p22.png" },
    { label: "Grafico 13", page: 23, file: "grafico-13-p23.png" },
    { label: "Grafico 14", page: 24, file: "grafico-14-p24.png" },
    { label: "Grafico 15", page: 25, file: "grafico-15-p25.png" },
    { label: "Grafico 16", page: 26, file: "grafico-16-p26.png" },
    { label: "Grafico 17", page: 28, file: "grafico-17-p28.png" },
    { label: "Grafico 18", page: 29, file: "grafico-18-p29.png" },
    { label: "Tabla 3", page: 30, file: "tabla-03-p30.png" },
    { label: "Grafico 19", page: 33, file: "grafico-19-p33.png" },
    { label: "Grafico 20", page: 35, file: "grafico-20-p35.png" }
  ];

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;
      return [
        id,
        {
          title: fig.label,
          subtitle: `Figura original del informe (pagina ${fig.page})`,
          source: "El dia D de las pensiones ha llegado (2025)",
          sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
          exactness: "exacta del informe",
          renderAs: "figure-image",
          imageUrl: `../assets/figures/dia-d/${fig.file}`
        }
      ];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "El dia D de las pensiones ha llegado",
      lead: "Version interactiva del informe original, replicando grafico por grafico y tabla por tabla en su formato visual de origen.",
      reportUrl: "https://hesperides.edu.es/informes/informe_dia_d_pensiones",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      caveat:
        "Las figuras se muestran tal como aparecen en el PDF original para preservar fidelidad visual total."
    },
    metrics: [
      { kpi: "20", label: "Graficos del informe" },
      { kpi: "3", label: "Tablas del informe" },
      { kpi: "38", label: "Paginas del PDF" },
      { kpi: "100%", label: "Fidelidad visual de figuras" }
    ],
    chapters: [
      {
        id: "bloque-1",
        title: "1. Transicion demografica",
        summary: [
          "Bloque inicial del informe con tablas y graficos sobre natalidad, estructura poblacional y cambio demografico.",
          "Se mantiene la representacion original de cada visual para evitar perdida de contexto o formato."
        ],
        charts: makeIds("f", 1, 8)
      },
      {
        id: "bloque-2",
        title: "2. Economia, dependencia y presion en pensiones",
        summary: [
          "Bloque central con evidencia sobre dependencia demografica, productividad y gasto relativo.",
          "Incluye los graficos intermedios en el orden exacto del documento."
        ],
        charts: makeIds("f", 9, 17)
      },
      {
        id: "bloque-3",
        title: "3. Escenarios y conclusion",
        summary: [
          "Ultimo bloque del informe con tabla de supuestos, simulaciones y cierre de diagnostico.",
          "Las figuras se muestran una a una como equivalentes originales."
        ],
        charts: makeIds("f", 18, 23)
      }
    ],
    charts,
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/informe_dia_d_pensiones"
      }
    ]
  };
})();
