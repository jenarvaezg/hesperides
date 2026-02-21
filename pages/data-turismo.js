(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };

  const figures = [
    { label: "Grafico 1", page: 6, file: "grafico-01-p06.png" },
    { label: "Grafico 2", page: 7, file: "grafico-02-p07.png" },
    { label: "Grafico 3", page: 8, file: "grafico-03-p08.png" },
    { label: "Grafico 4", page: 9, file: "grafico-04-p09.png" },
    { label: "Grafico 5", page: 11, file: "grafico-05-p11.png" },
    { label: "Grafico 6", page: 13, file: "grafico-06-p13.png" },
    { label: "Grafico 7", page: 15, file: "grafico-07-p15.png" },
    { label: "Grafico 8", page: 16, file: "grafico-08-p16.png" },
    { label: "Grafico 9", page: 17, file: "grafico-09-p17.png" },
    { label: "Grafico 10", page: 18, file: "grafico-10-p18.png" },
    { label: "Grafico 11", page: 19, file: "grafico-11-p19.png" },
    { label: "Grafico 12", page: 20, file: "grafico-12-p20.png" },
    { label: "Tabla 1", page: 21, file: "tabla-01-p21.png" },
    { label: "Grafico 13", page: 23, file: "grafico-13-p23.png" },
    { label: "Tabla 2", page: 24, file: "tabla-02-p24.png" },
    { label: "Tabla 3", page: 25, file: "tabla-03-p25.png" },
    { label: "Grafico 14", page: 28, file: "grafico-14-p28.png" },
    { label: "Grafico 15", page: 29, file: "grafico-15-p29.png" },
    { label: "Grafico 16", page: 31, file: "grafico-16-p31.png" }
  ];

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;
      return [
        id,
        {
          title: fig.label,
          subtitle: `Figura original del informe (pagina ${fig.page})`,
          source: "Turismo y vivienda en Canarias (2025)",
          sourceUrl: "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf",
          exactness: "exacta del informe",
          renderAs: "figure-image",
          imageUrl: `../../assets/figures/turismo/${fig.file}`
        }
      ];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "Turismo y vivienda en Canarias",
      lead: "Version interactiva del informe original, replicando grafico por grafico y tabla por tabla en su formato visual de origen.",
      reportUrl: "https://hesperides.edu.es/informes/turismo-vivienda-canarias/",
      pdfUrl: "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf",
      caveat:
        "Las figuras se muestran tal como aparecen en el PDF original para preservar fidelidad visual total."
    },
    metrics: [
      { kpi: "16", label: "Graficos del informe" },
      { kpi: "3", label: "Tablas del informe" },
      { kpi: "35", label: "Paginas del PDF" },
      { kpi: "100%", label: "Fidelidad visual de figuras" }
    ],
    chapters: [
      {
        id: "bloque-1",
        title: "1. Apertura del informe",
        summary: [
          "Bloque inicial con la secuencia de graficos de apertura sobre vivienda y turismo.",
          "Se mantiene la representacion original de cada visual para evitar perdida de formato."
        ],
        charts: makeIds("f", 1, 7)
      },
      {
        id: "bloque-2",
        title: "2. Desarrollo y tablas",
        summary: [
          "Bloque central con graficos de desarrollo y las tablas incluidas en el documento.",
          "Las figuras se muestran en el mismo orden que en el PDF original."
        ],
        charts: makeIds("f", 8, 13)
      },
      {
        id: "bloque-3",
        title: "3. Cierre",
        summary: [
          "Bloque final con la secuencia de cierre del informe.",
          "Todas las visuales son equivalencias exactas del trabajo original."
        ],
        charts: makeIds("f", 14, 19)
      }
    ],
    charts,
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/turismo-vivienda-canarias/"
      }
    ]
  };
})();
