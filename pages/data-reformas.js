(() => {
  const figures = [
    { label: "Tabla 1", page: 23, file: "tabla-01-p23.png" },
    { label: "Grafico 1", page: 24, file: "grafico-01-p24.png" },
    { label: "Grafico 2", page: 25, file: "grafico-02-p25.png" },
    { label: "Grafico 3", page: 26, file: "grafico-03-p26.png" }
  ];

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;
      return [
        id,
        {
          title: fig.label,
          subtitle: `Figura original del informe (pagina ${fig.page})`,
          source: "Las Reformas de la Seguridad Social en Espana (2025)",
          sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
          exactness: "exacta del informe",
          renderAs: "figure-image",
          imageUrl: `../assets/figures/reformas/${fig.file}`
        }
      ];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "Las Reformas de la Seguridad Social en Espana",
      lead: "Version interactiva con todas las figuras del informe en su formato original.",
      reportUrl: "https://hesperides.edu.es/informes/reformas-seguridad-social-espana",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
      caveat: "Cada grafico y tabla se presenta como equivalencia visual exacta del trabajo original."
    },
    metrics: [
      { kpi: "3", label: "Graficos del informe" },
      { kpi: "1", label: "Tabla del informe" },
      { kpi: "28", label: "Paginas del PDF" },
      { kpi: "100%", label: "Fidelidad visual de figuras" }
    ],
    chapters: [
      {
        id: "bloque-unico",
        title: "Bloque visual completo",
        summary: [
          "El informe concentra sus visuales en el tramo final, con una tabla comparativa y tres graficos de cierre.",
          "Se mantiene el formato original figura a figura."
        ],
        charts: ["f01", "f02", "f03", "f04"]
      }
    ],
    charts,
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/reformas-seguridad-social-espana"
      }
    ]
  };
})();
