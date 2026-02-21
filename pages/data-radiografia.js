(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };

  const figures = [
    { label: "Grafico 1", page: 5, file: "grafico-01-p05.png" },
    { label: "Grafico 2", page: 6, file: "grafico-02-p06.png" },
    { label: "Grafico 3", page: 7, file: "grafico-03-p07.png" },
    { label: "Grafico 4", page: 8, file: "grafico-04-p08.png" },
    { label: "Grafico 5", page: 9, file: "grafico-05-p09.png" },
    { label: "Grafico 6", page: 9, file: "grafico-06-p09.png" },
    { label: "Grafico 7", page: 11, file: "grafico-07-p11.png" },
    { label: "Grafico 8", page: 11, file: "grafico-08-p11.png" },
    { label: "Grafico 9", page: 12, file: "grafico-09-p12.png" },
    { label: "Grafico 10", page: 13, file: "grafico-10-p13.png" },
    { label: "Grafico 11", page: 13, file: "grafico-11-p13.png" },
    { label: "Grafico 12", page: 14, file: "grafico-12-p14.png" },
    { label: "Grafico 13", page: 15, file: "grafico-13-p15.png" },
    { label: "Grafico 14", page: 16, file: "grafico-14-p16.png" },
    { label: "Grafico 15", page: 18, file: "grafico-15-p18.png" },
    { label: "Grafico 16", page: 19, file: "grafico-16-p19.png" },
    { label: "Grafico 17", page: 20, file: "grafico-17-p20.png" },
    { label: "Grafico 18", page: 20, file: "grafico-18-p20.png" },
    { label: "Grafico 19", page: 21, file: "grafico-19-p21.png" },
    { label: "Grafico 20", page: 22, file: "grafico-20-p22.png" },
    { label: "Grafico 21", page: 23, file: "grafico-21-p23.png" },
    { label: "Grafico 22", page: 24, file: "grafico-22-p24.png" },
    { label: "Grafico 23", page: 25, file: "grafico-23-p25.png" },
    { label: "Grafico 24", page: 25, file: "grafico-24-p25.png" },
    { label: "Grafico 25", page: 30, file: "grafico-25-p30.png" },
    { label: "Tabla 1", page: 34, file: "tabla-01-p34.png" },
    { label: "Grafico 26", page: 36, file: "grafico-26-p36.png" },
    { label: "Grafico 27", page: 37, file: "grafico-27-p37.png" },
    { label: "Grafico 28", page: 38, file: "grafico-28-p38.png" },
    { label: "Grafico 29", page: 39, file: "grafico-29-p39.png" },
    { label: "Grafico 30", page: 40, file: "grafico-30-p40.png" }
  ];

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;
      return [
        id,
        {
          title: fig.label,
          subtitle: `Figura original del informe (pagina ${fig.page})`,
          source: "Radiografia del mercado de la vivienda en Espana (2025)",
          sourceUrl: "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf",
          exactness: "exacta del informe",
          renderAs: "figure-image",
          imageUrl: `../assets/figures/radiografia/${fig.file}`
        }
      ];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "Radiografia del mercado de la vivienda en Espana",
      lead: "Version interactiva del informe original, replicando grafico por grafico y tabla por tabla en su formato visual de origen.",
      reportUrl: "https://hesperides.edu.es/informes/radiografia-mercado-vivienda-espana",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf",
      caveat:
        "Las figuras se muestran tal como aparecen en el PDF original para preservar fidelidad visual total."
    },
    metrics: [
      { kpi: "30", label: "Graficos del informe" },
      { kpi: "1", label: "Tabla del informe" },
      { kpi: "49", label: "Paginas del PDF" },
      { kpi: "100%", label: "Fidelidad visual de figuras" }
    ],
    chapters: [
      {
        id: "bloque-1",
        title: "1. Marco inicial",
        summary: [
          "Bloque inicial con la secuencia de apertura del informe sobre precios, acceso y estructura del mercado.",
          "Se mantiene la representacion original de cada visual para evitar perdida de formato."
        ],
        charts: makeIds("f", 1, 10)
      },
      {
        id: "bloque-2",
        title: "2. Diagnostico intermedio",
        summary: [
          "Bloque central con las figuras de desarrollo del informe en su orden exacto del PDF.",
          "Las visuales se muestran una a una como equivalentes directos del trabajo original."
        ],
        charts: makeIds("f", 11, 20)
      },
      {
        id: "bloque-3",
        title: "3. Evidencia y tabla",
        summary: [
          "Tramo de continuidad con graficos avanzados y la tabla comparativa incluida en el documento.",
          "Se conserva la presentacion visual original de cada figura y tabla."
        ],
        charts: makeIds("f", 21, 26)
      },
      {
        id: "bloque-4",
        title: "4. Cierre",
        summary: [
          "Bloque final con las ultimas figuras del informe.",
          "Todas las visuales son equivalencias exactas del PDF de referencia."
        ],
        charts: makeIds("f", 27, 31)
      }
    ],
    charts,
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/radiografia-mercado-vivienda-espana"
      }
    ]
  };
})();
