(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };

  const figures = [
    { label: "Grafica 1", page: 7, file: "grafico-01-p07.png" },
    { label: "Grafica 2", page: 8, file: "grafico-02-p08.png" },
    { label: "Grafica 3", page: 10, file: "grafico-03-p10.png" },
    { label: "Grafica 4", page: 11, file: "grafico-04-p11.png" },
    { label: "Grafica 5", page: 13, file: "grafico-05-p13.png" },
    { label: "Grafica 6", page: 15, file: "grafico-06-p15.png" },
    { label: "Grafica 7", page: 16, file: "grafico-07-p16.png" },
    { label: "Grafica 8", page: 17, file: "grafico-08-p17.png" },
    { label: "Grafica 9", page: 20, file: "grafico-09-p20.png" },
    { label: "Grafica 10", page: 21, file: "grafico-10-p21.png" },
    { label: "Grafica 11", page: 22, file: "grafico-11-p22.png" },
    { label: "Grafica 12", page: 24, file: "grafico-12-p24.png" },
    { label: "Grafica 13", page: 26, file: "grafico-13-p26.png" },
    { label: "Grafica 14", page: 27, file: "grafico-14-p27.png" },
    { label: "Grafica 15", page: 28, file: "grafico-15-p28.png" },
    { label: "Grafica 16", page: 29, file: "grafico-16-p29.png" },
    { label: "Grafica 17", page: 30, file: "grafico-17-p30.png" },
    { label: "Grafica 18", page: 31, file: "grafico-18-p31.png" },
    { label: "Grafica 19", page: 33, file: "grafico-19-p33.png" },
    { label: "Grafica 20", page: 36, file: "grafico-20-p36.png" },
    { label: "Grafica 21", page: 37, file: "grafico-21-p37.png" },
    { label: "Grafica 22", page: 38, file: "grafico-22-p38.png" },
    { label: "Grafica 23", page: 39, file: "grafico-23-p39.png" },
    { label: "Grafica 24", page: 40, file: "grafico-24-p40.png" },
    { label: "Tabla 1", page: 41, file: "tabla-01-p41.png" },
    { label: "Grafica 25", page: 42, file: "grafico-25-p42.png" },
    { label: "Grafica 26", page: 44, file: "grafico-26-p44.png" },
    { label: "Grafica 27", page: 45, file: "grafico-27-p45.png" },
    { label: "Grafica 28", page: 46, file: "grafico-28-p46.png" },
    { label: "Grafica 29", page: 48, file: "grafico-29-p48.png" },
    { label: "Grafica 30", page: 49, file: "grafico-30-p49.png" },
    { label: "Grafica 31", page: 51, file: "grafico-31-p51.png" },
    { label: "Grafica 32", page: 52, file: "grafico-32-p52.png" },
    { label: "Tabla 2", page: 55, file: "tabla-02-p55.png" }
  ];

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;
      return [
        id,
        {
          title: fig.label,
          subtitle: `Figura original del informe (pagina ${fig.page})`,
          source: "Sistemas de pensiones comparados (2025)",
          sourceUrl: "https://hesperides.edu.es/documentos_pdf/Sistemas_de_pensiones_comparados.pdf",
          exactness: "exacta del informe",
          renderAs: "figure-image",
          imageUrl: `../assets/figures/sistemas/${fig.file}`
        }
      ];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "Sistemas de pensiones comparados",
      lead: "Version interactiva del informe original, replicando grafica por grafica y tabla por tabla en su formato visual de origen.",
      reportUrl: "https://hesperides.edu.es/informes/sistemas_de_pensiones_comparados",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/Sistemas_de_pensiones_comparados.pdf",
      caveat:
        "Las figuras se muestran tal como aparecen en el PDF original para preservar fidelidad visual total."
    },
    metrics: [
      { kpi: "32", label: "Graficas del informe" },
      { kpi: "2", label: "Tablas del informe" },
      { kpi: "59", label: "Paginas del PDF" },
      { kpi: "100%", label: "Fidelidad visual de figuras" }
    ],
    chapters: [
      {
        id: "bloque-1",
        title: "1. Comparativa inicial",
        summary: [
          "Bloque inicial con las primeras figuras de comparacion entre modelos y contexto general.",
          "Se mantiene la representacion original de cada visual para evitar perdida de formato."
        ],
        charts: makeIds("f", 1, 8)
      },
      {
        id: "bloque-2",
        title: "2. Desarrollo intermedio",
        summary: [
          "Bloque central con la secuencia principal del informe en el orden exacto del PDF.",
          "Las figuras se muestran una a una como equivalentes visuales directos."
        ],
        charts: makeIds("f", 9, 18)
      },
      {
        id: "bloque-3",
        title: "3. Comparacion avanzada",
        summary: [
          "Tramo avanzado con graficas y primera tabla comparativa del documento.",
          "Se conserva estructura, rotulacion y estilo originales del informe fuente."
        ],
        charts: makeIds("f", 19, 27)
      },
      {
        id: "bloque-4",
        title: "4. Cierre del informe",
        summary: [
          "Bloque final con las ultimas figuras y tabla de cierre.",
          "Todas las visuales son equivalencias exactas del PDF original."
        ],
        charts: makeIds("f", 28, 34)
      }
    ],
    charts,
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/Sistemas_de_pensiones_comparados.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/sistemas_de_pensiones_comparados"
      }
    ]
  };
})();
